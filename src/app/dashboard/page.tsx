'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { signInWithGoogle, signInAnonymously } from '@/lib/firebase/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, LogOut, LayoutDashboard, History, Settings } from 'lucide-react';
import { ContractUpload } from '@/components/dashboard/ContractUpload';
import { AnalysisLoading } from '@/components/dashboard/AnalysisLoading';
import { ContractResults } from '@/components/dashboard/ContractResults';
import { uploadContractFile } from '@/lib/firebase/storage';
import { AnalysisResult } from '@/types/contract';
import { toast } from 'sonner';

import { useLanguageStore } from '@/store/useLanguageStore';

// Mock 분석 결과 데이터
const MOCK_RESULT: AnalysisResult = {
    overallScore: 68,
    summary: "본 계약서는 전반적으로 표준 계약 형식을 따르고 있으나, '수익 배분' 및 '저작권 귀속' 조항에서 아티스트에게 불리하게 작용할 수 있는 독소 조항이 발견되었습니다. 특히 해외 활동 시 발생하는 비용 청구 범위가 불분명하여 정산 과정에서 갈등이 발생할 소지가 있습니다. 비자 유지 조건과 관련해서는 활동 기간의 최소 보장 조항이 부족하여 주의가 필요합니다.",
    visaImpact: {
        status: 'warning',
        reason_en: "The contract lacks a clear minimum hour guarantee for performance-based activities. Under South Korea's E-6-1 visa regulations, if your activity hours fall below a certain threshold without justification, it could complicate your visa extension or lead to a warning from immigration authorities."
    },
    toxicClauses: [
        {
            id: 1,
            title_ko: "불공정한 수익 배분 비율",
            title_en: "Unfair Revenue Distribution Ratio",
            severity: 'high',
            original_text: "회사는 해외 수익에 대하여 총 매출의 80%를 취득하며, 아티스트는 제반 비용을 제외한 순수익의 20%를 배분받는다.",
            explanation_en: "A 20% net profit share is significantly lower than the industry standard (usually 40-60% for established artists). Furthermore, allowing the company to take 80% of 'gross revenue' while paying you from 'net profit' means you bear all the financial risk of expenses.",
            negotiation_script_ko: "해외 수익 배분 비율을 총 매출 기준 7:3 또는 순수익 기준 5:5로 조정을 요청합니다. 또한 공제되는 '제반 비용'의 항목을 명확히 명시해 주세요.",
            isFreeSample: false
        },
        {
            id: 2,
            title_ko: "포괄적 저작권 양도",
            title_en: "Comprehensive Copyright Assignment",
            severity: 'high',
            original_text: "본 계약 기간 중 아티스트가 창작한 모든 결과물의 저작권 및 2차적 저작물 작성권은 회사에 영구적으로 귀속된다.",
            explanation_en: "Perpetual assignment of all copyrights is a 'toxic clause'. In Korea, standard contracts recommend that copyrights remain with the creator or be assigned only for the duration of the contract plus a reasonable period.",
            negotiation_script_ko: "저작권 귀속 기간을 계약 기간으로 한정하거나, 계약 종료 후 아티스트에게 권리가 반환되는 조항을 추가해야 합니다.",
            isFreeSample: false
        },
        {
            id: 3,
            title_ko: "과도한 위약금 설정",
            title_en: "Excessive Penalty for Breach",
            severity: 'medium',
            original_text: "아티스트가 일방적으로 계약을 해지할 경우, 아티스트는 회사에 총 투자 비용의 3배를 배상해야 한다.",
            explanation_en: "The standard penalty in Entertainment contracts is usually based on the average monthly profit or actual proven damages. A '3x total investment' penalty is often deemed invalid by Korean courts as it's excessively punitive.",
            negotiation_script_ko: "위약금 산정 방식을 '실제 발생한 손해배상'으로 변경하거나, 표준 계약서 기준에 맞춰 하향 조정을 제안하세요.",
            isFreeSample: false
        }
    ]
};

