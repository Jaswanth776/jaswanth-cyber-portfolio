import { motion } from 'framer-motion';

export default function SocCapabilities() {
  const capabilities = [
    { name: "SIEM Monitoring & Rule Creation", level: 90 },
    { name: "Endpoint Threat Detection (EDR)", level: 85 },
    { name: "Log Analysis & Correlation", level: 95 },
    { name: "Network Traffic Analysis (NTA)", level: 80 },
    { name: "Incident Response & Triage", level: 85 },
    { name: "Detection Engineering", level: 90 },
  ];

  return (
    <section id="capabilities" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 border-l-2 border-neon-green pl-6"
        >
          <h2 className="text-3xl font-bold text-white tracking-tight uppercase terminal-text">
            SOC Operational <span className="text-neon-green">Capabilities</span>
          </h2>
          <p className="text-gray-400 mt-2 terminal-text text-sm uppercase tracking-widest">
            // Core Proficiencies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((cap, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="cyber-panel p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-bold text-sm tracking-wider uppercase">{cap.name}</span>
                <span className="text-neon-green text-xs terminal-text">{cap.level}%</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${cap.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                  className="h-full bg-neon-green relative shadow-[0_0_10px_#00ff41]"
                >
                  {/* Glitch bar effect */}
                  <div className="absolute top-0 right-0 w-4 h-full bg-white/50 blur-[2px]"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
