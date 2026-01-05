import Image from 'next/image';

export default function ITManagerIPO() {
    return (
        <div className="mt-8 xs:mt-12 space-y-8 xs:space-y-12">
            <div className="space-y-4">
                <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    IPO IT-Readiness Overview
                </h2>
                <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] bg-white rounded-lg overflow-hidden border border-border shadow-sm">
                    <Image
                        src="/images/projects/it-manager-ipo-readiness.png"
                        alt="IT Management Overview & IPO Readiness"
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 768px) 100vw, 90vw"
                        quality={100}
                        priority
                    />
                </div>
            </div>

            <div className="bg-foreground/5 rounded-lg p-6 xs:p-8 space-y-4 border border-border">
                <h3 className="text-lg font-semibold text-primary">Timeline & Governance</h3>
                <p className="text-foreground/90 leading-relaxed text-sm sm:text-base">
                    IPO IT-readiness typically takes <strong>6–12 months</strong> for a mid-sized company, assuming the core systems already exist.
                    The timeline is driven less by technology and more by governance, evidence, and organizational discipline.
                </p>
                <p className="text-foreground/90 leading-relaxed text-sm sm:text-base">
                    Companies that already have structured access control, change management, and audit trails can compress this to <strong>3–6 months</strong>;
                    companies with ad-hoc operations should expect <strong>12–18 months</strong>.
                </p>
            </div>
        </div>
    );
}
