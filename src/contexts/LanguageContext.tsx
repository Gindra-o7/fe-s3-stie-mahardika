import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'id' | 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// File terjemahan
const translations = {
  id: {
    // Header
    'nav.home': 'Beranda',
    'nav.profile': 'Profil Prodi',
    'nav.curriculum': 'Kurikulum',
    'nav.cost': 'Biaya',
    'nav.registration': 'Tata Cara Pendaftaran',
    'button.login': 'Masuk',
    'button.register': 'Daftar Sekarang',
    'button.logout': 'Keluar',
    
    // Hero Section
    'hero.title': 'Selamat Datang di Program S3 STIE Mahardhika',
    'hero.subtitle': 'Mewujudkan Kepemimpinan Akademik dan Inovasi Global',
    'hero.description': 'Bergabunglah dengan para pemikir visioner yang membangun masa depan ekonomi dan bisnis melalui riset unggulan dan kolaborasi berkelanjutan.',
    'hero.cta': 'Daftar Sekarang',

    'cost.title': 'Biaya Pendidikan',
    'cost.subtitle': 'Program Doktor (S3) STIE Mahardhika',
    'cost.schedule.title': 'Program Reguler',
    'cost.schedule.description': 'Perkuliahan diselenggarakan pada hari Jumat Sore dan Sabtu.',
    'cost.details.title': 'Rincian Biaya',
    'cost.details.item1': 'Pendaftaran',
    'cost.details.item2': 'Matrikulasi',
    'cost.details.item3': 'Uang Kuliah Tunggal (UKT) per semester',
    'cost.cta': 'Daftar Sekarang',
    
    // Features
    'features.title': 'Mengapa Memilih STIE Mahardhika?',
    'features.quality': 'Kualitas Pendidikan Terbaik',
    'features.quality.desc': 'Kurikulum yang disesuaikan dengan kebutuhan industri',
    'features.faculty': 'Dosen Berpengalaman',
    'features.faculty.desc': 'Dosen yang ahli di bidangnya masing-masing',
    'features.facility': 'Fasilitas Lengkap',
    'features.facility.desc': 'Fasilitas modern untuk mendukung pembelajaran',
    'features.career': 'Bantuan Karir',
    'features.career.desc': 'Bimbingan karir dan penempatan kerja',
    
    // Process Timeline
    'process.title': 'Proses Pendaftaran',
    'process.step1': 'Daftar Online',
    'process.step1.desc': 'Isi formulir pendaftaran secara online',
    'process.step2': 'Upload Dokumen',
    'process.step2.desc': 'Upload dokumen yang diperlukan',
    'process.step3': 'Verifikasi',
    'process.step3.desc': 'Tim kami akan memverifikasi dokumen Anda',
    'process.step4': 'Konfirmasi',
    'process.step4.desc': 'Terima konfirmasi pendaftaran',
    
    // Requirements
    'requirements.title': 'Persyaratan Pendaftaran',
    'requirements.academic': 'Persyaratan Akademik',
    'requirements.academic.desc': 'Lulusan SMA/SMK sederajat',
    'requirements.documents': 'Dokumen yang Diperlukan',
    'requirements.documents.desc': 'Fotokopi ijazah, transkrip, dan KTP',
    'requirements.photo': 'Pas Foto',
    'requirements.photo.desc': 'Pas foto 3x4 sebanyak 2 lembar',
    'requirements.toefl': 'TOEFL/IELTS',
    'requirements.toefl.desc': 'Kemampuan bahasa Inggris',
    'requirements.recommendation': 'Surat Rekomendasi',
    'requirements.recommendation.desc': 'Referensi akademik',
    'requirements.proposal': 'Proposal Disertasi',
    'requirements.proposal.desc': 'Rencana penelitian',
    
    // Registration Steps
    'registration.title': 'Langkah-langkah Pendaftaran',
    'registration.online': 'Pendaftaran Online',
    'registration.online.desc': 'Daftar melalui website resmi',
    'registration.payment': 'Pembayaran',
    'registration.payment.desc': 'Lakukan pembayaran biaya pendaftaran',
    'registration.test': 'Tes Masuk',
    'registration.test.desc': 'Ikuti tes masuk sesuai jadwal',
    'registration.result': 'Pengumuman',
    'registration.result.desc': 'Lihat hasil seleksi di website',
    
    // Footer
    'footer.about': 'Tentang Kami',
    'footer.contact': 'Kontak',
    'footer.address': 'Alamat',
    'footer.phone': 'Telepon',
    'footer.email': 'Email',
    'footer.copyright': '© 2024 STIE Mahardhika. Semua hak dilindungi.',
    
    // Language Selector
    'language.selector': 'Bahasa',
    'language.indonesian': 'Indonesia',
    'language.english': 'English',
    'language.chinese': '中文',
    
    // Dashboard Pendaftar
    'dashboard.welcome': 'Selamat Datang, {name}!',
    'dashboard.status.desc': 'Status pendaftaran Anda dapat dipantau di bawah ini.',
    'dashboard.status.title': 'Status Pendaftaran',
    'dashboard.notifications': 'Notifikasi',
    'dashboard.quick.actions': 'Aksi Cepat',
    'dashboard.access': 'Akses',
    'dashboard.tips': '💡 Tips:',
    'dashboard.tips.desc': 'Pastikan semua dokumen sudah diupload sebelum batas waktu yang ditentukan untuk menghindari keterlambatan proses verifikasi.',
    
    // Status Kelulusan
    'status.accepted.title': '🎉 Selamat! Anda DITERIMA',
    'status.accepted.desc': 'Anda telah dinyatakan LULUS seleksi Program Studi S3 STIE Mahardhika',
    'status.accepted.view.detail': 'Lihat Detail',
    'status.accepted.download.letter': 'Download Surat',
    'status.rejected.title': 'Pengumuman Hasil Seleksi',
    'status.rejected.desc': 'Mohon maaf, Anda belum berhasil pada seleksi kali ini. Jangan menyerah! Anda dapat mencoba lagi pada periode berikutnya.',
    'status.rejected.view.feedback': 'Lihat Feedback',
    'status.rejected.registration.info': 'Info Pendaftaran',
    
    // Notifikasi
    'notification.toefl.warning': 'Dokumen TOEFL belum sesuai, silakan upload ulang',
    'notification.payment.verified': 'Pembayaran Anda telah diverifikasi',
    'notification.time.2hours': '2 jam yang lalu',
    'notification.time.1day': '1 hari yang lalu',
    
    // Quick Actions
    'quick.upload.documents': 'Upload Dokumen',
    'quick.view.announcement': 'Lihat Pengumuman',
    'quick.download.guide': 'Download Panduan',
    
    // Login Page
    'login.title': 'Pendaftaran Program Doktor Ilmu Manajemen',
    'login.description': 'Bergabunglah dengan Program Doktor Ilmu Manajemen di Sekolah Tinggi Ilmu Ekonomi Mahardhika Surabaya untuk mengembangkan keahlian manajerial Anda dengan kurikulum berstandar internasional dan dosen berpengalaman.',
    'login.accreditation': 'Akreditasi unggul dan jaringan akademik global',
    'login.signin.title': 'Masuk',
    'login.signin.subtitle': 'Masukkan kredensial Anda untuk mengakses akun',
    'login.email.label': 'Alamat Email',
    'login.email.placeholder': 'anda@contoh.com',
    'login.password.label': 'Kata Sandi',
    'login.password.placeholder': '••••••••',
    'login.remember': 'Ingat saya',
    'login.forgot': 'Lupa kata sandi?',
    'login.signin.button': 'Masuk',
    'login.no.account': 'Belum punya akun?',
    'login.create.account': 'Buat sekarang',
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.profile': 'Program Profile',
    'nav.curriculum': 'Curriculum',
    'nav.cost': 'Cost',
    'nav.registration': 'Registration Process',
    'button.login': 'Login',
    'button.register': 'Register Now',
    'button.logout': 'Logout',
    
    // Hero Section
    'hero.title': 'Welcome to the Doctoral Program at STIE Mahardhika',
    'hero.subtitle': 'Realizing Academic Leadership and Global Innovation',
    'hero.description': 'Join visionary thinkers who are shaping the future of economics and business through excellent research and sustainable collaboration.',
    'hero.cta': 'Register Now',

    'cost.title': 'Tuition Fees',
    'cost.subtitle': 'Doctoral Program (S3) at STIE Mahardhika',
    'cost.schedule.title': 'Regular Program',
    'cost.schedule.description': 'Lectures are held on Friday afternoons and Saturdays.',
    'cost.details.title': 'Fee Details',
    'cost.details.item1': 'Registration',
    'cost.details.item2': 'Matriculation',
    'cost.details.item3': 'Single Tuition Fee (UKT) per semester',
    'cost.cta': 'Register Now',
    
    // Features
    'features.title': 'Why Choose STIE Mahardhika?',
    'features.quality': 'Best Education Quality',
    'features.quality.desc': 'Curriculum tailored to industry needs',
    'features.faculty': 'Experienced Lecturers',
    'features.faculty.desc': 'Lecturers who are experts in their respective fields',
    'features.facility': 'Complete Facilities',
    'features.facility.desc': 'Modern facilities to support learning',
    'features.career': 'Career Support',
    'features.career.desc': 'Career guidance and job placement',
    
    // Process Timeline
    'process.title': 'Registration Process',
    'process.step1': 'Online Registration',
    'process.step1.desc': 'Fill out the registration form online',
    'process.step2': 'Upload Documents',
    'process.step2.desc': 'Upload required documents',
    'process.step3': 'Verification',
    'process.step3.desc': 'Our team will verify your documents',
    'process.step4': 'Confirmation',
    'process.step4.desc': 'Receive registration confirmation',
    
    // Requirements
    'requirements.title': 'Registration Requirements',
    'requirements.academic': 'Academic Requirements',
    'requirements.academic.desc': 'High school/equivalent graduate',
    'requirements.documents': 'Required Documents',
    'requirements.documents.desc': 'Photocopy of diploma, transcript, and ID card',
    'requirements.photo': 'Passport Photo',
    'requirements.photo.desc': '3x4 passport photos, 2 pieces',
    'requirements.toefl': 'TOEFL/IELTS',
    'requirements.toefl.desc': 'English language proficiency',
    'requirements.recommendation': 'Recommendation Letter',
    'requirements.recommendation.desc': 'Academic reference',
    'requirements.proposal': 'Dissertation Proposal',
    'requirements.proposal.desc': 'Research plan',
    
    // Registration Steps
    'registration.title': 'Registration Steps',
    'registration.online': 'Online Registration',
    'registration.online.desc': 'Register through official website',
    'registration.payment': 'Payment',
    'registration.payment.desc': 'Make registration fee payment',
    'registration.test': 'Entrance Test',
    'registration.test.desc': 'Take entrance test according to schedule',
    'registration.result': 'Announcement',
    'registration.result.desc': 'View selection results on website',
    
    // Footer
    'footer.about': 'About Us',
    'footer.contact': 'Contact',
    'footer.address': 'Address',
    'footer.phone': 'Phone',
    'footer.email': 'Email',
    'footer.copyright': '© 2024 STIE Mahardhika. All rights reserved.',
    
    // Language Selector
    'language.selector': 'Language',
    'language.indonesian': 'Indonesia',
    'language.english': 'English',
    'language.chinese': '中文',
    
    // Dashboard Pendaftar
    'dashboard.welcome': 'Welcome, {name}!',
    'dashboard.status.desc': 'Your registration status can be monitored below.',
    'dashboard.status.title': 'Registration Status',
    'dashboard.notifications': 'Notifications',
    'dashboard.quick.actions': 'Quick Actions',
    'dashboard.access': 'Access',
    'dashboard.tips': '💡 Tips:',
    'dashboard.tips.desc': 'Make sure all documents are uploaded before the specified deadline to avoid delays in the verification process.',
    
    // Status Kelulusan
    'status.accepted.title': '🎉 Congratulations! You are ACCEPTED',
    'status.accepted.desc': 'You have been declared PASSED in the S3 STIE Mahardhika Program selection',
    'status.accepted.view.detail': 'View Details',
    'status.accepted.download.letter': 'Download Letter',
    'status.rejected.title': 'Selection Results Announcement',
    'status.rejected.desc': 'Sorry, you were not successful in this selection. Don\'t give up! You can try again in the next period.',
    'status.rejected.view.feedback': 'View Feedback',
    'status.rejected.registration.info': 'Registration Info',
    
    // Notifikasi
    'notification.toefl.warning': 'TOEFL document is not appropriate, please re-upload',
    'notification.payment.verified': 'Your payment has been verified',
    'notification.time.2hours': '2 hours ago',
    'notification.time.1day': '1 day ago',
    
    // Quick Actions
    'quick.upload.documents': 'Upload Documents',
    'quick.view.announcement': 'View Announcement',
    'quick.download.guide': 'Download Guide',
    
    // Login Page
    'login.title': 'Doctor of Management Science Program Registration',
    'login.description': 'Join the Doctor of Management Science Program at Sekolah Tinggi Ilmu Ekonomi Mahardhika Surabaya to develop your managerial expertise with internationally standardized curriculum and experienced lecturers.',
    'login.accreditation': 'Excellent accreditation and global academic network',
    'login.signin.title': 'Sign In',
    'login.signin.subtitle': 'Enter your credentials to access your account',
    'login.email.label': 'Email Address',
    'login.email.placeholder': 'you@example.com',
    'login.password.label': 'Password',
    'login.password.placeholder': '••••••••',
    'login.remember': 'Remember me',
    'login.forgot': 'Forgot password?',
    'login.signin.button': 'Sign In',
    'login.no.account': 'Don\'t have an account?',
    'login.create.account': 'Create one now',
  },
  zh: {
    // Header
    'nav.home': '首页',
    'nav.profile': '专业简介',
    'nav.curriculum': '课程',
    'nav.cost': '费用',
    'nav.registration': '注册流程',
    'button.login': '登录',
    'button.register': '立即注册',
    'button.logout': '登出',
    
    // Hero Section
    'hero.title': '欢迎来到 STIE Mahardhika 博士项目',
    'hero.subtitle': '实现学术领导力和全球创新',
    'hero.description': '与富有远见的思想家一起，通过卓越的研究和可持续的合作，塑造经济和商业的未来。',
    'hero.cta': '现在注册',

    'cost.title': '学费',
    'cost.subtitle': 'STIE Mahardhika 博士项目 (S3)',
    'cost.schedule.title': '常规课程',
    'cost.schedule.description': '讲座于周五下午和周六举行。',
    'cost.details.title': '费用明细',
    'cost.details.item1': '注册费',
    'cost.details.item2': '预科费',
    'cost.details.item3': '每学期单一学费 (UKT)',
    'cost.cta': '现在注册',
    
    // Features
    'features.title': '为什么选择STIE Mahardhika？',
    'features.quality': '最佳教育质量',
    'features.quality.desc': '根据行业需求定制的课程',
    'features.faculty': '经验丰富的讲师',
    'features.faculty.desc': '各自领域的专家讲师',
    'features.facility': '完善的设施',
    'features.facility.desc': '支持学习的现代化设施',
    'features.career': '职业支持',
    'features.career.desc': '职业指导和就业安置',
    
    // Process Timeline
    'process.title': '注册流程',
    'process.step1': '在线注册',
    'process.step1.desc': '在线填写注册表格',
    'process.step2': '上传文件',
    'process.step2.desc': '上传所需文件',
    'process.step3': '验证',
    'process.step3.desc': '我们的团队将验证您的文件',
    'process.step4': '确认',
    'process.step4.desc': '接收注册确认',
    
    // Requirements
    'requirements.title': '注册要求',
    'requirements.academic': '学术要求',
    'requirements.academic.desc': '高中/同等学历毕业生',
    'requirements.documents': '所需文件',
    'requirements.documents.desc': '文凭、成绩单和身份证复印件',
    'requirements.photo': '护照照片',
    'requirements.photo.desc': '3x4护照照片，2张',
    'requirements.toefl': 'TOEFL/IELTS',
    'requirements.toefl.desc': '英语语言能力',
    'requirements.recommendation': '推荐信',
    'requirements.recommendation.desc': '学术推荐',
    'requirements.proposal': '论文提案',
    'requirements.proposal.desc': '研究计划',
    
    // Registration Steps
    'registration.title': '注册步骤',
    'registration.online': '在线注册',
    'registration.online.desc': '通过官方网站注册',
    'registration.payment': '付款',
    'registration.payment.desc': '支付注册费',
    'registration.test': '入学考试',
    'registration.test.desc': '按时间表参加入学考试',
    'registration.result': '公告',
    'registration.result.desc': '在网站上查看选拔结果',
    
    // Footer
    'footer.about': '关于我们',
    'footer.contact': '联系方式',
    'footer.address': '地址',
    'footer.phone': '电话',
    'footer.email': '邮箱',
    'footer.copyright': '© 2024 STIE Mahardhika. 版权所有.',
    
    // Language Selector
    'language.selector': '语言',
    'language.indonesian': 'Indonesia',
    'language.english': 'English',
    'language.chinese': '中文',
    
    // Dashboard Pendaftar
    'dashboard.welcome': '欢迎，{name}！',
    'dashboard.status.desc': '您的注册状态可以在下方监控。',
    'dashboard.status.title': '注册状态',
    'dashboard.notifications': '通知',
    'dashboard.quick.actions': '快速操作',
    'dashboard.access': '访问',
    'dashboard.tips': '💡 提示：',
    'dashboard.tips.desc': '确保在指定截止日期前上传所有文件，以避免验证过程延迟。',
    
    // Status Kelulusan
    'status.accepted.title': '🎉 恭喜！您已被录取',
    'status.accepted.desc': '您已被宣布通过STIE Mahardhika S3项目选拔',
    'status.accepted.view.detail': '查看详情',
    'status.accepted.download.letter': '下载信件',
    'status.rejected.title': '选拔结果公告',
    'status.rejected.desc': '抱歉，您在此次选拔中未成功。不要放弃！您可以在下一期再次尝试。',
    'status.rejected.view.feedback': '查看反馈',
    'status.rejected.registration.info': '注册信息',
    
    // Notifikasi
    'notification.toefl.warning': 'TOEFL文件不符合要求，请重新上传',
    'notification.payment.verified': '您的付款已通过验证',
    'notification.time.2hours': '2小时前',
    'notification.time.1day': '1天前',
    
    // Quick Actions
    'quick.upload.documents': '上传文件',
    'quick.view.announcement': '查看公告',
    'quick.download.guide': '下载指南',
    
    // Login Page
    'login.title': '管理学博士项目注册',
    'login.description': '加入STIE Mahardhika Surabaya管理学博士项目，通过国际标准化课程和经验丰富的讲师发展您的管理专业知识。',
    'login.accreditation': '优秀认证和全球学术网络',
    'login.signin.title': '登录',
    'login.signin.subtitle': '输入您的凭据以访问您的账户',
    'login.email.label': '电子邮件地址',
    'login.email.placeholder': 'you@example.com',
    'login.password.label': '密码',
    'login.password.placeholder': '••••••••',
    'login.remember': '记住我',
    'login.forgot': '忘记密码？',
    'login.signin.button': '登录',
    'login.no.account': '没有账户？',
    'login.create.account': '立即创建',
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('id');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['id', 'en', 'zh'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
