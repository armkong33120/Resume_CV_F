export type Language = 'th' | 'en';

export const translations = {
  th: {
    nav: {
      home: 'หน้าแรก',
      work: 'ผลงาน',

      about: 'เกี่ยวกับ',
      experience: 'ประสบการณ์ทำงาน',
      resume: 'ประวัติย่อ',
      contact: 'ติดต่อ',

    },
    home: {
      viewWork: 'ดูผลงาน',
      getInTouch: 'ติดต่อ',
      documents: 'เอกสารสำหรับ HR',
      featuredWork: 'ผลงานเด่น',
      featuredDescription: 'คอลเลกชันของโปรเจกต์ที่ครอบคลุมการออกแบบ วิศวกรรม และการพัฒนาผลิตภัณฑ์',
      viewAllProjects: 'ดูผลงานทั้งหมด',
    },
    work: {
      title: 'ผลงาน',
      description: 'คอลเลกชันของโปรเจกต์ที่ครอบคลุมการออกแบบ วิศวกรรม และการพัฒนาผลิตภัณฑ์',
      searchPlaceholder: 'ค้นหาโปรเจกต์...',
      allTechnologies: 'เทคโนโลยีทั้งหมด',
      loading: 'กำลังโหลดโปรเจกต์...',
      noProjects: 'ไม่พบโปรเจกต์',
      year: 'ปี',
      role: 'บทบาท',
      problem: 'ปัญหา',
      approach: 'วิธีการแก้ไข',
      results: 'ผลลัพธ์',
      gallery: 'รูปภาพ',
      backToWork: 'กลับไปหน้าผลงาน',
    },
    about: {
      title: 'เกี่ยวกับ',
      overview: 'ภาพรวม',
      skills: 'ทักษะ',
      connect: 'ติดต่อ',
    },
    contact: {
      title: 'ติดต่อ',
      description: 'ยินดีเข้ารับการคัดเลือกและสามารถเริ่มงานได้ทันทีหลังทราบผลสัมภาษณ์',
      line: 'LINE',
      phone: 'เบอร์โทรศัพท์',
      email: 'อีเมล',
      birthday: 'วันเกิด',
      address: 'ที่อยู่',
      location: 'ที่ตั้ง',
      otherChannels: 'หรือติดต่อผ่านช่องทางอื่น',
    },
    footer: {
      rights: 'สงวนลิขสิทธิ์',
      builtWith: 'สร้างด้วย',
      techStack: 'Next.js , Tailwind CSS, and TypeScript',
      ide: 'IDE : Google Antigravity , Vercel is Deploy and CDN [Using 100% free cost tools]',
      by: 'โดย ธีรโชติ ฮ.',
      lastUpdated: 'อัปเดตล่าสุด: 2 มกราคม 2026',
    },
    notFound: {
      title: '404',
      heading: 'ไม่พบหน้า',
      description: 'หน้าที่คุณกำลังมองหาไม่มีอยู่หรือถูกย้ายแล้ว',
      goHome: 'กลับหน้าแรก',
    },
    lark: {
      impact: {
        title: 'บทสรุปสำหรับผู้บริหาร',
        subtitle: 'ผลลัพธ์ที่เป็นตัวเลขด้านต้นทุน ความเร็ว และคุณภาพจากการย้ายระบบ',
        cost: {
          title: 'ความคุ้มค่าด้านต้นทุน (บาท/ปี)',
          description: 'ลดค่าใช้จ่ายรายปีได้ ~2.8 ล้านบาท จากการรวมเครื่องมือ',
          beforeLabel: 'ค่าใช้จ่ายก่อนหน้า',
          afterLabel: 'ค่าใช้จ่ายปัจจุบัน',
          beforeValue: '4.2 ล้าน',
          afterValue: '1.4 ล้าน',
          savingsLabel: 'ประหยัดได้ 2.8 ล้านบาท / ปี',
        },
        time: {
          title: 'ประสิทธิภาพเวลาการทำงาน (ต่อวัน)',
          description: 'พนักงานมีเวลาโฟกัสงานเพิ่มขึ้น 20-25% ต่อวัน ลดเวลาสูญเปล่าจากการสลับแอพ',
          beforeTitle: 'ก่อนหน้า (Before)',
          afterTitle: 'หลังจากใช้ Lark (After)',
          segments: {
            actualWork: 'งานจริง',
            switching: 'เสียเวลาสลับแอพ',
            meetings: 'ประชุม',
            admin: 'จัดการระบบ',
            efficiency: 'งานจริง (เพิ่มขึ้น)',
          }
        },
        quality: {
          title: 'ความสมบูรณ์ของข้อมูล',
          description: 'สร้าง "แหล่งข้อมูลเดียวที่เชื่อถือได้" ลดความผิดพลาดจากไฟล์หลายเวอร์ชัน และการสื่อสารที่ตกหล่น ทำให้ทีมทำงานไปในทิศทางเดียวกัน 100%',
        },
      },
    },
  },
  en: {
    nav: {
      home: 'Home',
      work: 'Work',

      about: 'About',
      experience: 'Curriculum Vitae',
      resume: 'Resume',
      contact: 'Contact',

    },
    home: {
      viewWork: 'View Work',
      getInTouch: 'Get in Touch',
      documents: 'Documents for HR',
      featuredWork: 'Featured Work',
      featuredDescription: 'A selection of projects that showcase design thinking and technical execution',
      viewAllProjects: 'View All Projects',
    },
    work: {
      title: 'Work',
      description: 'A collection of projects spanning design, engineering, and product development',
      searchPlaceholder: 'Search projects...',
      allTechnologies: 'All Technologies',
      loading: 'Loading projects...',
      noProjects: 'No projects found',
      year: 'Year',
      role: 'Role',
      problem: 'Problem',
      approach: 'Approach',
      results: 'Results',
      gallery: 'Gallery',
      backToWork: 'Back to Work',
    },
    about: {
      title: 'About',
      overview: 'Overview',
      skills: 'Skills',
      connect: 'Connect',
    },
    contact: {
      title: 'Contact',
      description: 'Open to opportunities and available to start immediately upon successful interview',
      line: 'LINE',
      phone: 'Phone',
      email: 'Email',
      birthday: 'Birthday',
      address: 'Address',
      location: 'Location',
      otherChannels: 'Or contact through other channels',
    },
    footer: {
      rights: 'All rights reserved',
      builtWith: 'Built with',
      techStack: 'Next.js , Tailwind CSS, and TypeScript',
      ide: 'IDE : Google Antigravity , Vercel is Deploy and CDN [Using 100% free cost tools]',
      by: 'by Theerachot H.',
      lastUpdated: 'Last updated: 2 January 2026',
    },
    notFound: {
      title: '404',
      heading: 'Page Not Found',
      description: 'The page you\'re looking for doesn\'t exist or has been moved',
      goHome: 'Go Home',
    },
    lark: {
      impact: {
        title: 'Executive Impact Summary',
        subtitle: 'Quantifiable benefits in Cost, Speed, and Quality driven by the migration.',
        cost: {
          title: 'Annual Cost Savings (THB)',
          description: 'Saved ~2.8 MB/Year by consolidating tools.',
          beforeLabel: 'Cost Before',
          afterLabel: 'Cost After',
          beforeValue: '4.2 MB',
          afterValue: '1.4 MB',
          savingsLabel: 'Savings: 2.8 MB / Year',
        },
        time: {
          title: 'Work Day Efficiency (Per Day)',
          description: 'Employees gained 20-25% more focus time per day by reducing context switching.',
          beforeTitle: 'Before',
          afterTitle: 'After (with Lark)',
          segments: {
            actualWork: 'Actual Work',
            switching: 'Wasted Time (Switching)',
            meetings: 'Meetings',
            admin: 'System Admin',
            efficiency: 'Actual Work (Efficiency Gain)',
          }
        },
        quality: {
          title: 'Enhanced Data Integrity',
          description: 'Established a "Single Source of Truth". Eliminated file versioning errors and communication silos, ensuring 100% alignment across cross-functional teams.',
        },
      },
    },
  },
} as const;

export function getTranslation(lang: Language) {
  return translations[lang];
}

