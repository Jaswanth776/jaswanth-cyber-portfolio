import { motion } from 'framer-motion';
import { Terminal, Send, Code, User, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 relative z-10 border-t border-gray-800/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 bg-neon-blue/10 border border-neon-blue/30 rounded-full mb-4">
            <Terminal className="text-neon-blue w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight uppercase terminal-text mb-2">
            Initialize <span className="text-neon-blue">Contact</span>
          </h2>
          <p className="text-gray-400 terminal-text text-sm uppercase tracking-widest">
            // Open Secure Communication Channel
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="cyber-panel p-8"
        >
          <div className="terminal-window mb-8">
            <div className="p-4 bg-black/90">
              <p className="text-gray-500 text-sm terminal-text mb-2">root@soc:~# ./establish_connection.sh</p>
              <p className="text-neon-green text-sm terminal-text mb-2">[OK] Handshake successful.</p>
              <p className="text-gray-300 text-sm terminal-text">Waiting for input...</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a 
              href="mailto:chaluvadijaswanth2117@gmail.com" 
              className="hover-target flex items-center justify-center gap-3 px-6 py-4 bg-black/40 border border-gray-700 hover:border-neon-green hover:bg-neon-green/10 text-gray-300 hover:text-neon-green transition-all duration-300 terminal-text uppercase tracking-wider text-sm rounded-sm group"
            >
              <Mail className="w-5 h-5 group-hover:animate-pulse" />
              Secure Email
            </a>
            <a 
              href="https://www.linkedin.com/in/jaswanth-chaluvadi" 
              target="_blank" rel="noopener noreferrer"
              className="hover-target flex items-center justify-center gap-3 px-6 py-4 bg-black/40 border border-gray-700 hover:border-neon-blue hover:bg-neon-blue/10 text-gray-300 hover:text-neon-blue transition-all duration-300 terminal-text uppercase tracking-wider text-sm rounded-sm group"
            >
              <User className="w-5 h-5 group-hover:animate-pulse" />
              LinkedIn Array
            </a>
            <a 
              href="https://tryhackme.com/p/chaluvadijaswanth" 
              target="_blank" rel="noopener noreferrer"
              className="hover-target flex items-center justify-center gap-3 px-6 py-4 bg-black/40 border border-gray-700 hover:border-neon-red hover:bg-neon-red/10 text-gray-300 hover:text-neon-red transition-all duration-300 terminal-text uppercase tracking-wider text-sm rounded-sm group"
            >
              <Terminal className="w-5 h-5 group-hover:animate-pulse" />
              TryHackMe Rank
            </a>
            <a 
              href="https://github.com/Jaswanth776/SOC-LAB" 
              target="_blank" rel="noopener noreferrer"
              className="hover-target flex items-center justify-center gap-3 px-6 py-4 bg-black/40 border border-gray-700 hover:border-white hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 terminal-text uppercase tracking-wider text-sm rounded-sm group"
            >
              <Code className="w-5 h-5 group-hover:animate-pulse" />
              SOC Lab Repo
            </a>
          </div>
          

        </motion.div>
      </div>
    </section>
  );
}
