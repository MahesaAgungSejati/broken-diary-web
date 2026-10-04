import { useEffect, useState, type FormEvent } from 'react';
import { getTempats, createTempat, updateTempat, deleteTempat } from '../../services/tempatService';
import { getImageUrl } from '../../services/api';
import type { Tempat } from '../../types';

export default function TempatAdmin() {
  const [tempats, setTempats] = useState<Tempat[]>([]);
  const [nama, setNama] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadData = () => {
    getTempats().then(setTempats);
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
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('lokasi', lokasi);
    formData.append('deskripsi', deskripsi);
    if (foto) formData.append('foto', foto);

    if (editingId) {
      await updateTempat(editingId, formData);
    } else {
      await createTempat(formData);
    }
    resetForm();
    loadData();
  };

  const handleEdit = (tempat: Tempat) => {
    setEditingId(tempat.id);
    setNama(tempat.nama);
    setLokasi(tempat.lokasi || '');
    setDeskripsi(tempat.deskripsi || '');
  };

  const handleDelete = async (id: number) => {
    if (confirm('Hapus tempat ini?')) {
      await deleteTempat(id);
      loadData();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Kelola Tempat</h1>

      <form onSubmit={handleSubmit} className="bg-neutral-900 p-4 rounded mb-8 flex flex-col gap-3 max-w-md">
        <input
          type="text"
          placeholder="Nama Tempat"
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
        {tempats.map((tempat) => (
          <div key={tempat.id} className="bg-neutral-900 rounded overflow-hidden">
            <img src={getImageUrl(tempat.foto)} alt={tempat.nama} className="w-full h-32 object-cover" />
            <div className="p-3">
              <h3 className="text-white font-semibold">{tempat.nama}</h3>
              <p className="text-neutral-500 text-xs mb-1">{tempat.lokasi}</p>
              <p className="text-neutral-400 text-sm mb-3">{tempat.deskripsi}</p>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(tempat)} className="text-blue-400 text-sm">Edit</button>
                <button onClick={() => handleDelete(tempat.id)} className="text-red-400 text-sm">Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}