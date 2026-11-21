import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface PageIntroProps {
  id?: string;
  icon: LucideIcon;
  label: string;
  title: ReactNode;
  children: ReactNode;
}

export default function PageIntro({ id, icon: Icon, label, title, children }: PageIntroProps) {
  return (
    <header id={id} className="page-intro">
      <div className="page-intro-content">
        <p className="hero-kicker"><Icon size={18} aria-hidden="true" /> {label}</p>
        <h1>{title}</h1>
        <p className="page-intro-copy">{children}</p>
      </div>
    </header>
  );
}
