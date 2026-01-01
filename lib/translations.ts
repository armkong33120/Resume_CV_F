export type Language = 'th' | 'en';

export const translations = {
  th: {
    nav: {
      home: 'หน้าแรก',
      work: 'ผลงาน',

      about: 'เกี่ยวกับ',
      experience: 'ประวัติการทำงาน',
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
      techStack: 'Next.js, Tailwind CSS, TypeScript',
      ide: 'IDE: Google Antigravity and VSCode [Verion Free]',
      by: 'โดย ธีรโชติ ฮ.',
      lastUpdated: 'อัปเดตล่าสุด: ธันวาคม 2025',
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
          title: 'ความคุ้มค่าด้านต้นทุน',
          description: 'ลดค่าใช้จ่ายรายปีได้ 20% จากการรวมเครื่องมือ',
          savings: 'ประหยัด',
          remaining: 'ค่าใช้จ่ายที่เหลือ',
        },
        time: {
          title: 'กระบวนการทำงานที่รวดเร็วขึ้น',
          description: 'ลดเวลาสลับหน้าจอทำงานได้ ~30% ทีมไม่ต้องเสียเวลาสลับไปมาระหว่างแอปที่แยกกัน แชท ปฏิทิน และเอกสารรวมอยู่ในที่เดียว',
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
      experience: 'Experience',
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
      techStack: 'Next.js, Tailwind CSS, TypeScript',
      ide: 'IDE: Google Antigravity and VSCode [Verion Free]',
      by: 'by Theerachot H.',
      lastUpdated: 'Last updated: December 2025',
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
          title: 'Cost Efficiency',
          description: '20% Reduction in annual subscription costs by consolidating tools.',
          savings: 'Savings',
          remaining: 'Remaining Spend',
        },
        time: {
          title: 'Accelerated Workflows',
          description: 'Reduced daily "context-switching" time by ~30%. Teams no longer waste time toggling between isolated apps; chat, calendar, and docs are unified.',
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

