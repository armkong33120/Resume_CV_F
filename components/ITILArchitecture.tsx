import ZoomableImage from '@/components/ZoomableImage';

export default function ITILArchitecture() {
    return (
        <div className="mt-8 xs:mt-12 space-y-8 xs:space-y-12">
            <div className="space-y-4">
                <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    System Architecture & Workflow
                </h2>
                <div className="relative w-full aspect-[16/9] bg-gray-50 rounded-lg overflow-hidden border border-border">
                    <ZoomableImage
                        src="/images/projects/itil-ai-chat-architecture.png"
                        alt="ITIL AI Chat Architecture"
                        priority
                    />
                </div>
                <p className="text-sm text-muted-foreground text-center italic">
                    High-level architecture diagram demonstrating the data flow from triggers to executive reporting.
                </p>
            </div>

            <div className="space-y-8 text-foreground/90">
                <section>
                    <h3 className="text-lg font-semibold mb-4 text-primary">1) แถวบนสุด: Trigger → เตรียมข้อมูล → Label/DLP</h3>
                    <ul className="space-y-4 pl-4 list-none text-sm sm:text-base">
                        <li>
                            <strong className="block text-foreground">1. Microsoft OneDrive Trigger → Microsoft SharePoint Trigger</strong>
                            <span className="text-muted-foreground">ไฟล์/เหตุการณ์จาก OneDrive ถูกมองว่าอยู่ใน ecosystem เดียวกับ SharePoint (เริ่มงานด้วย trigger สาย Microsoft)</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">2. Microsoft SharePoint Trigger → Ingest & Cache (บนสุด)</strong>
                            <span className="text-muted-foreground">มีเหตุการณ์แล้ว → เข้าขั้น “เตรียมดึง/เตรียมแคช” (เช่น list ไฟล์, etag, ตรวจว่าเปลี่ยนจริงไหม)</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">3. Ingest & Cache (บนสุด) → Security Labels</strong>
                            <span className="text-muted-foreground">ดึง metadata ความปลอดภัย/label ของไฟล์หรือโฟลเดอร์ (เช่น Sensitivity Label, owner, site policy)</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">4. Microsoft SharePoint Trigger ↓ Normalize Data</strong>
                            <span className="text-muted-foreground">แชร์พอยต์ทริกเกอร์ลงมาสั่งให้ “Normalize Data” เริ่มทำงาน (เอาข้อมูลไปจัดมาตรฐาน)</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">5. Ingest & Cache (บนสุด) ↓ Normalize Data</strong>
                            <span className="text-muted-foreground">หลังเตรียม/ดึงไฟล์แล้ว ส่งลงมาให้ Normalize ทำความสะอาด/จัด schema</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">6. Security Labels ↓ (ลงเส้นกลาง) → DLP Policy Check</strong>
                            <span className="text-muted-foreground">label/ความลับของข้อมูลถูกส่งให้ DLP ใช้ประกอบการตัดสิน (จะ allow/redact/block)</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">7. Normalize Data → (เส้นแนวนอนยาว) → DLP Policy Check</strong>
                            <span className="text-muted-foreground">ข้อมูลที่ normalize แล้ว ถูกส่งไปให้ DLP ตรวจอีกชั้นก่อน “ไปสู่ทางออก” (รายงาน/LLM/ส่งออก)</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">8. ภายในกรอบ Sensitivity Labels: ลูกศรวนรอบ DLP Policy Check</strong>
                            <span className="text-muted-foreground">สื่อว่า DLP “อาศัย policy/label” และผลการตรวจจะย้อนกลับไปอยู่ภายใต้กรอบ governance เดิม (เหมือน feedback loop ของการตัดสินใจ/บันทึก policy decision)</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">9. DLP Policy Check ↓ (เส้นประลง) → Scheduled Executive</strong>
                            <span className="text-muted-foreground">ทุก report ที่จะ “ส่งออกให้ผู้บริหาร” ต้องอยู่ใต้ผล DLP (ผ่านแล้วถึงส่ง / ไม่ผ่านก็ redact หรือ block)</span>
                        </li>
                    </ul>
                </section>

                <div className="w-full h-px bg-border my-6" />

                <section>
                    <h3 className="text-lg font-semibold mb-4 text-primary">2) Workflow A (ซ้าย): ดึง CSV → ล้าง → เก็บ DB → ทำ audit</h3>
                    <ul className="space-y-4 pl-4 list-none text-sm sm:text-base">
                        <li>
                            <strong className="block text-foreground">10. Workflow A: Microsoft OneDrive Trigger → Get CSV File</strong>
                            <span className="text-muted-foreground">ทริกเกอร์ใน Workflow A เริ่ม → ไป “ดาวน์โหลด/อ่านไฟล์ CSV”</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">11. Get CSV File → Clean & Normalize</strong>
                            <span className="text-muted-foreground">เอา CSV ไปทำความสะอาด/normalize (ฟิลด์วันเวลา, status, priority ฯลฯ)</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">12. Clean & Normalize → Store in DB</strong>
                            <span className="text-muted-foreground">ข้อมูลที่สะอาดแล้วถูกเขียนลงฐานข้อมูล (เป็น single source of truth)</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">13. Store in DB → Audit Log Write</strong>
                            <span className="text-muted-foreground">เขียน log ทุกครั้งที่ ingest/store สำเร็จ/ล้มเหลว (สำคัญสำหรับ audit)</span>
                        </li>
                    </ul>

                    <h4 className="font-medium mt-6 mb-3">แตกกิ่ง (สำคัญ): ใน Workflow A มี “ท่อแยก” ออกไปอีก 3 ทาง</h4>
                    <ul className="space-y-4 pl-4 list-none text-sm sm:text-base">
                        <li>
                            <strong className="block text-foreground">14. Microsoft OneDrive Trigger (ใน Workflow A) → Execute Workflow</strong>
                            <span className="text-muted-foreground">แทนที่จะรอจบทั้งชุดก่อน บางทีทริกเกอร์สั่งให้ “ชุดทำ index/summary” เริ่มได้เลย</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">15. Get CSV File → Aggregate & Summarize</strong>
                            <span className="text-muted-foreground">เอาข้อมูลดิบไปคำนวณ KPI/สรุปทันที (นับจำนวน, trend, MTTR ฯลฯ)</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">16. Clean & Normalize → ITIL Type Router</strong>
                            <span className="text-muted-foreground">ข้อมูลที่จัดรูปแล้วถูกส่งไป “แยกประเภทตาม ITIL” (Incident/Problem/Change/Event/SR/SLA/Availability)</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">17. (ลูกศรโค้งจากฝั่งขวาเข้าหา) Store in DB</strong>
                            <span className="text-muted-foreground">นี่เป็น “เส้นย้อนกลับเพื่อเขียนผลลัพธ์กลับ DB” (เช่น เก็บผลสรุป, เก็บ tag/label ที่คำนวณ, เก็บ chart series หรือ rollup) — ภาพนี้สื่อว่ามี data pipeline อีกรอบที่กลับมา update ฐานข้อมูลได้</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">18. Audit Log Write ↓ Local LLM Web Chatbot with NN</strong>
                            <span className="text-muted-foreground">หลังทำงานบางส่วน จะมีการส่ง context/เหตุการณ์ไปยังฝั่ง chatbot/LLM side (เช่น ให้ chatbot รู้ว่าข้อมูลอัปเดตแล้ว หรือให้กระบวนการตอบใช้ข้อมูลล่าสุด)</span>
                        </li>
                    </ul>
                </section>

                <div className="w-full h-px bg-border my-6" />

                <section>
                    <h3 className="text-lg font-semibold mb-4 text-primary">3) Index & Cache (กลาง): สรุป → ทำ Embedding → เก็บ Vector Index</h3>
                    <ul className="space-y-4 pl-4 list-none text-sm sm:text-base">
                        <li>
                            <strong className="block text-foreground">19. Execute Workflow ↓ Aggregate & Summarize</strong>
                            <span className="text-muted-foreground">ตัว “Execute Workflow” เป็นตัวสั่งให้ชุดคำนวณสรุปเริ่มทำ</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">20. Aggregate & Summarize → Vector Index (Embed)</strong>
                            <span className="text-muted-foreground">สรุป/เอกสารที่เหมาะกับการค้นหา ส่งไปทำ embedding เพื่อเอาไปใช้แบบ RAG</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">21. Execute Workflow ↷ Vector Index (Embed) (เส้นโค้งเข้ากล่อง Embed)</strong>
                            <span className="text-muted-foreground">ทางลัด: บางรอบสั่ง embed ได้เลย (เช่น rebuild index) โดยไม่ต้องรัน aggregate ใหม่ทั้งหมด</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">22. Vector Index (Embed) → Vector Index (Store)</strong>
                            <span className="text-muted-foreground">embedding ที่ได้ถูกเก็บลงคลังเวกเตอร์ (vector DB/index)</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">23. Vector Index (Store) ↓ (ลูกศรลง)</strong>
                            <span className="text-muted-foreground">สื่อว่า “คลังเวกเตอร์พร้อมให้ส่วนอื่น ๆ หยิบไปใช้” (เช่น Retrieve/ทำกราฟ/ทำรายงาน)</span>
                        </li>
                    </ul>
                </section>

                <div className="w-full h-px bg-border my-6" />

                <section>
                    <h3 className="text-lg font-semibold mb-4 text-primary">4) ITIL Type Router → Chart Builder (กลางล่าง): แยกประเภท → สร้างกราฟ</h3>
                    <ul className="space-y-4 pl-4 list-none text-sm sm:text-base">
                        <li>
                            <strong className="block text-foreground">24. Clean & Normalize → ITIL Type Router (ย้ำอีกครั้ง เพราะนี่คือท่อหลักของการจำแนก)</strong>
                            <span className="text-muted-foreground">ข้อมูลเข้ามาแล้วแยกเป็น Incident/Problem/Change/Event/SR/SLA/Availability</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">25. ITIL Type Router → Chart Builder</strong>
                            <span className="text-muted-foreground">พอรู้ประเภทแล้ว ส่งต่อไปสร้าง “ข้อมูลกราฟ” ให้เหมาะกับคำถามผู้บริหาร (trend, breakdown, top services ฯลฯ)</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">26. Chart Builder → Retrieve (ใน Scheduled Executive)</strong>
                            <span className="text-muted-foreground">ชุดรายงาน/การดึงข้อมูลสามารถดึง “กราฟที่เตรียมไว้” ไปประกอบรายงาน/คำตอบได้</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">27. ITIL Type Router ↓ AuthZ Gate</strong>
                            <span className="text-muted-foreground">ประเภทงาน/ขอบเขตข้อมูลที่กำลังจะถูกถาม/ถูกใช้ ถูกส่งลงไปเป็น “บริบทให้ด่านสิทธิ์” (เช่น VP กลุ่มไหนเห็น Incident แค่บริการไหน)</span>
                        </li>
                    </ul>
                </section>

                <div className="w-full h-px bg-border my-6" />

                <section>
                    <h3 className="text-lg font-semibold mb-4 text-primary">5) Chat Security Path (ล่างกลาง): AuthZ → Label Gate → Audit/SIEM</h3>
                    <ul className="space-y-4 pl-4 list-none text-sm sm:text-base">
                        <li>
                            <strong className="block text-foreground">28. (เส้นเข้าจากซ้าย) → AuthZ Gate</strong>
                            <span className="text-muted-foreground">ทุกคำถาม/ทุก request เข้าด่านตรวจสิทธิ์ก่อน (role/group)</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">29. AuthZ Gate ↓ (ลง) → Auth API key (กล่องเล็ก)</strong>
                            <span className="text-muted-foreground">เป็นขั้นยืนยัน token/คีย์/SSO artifact (ภาพนี้สื่อว่ามีการตรวจ credential/หลักฐานสิทธิ์ก่อนเข้าข้อมูลจริง)</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">30. Auth API key → Sensitivity Label Gate</strong>
                            <span className="text-muted-foreground">ผ่านสิทธิ์แล้ว ยังต้องผ่านด่าน “ตาม label” (ข้อมูลลับทำอะไรได้บ้าง: allow/redact/block)</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">31. Sensitivity Label Gate → SIEM Forwarder</strong>
                            <span className="text-muted-foreground">เหตุการณ์เชิงความปลอดภัย (policy decision, violation, suspicious access) ถูกส่งไปตัว forward เพื่อเข้า SIEM</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">32. Sensitivity Label Gate ↓ AUDIT LOG</strong>
                            <span className="text-muted-foreground">ทุกครั้งที่ตัดสินใจตาม label ต้องลง audit log (นี่คือหลักฐานสำคัญสุดเวลาถูกตรวจ)</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">33. Local LLM Web Chatbot with NN → AUDIT LOG</strong>
                            <span className="text-muted-foreground">ฝั่งแชท/LLM ก็เขียน audit log ด้วย (ใครถาม, แตะ dataset อะไร, ใช้ label ระดับไหน)</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">34. AUDIT LOG → Splunk/Sentinel</strong>
                            <span className="text-muted-foreground">audit log ถูกรวมศูนย์/ส่งต่อให้ระบบ log กลางขององค์กร (Splunk หรือ Microsoft Sentinel)</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">35. SIEM Forwarder ↔ SIEM → Splunk/Sentinel (เส้นประและลูกศรในโซนนี้)</strong>
                            <span className="text-muted-foreground">ภาพนี้สื่อว่า forwarder ป้อน event เข้าชุด SIEM pipeline และท้ายสุดไปลง Splunk/Sentinel เพื่อทำ correlation/alert</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">36. Splunk/Sentinel → Local LLM (server icon)</strong>
                            <span className="text-muted-foreground">เส้นนี้สื่อ “การผูก observability/alerting กับระบบที่รัน LLM” (เช่น monitor, detect anomaly, หรือแจ้งเตือนถ้า LLM ถูกเรียกผิดปกติ)</span>
                        </li>
                    </ul>
                </section>

                <div className="w-full h-px bg-border my-6" />

                <section>
                    <h3 className="text-lg font-semibold mb-4 text-primary">6) Scheduled Executive (ขวา): ตั้งเวลา → ดึง KPI → Retrieve → ส่งออก (ภายใต้ DLP)</h3>
                    <ul className="space-y-4 pl-4 list-none text-sm sm:text-base">
                        <li>
                            <strong className="block text-foreground">37. (เส้นเข้าจากซ้าย) → Scheduled Executive</strong>
                            <span className="text-muted-foreground">ชุดรายงานรับ input/context จากระบบด้านซ้าย (cache/index/db)</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">38. Timer Trigger → Fetch Time Period KPIs</strong>
                            <span className="text-muted-foreground">ถึงเวลา (รายสัปดาห์/เดือน/ปี) → ไปดึง KPI ตามช่วงเวลา</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">39. Fetch Time Period KPIs ↓ → Retrieve</strong>
                            <span className="text-muted-foreground">KPI อย่างเดียวไม่พอ ต้อง retrieve รายละเอียดประกอบ/เหตุผล/หลักฐานจาก DB/Vector index</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">40. Retrieve → Send</strong>
                            <span className="text-muted-foreground">ได้ข้อมูลครบแล้ว ส่งรายงาน/ส่งข้อความ (อีเมล/Teams/ไฟล์/หน้า dashboard)</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">41. Fetch Time Period KPIs → (เส้นเชื่อมภายใน) → Send</strong>
                            <span className="text-muted-foreground">ภาพนี้สื่อว่า “บางรายงานส่ง KPI ได้ตรง” (เช่น ตาราง/ตัวเลข) โดยไม่ต้อง retrieve เชิงลึกทุกครั้ง</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">42. Send ↓ (ลง) → ไอคอนโล่/DB (secure store)</strong>
                            <span className="text-muted-foreground">หลังส่งแล้ว เก็บสำเนารายงานไว้ในที่ปลอดภัย (หรือเก็บหลักฐานว่าได้ส่งอะไรไป)</span>
                        </li>
                        <li>
                            <strong className="block text-foreground">43. Local LLM (เส้นประใต้ Retrieve) → SIEM</strong>
                            <span className="text-muted-foreground">ทุกครั้งที่เรียก LLM เพื่อเรียบเรียงภาษาผู้บริหาร มี telemetry/audit ส่งเข้า SIEM ด้วย</span>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
