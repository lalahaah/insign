'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Loader2, CheckCircle2, Search, Zap, ShieldCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const STEPS = [
    { id: 'parsing', label: '계약서 텍스트 추출 중...', icon: Search },
    { id: 'analyzing', label: 'AI 독소 조항 분석 중...', icon: Zap },
    { id: 'visa', label: '비자 및 체류 자격 영향 검토 중...', icon: ShieldCheck },
    { id: 'finalizing', label: '분석 리포트 생성 중...', icon: CheckCircle2 },
];

export function AnalysisLoading() {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

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
    }, [currentStep]);

    return (
        <Card className="p-12 flex flex-col items-center text-center bg-card border-primary/20 shadow-2xl overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-full max-w-xl">
                <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-8 animate-pulse shadow-inner">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                </div>

                <h2 className="text-3xl font-bold mb-3 tracking-tight">AI 분석이 진행 중입니다</h2>
                <p className="text-muted-foreground mb-12 text-lg">
                    고차원 AI가 당신의 계약서를 한 줄씩 꼼꼼하게 검토하고 있습니다.
                    <br />잠시만 기다려 주세요.
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
                        <span>분석 진행도</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                </div>
            </div>

            <div className="mt-12 p-4 bg-primary/5 rounded-2xl border border-primary/10 inline-flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="text-sm text-primary font-medium">당신의 데이터는 안전하게 암호화되어 처리됩니다.</span>
            </div>
        </Card>
    );
}
