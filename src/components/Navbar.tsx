import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b-0">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          {/* Placeholder for actual logo */}
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-accent to-background border border-border"></div>
          Perfect Mesh
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-accent">
          <Link href="#products" className="hover:text-foreground transition-colors">Products</Link>
          <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="#calculator" className="hover:text-foreground transition-colors">Pricing</Link>
          <Link href="#showcase" className="hover:text-foreground transition-colors">Showcase</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="#contact" 
            className="hidden md:inline-flex bg-foreground text-background px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-accent transition-colors"
          >
            Get Free Quote
          </Link>
          {/* Mobile menu button could go here */}
          <button className="md:hidden p-2 text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
