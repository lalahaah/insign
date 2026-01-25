import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, AlertTriangle, Shield, FileText, Globe, Zap, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
            {/* Navigation */}
            <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                            <FileText className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold text-foreground">InSign</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">Features</a>
                        <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition">Pricing</a>
                        <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition">How It Works</a>
                    </div>
                    <Link href="/dashboard">
                        <Button variant="default" size="sm">Get Started</Button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <Badge variant="outline" className="mb-6 border-primary/20 bg-primary/5 px-4 py-1.5">
                    <span className="text-primary font-semibold">NEW</span>
                    <span className="ml-2">AI-Powered Analysis for Global Talent</span>
                </Badge>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight">
                    See What's <span className="text-primary">Inside</span><br />Your Contract
                </h1>

                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                    한국에서 활동하는 글로벌 인재를 위한 계약서 분석 플랫폼.<br />
                    AI가 당신의 계약서를 분석하고, 위험한 조항을 찾아내며, 협상 전략을 제공합니다.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                    <Link href="/dashboard">
                        <Button size="lg" className="bg-primary hover:opacity-90 text-lg px-8 py-6">
                            무료로 시작하기
                        </Button>
                    </Link>
                    <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                        데모 보기
                    </Button>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                    <div className="text-center p-4 rounded-lg bg-card/50 border border-border/50">
                        <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold text-foreground">99.9%</p>
                        <p className="text-xs text-muted-foreground">정확도</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-card/50 border border-border/50">
                        <Zap className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold text-foreground">2초</p>
                        <p className="text-xs text-muted-foreground">평균 분석 시간</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-card/50 border border-border/50">
                        <Globe className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold text-foreground">2개국</p>
                        <p className="text-xs text-muted-foreground">언어 지원</p>
                    </div>
                </div>
            </section>

            {/* Problem Statement */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <Card className="relative overflow-hidden border-destructive/20 bg-gradient-to-br from-destructive/5 to-destructive/10">
                    <div className="p-8 sm:p-12">
                        <div className="flex items-start gap-4 mb-6">
                            <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-3">
                                    계약서, 정말 안전한가요?
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                                    많은 외국인 인재들이 한국어 계약서의 불공정한 조항을 발견하지 못하고 서명합니다.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <span className="text-destructive font-bold">•</span>
                                        <span className="text-foreground">초상권이 <strong>영구적으로</strong> 에이전시에 귀속되는 조항</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-destructive font-bold">•</span>
                                        <span className="text-foreground">수익의 <strong>50% 이상</strong>을 가져가는 정산 구조</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-destructive font-bold">•</span>
                                        <span className="text-foreground">비자 유지에 <strong>위험한</strong> 최저 정산금 조건</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-3xl font-bold text-foreground text-center mb-4">어떻게 작동하나요?</h2>
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                    3단계로 계약서를 안전하게 분석하세요
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="border-border/50 hover:border-primary/20 transition-all">
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <span className="text-2xl font-bold text-primary">1</span>
                            </div>
                            <h3 className="font-semibold text-foreground mb-2 text-lg">계약서 업로드</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                PDF 또는 이미지 형태의 계약서를 업로드하세요. OCR 기술로 자동으로 텍스트를 추출합니다.
                            </p>
                        </div>
                    </Card>

                    <Card className="border-border/50 hover:border-primary/20 transition-all">
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <span className="text-2xl font-bold text-primary">2</span>
                            </div>
                            <h3 className="font-semibold text-foreground mb-2 text-lg">AI 분석</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                GPT-4o가 표준 계약서와 비교하여 위험한 조항을 찾아냅니다. InSign Score로 안전도를 확인하세요.
                            </p>
                        </div>
                    </Card>

                    <Card className="border-border/50 hover:border-primary/20 transition-all">
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <span className="text-2xl font-bold text-primary">3</span>
                            </div>
                            <h3 className="font-semibold text-foreground mb-2 text-lg">협상 가이드</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                위험한 조항에 대한 설명과 함께, 협상에 사용할 수 있는 한국어 스크립트를 제공받으세요.
                            </p>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-transparent to-secondary/30">
                <h2 className="text-3xl font-bold text-foreground text-center mb-12">핵심 기능</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="border-border/50">
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                                <AlertTriangle className="w-6 h-6 text-destructive" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">독소 조항 탐지</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                초상권, 정산금, 계약 해지 등 20가지 핵심 독소 조항 패턴을 자동으로 찾아냅니다.
                            </p>
                        </div>
                    </Card>

                    <Card className="border-border/50">
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <Shield className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">표준 계약서 대조</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                문화체육관광부 표준 계약서와 실시간으로 비교하여 차이점을 시각화합니다.
                            </p>
                        </div>
                    </Card>

                    <Card className="border-border/50">
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <Globe className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">다국어 리포트</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                영어와 한국어로 분석 결과를 제공. 외국인도 쉽게 이해할 수 있도록 맥락적 번역을 제공합니다.
                            </p>
                        </div>
                    </Card>

                    <Card className="border-border/50">
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <TrendingUp className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">InSign Score</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                0-100점 사이의 계약 안전 지수를 제공하여 한눈에 위험도를 파악할 수 있습니다.
                            </p>
                        </div>
                    </Card>

                    <Card className="border-border/50">
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <CheckCircle2 className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">협상 스크립트</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                정중하면서도 논리적인 한국어 수정 요청 문구를 제공하여 계약 협상을 돕습니다.
                            </p>
                        </div>
                    </Card>

                    <Card className="border-border/50">
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">실시간 분석</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                업로드 후 평균 2초 이내에 분석 결과를 확인할 수 있습니다.
                            </p>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-3xl font-bold text-foreground text-center mb-4">간단한 가격</h2>
                <p className="text-muted-foreground text-center mb-12">
                    필요에 맞는 플랜을 선택하세요
                </p>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Free */}
                    <Card className="border-border/50 hover:shadow-lg transition-shadow">
                        <div className="p-8">
                            <h3 className="font-semibold text-foreground mb-2 text-xl">Free</h3>
                            <p className="text-4xl font-bold text-foreground mb-1">₩0</p>
                            <p className="text-sm text-muted-foreground mb-6">무료 체험</p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                                    InSign Score 확인
                                </li>
                                <li className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                                    가장 위험한 조항 1개 공개
                                </li>
                                <li className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                                    표준 계약서 대조 1건
                                </li>
                            </ul>
                            <Link href="/dashboard">
                                <Button variant="outline" className="w-full">시작하기</Button>
                            </Link>
                        </div>
                    </Card>

                    {/* Pro */}
                    <Card className="border-primary/30 relative hover:shadow-xl transition-shadow">
                        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">인기</Badge>
                        <div className="p-8">
                            <h3 className="font-semibold text-foreground mb-2 text-xl">Pro</h3>
                            <p className="text-4xl font-bold text-foreground mb-1">₩19,900</p>
                            <p className="text-sm text-muted-foreground mb-6">1회 분석</p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                                    전체 분석 리포트
                                </li>
                                <li className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                                    모든 독소 조항 공개
                                </li>
                                <li className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                                    영어 설명 제공
                                </li>
                                <li className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                                    PDF 다운로드
                                </li>
                            </ul>
                            <Link href="/dashboard">
                                <Button className="w-full">구매하기</Button>
                            </Link>
                        </div>
                    </Card>

                    {/* Master */}
                    <Card className="border-border/50 hover:shadow-lg transition-shadow">
                        <div className="p-8">
                            <h3 className="font-semibold text-foreground mb-2 text-xl">Master</h3>
                            <p className="text-4xl font-bold text-foreground mb-1">₩49,000</p>
                            <p className="text-sm text-muted-foreground mb-6">1회 분석</p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                                    Pro의 모든 기능
                                </li>
                                <li className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                                    협상 스크립트
                                </li>
                                <li className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                                    비자 영향도 분석
                                </li>
                                <li className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                                    전문가 연결 할인
                                </li>
                            </ul>
                            <Link href="/dashboard">
                                <Button variant="outline" className="w-full">구매하기</Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                    <div className="p-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            계약서, 이제 걱정하지 마세요
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                            AI가 당신의 권리를 지켜드립니다. 지금 바로 무료로 시작하세요.
                        </p>
                        <Link href="/dashboard">
                            <Button size="lg" className="bg-primary hover:opacity-90 text-lg px-8 py-6">
                                무료로 분석 시작하기
                            </Button>
                        </Link>
                        <p className="text-xs text-muted-foreground mt-4">
                            ⚠️ 본 서비스는 법률 자문이 아닙니다
                        </p>
                    </div>
                </Card>
            </section>

            {/* Footer */}
            <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-primary-foreground" />
                                </div>
                                <span className="font-bold text-foreground">InSign</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                글로벌 인재를 위한 계약서 분석 플랫폼
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold text-foreground text-sm mb-4">Product</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#features" className="hover:text-foreground transition">Features</a></li>
                                <li><a href="#pricing" className="hover:text-foreground transition">Pricing</a></li>
                                <li><a href="#how-it-works" className="hover:text-foreground transition">How It Works</a></li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-foreground text-sm mb-4">Company</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-foreground transition">About</a></li>
                                <li><a href="#" className="hover:text-foreground transition">Blog</a></li>
                                <li><a href="#" className="hover:text-foreground transition">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-foreground text-sm mb-4">Legal</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-foreground transition">Privacy</a></li>
                                <li><a href="#" className="hover:text-foreground transition">Terms</a></li>
                                <li><a href="#" className="hover:text-foreground transition">Security</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
                        <p>&copy; 2026 InSign. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
