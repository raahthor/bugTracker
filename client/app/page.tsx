import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Github,
  ExternalLink,
  Shield,
  RotateCcw,
  Key,
  Mail,
  Linkedin,
} from "lucide-react";
import {
  DemoLoginButton,
  LoginButton,
  SignupButton,
  ViewCodeButton,
  ViewCodeButtonLG,
} from "./home-page-btns";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Bug Tracker
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <LoginButton />
              <SignupButton />
              <div className="hidden sm:flex items-center space-x-3 ml-4 pl-4 border-l">
                <ViewCodeButton />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Bug Tracker SaaS for Teams
          </h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            A full-stack web application showcasing role-based access control
            and soft-delete features for efficient bug management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <DemoLoginButton />
            <ViewCodeButtonLG />
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-foreground text-center mb-6">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-2 text-center">
                <RotateCcw className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2 text-sm">
                  Soft Delete with Recovery
                </h3>
                <p className="text-xs text-muted-foreground">
                  Safe data operations with recovery options for organizations
                  and bugs
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-2 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2 text-sm">
                  Role-Based Access Control
                </h3>
                <p className="text-xs text-muted-foreground">
                  Secure permissions and data isolation for different user roles
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-2 text-center">
                <ExternalLink className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2 text-sm">
                  Google OAuth Integration
                </h3>
                <p className="text-xs text-muted-foreground">
                  Third-party authentication with secure token handling
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-2 text-center">
                <Key className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2 text-sm">
                  Secure Join Codes for Organizations
                </h3>
                <p className="text-xs text-muted-foreground">
                  Multi-tenant invite system with secure organization access
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-2 text-center">
                <CheckCircle className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2 text-sm">
                  Bug Lifecycle Management
                </h3>
                <p className="text-xs text-muted-foreground">
                  Complete workflow with status changes, assignments, and
                  timestamps
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-2 text-center">
                <Mail className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2 text-sm">
                  Password Reset Using Brevo
                </h3>
                <p className="text-xs text-muted-foreground">
                  Email-based password recovery with secure token validation
                </p>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Plus dynamic URLs for usernames and organizations, showcasing
            SEO-friendly routing
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-foreground text-center mb-6">
            Tech Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-sm font-semibold text-foreground mb-1">
                Next.js
              </div>
              <div className="text-xs text-muted-foreground">
                React framework with SSR/ISR and routing
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-sm font-semibold text-foreground mb-1">
                Tailwind CSS + Shadcn UI
              </div>
              <div className="text-xs text-muted-foreground">
                Utility-first styling + headless components
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-sm font-semibold text-foreground mb-1">
                Node.js / Express
              </div>
              <div className="text-xs text-muted-foreground">
                REST API backend
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-sm font-semibold text-foreground mb-1">
                Prisma + PostgreSQL
              </div>
              <div className="text-xs text-muted-foreground">
                Modern ORM with relational DB
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-sm font-semibold text-foreground mb-1">
                Authentication
              </div>
              <div className="text-xs text-muted-foreground">
                Google OAuth + JWT
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-sm font-semibold text-foreground mb-1">
                Deployment
              </div>
              <div className="text-xs text-muted-foreground">
                Vercel (frontend) + Render (backend)
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            About Developer
          </h2>
          <p className="text-muted-foreground mb-6">
            Built by{" "}
            <span className="text-foreground font-medium">Prashant</span>, a
            full-stack developer passionate about creating efficient web
            applications.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://yourportfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
              <span>Portfolio</span>
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 Prashant. Built as a portfolio project.
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a
                href="https://yourportfolio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Portfolio
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
