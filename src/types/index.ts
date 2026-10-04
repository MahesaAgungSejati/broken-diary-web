export interface Tempat {
  id: number;
  nama: string;
  lokasi: string | null;
  deskripsi: string | null;
  foto: string | null;
  created_at: string;
  updated_at: string;
}

export interface Makanan {
  id: number;
  nama: string;
  lokasi: string | null;
  deskripsi: string | null;
  foto: string | null;
  created_at: string;
  updated_at: string;
}

// export interface LoginResponse {
//   user: {
//     id: number;
//     name: string;
//     email: string;
//   };
//   token: string;
// }