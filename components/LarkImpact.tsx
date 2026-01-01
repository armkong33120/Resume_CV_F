'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Clock, CheckCircle, TrendingDown, DollarSign } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { getTranslation } from '@/lib/translations';

const LarkImpact = () => {
    const { language } = useLanguage();
    const t = getTranslation(language);
    const copy = t.lark?.impact;

    if (!copy) return null;

    // --- Data for Time Pie Charts ---
    // Safe access to nested segments in case of partial translation loading
    const segments = copy.time?.segments || {};

    const timeDataBefore = [
        { name: segments.actualWork || 'Actual Work', value: 60, color: '#f87171' }, // Red-400
        { name: segments.switching || 'Wasted Time', value: 25, color: '#94a3b8' }, // Slate-400
        { name: segments.meetings || 'Meetings', value: 15, color: '#fbbf24' }, // Amber-400
    ];

    const timeDataAfter = [
        { name: segments.efficiency || 'Actual Work (+)', value: 80, color: '#10b981' }, // Emerald-500
        { name: segments.admin || 'Admin', value: 5, color: '#3b82f6' }, // Blue-500
        { name: segments.meetings || 'Meetings', value: 15, color: '#fbbf24' }, // Amber-400
    ];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-bold" style={{ pointerEvents: 'none' }}>
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };


    return (
        <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 my-8">
            {/* --- Header --- */}
            <div className="mb-8 border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <TrendingDown className="w-6 h-6 text-emerald-600" />
                    {copy.title}
                </h2>
                <p className="text-slate-500 mt-1">
                    {copy.subtitle}
                </p>
            </div>

            <div className="space-y-12">

                {/* --- Section 1: Annual Cost Savings (Bar / Comparison) --- */}
                <div>
                    <h3 className="text-xl font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-emerald-500" />
                        {copy.cost.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-6">{copy.cost.description}</p>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-around gap-8 relative z-10">

                            {/* Cost Before */}
                            <div className="text-center">
                                <div className="text-sm text-slate-500 mb-1 uppercase font-bold tracking-wider">{copy.cost.beforeLabel}</div>
                                <div className="text-4xl font-black text-red-400">{copy.cost.beforeValue}</div>
                            </div>

                            {/* Arrow Indicator */}
                            <div className="hidden md:flex flex-col items-center">
                                <div className="h-[2px] w-24 bg-slate-300 relative">
                                    <div className="absolute right-0 -top-[5px] w-3 h-3 border-t-2 border-r-2 border-slate-300 rotate-45"></div>
                                </div>
                            </div>

                            {/* Cost After */}
                            <div className="text-center">
                                <div className="text-sm text-slate-500 mb-1 uppercase font-bold tracking-wider">{copy.cost.afterLabel}</div>
                                <div className="text-4xl font-black text-emerald-500">{copy.cost.afterValue}</div>
                            </div>
                        </div>

                        {/* Savings Badge */}
                        <div className="mt-8 text-center">
                            <span className="inline-block bg-emerald-100 text-emerald-800 text-md font-bold px-4 py-2 rounded-full border border-emerald-200 shadow-sm">
                                {copy.cost.savingsLabel}
                            </span>
                        </div>
                    </div>
                </div>

                {/* --- Section 2: Time Efficiency (Dual Pie Charts) --- */}
                <div>
                    <h3 className="text-xl font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-500" />
                        {copy.time.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-6">{copy.time.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* CHART: BEFORE */}
                        <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <h4 className="font-bold text-slate-600 mb-4">{copy.time.beforeTitle}</h4>
                            <div className="w-full h-64 relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={timeDataBefore}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={renderCustomizedLabel}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {timeDataBefore.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: any) => `${value}%`} />
                                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* CHART: AFTER */}
                        <div className="flex flex-col items-center p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                            <h4 className="font-bold text-emerald-700 mb-4">{copy.time.afterTitle}</h4>
                            <div className="w-full h-64 relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={timeDataAfter}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={renderCustomizedLabel}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {timeDataAfter.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: any) => `${value}%`} />
                                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                    </div>
                </div>

                {/* --- Section 3: Value Prop (Quality) --- */}
                <div className="bg-white border-t border-slate-100 pt-6 mt-4">
                    <div className="flex gap-4 items-start">
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600 mt-1">
                            <CheckCircle className="w-5 h-5" />
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
