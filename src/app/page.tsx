'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, AlertTriangle, Shield, FileText, Globe, Zap, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { LanguageSelector } from '@/components/language-selector'
import { useLanguageStore } from '@/store/useLanguageStore'

export default function Home() {
    const { t } = useLanguageStore()
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
            {/* Navigation */}
            <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div
                        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={scrollToTop}
                        role="button"
                        aria-label="맨 위로 이동"
                    >
                        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                            <FileText className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold text-foreground">InSign</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">{t('nav.features')}</a>
                        <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition">{t('nav.pricing')}</a>
                        <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition">{t('nav.howItWorks')}</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <LanguageSelector />
                        <Link href="/dashboard">
                            <Button variant="default" size="sm">{t('nav.getStarted')}</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <Badge variant="outline" className="mb-6 border-primary/20 bg-primary/5 px-4 py-1.5">
                    <span className="text-primary font-semibold">{t('hero.badge')}</span>
                    <span className="ml-2">{t('hero.badgeText')}</span>
                </Badge>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight">
                    {t('hero.title1')} <span className="text-primary">{t('hero.title2')}</span><br />{t('hero.title3')}
                </h1>

                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                    {t('hero.description')}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                    <Link href="/dashboard">
                        <Button size="lg" className="bg-primary hover:opacity-90 text-lg px-8 py-6">
                            {t('hero.startFree')}
                        </Button>
                    </Link>
                    <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                        {t('hero.viewDemo')}
                    </Button>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                    <div className="text-center p-4 rounded-lg bg-card/50 border border-border/50">
                        <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold text-foreground">99.9%</p>
                        <p className="text-xs text-muted-foreground">{t('hero.accuracy')}</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-card/50 border border-border/50">
                        <Zap className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold text-foreground">2s</p>
                        <p className="text-xs text-muted-foreground">{t('hero.analysisTime')}</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-card/50 border border-border/50">
                        <Globe className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold text-foreground">5</p>
                        <p className="text-xs text-muted-foreground">{t('hero.supportLanguages')}</p>
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
                                    {t('problem.title')}
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                                    {t('problem.description')}
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-4">
                                        <span className="text-destructive font-bold">•</span>
                                        <span className="text-foreground">{t('problem.point1')}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-destructive font-bold">•</span>
                                        <span className="text-foreground">{t('problem.point2')}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-destructive font-bold">•</span>
                                        <span className="text-foreground">{t('problem.point3')}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-3xl font-bold text-foreground text-center mb-4">{t('howItWorks.title')}</h2>
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                    {t('howItWorks.subtitle')}
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="border-border/50 hover:border-primary/20 transition-all">
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <span className="text-2xl font-bold text-primary">1</span>
                            </div>
                            <h3 className="font-semibold text-foreground mb-2 text-lg">{t('howItWorks.step1Title')}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {t('howItWorks.step1Desc')}
                            </p>
                        </div>
                    </Card>

                    <Card className="border-border/50 hover:border-primary/20 transition-all">
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <span className="text-2xl font-bold text-primary">2</span>
                            </div>
                            <h3 className="font-semibold text-foreground mb-2 text-lg">{t('howItWorks.step2Title')}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {t('howItWorks.step2Desc')}
                            </p>
                        </div>
                    </Card>

                    <Card className="border-border/50 hover:border-primary/20 transition-all">
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <span className="text-2xl font-bold text-primary">3</span>
                            </div>
                            <h3 className="font-semibold text-foreground mb-2 text-lg">{t('howItWorks.step3Title')}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {t('howItWorks.step3Desc')}
                            </p>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-transparent to-secondary/30">
                <h2 className="text-3xl font-bold text-foreground text-center mb-12">{t('featuresGrid.title')}</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="border-border/50">
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                                <AlertTriangle className="w-6 h-6 text-destructive" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">{t('featuresGrid.f1Title')}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {t('featuresGrid.f1Desc')}
                            </p>
                        </div>
                    </Card>

                    <Card className="border-border/50">
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <Shield className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">{t('featuresGrid.f2Title')}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {t('featuresGrid.f2Desc')}
                            </p>
                        </div>
                    </Card>

                    <Card className="border-border/50">
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <Globe className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">{t('featuresGrid.f3Title')}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {t('featuresGrid.f3Desc')}
                            </p>
                        </div>
                    </Card>

                    <Card className="border-border/50">
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <TrendingUp className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">{t('featuresGrid.f4Title')}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {t('featuresGrid.f4Desc')}
                            </p>
                        </div>
                    </Card>

                    <Card className="border-border/50">
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <CheckCircle2 className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">{t('featuresGrid.f5Title')}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {t('featuresGrid.f5Desc')}
                            </p>
                        </div>
                    </Card>

                    <Card className="border-border/50">
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">{t('featuresGrid.f6Title')}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {t('featuresGrid.f6Desc')}
                            </p>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-3xl font-bold text-foreground text-center mb-4">{t('pricing.title')}</h2>
                <p className="text-muted-foreground text-center mb-12">
                    {t('pricing.subtitle')}
                </p>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Free */}
                    <Card className="border-border/50 hover:shadow-lg transition-shadow">
                        <div className="p-8">
                            <h3 className="font-semibold text-foreground mb-2 text-xl">{t('pricing.free.title')}</h3>
                            <p className="text-4xl font-bold text-foreground mb-1">{t('pricing.free.price')}</p>
                            <p className="text-sm text-muted-foreground mb-6">{t('pricing.free.period')}</p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                                    {t('pricing.free.item1')}
                                </li>
                                <li className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                                    {t('pricing.free.item2')}
                                </li>
                                <li className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                                    {t('pricing.free.item3')}
                                </li>
                            </ul>
                            <Link href="/dashboard">
                                <Button variant="outline" className="w-full">{t('pricing.free.button')}</Button>
                            </Link>
                        </div>
                    </Card>

                    {/* Pro */}
                    <Card className="border-primary/30 relative hover:shadow-xl transition-shadow">
                        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">{t('pricing.pro.badge')}</Badge>
                        <div className="p-8">
                            <h3 className="font-semibold text-foreground mb-2 text-xl">{t('pricing.pro.title')}</h3>
                            <p className="text-4xl font-bold text-foreground mb-1">{t('pricing.pro.price')}</p>
                            <p className="text-sm text-muted-foreground mb-6">{t('pricing.pro.period')}</p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                                    {t('pricing.pro.item1')}
                                </li>
                                <li className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                                    {t('pricing.pro.item2')}
                                </li>
                                <li className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                                    {t('pricing.pro.item3')}
                                </li>
                                <li className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                                    {t('pricing.pro.item4')}
                                </li>
                            </ul>
                            <Link href="/dashboard">
                                <Button className="w-full">{t('pricing.pro.button')}</Button>
                            </Link>
                        </div>
                    </Card>

                    {/* Master */}
                    <Card className="border-border/50 hover:shadow-lg transition-shadow">
                        <div className="p-8">
                            <h3 className="font-semibold text-foreground mb-2 text-xl">{t('pricing.master.title')}</h3>
                            <p className="text-4xl font-bold text-foreground mb-1">{t('pricing.master.price')}</p>
                            <p className="text-sm text-muted-foreground mb-6">{t('pricing.master.period')}</p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                                    {t('pricing.master.item1')}
                                </li>
                                <li className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                                    {t('pricing.master.item2')}
                                </li>
                                <li className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                                    {t('pricing.master.item3')}
                                </li>
                                <li className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                                    {t('pricing.master.item4')}
                                </li>
                            </ul>
                            <Link href="/dashboard">
                                <Button variant="outline" className="w-full">{t('pricing.master.button')}</Button>
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
                            {t('cta.title')}
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                            {t('cta.subtitle')}
                        </p>
                        <Link href="/dashboard">
                            <Button size="lg" className="bg-primary hover:opacity-90 text-lg px-8 py-6">
                                {t('cta.button')}
                            </Button>
                        </Link>
                        <p className="text-xs text-muted-foreground mt-4">
                            {t('cta.warning')}
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
                                {t('footer.description')}
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold text-foreground text-sm mb-4">{t('footer.product')}</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#features" className="hover:text-foreground transition">{t('nav.features')}</a></li>
                                <li><a href="#pricing" className="hover:text-foreground transition">{t('nav.pricing')}</a></li>
                                <li><a href="#how-it-works" className="hover:text-foreground transition">{t('nav.howItWorks')}</a></li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-foreground text-sm mb-4">{t('footer.company')}</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-foreground transition">About</a></li>
                                <li><a href="#" className="hover:text-foreground transition">Blog</a></li>
                                <li><a href="#" className="hover:text-foreground transition">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-foreground text-sm mb-4">{t('footer.legal')}</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-foreground transition">Privacy</a></li>
                                <li><a href="#" className="hover:text-foreground transition">Terms</a></li>
                                <li><a href="#" className="hover:text-foreground transition">Security</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
                        <p>&copy; 2026 InSign. {t('footer.rights')}</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
