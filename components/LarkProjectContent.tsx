
"use client";

import dynamic from "next/dynamic";

const LarkMigrationFlow = dynamic(() => import("./LarkMigrationFlow"), {
    ssr: false,
});
const LarkImpact = dynamic(() => import("./LarkImpact"), {
    ssr: false,
});

export default function LarkProjectContent() {
    return (
        <div className="mt-8 space-y-12">
            <LarkImpact />
            <LarkMigrationFlow />
        </div>
    );
}
