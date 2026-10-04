import { useEffect, useState, type FormEvent } from 'react';
import { getMakanans, createMakanan, updateMakanan, deleteMakanan } from '../../services/makananService';
import { getImageUrl } from '../../services/supabase';
import type { Makanan } from '../../types';

export default function MakananAdmin() {
  const [makanans, setMakanans] = useState<Makanan[]>([]);
  const [nama, setNama] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingFoto, setEditingFoto] = useState<string | null>(null);

  const loadData = () => {
    getMakanans().then(setMakanans);
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setNama('');
    setLokasi('');
    setDeskripsi('');
    setFoto(null);
    setEditingId(null);
    setEditingFoto(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMakanan(editingId, nama, lokasi, deskripsi, foto, editingFoto);
      } else {
        await createMakanan(nama, lokasi, deskripsi, foto);
      }
      resetForm();
      loadData();
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan data');
    }
  };

  const handleEdit = (makanan: Makanan) => {
    setEditingId(makanan.id);
    setEditingFoto(makanan.foto);
    setNama(makanan.nama);
    setLokasi(makanan.lokasi || '');
    setDeskripsi(makanan.deskripsi || '');
  };

  const handleDelete = async (makanan: Makanan) => {
    if (confirm('Hapus makanan ini?')) {
      await deleteMakanan(makanan.id, makanan.foto);
      loadData();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Kelola Makanan</h1>

      <form onSubmit={handleSubmit} className="bg-neutral-900 p-4 rounded mb-8 flex flex-col gap-3 max-w-md">
        <input
          type="text"
          placeholder="Nama Makanan"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="px-3 py-2 rounded bg-neutral-800 text-white outline-none"
          required
        />
        <input
          type="text"
          placeholder="Lokasi"
          value={lokasi}
          onChange={(e) => setLokasi(e.target.value)}
          className="px-3 py-2 rounded bg-neutral-800 text-white outline-none"
        />
        <textarea
          placeholder="Deskripsi"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="px-3 py-2 rounded bg-neutral-800 text-white outline-none"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFoto(e.target.files?.[0] || null)}
          className="text-white text-sm"
        />
        <div className="flex gap-2">
          <button type="submit" className="bg-white text-black px-4 py-2 rounded font-semibold">
            {editingId ? 'Update' : 'Tambah'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="text-neutral-400 px-4 py-2">
              Batal
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {makanans.map((makanan) => (
          <div key={makanan.id} className="bg-neutral-900 rounded overflow-hidden">
            <img src={getImageUrl(makanan.foto)} alt={makanan.nama} className="w-full h-32 object-cover" />
            <div className="p-3">
              <h3 className="text-white font-semibold">{makanan.nama}</h3>
              <p className="text-neutral-500 text-xs mb-1">{makanan.lokasi}</p>
              <p className="text-neutral-400 text-sm mb-3">{makanan.deskripsi}</p>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(makanan)} className="text-blue-400 text-sm">Edit</button>
                <button onClick={() => handleDelete(makanan)} className="text-red-400 text-sm">Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}