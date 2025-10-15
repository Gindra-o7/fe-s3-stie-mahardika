import { useState } from "react";
import { BookOpen, Users, TrendingUp, Target, ChevronDown, ChevronUp, FileText, Award, Calendar } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const ConcentrationTable = ({ title, icon: Icon, color, courses }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-6 overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-white">
      <div 
        className={`${color} p-6 cursor-pointer hover:opacity-90 transition-all`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="text-white/80 text-sm">{courses.length} Mata Kuliah • {courses.reduce((sum: number, c: any) => sum + c.sks, 0)} SKS</p>
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-6 h-6 text-white" />
          ) : (
            <ChevronDown className="w-6 h-6 text-white" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-16">No</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-28">Kode MK</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nama Mata Kuliah</th>
                <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-20">SKS</th>
                <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">Semester</th>
                <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-28">Jenis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses.map((course: any, index: number) => (
                <tr 
                  key={index}
                  className="hover:bg-blue-50/50 transition-colors"
                >
                  <td className="px-4 py-4 text-gray-600 font-medium">{index + 1}</td>
                  <td className="px-4 py-4">
                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                      {course.code}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-800">{course.name}</td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#207D96] to-[#1B3F6E] text-white rounded-lg font-bold text-sm shadow-sm">
                      {course.sks}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {course.semester}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                      {course.type}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-gradient-to-r from-gray-50 to-blue-50 font-bold">
                <td colSpan={3} className="px-4 py-4 text-gray-800 text-right">Total SKS Konsentrasi:</td>
                <td className="px-4 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#207D96] to-[#1B3F6E] text-white rounded-xl font-bold text-lg shadow-md">
                    {courses.reduce((sum: number, c: any) => sum + c.sks, 0)}
                  </span>
                </td>
                <td colSpan={2}></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const CurriculumPage = () => {
  const matriculationCourses = [
    { code: "MKM90001", name: "Teori Ekonomi", sks: 3, semester: "Matrikulasi", type: "Matrikulasi" },
    { code: "MKM90002", name: "Teori Manajemen", sks: 3, semester: "Matrikulasi", type: "Matrikulasi" },
    { code: "MKM90003", name: "Statistik Lanjutan", sks: 3, semester: "Matrikulasi", type: "Matrikulasi" }
  ];

  const coreProgram = [
    { code: "MWU91101", name: "Filsafat Ilmu", sks: 3, semester: "I", type: "Wajib" },
    { code: "MWU91102", name: "Metode Penelitian", sks: 3, semester: "I", type: "Wajib" },
    { code: "MWU91103", name: "Teori Manajemen Lanjutan", sks: 3, semester: "I", type: "Wajib" },
    { code: "MWU93113", name: "Kualifikasi Proposal Disertasi", sks: 3, semester: "III", type: "Wajib" },
    { code: "MWU94114", name: "Penelitian Disertasi", sks: 9, semester: "IV", type: "Wajib" },
    { code: "MWU95115", name: "Publikasi Internasional", sks: 9, semester: "V", type: "Wajib" },
    { code: "MWU96116", name: "Disertasi", sks: 9, semester: "VI", type: "Wajib" }
  ];

  const concentrations = [
    {
      title: "Manajemen Sumberdaya Manusia ",
      icon: Users,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      courses: [
        { code: "MWU92204", name: "Manajemen Sumber Daya Manusia", sks: 3, semester: "II", type: "Konsentrasi" },
        { code: "MWU92205", name: "Human Capital Strategic and Development", sks: 3, semester: "II", type: "Konsentrasi" },
        { code: "MWU92206", name: "Manajemen Sumber Daya Manusia dalam Kepemimpinan", sks: 3, semester: "II", type: "Konsentrasi" }
      ]
    },
    {
      title: "Manajemen Pemasaran",
      icon: TrendingUp,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      courses: [
        { code: "MWU92207", name: "Manajemen Pemasaran", sks: 3, semester: "II", type: "Konsentrasi" },
        { code: "MWU92208", name: "Strategi Pemasaran", sks: 3, semester: "II", type: "Konsentrasi" },
        { code: "MWU92209", name: "Teori Perilaku Konsumen", sks: 3, semester: "II", type: "Konsentrasi" }
      ]
    }
  ];

  const dissertation = [
    { code: "MWU93113", name: "Kualifikasi Proposal Disertasi", sks: 3, semester: "III", type: "Wajib" },
    { code: "MWU94114", name: "Penelitian Disertasi (Ujian Proposal + Ujian Kelayakan)", sks: 9, semester: "IV", type: "Wajib" },
    { code: "MWU95115", name: "Publikasi Internasional", sks: 9, semester: "V", type: "Wajib" },
    { code: "MWU96116", name: "Disertasi (Ujian Tertutup + Ujian Terbuka)", sks: 9, semester: "VI", type: "Wajib" }
  ];

  const totalSKSMatriculation = matriculationCourses.reduce((sum, c) => sum + c.sks, 0);
  const totalSKSCore = coreProgram.reduce((sum, c) => sum + c.sks, 0);
  const totalSKSConcentration = concentrations[0].courses.reduce((sum, course) => sum + course.sks, 0);
  const totalSKSProgram = totalSKSCore + totalSKSConcentration;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" id="curriculum">
        <div className="absolute inset-0 bg-gradient-to-r from-[#207D96]/5 to-[#1B3F6E]/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block p-3 bg-white rounded-full shadow-lg mb-6">
              <BookOpen className="w-12 h-12 text-[#207D96]" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#207D96] to-[#1B3F6E]">
                Struktur Kurikulum
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Program Doktor Ilmu Manajemen STIE Mahardhika
            </p>
            <p className="text-gray-500 mb-8">
              Kurikulum dirancang secara komprehensif untuk menghasilkan peneliti dan akademisi berkualitas tinggi
            </p>
            <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#207D96] min-w-[160px]">
                <div className="text-4xl font-bold text-[#207D96]">{totalSKSProgram}</div>
                <div className="text-sm text-gray-600 mt-1">Total SKS Program</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#1B3F6E] min-w-[160px]">
                <div className="text-4xl font-bold text-[#1B3F6E]">2</div>
                <div className="text-sm text-gray-600 mt-1">Konsentrasi Minat</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600 min-w-[160px]">
                <div className="text-4xl font-bold text-purple-600">7</div>
                <div className="text-sm text-gray-600 mt-1">Semester</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-600 min-w-[160px]">
                <div className="text-4xl font-bold text-orange-600">{totalSKSMatriculation}</div>
                <div className="text-sm text-gray-600 mt-1">SKS Matrikulasi</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <div className="container mx-auto px-4 -mt-8 mb-12 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
            <Calendar className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Jadwal Fleksibel</h3>
            <p className="text-gray-600 text-sm">Perkuliahan dirancang untuk profesional yang bekerja dengan jadwal weekend dan executive class</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
            <Award className="w-10 h-10 text-purple-500 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Akreditasi</h3>
            <p className="text-gray-600 text-sm">Program terakreditasi dengan standar nasional pendidikan tinggi Indonesia</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
            <FileText className="w-10 h-10 text-green-500 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Publikasi Ilmiah</h3>
            <p className="text-gray-600 text-sm">Mahasiswa didorong untuk publikasi di jurnal nasional dan internasional bereputasi</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Matriculation Courses Table */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Mata Kuliah Matrikulasi</h2>
                <p className="text-white/80 text-sm">Program leveling untuk mahasiswa • {totalSKSMatriculation} SKS</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-b-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-16">No</th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-28">Kode MK</th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nama Mata Kuliah</th>
                    <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-20">SKS</th>
                    <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">Semester</th>
                    <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-28">Jenis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {matriculationCourses.map((course, index) => (
                    <tr key={index} className="hover:bg-orange-50/50 transition-colors">
                      <td className="px-4 py-4 text-gray-600 font-medium">{index + 1}</td>
                      <td className="px-4 py-4">
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                          {course.code}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-800 font-medium">{course.name}</td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg font-bold text-sm shadow-sm">
                          {course.sks}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">
                          {course.semester}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800">
                          {course.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gradient-to-r from-orange-50 to-orange-100 font-bold">
                    <td colSpan={3} className="px-4 py-4 text-gray-800 text-right text-lg">Total SKS Matrikulasi:</td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg shadow-md">
                        {totalSKSMatriculation}
                      </span>
                    </td>
                    <td colSpan={2}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Matriculation Info */}
          <div className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-600" />
              Informasi Matrikulasi
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">•</span>
                <span>Mata kuliah matrikulasi adalah program leveling untuk mahasiswa yang latar belakang akademiknya tidak linear dengan manajemen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">•</span>
                <span>Dilaksanakan di luar kurikulum utama program doktor</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">•</span>
                <span>Bertujuan untuk menyelaraskan pengetahuan dasar mahasiswa sebelum memulai program doktor</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Core Program Table */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-[#207D96] to-[#1B3F6E] rounded-t-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Mata Kuliah Wajib Program</h2>
                <p className="text-white/80 text-sm">Fundamental untuk semua mahasiswa • {totalSKSCore} SKS</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-b-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-16">No</th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-28">Kode MK</th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nama Mata Kuliah</th>
                    <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-20">SKS</th>
                    <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">Semester</th>
                    <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-28">Jenis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {coreProgram.map((course, index) => (
                    <tr key={index} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-4 py-4 text-gray-600 font-medium">{index + 1}</td>
                      <td className="px-4 py-4">
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                          {course.code}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-800 font-medium">{course.name}</td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#207D96] to-[#1B3F6E] text-white rounded-lg font-bold text-sm shadow-sm">
                          {course.sks}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                          {course.semester}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                          {course.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gradient-to-r from-[#1B3F6E]/10 to-[#207D96]/10 font-bold">
                    <td colSpan={3} className="px-4 py-4 text-gray-800 text-right text-lg">Total SKS Wajib:</td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#1B3F6E] to-[#207D96] text-white rounded-xl font-bold text-lg shadow-md">
                        {totalSKSCore}
                      </span>
                    </td>
                    <td colSpan={2}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Dissertation Info */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Persyaratan Disertasi
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Kualifikasi Proposal Disertasi (Semester III) - 3 SKS</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Penelitian Disertasi dengan Ujian Proposal dan Ujian Kelayakan (Semester IV) - 9 SKS</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Publikasi Internasional (Semester V) - 9 SKS</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Disertasi dengan Ujian Tertutup dan Ujian Terbuka (Semester VI) - 9 SKS</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-br from-[#207D96] via-[#1B3F6E] to-[#207D96] rounded-2xl shadow-2xl p-8 text-white mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Ringkasan Beban Studi</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-3xl font-bold mb-2">{totalSKSCore}</div>
              <div className="text-sm text-white/90">SKS Wajib</div>
              <div className="text-xs text-white/70 mt-1">Semester I-VI</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-3xl font-bold mb-2">{totalSKSConcentration}</div>
              <div className="text-sm text-white/90">SKS Konsentrasi</div>
              <div className="text-xs text-white/70 mt-1">Satu Konsentrasi Pilihan</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-3xl font-bold mb-2">{totalSKSMatriculation}</div>
              <div className="text-sm text-white/90">SKS Matrikulasi</div>
              <div className="text-xs text-white/70 mt-1">Di Luar Program</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center border-2 border-white/40">
              <div className="text-4xl font-bold mb-2">{totalSKSProgram}</div>
              <div className="text-sm font-semibold">TOTAL SKS</div>
              <div className="text-xs text-white/80 mt-1">Program Lengkap</div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="grid md:grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="font-bold text-lg mb-1">3 Tahun</div>
                <div className="text-white/80">Durasi Normal</div>
              </div>
              <div>
                <div className="font-bold text-lg mb-1">5 Tahun</div>
                <div className="text-white/80">Maksimal Studi</div>
              </div>
              <div>
                <div className="font-bold text-lg mb-1">1:8</div>
                <div className="text-white/80">Rasio Dosen:Mahasiswa</div>
              </div>
            </div>
          </div>
        </div>

        {/* Concentration Tables */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Mata Kuliah Konsentrasi</h3>
          <p className="text-gray-600 text-center mb-4 max-w-3xl mx-auto">
            Pilih salah satu dari dua konsentrasi minat yang tersedia. Setiap konsentrasi terdiri dari 9 SKS mata kuliah yang harus diambil secara lengkap sesuai bidang keahlian yang dipilih.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm">
              <span className="text-blue-600">ℹ️</span>
              <span>Mahasiswa wajib memilih dan menyelesaikan salah satu konsentrasi secara lengkap (9 SKS)</span>
            </div>
          </div>
          {concentrations.map((concentration, index) => (
            <ConcentrationTable
              key={index}
              title={concentration.title}
              icon={concentration.icon}
              color={concentration.color}
              courses={concentration.courses}
            />
          ))}
        </div>

        {/* Roadmap */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Roadmap Akademik</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Tahun Pertama</h4>
                  <p className="text-xs text-gray-500">Semester I-II</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Mata kuliah wajib (Filsafat Ilmu, Metode Penelitian, Teori Manajemen Lanjutan)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Mata kuliah konsentrasi pilihan (MSDM atau Pemasaran)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Identifikasi topik penelitian disertasi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Persiapan proposal disertasi</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-lg">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Tahun Kedua</h4>
                  <p className="text-xs text-gray-500">Semester III-IV</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>Kualifikasi Proposal Disertasi (Semester III)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>Penelitian Disertasi dengan Ujian Proposal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>Ujian Kelayakan Hasil Penelitian</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>Penyelesaian tahap penelitian</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-lg">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Tahun Ketiga</h4>
                  <p className="text-xs text-gray-500">Semester V-VI</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Publikasi Internasional (Semester V)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Penyelesaian penulisan disertasi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Ujian Tertutup Disertasi (Semester VI)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Ujian Terbuka dan Wisuda</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#207D96]">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#207D96]" />
              Keunggulan Program
            </h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#207D96] font-bold mt-1">→</span>
                <span>Dosen pembimbing berpengalaman dengan rekam jejak publikasi internasional</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#207D96] font-bold mt-1">→</span>
                <span>Kurikulum berbasis riset dengan penekanan pada publikasi ilmiah</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#207D96] font-bold mt-1">→</span>
                <span>Fasilitas penelitian lengkap termasuk akses ke database jurnal internasional</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#207D96] font-bold mt-1">→</span>
                <span>Kolaborasi riset dengan universitas dan institusi penelitian terkemuka</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#207D96] font-bold mt-1">→</span>
                <span>Dukungan pendanaan untuk konferensi internasional dan publikasi</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#1B3F6E]">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#1B3F6E]" />
              Prospek Karir Lulusan
            </h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#1B3F6E] font-bold mt-1">→</span>
                <span>Akademisi dan peneliti di perguruan tinggi</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B3F6E] font-bold mt-1">→</span>
                <span>Konsultan manajemen dan bisnis senior</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B3F6E] font-bold mt-1">→</span>
                <span>Eksekutif dan pemimpin organisasi</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B3F6E] font-bold mt-1">→</span>
                <span>Analis kebijakan di lembaga pemerintah</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B3F6E] font-bold mt-1">→</span>
                <span>Peneliti di lembaga riset dan think tank</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#207D96] to-[#1B3F6E]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Siap Memulai Perjalanan Akademis Anda?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan Program Doktor Ilmu Manajemen dan kembangkan potensi penelitian Anda untuk memberikan kontribusi nyata pada dunia akademis dan praktik manajemen
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-white text-[#207D96] px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Daftar Sekarang
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#207D96] transition-all hover:scale-105 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Unduh Brosur
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CurriculumPage;