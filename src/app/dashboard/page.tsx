'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { signInWithGoogle, signInAnonymously } from '@/lib/firebase/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Upload } from 'lucide-react';

export default function DashboardPage() {
    const { user, userProfile, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // 로딩이 완료되고 사용자가 없으면 로그인 프롬프트 표시
        if (!loading && !user) {
            // 여기서는 바로 로그인하지 않고 UI를 표시
        }
    }, [user, loading]);

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error('로그인 실패:', error);
        }
    };

    const handleAnonymousLogin = async () => {
        try {
            await signInAnonymously();
        } catch (error) {
            console.error('익명 로그인 실패:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    // 로그인하지 않은 경우
    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary flex items-center justify-center p-4">
                <Card className="max-w-md w-full p-8 border-primary/20">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-10 h-10 text-primary-foreground" />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to InSign</h1>
                        <p className="text-muted-foreground">
                            계약서 분석을 시작하려면 로그인하세요
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Button
                            onClick={handleGoogleLogin}
                            className="w-full"
                            size="lg"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google로 계속하기
                        </Button>

                        <Button
                            onClick={handleAnonymousLogin}
                            variant="outline"
                            className="w-full"
                            size="lg"
                        >
                            체험하기 (익명)
                        </Button>
                    </div>

                    <p className="text-xs text-muted-foreground text-center mt-6">
                        로그인하면 <a href="#" className="underline">이용약관</a> 및 <a href="#" className="underline">개인정보 처리방침</a>에 동의하는 것으로 간주됩니다.
                    </p>
                </Card>
            </div>
        );
    }

    // 로그인한 경우 - 대시보드
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                            <FileText className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold text-foreground">InSign</span>
                    </div>

                    <div className="flex items-center gap-4">
                        {userProfile && (
                            <div className="text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">{userProfile.membership}</span> 플랜
                            </div>
                        )}
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {user.photoURL ? (
                                <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
                            ) : (
                                <span className="text-sm font-medium text-primary">
                                    {user.email?.charAt(0).toUpperCase() || '?'}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        안녕하세요, {user.displayName || user.email || '사용자'}님
                    </h1>
                    <p className="text-muted-foreground">
                        계약서를 업로드하고 AI 분석을 시작하세요
                    </p>
                </div>

                {/* Upload Section */}
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 mb-8">
                    <div className="p-12 text-center">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                            <Upload className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-3">
                            계약서 업로드
                        </h2>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                            PDF 또는 이미지 파일을 드래그 앤 드롭하거나 클릭하여 업로드하세요
                        </p>
                        <Button size="lg" className="bg-primary hover:opacity-90">
                            파일 선택하기
                        </Button>
                        <p className="text-xs text-muted-foreground mt-4">
                            최대 파일 크기: 10MB | 지원 형식: PDF, JPG, PNG
                        </p>
                    </div>
                </Card>

                {/* Recent Contracts */}
                <div>
                    <h2 className="text-xl font-bold text-foreground mb-4">최근 분석</h2>
                    <Card className="p-8 text-center">
                        <p className="text-muted-foreground">
                            아직 분석한 계약서가 없습니다
                        </p>
                    </Card>
                </div>
            </main>
        </div>
    );
}
