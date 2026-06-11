import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ShieldAlert, Activity, ChevronDown } from 'lucide-react';

export default function Hero() {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "SOC Analyst | Detection Engineering | Network Security | Incident Response";
  
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 40);
    
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center sm:text-left flex flex-col lg:flex-row items-center justify-between gap-12">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-neon-green/30 bg-neon-green/10 text-neon-green text-xs mb-6 terminal-text tracking-widest uppercase">
            <Activity className="w-3 h-3 animate-pulse" />
            <span>Identity Confirmed: CH. JASWANTH</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight glitch-effect" data-text="Building and Simulating Real-World Cyber Defense & Network Systems">
            Building and Simulating <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue">Real-World Cyber Defense</span> & Network Systems
          </h1>
          
          <div className="h-12 mb-6 sm:h-auto">
            <p className="text-lg sm:text-xl text-gray-300 terminal-text flex items-center justify-center sm:justify-start flex-wrap">
              <span className="text-neon-green mr-2">&gt;</span>
              {text}
              <span className={`w-3 h-6 bg-neon-green ml-1 ${isTyping ? 'animate-pulse' : 'cursor-blink'}`}></span>
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-10">
            <a 
              href="#engineering" 
              className="hover-target px-6 py-3 rounded-sm bg-neon-green/10 text-neon-green border border-neon-green hover:bg-neon-green hover:text-black transition-all duration-300 font-bold flex items-center gap-2 terminal-text text-sm tracking-wider uppercase"
            >
              <ShieldAlert className="w-4 h-4" />
              View Operations
            </a>
            <a 
              href="#contact" 
              className="hover-target px-6 py-3 rounded-sm bg-transparent text-gray-300 border border-gray-600 hover:border-neon-blue hover:text-neon-blue transition-all duration-300 font-bold flex items-center gap-2 terminal-text text-sm tracking-wider uppercase"
            >
              <Terminal className="w-4 h-4" />
              Initialize Contact
            </a>
          </div>
        </motion.div>
        
        {/* Animated Terminal Intro */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex-1 w-full max-w-lg hidden lg:block"
        >
          <div className="terminal-window">
            <div className="p-4 bg-black/80 h-64 overflow-hidden rounded-b-md">
              <div className="terminal-text text-sm space-y-2">
                <p className="text-gray-500">&gt; Initializing Operator...</p>
                <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 1.0}} className="text-neon-blue">&gt; Identity Verified: CH. JASWANTH</motion.p>
                <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 1.5}} className="text-yellow-400">&gt; Access Level: DEFENDER / ANALYST</motion.p>
                <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 2.0}} className="text-neon-green">&gt; All Systems Operational.</motion.p>
                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 4.0}} className="flex items-center gap-2 mt-4 text-gray-300">
                  <span>root@soc:~#</span>
                  <span className="w-2 h-4 bg-gray-300 cursor-blink"></span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce text-neon-green/50 hover-target">
        <span className="text-[10px] terminal-text mb-2 tracking-widest uppercase">Scroll for Logs</span>
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
}
