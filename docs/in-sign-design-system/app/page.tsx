import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, AlertCircle, Shield, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">IS</span>
            </div>
            <span className="text-lg font-semibold text-foreground">InSign</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">Features</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition">Pricing</a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition">FAQ</a>
          </div>
          <Button variant="default" size="sm">Get Started</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
          <span className="text-primary">NEW</span> AI-Powered Analysis
        </Badge>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
          Intelligent Contract Analysis <span className="text-primary">Made Simple</span>
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Professional, secure contract analysis powered by AI. Identify risks, extract key terms, and make informed decisions faster.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button size="lg" className="bg-primary hover:opacity-90">
            Start Free Trial
          </Button>
          <Button size="lg" variant="outline">
            See Demo
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">99.9%</p>
            <p className="text-xs text-muted-foreground">Uptime</p>
          </div>
          <div className="text-center border-l border-r border-border">
            <p className="text-2xl font-bold text-foreground">256-bit</p>
            <p className="text-xs text-muted-foreground">Encryption</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">2sec</p>
            <p className="text-xs text-muted-foreground">Avg Analysis</p>
          </div>
        </div>
      </section>

      {/* X-Ray Effect Demo */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="p-8 sm:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">X-Ray Analysis in Action</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Upload any contract and watch our AI scan through it in seconds. Identify payment terms, liability clauses, and risk factors automatically.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm text-foreground">Real-time risk assessment</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm text-foreground">Key clause extraction</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm text-foreground">Comparative analysis</span>
                  </li>
                </ul>
              </div>
              
              <div className="relative h-64 sm:h-80 bg-gradient-to-br from-primary/10 to-secondary rounded-xl border border-primary/10 overflow-hidden flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-lg bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Interactive Preview</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">Powerful Features</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Risk Assessment */}
          <Card className="border-border/50 hover:border-primary/20 transition-colors">
            <div className="p-6">
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Risk Assessment</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Automatic detection of high-risk clauses, unusual terms, and potential pitfalls in contracts.
              </p>
            </div>
          </Card>

          {/* Security First */}
          <Card className="border-border/50 hover:border-primary/20 transition-colors">
            <div className="p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Enterprise Security</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                256-bit encryption, SOC 2 certified, and compliance with GDPR, CCPA, and legal standards.
              </p>
            </div>
          </Card>

          {/* Term Extraction */}
          <Card className="border-border/50 hover:border-primary/20 transition-colors">
            <div className="p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Smart Extraction</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Automatically extract payment terms, dates, parties, and critical conditions with 99% accuracy.
              </p>
            </div>
          </Card>

          {/* Batch Processing */}
          <Card className="border-border/50 hover:border-primary/20 transition-colors">
            <div className="p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Batch Processing</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Analyze multiple contracts simultaneously. Process entire portfolios in minutes, not hours.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">Simple Pricing</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Starter */}
          <Card className="border-border/50">
            <div className="p-6">
              <h3 className="font-semibold text-foreground mb-2">Starter</h3>
              <p className="text-3xl font-bold text-foreground mb-4">$29<span className="text-lg text-muted-foreground">/mo</span></p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success" /> 10 analyses/month
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success" /> Basic reporting
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success" /> Email support
                </li>
              </ul>
              <Button variant="outline" className="w-full bg-transparent">Get Started</Button>
            </div>
          </Card>

          {/* Professional */}
          <Card className="border-primary/30 relative">
            <Badge className="absolute -top-3 left-6 bg-primary">Most Popular</Badge>
            <div className="p-6">
              <h3 className="font-semibold text-foreground mb-2">Professional</h3>
              <p className="text-3xl font-bold text-foreground mb-4">$99<span className="text-lg text-muted-foreground">/mo</span></p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success" /> 100 analyses/month
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success" /> Advanced analytics
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success" /> Priority support
                </li>
              </ul>
              <Button className="w-full">Start Free Trial</Button>
            </div>
          </Card>

          {/* Enterprise */}
          <Card className="border-border/50">
            <div className="p-6">
              <h3 className="font-semibold text-foreground mb-2">Enterprise</h3>
              <p className="text-3xl font-bold text-foreground mb-4">Custom</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success" /> Unlimited analyses
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success" /> Custom integrations
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success" /> Dedicated support
                </li>
              </ul>
              <Button variant="outline" className="w-full bg-transparent">Contact Sales</Button>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Transform Your Contract Process?</h2>
        <p className="text-muted-foreground mb-8">Start analyzing contracts with AI-powered intelligence today.</p>
        <Button size="lg" className="bg-primary hover:opacity-90">
          Get Started Free
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-semibold text-foreground mb-4">InSign</p>
              <p className="text-sm text-muted-foreground">Professional contract analysis for modern teams.</p>
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm mb-4">Product</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition">Security</a></li>
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
