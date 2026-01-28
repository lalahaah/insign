'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Loader2, CheckCircle2, Search, Zap, ShieldCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useLanguageStore } from '@/store/useLanguageStore';

export function AnalysisLoading() {
    const { t } = useLanguageStore();
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    const STEPS = [
        { id: 'parsing', label: t('dashboard.loading.steps.parsing'), icon: Search },
        { id: 'analyzing', label: t('dashboard.loading.steps.analyzing'), icon: Zap },
        { id: 'visa', label: t('dashboard.loading.steps.visa'), icon: ShieldCheck },
        { id: 'finalizing', label: t('dashboard.loading.steps.finalizing'), icon: CheckCircle2 },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + (100 / (STEPS.length * 30)); // 3초 정도씩 걸리게 조절
                if (next >= 100) {
                    clearInterval(interval);
                    return 100;
                }

                // 스텝 변경 로직
                const newStep = Math.floor((next / 100) * STEPS.length);
                if (newStep < STEPS.length && newStep !== currentStep) {
                    setCurrentStep(newStep);
                }

                return next;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [currentStep, STEPS.length]);

    return (
        <Card className="p-12 flex flex-col items-center text-center bg-card border-primary/20 shadow-2xl overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-full max-w-xl">
                <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-8 animate-pulse shadow-inner">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                </div>

                <h2 className="text-3xl font-bold mb-3 tracking-tight">{t('dashboard.loading.title')}</h2>
                <p className="text-muted-foreground mb-12 text-lg">
                    {t('dashboard.loading.subtitle')}
                </p>

                <div className="space-y-8 text-left max-w-md mx-auto mb-12">
                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep;

                        return (
                            <div
                                key={step.id}
                                className={`flex items-center gap-4 transition-all duration-500 ${isActive ? 'opacity-100 scale-105' : isCompleted ? 'opacity-60' : 'opacity-30'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${isActive ? 'border-primary bg-primary/10' : isCompleted ? 'border-green-500 bg-green-500/10' : 'border-muted'
                                    }`}>
                                    {isCompleted ? (
                                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                                    ) : (
                                        <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                                    )}
                                </div>
                                <span className={`font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {step.label}
                                </span>
                                {isActive && <Loader2 className="w-4 h-4 text-primary animate-spin ml-auto" />}
                            </div>
                        );
                    })}
                </div>

                <div className="space-y-2">
                    <Progress value={progress} className="h-2 bg-primary/10" />
                    <div className="flex justify-between text-xs font-medium text-muted-foreground">
                        <span>{t('dashboard.loading.progress')}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                </div>
            </div>

            <div className="mt-12 p-4 bg-primary/5 rounded-2xl border border-primary/10 inline-flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="text-sm text-primary font-medium">{t('dashboard.loading.security')}</span>
            </div>
        </Card>
    );
}
