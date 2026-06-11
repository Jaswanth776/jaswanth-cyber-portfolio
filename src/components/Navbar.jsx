import { useState, useEffect } from 'react';
import { Menu, X, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Mindset', href: '#mindset' },
    { name: 'Engineering', href: '#engineering' },
    { name: 'Case Studies', href: '#cases' },
    { name: 'Capabilities', href: '#capabilities' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-300 ${
        scrolled ? 'cyber-panel border-b border-neon-green/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center gap-2 group hover-target">
              <ShieldAlert className="h-8 w-8 text-neon-green group-hover:text-neon-red transition-colors duration-300" />
              <div className="flex flex-col">
                <span className="text-white font-black text-2xl tracking-widest terminal-text leading-none drop-shadow-[0_0_10px_rgba(0,255,65,0.8)] animate-[pulse_3s_ease-in-out_infinite]">
                  CH. JASWANTH
                </span>
                <span className="text-neon-blue text-[10px] terminal-text tracking-widest leading-none mt-1">
                  DEFENDER // ANALYST
                </span>
              </div>
            </a>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-neon-green hover:bg-neon-green/5 px-3 py-2 rounded-sm text-xs font-medium transition-colors duration-200 terminal-text hover-target uppercase tracking-wider relative group"
                >
                  <span className="text-neon-green/40 mr-2 group-hover:text-neon-green transition-colors">&gt;</span>
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-neon-green scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hover-target inline-flex items-center justify-center p-2 rounded-md text-neon-green hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden cyber-panel border-t border-neon-green/20"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="hover-target text-gray-300 hover:text-neon-green block px-3 py-3 rounded-md text-sm font-medium terminal-text uppercase tracking-widest border-l-2 border-transparent hover:border-neon-green bg-black/40 hover:bg-neon-green/10 mb-1"
              >
                <span className="text-neon-green/50 mr-3">[{link.name.substring(0,2)}]</span>
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
