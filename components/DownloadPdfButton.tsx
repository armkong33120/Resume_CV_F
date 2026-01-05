"use client";

import { Download } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function DownloadPdfButton() {
    const { language } = useLanguage();

    const handleClick = () => {
        window.print();
    };

    return (
        <button
            onClick={handleClick}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background hover:bg-foreground/5 transition-colors text-sm font-medium print:hidden"
            aria-label="Download PDF"
        >
            <Download className="w-4 h-4" />
            <span>{language === "th" ? "ดาวน์โหลด PDF" : "Download PDF"}</span>
        </button>
    );
}
