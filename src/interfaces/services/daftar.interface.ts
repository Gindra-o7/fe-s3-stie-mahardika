export interface FileData {
  filename: string;
  url: string;
  key: string;
  mime_type: string;
  size: number;
  id?: string;
  last_modified?: string;
  etag?: string;
}

export interface UploadedFile {
  filename: string;
  url: string;
  key: string;
  size: number;
  last_modified?: string;
  etag?: string;
}

export interface GetUploadResponse {
  response: boolean;
  message: string;
  data: {
    files: UploadedFile[];
    total: number;
  };
}

export interface SubmitFormPayload {
  scan_ktp_url: FileData | null;
  ijazah_s2_url: FileData | null;
  jalur_daftar: string;
  kewarganegaraan: string;
  nik: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string | null;
  agama: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  desa: string;
  dusun: string;
  alamat_jalan: string;
  akreditasi_banpt_url: FileData | null;
  karya_ilmiah_url: FileData | null;
  rekomendasi_url: FileData | null;
  proposal_disertasi_url: FileData | null;
  toefl_url: FileData | null;
  pas_foto_url: FileData | null;
  scan_ijazah_sarjana_dan_magister_url: FileData | null;
  scan_nilai_sarjana_dan_magister_url: FileData | null;
  tpa_bappenas_url: FileData | null;
  transkrip_doktor_pindahan_url: FileData | null;
  surat_kesehatan_url: FileData | null;
  surat_izin_atasan_url: FileData | null;
  cv_url: FileData | null;
}

export interface SubmitFormResponse {
  response: boolean;
  message: string;
  data?: unknown;
}

export interface KartuPesertaResponse {
  blob: Blob;
  contentType: string;
}