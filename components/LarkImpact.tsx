'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Clock, CheckCircle, TrendingDown, DollarSign } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { getTranslation } from '@/lib/translations';

const LarkImpact = () => {
    const { language } = useLanguage();
    const t = getTranslation(language); // This might need type assertion if keys are not inferred instantly, but usually fine
    // Access nested keys safely or ensure type definition in translations.ts allows it
    const copy = t.lark?.impact;

    // Fallback or loading state if undefined (though it shouldn't be with the setup)
    if (!copy) return null;

    const costData = [
        { name: copy.cost.savings, value: 20, color: '#10b981' }, // emerald-500
        { name: copy.cost.remaining, value: 80, color: '#e2e8f0' }, // slate-200
    ];

    const RADIAN = Math.PI / 180;

    return (
        <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 my-8">
            {/* --- Top Section: Header --- */}
            <div className="mb-8 border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <TrendingDown className="w-6 h-6 text-emerald-600" />
                    {copy.title}
                </h2>
                <p className="text-slate-500 mt-1">
                    {copy.subtitle}
                </p>
            </div>

            {/* --- Middle Section: Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                {/* --- Left Column: Cost Pie Chart --- */}
                <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-100 h-full min-h-[300px]">
                    <h3 className="text-lg font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-emerald-500" />
                        {copy.cost.title}
                    </h3>
                    <div className="text-sm text-slate-500 mb-4 text-center">
                        {copy.cost.description}
                    </div>

                    <div className="w-full h-64 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={costData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    labelLine={false}
                                >
                                    {costData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value: any) => `${value}%`} />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                            <span className="text-3xl font-black text-emerald-600">-20%</span>
                            <span className="text-xs text-slate-400 font-bold uppercase">{copy.cost.savings}</span>
                        </div>
                    </div>
                </div>

                {/* --- Right Column: Impact Cards --- */}
                <div className="flex flex-col gap-4 h-full">

                    {/* Time Efficiency Card */}
                    <div className="flex-1 bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
                        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 text-lg mb-1">{copy.time.title}</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {copy.time.description}
                            </p>
                        </div>
                    </div>

                    {/* Quality Card */}
                    <div className="flex-1 bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
                        <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 text-lg mb-1">{copy.quality.title}</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {copy.quality.description}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LarkImpact;
