import { useState } from "react";
import { BookOpen, Users, TrendingUp, Target, ChevronDown, ChevronUp, FileText, Award, Calendar } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

interface Course {
  code: string;
  name: string;
  sks: number;
  semester: string;
  type: string;
}

interface Concentration {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  courses: Course[];
}

const ConcentrationTable = ({ title, icon: Icon, color, courses }: Concentration) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLanguage();

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
              <p className="text-white/80 text-sm">{courses.length} {t('curriculum.table.name')} • {courses.reduce((sum: number, c: Course) => sum + c.sks, 0)} {t('curriculum.table.sks')}</p>
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
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-16">{t('curriculum.table.no')}</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-28">{t('curriculum.table.code')}</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t('curriculum.table.name')}</th>
                <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-20">{t('curriculum.table.sks')}</th>
                <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">{t('curriculum.table.semester')}</th>
                <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-28">{t('curriculum.table.type')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses.map((course: Course, index: number) => (
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
                <td colSpan={3} className="px-4 py-4 text-gray-800 text-right">{t('curriculum.table.total')} {t('curriculum.type.concentration')}:</td>
                <td className="px-4 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#207D96] to-[#1B3F6E] text-white rounded-xl font-bold text-lg shadow-md">
                    {courses.reduce((sum: number, c: Course) => sum + c.sks, 0)}
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
  const { t } = useLanguage();
  
  const matriculationCourses = [
    { code: "MKM90001", name: t('curriculum.course.economic.theory'), sks: 3, semester: t('curriculum.type.matriculation'), type: t('curriculum.type.matriculation') },
    { code: "MKM90002", name: t('curriculum.course.management.theory'), sks: 3, semester: t('curriculum.type.matriculation'), type: t('curriculum.type.matriculation') },
    { code: "MKM90003", name: t('curriculum.course.advanced.statistics'), sks: 3, semester: t('curriculum.type.matriculation'), type: t('curriculum.type.matriculation') }
  ];

  const coreProgram = [
    { code: "MWU91101", name: t('curriculum.course.philosophy.science'), sks: 3, semester: "I", type: t('curriculum.type.required') },
    { code: "MWU91102", name: t('curriculum.course.research.methods'), sks: 3, semester: "I", type: t('curriculum.type.required') },
    { code: "MWU91103", name: t('curriculum.course.advanced.management'), sks: 3, semester: "I", type: t('curriculum.type.required') },
    { code: "MWU93113", name: t('curriculum.course.dissertation.qualification'), sks: 3, semester: "III", type: t('curriculum.type.required') },
    { code: "MWU94114", name: t('curriculum.course.dissertation.research'), sks: 9, semester: "IV", type: t('curriculum.type.required') },
    { code: "MWU95115", name: t('curriculum.course.international.publication'), sks: 9, semester: "V", type: t('curriculum.type.required') },
    { code: "MWU96116", name: t('curriculum.course.dissertation'), sks: 9, semester: "VI", type: t('curriculum.type.required') }
  ];

  const concentrations = [
    {
      title: t('curriculum.concentration.hrm'),
      icon: Users,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      courses: [
        { code: "MWU92204", name: t('curriculum.course.hrm'), sks: 3, semester: "II", type: t('curriculum.type.concentration') },
        { code: "MWU92205", name: t('curriculum.course.human.capital'), sks: 3, semester: "II", type: t('curriculum.type.concentration') },
        { code: "MWU92206", name: t('curriculum.course.hrm.leadership'), sks: 3, semester: "II", type: t('curriculum.type.concentration') }
      ]
    },
    {
      title: t('curriculum.concentration.marketing'),
      icon: TrendingUp,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      courses: [
        { code: "MWU92207", name: t('curriculum.course.marketing'), sks: 3, semester: "II", type: t('curriculum.type.concentration') },
        { code: "MWU92208", name: t('curriculum.course.marketing.strategy'), sks: 3, semester: "II", type: t('curriculum.type.concentration') },
        { code: "MWU92209", name: t('curriculum.course.consumer.behavior'), sks: 3, semester: "II", type: t('curriculum.type.concentration') }
      ]
    }
  ];

  // const dissertation = [
  //   { code: "MWU93113", name: "Kualifikasi Proposal Disertasi", sks: 3, semester: "III", type: "Wajib" },
  //   { code: "MWU94114", name: "Penelitian Disertasi (Ujian Proposal + Ujian Kelayakan)", sks: 9, semester: "IV", type: "Wajib" },
  //   { code: "MWU95115", name: "Publikasi Internasional", sks: 9, semester: "V", type: "Wajib" },
  //   { code: "MWU96116", name: "Disertasi (Ujian Tertutup + Ujian Terbuka)", sks: 9, semester: "VI", type: "Wajib" }
  // ];

  const totalSKSMatriculation = matriculationCourses.reduce((sum, c) => sum + c.sks, 0);
  const totalSKSCore = coreProgram.reduce((sum, c) => sum + c.sks, 0);
  const totalSKSConcentration = concentrations[0].courses.reduce((sum, course) => sum + course.sks, 0);
  const totalSKSProgram = totalSKSCore + totalSKSConcentration;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      <Header />
      
      <section className="relative py-20 overflow-hidden" id="curriculum">
        <div className="absolute inset-0 bg-gradient-to-r from-[#207D96]/5 to-[#1B3F6E]/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block p-3 bg-white rounded-full shadow-lg mb-6">
              <BookOpen className="w-12 h-12 text-[#207D96]" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#207D96] to-[#1B3F6E]">
                {t('curriculum.title')}
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              {t('curriculum.subtitle')}
            </p>
            <p className="text-gray-500 mb-8">
              {t('curriculum.description')}
            </p>
            <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#207D96] min-w-[160px]">
                <div className="text-4xl font-bold text-[#207D96]">{totalSKSProgram}</div>
                <div className="text-sm text-gray-600 mt-1">{t('curriculum.total.sks')}</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#1B3F6E] min-w-[160px]">
                <div className="text-4xl font-bold text-[#1B3F6E]">2</div>
                <div className="text-sm text-gray-600 mt-1">{t('curriculum.concentrations')}</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600 min-w-[160px]">
                <div className="text-4xl font-bold text-purple-600">7</div>
                <div className="text-sm text-gray-600 mt-1">{t('curriculum.semesters')}</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-600 min-w-[160px]">
                <div className="text-4xl font-bold text-orange-600">{totalSKSMatriculation}</div>
                <div className="text-sm text-gray-600 mt-1">{t('curriculum.matriculation.sks')}</div>
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
            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('curriculum.info.flexible')}</h3>
            <p className="text-gray-600 text-sm">{t('curriculum.info.flexible.desc')}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
            <Award className="w-10 h-10 text-purple-500 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('curriculum.info.accreditation')}</h3>
            <p className="text-gray-600 text-sm">{t('curriculum.info.accreditation.desc')}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
            <FileText className="w-10 h-10 text-green-500 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('curriculum.info.publication')}</h3>
            <p className="text-gray-600 text-sm">{t('curriculum.info.publication.desc')}</p>
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
                <h2 className="text-2xl font-bold text-white">{t('curriculum.matriculation.title')}</h2>
                <p className="text-white/80 text-sm">{t('curriculum.matriculation.subtitle')} • {totalSKSMatriculation} {t('curriculum.table.sks')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-b-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-16">{t('curriculum.table.no')}</th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-28">{t('curriculum.table.code')}</th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t('curriculum.table.name')}</th>
                    <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-20">{t('curriculum.table.sks')}</th>
                    <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">{t('curriculum.table.semester')}</th>
                    <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-28">{t('curriculum.table.type')}</th>
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
                    <td colSpan={3} className="px-4 py-4 text-gray-800 text-right text-lg">{t('curriculum.table.total')} {t('curriculum.type.matriculation')}:</td>
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
              {t('curriculum.matriculation.info.title')}
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">•</span>
                <span>{t('curriculum.matriculation.info.1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">•</span>
                <span>{t('curriculum.matriculation.info.2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">•</span>
                <span>{t('curriculum.matriculation.info.3')}</span>
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
                <h2 className="text-2xl font-bold text-white">{t('curriculum.core.title')}</h2>
                <p className="text-white/80 text-sm">{t('curriculum.core.subtitle')} • {totalSKSCore} {t('curriculum.table.sks')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-b-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-16">{t('curriculum.table.no')}</th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-28">{t('curriculum.table.code')}</th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t('curriculum.table.name')}</th>
                    <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-20">{t('curriculum.table.sks')}</th>
                    <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">{t('curriculum.table.semester')}</th>
                    <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-28">{t('curriculum.table.type')}</th>
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
                    <td colSpan={3} className="px-4 py-4 text-gray-800 text-right text-lg">{t('curriculum.table.total')} {t('curriculum.type.required')}:</td>
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
              {t('curriculum.dissertation.title')}
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>{t('curriculum.dissertation.1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>{t('curriculum.dissertation.2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>{t('curriculum.dissertation.3')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>{t('curriculum.dissertation.4')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-br from-[#207D96] via-[#1B3F6E] to-[#207D96] rounded-2xl shadow-2xl p-8 text-white mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">{t('curriculum.summary.title')}</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-3xl font-bold mb-2">{totalSKSCore}</div>
              <div className="text-sm text-white/90">{t('curriculum.summary.core')}</div>
              <div className="text-xs text-white/70 mt-1">{t('curriculum.summary.core.desc')}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-3xl font-bold mb-2">{totalSKSConcentration}</div>
              <div className="text-sm text-white/90">{t('curriculum.summary.concentration')}</div>
              <div className="text-xs text-white/70 mt-1">{t('curriculum.summary.concentration.desc')}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-3xl font-bold mb-2">{totalSKSMatriculation}</div>
              <div className="text-sm text-white/90">{t('curriculum.summary.matriculation')}</div>
              <div className="text-xs text-white/70 mt-1">{t('curriculum.summary.matriculation.desc')}</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center border-2 border-white/40">
              <div className="text-4xl font-bold mb-2">{totalSKSProgram}</div>
              <div className="text-sm font-semibold">{t('curriculum.summary.total')}</div>
              <div className="text-xs text-white/80 mt-1">{t('curriculum.summary.total.desc')}</div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="grid md:grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="font-bold text-lg mb-1">3 {t('curriculum.duration.normal').split(' ')[1]}</div>
                <div className="text-white/80">{t('curriculum.duration.normal')}</div>
              </div>
              <div>
                <div className="font-bold text-lg mb-1">5 {t('curriculum.duration.max').split(' ')[1]}</div>
                <div className="text-white/80">{t('curriculum.duration.max')}</div>
              </div>
              <div>
                <div className="font-bold text-lg mb-1">1:8</div>
                <div className="text-white/80">{t('curriculum.ratio')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Concentration Tables */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('curriculum.concentration.title')}</h3>
          <p className="text-gray-600 text-center mb-4 max-w-3xl mx-auto">
            {t('curriculum.concentration.subtitle')}
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm">
              <span className="text-blue-600">ℹ️</span>
              <span>{t('curriculum.concentration.info')}</span>
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
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('curriculum.roadmap.title')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{t('curriculum.roadmap.year1')}</h4>
                  <p className="text-xs text-gray-500">{t('curriculum.roadmap.year1.desc')}</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>{t('curriculum.roadmap.year1.1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>{t('curriculum.roadmap.year1.2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>{t('curriculum.roadmap.year1.3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>{t('curriculum.roadmap.year1.4')}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-lg">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{t('curriculum.roadmap.year2')}</h4>
                  <p className="text-xs text-gray-500">{t('curriculum.roadmap.year2.desc')}</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>{t('curriculum.roadmap.year2.1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>{t('curriculum.roadmap.year2.2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>{t('curriculum.roadmap.year2.3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>{t('curriculum.roadmap.year2.4')}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-lg">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{t('curriculum.roadmap.year3')}</h4>
                  <p className="text-xs text-gray-500">{t('curriculum.roadmap.year3.desc')}</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{t('curriculum.roadmap.year3.1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{t('curriculum.roadmap.year3.2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{t('curriculum.roadmap.year3.3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{t('curriculum.roadmap.year3.4')}</span>
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
              {t('curriculum.advantages.title')}
            </h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#207D96] font-bold mt-1">→</span>
                <span>{t('curriculum.advantages.1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#207D96] font-bold mt-1">→</span>
                <span>{t('curriculum.advantages.2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#207D96] font-bold mt-1">→</span>
                <span>{t('curriculum.advantages.3')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#207D96] font-bold mt-1">→</span>
                <span>{t('curriculum.advantages.4')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#207D96] font-bold mt-1">→</span>
                <span>{t('curriculum.advantages.5')}</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#1B3F6E]">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#1B3F6E]" />
              {t('curriculum.career.title')}
            </h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#1B3F6E] font-bold mt-1">→</span>
                <span>{t('curriculum.career.1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B3F6E] font-bold mt-1">→</span>
                <span>{t('curriculum.career.2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B3F6E] font-bold mt-1">→</span>
                <span>{t('curriculum.career.3')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B3F6E] font-bold mt-1">→</span>
                <span>{t('curriculum.career.4')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B3F6E] font-bold mt-1">→</span>
                <span>{t('curriculum.career.5')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#207D96] to-[#1B3F6E]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('curriculum.cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('curriculum.cta.description')}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-white text-[#207D96] px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2">
              <Award className="w-5 h-5" />
              {t('curriculum.cta.register')}
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#207D96] transition-all hover:scale-105 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {t('curriculum.cta.brochure')}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CurriculumPage;