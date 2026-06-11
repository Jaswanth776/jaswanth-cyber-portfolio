import { motion } from 'framer-motion';
import { Share2, ArrowRight } from 'lucide-react';

export default function DetectionPipelines() {
  const pipelines = [
    {
      name: "Endpoint Threat Detection Pipeline",
      nodes: [
        { label: "Sysmon", desc: "Process/Network Telemetry", color: "text-neon-blue", border: "border-neon-blue" },
        { label: "Wazuh", desc: "Log Analysis & Rules Engine", color: "text-white", border: "border-gray-500" },
        { label: "Alert", desc: "Threat Detection Trigger", color: "text-yellow-400", border: "border-yellow-400" },
        { label: "TheHive", desc: "Case Mgt & Response", color: "text-neon-green", border: "border-neon-green" }
      ]
    },
    {
      name: "Intelligent NAS Security Pipeline",
      nodes: [
        { label: "Nextcloud", desc: "File Access Events", color: "text-neon-blue", border: "border-neon-blue" },
        { label: "Syslog", desc: "Agentless Log Forwarding", color: "text-white", border: "border-gray-500" },
        { label: "SIEM (U3)", desc: "Centralized Correlation", color: "text-purple-400", border: "border-purple-400" },
        { label: "Detection", desc: "Rule Match & ML Anomaly", color: "text-yellow-400", border: "border-yellow-400" },
        { label: "Block", desc: "Fail2Ban IP Drop", color: "text-neon-red", border: "border-neon-red" }
      ]
    }
  ];

  return (
    <section id="pipelines" className="py-20 relative z-10 bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 border-l-2 border-neon-blue pl-6"
        >
          <h2 className="text-3xl font-bold text-white tracking-tight uppercase terminal-text flex items-center gap-3">
            <Share2 className="text-neon-blue w-8 h-8" />
            Detection <span className="text-neon-blue">Pipelines</span>
          </h2>
          <p className="text-gray-400 mt-2 terminal-text text-sm uppercase tracking-widest">
            // Telemetry Flow Architecture
          </p>
        </motion.div>

        <div className="space-y-12">
          {pipelines.map((pipeline, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="cyber-panel p-8"
            >
              <h3 className="text-lg font-bold text-white mb-8 terminal-text uppercase tracking-widest">
                {pipeline.name}
              </h3>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
                {pipeline.nodes.map((node, nodeIdx) => (
                  <div key={nodeIdx} className="flex flex-col md:flex-row items-center w-full md:w-auto">
                    <div className={`p-4 bg-black/80 border ${node.border} rounded-sm w-full md:w-48 text-center relative group hover-target transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]`}>
                      <p className={`font-bold terminal-text text-sm mb-2 ${node.color}`}>{node.label}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">{node.desc}</p>
                      
                      {/* Decorative corners */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30"></div>
                    </div>
                    
                    {nodeIdx < pipeline.nodes.length - 1 && (
                      <div className="hidden md:flex items-center justify-center w-12 px-2 text-gray-600">
                        <ArrowRight className="w-5 h-5 animate-pulse" />
                      </div>
                    )}
                    
                    {nodeIdx < pipeline.nodes.length - 1 && (
                      <div className="flex md:hidden items-center justify-center h-8 py-2 text-gray-600">
                        <ArrowRight className="w-5 h-5 animate-pulse rotate-90" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
