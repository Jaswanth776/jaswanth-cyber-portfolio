import { motion } from 'framer-motion';
import { Database, ShieldAlert, Cpu, Activity, Lock, Server } from 'lucide-react';
import NetworkMap from './NetworkMap';

export default function NasSystem() {
  return (
    <section id="nas-system" className="py-20 relative z-10 bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 border-l-2 border-yellow-400 pl-6"
        >
          <h2 className="text-3xl font-bold text-white tracking-tight uppercase terminal-text">
            Distributed Intelligent <span className="text-yellow-400">Secure Storage</span>
          </h2>
          <p className="text-gray-400 mt-2 terminal-text text-sm uppercase tracking-widest">
            // Production System Architecture
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Architecture Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 cyber-panel p-6 space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-white terminal-text mb-4 flex items-center gap-2">
                <Server className="text-yellow-400 w-5 h-5" /> 3-Node Architecture
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                A highly available distributed storage system built for resilience and security. The architecture separates core storage from intelligence and security enforcement mechanisms.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <Database className="w-4 h-4 text-neon-blue" />
                  <span><strong>Core Node:</strong> Nextcloud Data Storage</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <Cpu className="w-4 h-4 text-neon-green" />
                  <span><strong>Intelligence Node:</strong> ML & FastAPI Router</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <ShieldAlert className="w-4 h-4 text-neon-red" />
                  <span><strong>Security Node (U3):</strong> Centralized SIEM</span>
                </li>
              </ul>
            </div>
            
            <div className="pt-4 border-t border-gray-800">
              <p className="text-xs terminal-text text-gray-500 uppercase mb-2">Defense Mechanisms</p>
              <ul className="text-sm text-gray-300 space-y-2">
                <li><span className="text-neon-blue">&gt;</span> Agentless log collection via SYSLOG</li>
                <li><span className="text-neon-red">&gt;</span> Fail2Ban IP Blocking</li>
                <li><span className="text-neon-green">&gt;</span> ML Anomaly Detection</li>
                <li><span className="text-yellow-400">&gt;</span> Prometheus + Grafana Observability</li>
              </ul>
            </div>
          </motion.div>

          {/* Interactive Network Map */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col justify-center"
          >
            <h3 className="text-sm font-bold text-gray-500 terminal-text mb-4 uppercase tracking-widest px-2">Interactive Attack Surface & Log Flow</h3>
            <NetworkMap />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