export default function DashboardPage() {
    const { user, userProfile, loading, logout } = useAuth();
    const router = useRouter();
    const { t } = useLanguageStore();

    // UI 상태 관리
    const [view, setView] = useState<'upload' | 'loading' | 'results'>('upload');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [fileName, setFileName] = useState('');
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error('로그인 실패:', error);
            toast.error(t('dashboard.auth.loginError'));
        }
    };

    const handleAnonymousLogin = async () => {
        try {
            await signInAnonymously();
        } catch (error) {
            console.error('익명 로그인 실패:', error);
            toast.error(t('dashboard.auth.loginError'));
        }
    };

    const handleUpload = async (file: File) => {
        if (!user) return;

        setFileName(file.name);
        setView('upload'); // 'upload' 상태에서 Progress를 보여주기 위해 유지

        try {
            // 1. Firebase Storage에 업로드 (실제 구현)
            const contractId = Math.random().toString(36).substring(7);
            await uploadContractFile(file, user.uid, contractId, (p) => {
                setUploadProgress(p.progress * 0.8); // 업로드를 전체의 80%로 설정
            });

            setUploadProgress(100);

            // 2. 분석 단계로 전환
            setTimeout(() => {
                setView('loading');

                // 3. AI 분석 시뮬레이션 (약 12초 정도 소요 - AnalysisLoading의 애니메이션에 맞춤)
                setTimeout(() => {
                    setAnalysisResult(MOCK_RESULT);
                    setView('results');
                    toast.success(t('dashboard.results.completed'));
                }, 12000);
            }, 500);

        } catch (error) {
            console.error('업로드 실패:', error);
            toast.error(t('dashboard.upload.errorUpload'));
            setUploadProgress(0);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground animate-pulse font-medium">{t('dashboard.loading.preparing')}</p>
                </div>
            </div>
        );
    }

    // 로그인하지 않은 경우
    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-primary/10 flex items-center justify-center p-4">
                <Card className="max-w-md w-full p-10 border-primary/20 shadow-2xl backdrop-blur-sm bg-card/80">
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/30">
                            <FileText className="w-12 h-12 text-primary-foreground" />
                        </div>
                        <h1 className="text-3xl font-bold text-foreground mb-3 font-outfit">{t('dashboard.auth.welcome')}</h1>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('dashboard.auth.subtitle')}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Button
                            onClick={handleGoogleLogin}
                            className="w-full py-7 text-lg rounded-2xl bg-white text-black hover:bg-gray-100 border border-gray-200"
                        >
                            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            {t('dashboard.auth.googleLogin')}
                        </Button>

                        <Button
                            onClick={handleAnonymousLogin}
                            variant="outline"
                            className="w-full py-7 text-lg rounded-2xl"
                        >
                            {t('dashboard.auth.anonymousLogin')}
                        </Button>
                    </div>

                    <p className="text-xs text-muted-foreground text-center mt-8">
                        {t('dashboard.auth.footerPrefix')}
                        <a href="#" className="underline mx-1">{t('dashboard.auth.terms')}</a> &
                        <a href="#" className="underline ml-1">{t('dashboard.auth.privacy')}</a>
                        {t('dashboard.auth.footerSuffix')}
                    </p>
                </Card>
            </div>
        );
    }

    // 로그인한 경우 - 대시보드 레이아웃
    return (
        <div className="min-h-screen bg-[#F8F9FC] flex">
            {/* Sidebar */}
            <aside className="hidden lg:flex w-72 flex-col bg-white border-r border-gray-200">
                <div className="p-8 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                        <FileText className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-gray-900 font-outfit">InSign</span>
                </div>

                <nav className="flex-grow px-4 space-y-2">
                    <Button variant="ghost" className="w-full justify-start gap-3 py-6 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-xl">
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="font-semibold">{t('dashboard.sidebar.dashboard')}</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 py-6 text-gray-400 hover:text-primary rounded-xl">
                        <History className="w-5 h-5" />
                        <span className="font-semibold">{t('dashboard.sidebar.history')}</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 py-6 text-gray-400 hover:text-primary rounded-xl">
                        <Settings className="w-5 h-5" />
                        <span className="font-semibold">{t('dashboard.sidebar.settings')}</span>
                    </Button>
                </nav>

                <div className="p-6 border-t border-gray-100">
                    <div className="bg-primary/5 rounded-2xl p-4 mb-4">
                        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{t('dashboard.sidebar.currentPlan')}</p>
                        <p className="text-sm font-bold text-gray-900 mb-3">{userProfile?.membership || 'Free'} Plan</p>
                        <Button className="w-full text-xs font-bold h-8" variant="default">{t('dashboard.sidebar.upgrade')}</Button>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => logout()}
                        className="w-full justify-start gap-3 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-semibold">{t('dashboard.sidebar.logout')}</span>
                    </Button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col h-screen overflow-y-auto">
                <header className="h-20 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
                    <h2 className="text-xl font-bold text-gray-800">
                        {view === 'upload' ? t('dashboard.header.newAnalysis') : view === 'loading' ? t('dashboard.header.analyzing') : t('dashboard.header.results')}
                    </h2>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-medium text-gray-500">{t('dashboard.header.welcome')}</p>
                            <p className="text-sm font-bold text-gray-900">{user.displayName || user.email?.split('@')[0]}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-primary/10">
                            {user.photoURL ? (
                                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {user.email?.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="max-w-5xl mx-auto w-full p-8">
                    {view === 'upload' && (
                        <div className="space-y-8">
                            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-2 font-outfit">{t('dashboard.upload.title')}</h2>
                                <p className="text-gray-500 text-lg">{t('dashboard.upload.subtitle')}</p>
                            </div>

                            <ContractUpload
                                onUploadStarted={handleUpload}
                                isUploading={uploadProgress > 0 && uploadProgress < 100}
                                uploadProgress={uploadProgress}
                            />

                            {/* Info Section */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                                {[
                                    { title: t('dashboard.upload.info1Title'), desc: t('dashboard.upload.info1Desc'), icon: "🔒" },
                                    { title: t('dashboard.upload.info2Title'), desc: t('dashboard.upload.info2Desc'), icon: "⚡" },
                                    { title: t('dashboard.upload.info3Title'), desc: t('dashboard.upload.info3Desc'), icon: "⚖️" }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                                        <span className="text-2xl">{item.icon}</span>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{item.title}</h4>
                                            <p className="text-xs text-gray-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {view === 'loading' && (
                        <div className="max-w-2xl mx-auto py-12">
                            <AnalysisLoading />
                        </div>
                    )}

                    {view === 'results' && analysisResult && (
                        <ContractResults
                            result={analysisResult}
                            filename={fileName}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}
