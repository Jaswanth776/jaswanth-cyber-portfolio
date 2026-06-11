import { motion } from 'framer-motion';
import { Target, Search, Shield, Zap } from 'lucide-react';

export default function AnalystMindset() {
  const principles = [
    {
      icon: <Search className="w-6 h-6 text-neon-green" />,
      title: "Detection-First Approach",
      desc: "Focusing on building robust detection logic using Sysmon and Suricata before incidents occur."
    },
    {
      icon: <Target className="w-6 h-6 text-neon-blue" />,
      title: "Log-Based Investigation",
      desc: "Correlating multi-source telemetry in Wazuh to reconstruct attack paths accurately."
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "Network-Level Security Thinking",
      desc: "Designing segmented architectures and controlling traffic flow to limit lateral movement."
    },
    {
      icon: <Shield className="w-6 h-6 text-neon-red" />,
      title: "Think Like An Attacker",
      desc: "Simulating adversarial techniques to test and validate the effectiveness of existing defenses."
    }
  ];

  return (
    <section id="mindset" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 border-l-2 border-neon-green pl-6"
        >
          <h2 className="text-3xl font-bold text-white tracking-tight uppercase terminal-text">
            Analyst <span className="text-neon-green">Mindset</span>
          </h2>
          <p className="text-gray-400 mt-2 terminal-text text-sm uppercase tracking-widest">
            // Core Operational Philosophy
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="cyber-panel p-6 hover-target group transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-4 bg-black/50 w-12 h-12 rounded-sm flex items-center justify-center border border-gray-800 group-hover:border-neon-green/50 transition-colors">
                {p.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 terminal-text">{p.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
