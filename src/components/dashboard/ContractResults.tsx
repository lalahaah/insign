'use client';

import { AnalysisResult, ToxicClause } from '@/types/contract';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    AlertTriangle,
    CheckCircle2,
    Info,
    ArrowRight,
    FileWarning,
    ShieldCheck,
    Zap,
    Scale,
    MessageSquareText,
    Download,
    Share2
} from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface ContractResultsProps {
    result: AnalysisResult;
    filename: string;
}

export function ContractResults({ result, filename }: ContractResultsProps) {
    const { overallScore, summary, toxicClauses, visaImpact } = result;

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-500';
        if (score >= 50) return 'text-yellow-500';
        return 'text-red-500';
    };

    const getSeverityBadge = (severity: 'high' | 'medium' | 'low') => {
        switch (severity) {
            case 'high':
                return <Badge variant="destructive" className="bg-red-500/10 text-red-500 border-red-500/20">고위험</Badge>;
            case 'medium':
                return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">주의</Badge>;
            case 'low':
                return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">보통</Badge>;
        }
    };

    const getVisaStatusBadge = (status: 'safe' | 'warning' | 'danger') => {
        switch (status) {
            case 'safe':
                return <Badge className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20">안전</Badge>;
            case 'warning':
                return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20">주의 요망</Badge>;
            case 'danger':
                return <Badge className="bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20">위험</Badge>;
        }
    };

    return (
        <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Quick Actions */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Scale className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{filename}</h1>
                        <p className="text-sm text-muted-foreground">분석 완료 • 2026.01.26</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Download className="w-4 h-4" /> PDF 저장
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Share2 className="w-4 h-4" /> 공유
                    </Button>
                </div>
            </div>

            {/* Score & Summary Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-8 flex flex-col items-center justify-center text-center border-primary/10 shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-10 -mt-10" />
                    <div className="relative mb-4">
                        <svg className="w-32 h-32 transform -rotate-90">
                            <circle
                                cx="64"
                                cy="64"
                                r="58"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                className="text-muted/20"
                            />
                            <circle
                                cx="64"
                                cy="64"
                                r="58"
                                stroke="currentColor"
                                strokeWidth="8"
                                strokeDasharray={364.4}
                                strokeDashoffset={364.4 * (1 - overallScore / 100)}
                                strokeLinecap="round"
                                fill="transparent"
                                className={getScoreColor(overallScore)}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}</span>
                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">신뢰도 점수</span>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">
                        {overallScore >= 80 ? '비교적 안전한 계약서입니다' : overallScore >= 50 ? '수정이 필요한 조항이 있습니다' : '매우 위험한 조항들이 포함되어 있습니다'}
                    </p>
                </Card>

                <Card className="md:col-span-2 p-8 border-primary/10 shadow-xl">
                    <div className="flex items-center gap-2 mb-4 text-primary font-semibold">
                        <Zap className="w-5 h-5" />
                        <h2>AI 분석 요약</h2>
                    </div>
                    <p className="text-lg leading-relaxed text-foreground">
                        {summary}
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-muted/30 border border-border">
                            <span className="text-xs text-muted-foreground block mb-1">발견된 독소 조항</span>
                            <span className="text-xl font-bold text-red-500">{toxicClauses.length}개</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-muted/30 border border-border text-left">
                            <span className="text-xs text-muted-foreground block mb-1">비자 영향도</span>
                            <div className="flex items-center gap-2">
                                <span className={`text-xl font-bold ${visaImpact.status === 'danger' ? 'text-red-500' : visaImpact.status === 'warning' ? 'text-yellow-500' : 'text-green-500'}`}>
                                    {visaImpact.status === 'danger' ? '위험' : visaImpact.status === 'warning' ? '주의' : '안전'}
                                </span>
                                {getVisaStatusBadge(visaImpact.status)}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Visa Impact Detail */}
            <Card className="p-8 border-primary/10 bg-gradient-to-r from-blue-500/5 to-primary/10 shadow-lg">
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl ${visaImpact.status === 'danger' ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                            Global Talent 비자 영향 분석
                            {getVisaStatusBadge(visaImpact.status)}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {visaImpact.reason_en}
                        </p>
                    </div>
                </div>
            </Card>

            {/* Toxic Clauses Detail */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-500 font-bold text-xl px-2">
                    <FileWarning className="w-6 h-6" />
                    <h2>발견된 핵심 독소 조항 ({toxicClauses.length})</h2>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {toxicClauses.map((clause, index) => (
                        <AccordionItem
                            key={clause.id}
                            value={`item-${index}`}
                            className="border border-primary/10 bg-card rounded-2xl px-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <AccordionTrigger className="hover:no-underline py-6">
                                <div className="flex items-center gap-4 text-left w-full">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${clause.severity === 'high' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
                                        }`}>
                                        <AlertTriangle className="w-5 h-5" />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-lg font-bold">{clause.title_ko}</span>
                                            {getSeverityBadge(clause.severity)}
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-1 italic">{clause.title_en}</p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pb-8 border-t border-border mt-2">
                                <div className="space-y-6">
                                    {/* Original Text */}
                                    <div className="p-4 bg-muted/50 rounded-xl border border-border">
                                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <Info className="w-3 h-3" /> 원문 조항
                                        </h4>
                                        <p className="text-sm font-mono text-foreground leading-relaxed">
                                            "{clause.original_text}"
                                        </p>
                                    </div>

                                    {/* AI Explanation */}
                                    <div>
                                        <h4 className="text-sm font-bold mb-2 flex items-center gap-2 text-primary">
                                            <Zap className="w-4 h-4" /> AI 가이드 (English)
                                        </h4>
                                        <p className="text-base text-muted-foreground leading-relaxed">
                                            {clause.explanation_en}
                                        </p>
                                    </div>

                                    {/* Negotiation Script */}
                                    {clause.negotiation_script_ko && (
                                        <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                                            <h4 className="text-sm font-bold mb-3 flex items-center gap-2 text-primary">
                                                <MessageSquareText className="w-4 h-4" /> 제안하는 수정안 및 협상 스크립트
                                            </h4>
                                            <p className="text-foreground italic leading-relaxed">
                                                "{clause.negotiation_script_ko}"
                                            </p>
                                        </div>
                                    )}

                                    {/* Standard Reference */}
                                    {clause.standard_reference && (
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            <span>표준 계약 준수 권고: {clause.standard_reference}</span>
                                        </div>
                                    )}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            {/* Bottom Actions */}
            <div className="pt-8 flex flex-col sm:flex-row gap-4">
                <Button className="flex-grow py-6 text-lg rounded-xl gap-2 shadow-lg shadow-primary/20">
                    <Zap className="w-5 h-5" /> 변호사 상담 연결하기
                </Button>
                <Button variant="outline" className="flex-grow py-6 text-lg rounded-xl">
                    다른 계약서 분석하기
                </Button>
            </div>
        </div>
    );
}
