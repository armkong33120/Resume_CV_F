'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface SalaryAuthContextType {
    isSalaryUnlocked: boolean;
    openUnlockModal: () => void;
    unlock: () => void;
}

const SalaryAuthContext = createContext<SalaryAuthContextType | undefined>(undefined);

export function useSalaryAuth() {
    const context = useContext(SalaryAuthContext);
    if (context === undefined) {
        throw new Error('useSalaryAuth must be used within a SalaryAuthProvider');
    }
    return context;
}

export function SalaryAuthProvider({ children }: { children: ReactNode }) {
    const [isSalaryUnlocked, setIsSalaryUnlocked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const { language } = useLanguage();

    const openUnlockModal = () => {
        if (!isSalaryUnlocked) {
            setIsModalOpen(true);
        }
    };

    const unlock = () => {
        setIsSalaryUnlocked(true);
        setIsModalOpen(false);
        setError(false);
        setPassword('');
    };

    const handleUnlock = async (e: React.FormEvent) => {
        e.preventDefault();

        // SHA-256 Hash of 'Armkong_1' (Same as PasswordGate)
        const TARGET_HASH = '423645577c19881473bc8b359e1b517c449e365111f2cfb779232bfa1a34d01e';

        try {
            const msgBuffer = new TextEncoder().encode(password.trim());
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

            if (hashHex === TARGET_HASH) {
                unlock();
            } else {
                setError(true);
            }
        } catch (err) {
            console.error("Hashing failed", err);
            setError(true);
        }
    };

    return (
        <SalaryAuthContext.Provider value={{ isSalaryUnlocked, openUnlockModal, unlock }}>
            {children}
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
                                    {language === 'th' ? 'ใส่รหัสเพื่อดูเงินเดือน' : 'Enter Password to View Salary'}
                                </h3>
                                <p className="text-sm text-foreground/60 text-center mt-1">
                                    {language === 'th'
                                        ? 'กรุณากรอกรหัสผ่านเพื่อแสดงข้อมูลเงินเดือนทั้งหมด'
                                        : 'Please enter password to reveal all salary information.'}
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
        </SalaryAuthContext.Provider>
    );
}
