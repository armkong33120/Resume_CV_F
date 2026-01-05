import ITReadinessMindmap from '@/components/ITReadinessMindmap';
import { useLanguage } from '@/components/LanguageContext';
import { getTranslation } from '@/lib/translations';

export default function ITManagerIPO() {
    const { language } = useLanguage();
    const t = getTranslation(language);

    const content = {
        title: {
            en: "IPO IT-Readiness Overview",
            th: "ภาพรวมความพร้อมด้านไอทีสำหรับการทำ IPO"
        },
        sectionTitle: {
            en: "Timeline & Governance",
            th: "ระยะเวลาและธรรมาภิบาล"
        },
        p1: {
            en: (
                <>
                    IPO IT-readiness typically takes <strong>6–12 months</strong> for a mid-sized company, assuming the core systems already exist.
                    The timeline is driven less by technology and more by governance, evidence, and organizational discipline.
                </>
            ),
            th: (
                <>
                    การเตรียมความพร้อมด้านไอทีสำหรับ IPO โดยทั่วไปใช้เวลา <strong>6–12 เดือน</strong> สำหรับบริษัทขนาดกลาง หากมีระบบหลักอยู่แล้ว
                    ระยะเวลาจะขึ้นอยู่กับเทคโนโลยีไม่มากเท่ากับธรรมาภิบาล หลักฐานอ้างอิง และวินัยขององค์กร
                </>
            )
        },
        p2: {
            en: (
                <>
                    Companies that already have structured access control, change management, and audit trails can compress this to <strong>3–6 months</strong>;
                    companies with ad-hoc operations should expect <strong>12–18 months</strong>.
                </>
            ),
            th: (
                <>
                    บริษัทที่มีระบบการควบคุมการเข้าถึง การจัดการการเปลี่ยนแปลง และ Audit Trails ที่เป็นระบบอยู่แล้ว สามารถลดเวลาเหลือ <strong>3–6 เดือน</strong>
                    ในขณะที่บริษัทที่มีการทำงานแบบไม่มีแบบแผนชัดเจน (Ad-hoc) ควรเผื่อเวลาไว้ที่ <strong>12–18 เดือน</strong>
                </>
            )
        }
    };

    return (
        <div className="mt-8 xs:mt-12 space-y-8 xs:space-y-12">
            <div className="space-y-4">
                <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    {content.title[language]}
                </h2>

                {/* Render the code-based mindmap */}
                <ITReadinessMindmap />
            </div>

            <div className="bg-foreground/5 rounded-lg p-6 xs:p-8 space-y-4 border border-border">
                <h3 className="text-lg font-semibold text-primary">{content.sectionTitle[language]}</h3>
                <p className="text-foreground/90 leading-relaxed text-sm sm:text-base">
                    {content.p1[language]}
                </p>
                <p className="text-foreground/90 leading-relaxed text-sm sm:text-base">
                    {content.p2[language]}
                </p>
            </div>
        </div>
    );
}
