"use client";

import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface PasswordGateProps {
    children: ReactNode;
    placeholder?: ReactNode;
}

export default function PasswordGate({ children, placeholder }: PasswordGateProps) {
    const { language } = useLanguage();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        const correctPassword = process.env.NEXT_PUBLIC_ACCESS_PASSWORD;
        if (password === correctPassword) {
            setIsAuthenticated(true);
            setIsModalOpen(false);
            setError(false);
            setPassword('');
        } else {
            setError(true);
        }
    };

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <>
            <div
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors group"
                role="button"
                tabIndex={0}
                aria-label="Click to unlock content"
            >
                {placeholder || (
                    <span className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                        <Lock className="w-3.5 h-3.5" />
                        <span className="text-sm font-medium tracking-wide">
                            {language === 'th' ? 'ข้อมูลถูกล็อค' : 'Locked'}
                        </span>
                    </span>
                )}
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-sm bg-card border border-border shadow-xl rounded-xl p-6 overflow-hidden"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute right-4 top-4 text-foreground/50 hover:text-foreground transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col items-center mb-6">
                                <div className="p-3 bg-primary/10 rounded-full mb-4 text-primary">
                                    <Lock className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground">
                                    {language === 'th' ? 'ใส่รหัสเพื่อเข้าถึง' : 'Enter Password to Access'}
                                </h3>
                                <p className="text-sm text-foreground/60 text-center mt-1">
                                    {language === 'th'
                                        ? 'เนื้อหานี้ถูกจำกัดการเข้าถึงเฉพาะผู้ที่ได้รับอนุญาต'
                                        : 'This content is restricted to authorized users.'}
                                </p>
                            </div>

                            <form onSubmit={handleUnlock} className="space-y-4">
                                <div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setError(false);
                                        }}
                                        className={`w-full px-4 py-2 rounded-lg bg-background border ${error ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'
                                            } focus:outline-none focus:ring-2 transition-all placeholder:text-muted-foreground/50`}
                                        placeholder={language === 'th' ? 'กรอกรหัสผ่าน...' : 'Enter password...'}
                                        autoFocus
                                    />
                                    {error && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-xs text-red-500 mt-1.5 ml-1 font-medium"
                                        >
                                            {language === 'th' ? 'รหัสผ่านไม่ถูกต้อง' : 'Incorrect password'}
                                        </motion.p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-2.5 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity active:scale-[0.98]"
                                >
                                    {language === 'th' ? 'ยืนยัน' : 'Unlock'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
