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
  Sparkles,
  Code,
  Database,
} from "lucide-react";
import {
  DemoLoginButton,
  LoginButton,
  SignupButton,
  ViewCodeButton,
  ViewCodeButtonLG,
} from "./home-page-btns";

const staticData = {
  features: [
    {
      header: "Soft Delete with Recovery",
      description:
        "Safe data operations with recovery options for organizations and bugs",
      icon: RotateCcw,
    },
    {
      header: "Role-Based Access Control",
      description:
        "Secure permissions and data isolation for different user roles",
      icon: Shield,
    },
    {
      header: "Google OAuth Integration",
      description: "Third-party authentication with secure token handling",
      icon: ExternalLink,
    },
    {
      header: "Secure Join Codes for Organizations",
      description: "Multi-tenant invite system with secure organization access",
      icon: Key,
    },
    {
      header: "Bug Lifecycle Management",
      description:
        "Complete workflow with status changes, assignments, and timestamps",
      icon: CheckCircle,
    },
    {
      header: "Password Reset Using Brevo",
      description: "Email-based password recovery with secure token validation",
      icon: Mail,
    },
  ],
  techStack: [
    {
      header: "Next.js",
      description: "React framework with SSR and routing",
      icon: Code,
    },
    {
      header: "TailwindCSS + ShadcnUI",
      description: "Utility-first styling + headless components",
      icon: Sparkles,
    },
    {
      header: "Node.js / Express",
      description: "REST API backend",
      icon: ExternalLink,
    },
    {
      header: "Prisma + PostgreSQL",
      description: "Modern ORM with relational DB",
      icon: Database,
    },
    {
      header: "Authentication",
      description: "Google OAuth + JWT",
      icon: Shield,
    },
    {
      header: "Deployment",
      description: "Vercel (frontend) + Render (backend)",
      icon: ExternalLink,
    },
  ],
  handles: [
    {
      name: "Portfolio",
      link: "https://raahthor.vercel.app",
      icon: ExternalLink,
    },
    {
      name: "GitHub",
      link: "https://github.com/raahthor",
      icon: Github,
    },
    {
      name: "LinkedIn",
      link: "https://linkedin.com/in/raahthor",
      icon: Linkedin,
    },
  ],
};

export default function LandingPage() {
  const year = new Date().getFullYear();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Bug Tracker
              </span>
            </div>
            <div className="flex items-center gap-3">
              <LoginButton />
              <SignupButton />
              <div className="hidden sm:flex items-center gap-3 ml-4 pl-4 border-l">
                <ViewCodeButton />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/30 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Portfolio Project
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold  mb-6 leading-tight">
            Simple Bug Tracker
            <br />
            <span className="text-primary">SaaS for Teams</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staticData.features.map((feat, idx) => (
              <Card
                key={idx}
                className=" bg-card/50 hover:bg-card/80 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="py-2 px-4 text-center">
                  <feat.icon className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2 text-sm">
                    {feat.header}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {feat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 bg-accent/30 border  rounded-full px-4 py-2">
              <Code className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Plus dynamic URLs for usernames and organizations
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Tech Stack
            </h2>
            <p className="text-muted-foreground">
              Modern technologies and best practices
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staticData.techStack.map((item, idx) => (
              <div
                key={idx}
                className="bg-card/50 border rounded-xl p-6 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center transition-all duration-300">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="font-semibold text-foreground">
                    {item.header}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.description}
                </div>
              </div>
            ))}
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
            {staticData.handles.map((handle, idx) => (
              <a
                key={idx}
                href={handle.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <handle.icon className="h-5 w-5" />
                <span>{handle.name}</span>
              </a>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t ">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
            <div className="text-sm text-muted-foreground">
              © {year} - Prashant. Built as a portfolio project.
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              {staticData.handles.map((handle, idx) => (
                <a
                  key={idx}
                  href={handle.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  {handle.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
