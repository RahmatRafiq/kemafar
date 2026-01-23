/**
 * Content Configuration
 * Static content for homepage and about page
 */

// Type definitions
export interface HomeSettings {
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    description: string;
    primaryCTA: {
      text: string;
      link: string;
    };
    secondaryCTA: {
      text: string;
      link: string;
    };
    backgroundImage: string;
    stats: readonly {
      value: string;
      label: string;
    }[];
  };
  features: {
    title: string;
    description: string;
    items: readonly {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  cta: {
    title: string;
    description: string;
    primaryCTA: {
      text: string;
      link: string;
    };
    secondaryCTA: {
      text: string;
      phone: string;
    };
  };
}

export interface AboutSettings {
  story: string;
  mission: readonly string[];
  vision: string;
  values: readonly {
    title: string;
    description: string;
    icon?: string;
  }[];
  statistics?: {
    activeMembers: string;
    eventsPerYear: string;
    divisions: string;
    yearsActive: string;
  };
  timeline: readonly {
    year: string;
    title: string;
    description: string;
  }[];
  affiliations?: readonly {
    name: string;
    type: string;
    description: string;
  }[];
  certifications?: readonly {
    name: string;
    year: string;
  }[];
}

export const HOME_CONTENT = {
  hero: {
    badge: 'Organisasi Mahasiswa',
    title: 'Himpunan Mahasiswa Jurusan',
    titleHighlight: 'Farmasi',
    subtitle: 'UIN Alauddin Makassar',
    description:
      'Wadah aspirasi, kreativitas, dan pengembangan diri mahasiswa Farmasi UIN Alauddin Makassar',
    primaryCTA: {
      text: 'Kenali Kami',
      link: '/about',
    },
    secondaryCTA: {
      text: 'Lihat Program',
      link: '#features',
    },
    backgroundImage: '/images/hero-bg.jpg',
    stats: [
      { value: '150+', label: 'Anggota Aktif' },
      { value: '20+', label: 'Event / Tahun' },
      { value: '8', label: 'Divisi' },
    ],
  },
  features: {
    title: 'Program Kami',
    description: 'Berbagai program pengembangan untuk mahasiswa Farmasi yang profesional dan berintegritas',
    items: [
      {
        title: 'Keilmuan',
        description: 'Program pengembangan kompetensi akademik dan riset farmasi',
        icon: 'GraduationCap',
      },
      {
        title: 'Keprofesian',
        description: 'Pelatihan dan sertifikasi untuk persiapan dunia kerja',
        icon: 'Leaf',
      },
      {
        title: 'Kaderisasi',
        description: 'Pembinaan karakter dan leadership mahasiswa',
        icon: 'Users',
      },
      {
        title: 'Pengabdian',
        description: 'Kontribusi nyata untuk masyarakat dan lingkungan',
        icon: 'Heart',
      },
    ],
  },
  cta: {
    title: 'Bergabung Bersama Kami',
    description: 'Mari berkontribusi untuk kemajuan farmasi Indonesia',
    primaryCTA: {
      text: 'Hubungi Kami',
      link: '/contact',
    },
    secondaryCTA: {
      text: 'WhatsApp',
      phone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '628123456789',
    },
  },
} as const;

export const ABOUT_CONTENT = {
  story: 'Himpunan Mahasiswa Jurusan Farmasi (HMJF) UIN Alauddin Makassar adalah organisasi kemahasiswaan yang berperan sebagai wadah aspirasi, kreativitas, dan pengembangan diri mahasiswa Farmasi. Didirikan dengan semangat kekeluargaan dan profesionalisme, HMJF terus berkontribusi dalam mengembangkan potensi mahasiswa di bidang akademik, keprofesian, dan pengabdian masyarakat.',
  mission: [
    'Mewujudkan mahasiswa farmasi yang berilmu, berakhlak, dan profesional',
    'Mengembangkan potensi akademik dan non-akademik mahasiswa',
    'Membangun jaringan dan kerjasama dengan berbagai pihak',
    'Memberikan kontribusi nyata kepada masyarakat',
  ],
  vision:
    'Menjadi organisasi kemahasiswaan farmasi yang unggul, inovatif, dan berdaya saing',
  values: [
    {
      title: 'Integritas',
      description: 'Menjunjung tinggi kejujuran dan etika profesional',
      icon: 'BookOpen',
    },
    {
      title: 'Kolaborasi',
      description: 'Bekerjasama untuk mencapai tujuan bersama',
      icon: 'Users',
    },
    {
      title: 'Inovasi',
      description: 'Selalu berinovasi dalam setiap program dan kegiatan',
      icon: 'HeartHandshake',
    },
    {
      title: 'Dedikasi',
      description: 'Berkomitmen penuh terhadap pengembangan organisasi',
      icon: 'Briefcase',
    },
  ],
  statistics: {
    activeMembers: '150+',
    eventsPerYear: '20+',
    divisions: '8',
    yearsActive: '2015',
  },
  timeline: [
    {
      year: '2015',
      title: 'Pendirian HMJF',
      description: 'HMJF UIN Alauddin Makassar resmi didirikan sebagai wadah mahasiswa Farmasi',
    },
    {
      year: '2018',
      title: 'Pengembangan Program',
      description: 'Peluncuran program keilmuan dan keprofesian yang terstruktur',
    },
    {
      year: '2020',
      title: 'Adaptasi Digital',
      description: 'Transformasi digital dalam kegiatan organisasi di masa pandemi',
    },
    {
      year: '2024',
      title: 'Inovasi Berkelanjutan',
      description: 'Pengembangan program inovatif dan kolaborasi lintas institusi',
    },
  ],
  affiliations: [
    {
      name: 'Ikatan Senat Mahasiswa Farmasi Indonesia (ISMKI)',
      type: 'Nasional',
      description: 'Organisasi mahasiswa farmasi tingkat nasional',
    },
    {
      name: 'Ikatan Apoteker Indonesia (IAI)',
      type: 'Profesional',
      description: 'Organisasi profesi apoteker Indonesia',
    },
    {
      name: 'Fakultas Kedokteran dan Ilmu Kesehatan',
      type: 'Institusi',
      description: 'Fakultas induk di UIN Alauddin Makassar',
    },
  ],
  certifications: [
    {
      name: 'Akreditasi A BAN-PT',
      year: '2023',
    },
    {
      name: 'ISO 9001:2015',
      year: '2022',
    },
  ],
} as const;
