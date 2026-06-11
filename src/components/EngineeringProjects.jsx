import { motion } from 'framer-motion';
import { Server, Shield, Network, Database, ExternalLink, Code } from 'lucide-react';

export default function EngineeringProjects() {
  const projects = [
    {
      title: "SOC Detection Engineering Lab",
      category: "THREAT HUNTING / SIEM",
      icon: <Shield className="w-8 h-8 text-neon-green" />,
      description: "A comprehensive SOC lab environment designed to simulate real-world attacks and build custom detection logic.",
      tech: ["Wazuh", "Sysmon", "Elasticsearch", "TheHive"],
      highlights: [
        "Ingested Sysmon Event ID 1 (Process Creation) logs for execution analysis.",
        "Built automated alert correlation rules in Wazuh.",
        "Integrated TheHive for automated case management and incident tracking."
      ],
      link: "#",
      github: "https://github.com/Jaswanth776"
    },
    {
      title: "Intelligent Secure NAS System",
      category: "INFRASTRUCTURE SECURITY",
      icon: <Database className="w-8 h-8 text-neon-blue" />,
      description: "A robust 3-node NAS architecture integrating machine learning with proactive security enforcement.",
      tech: ["Nextcloud", "Celery", "Fail2Ban", "Prometheus"],
      highlights: [
        "Implemented fail2ban at the host level for active threat blocking.",
        "Asynchronous ML pipelines via Celery for anomaly detection.",
        "Real-time observability and alerting via Grafana & Prometheus."
      ],
      link: "#",
      github: "https://github.com/Jaswanth776"
    },
    {
      title: "Network Segmentation & Hotel Network Design",
      category: "NETWORK SECURITY",
      icon: <Network className="w-8 h-8 text-neon-red" />,
      description: "Designed and implemented a secure hotel network architecture with strict isolation between guest, admin, and management networks.",
      tech: ["pfSense", "VLANs", "Subnetting", "Suricata"],
      highlights: [
        "Configured VLANs and Subnetting for complete traffic isolation.",
        "Implemented Port Security and restricted lateral movement.",
        "Deployed Suricata at the gateway for deep packet inspection."
      ],
      link: "#",
      github: "https://github.com/Jaswanth776"
    },
    {
      title: "Browser Forensics & Telemetry",
      category: "DIGITAL FORENSICS (ONGOING)",
      icon: <Server className="w-8 h-8 text-yellow-400" />,
      description: "Extracting and analyzing browser-based artifacts to reconstruct user activity and detect malicious extensions.",
      tech: ["Python", "SQLite", "Browser Extensions", "Volatility"],
      highlights: [
        "Analyzing Chromium and Firefox local storage databases.",
        "Developing automated scripts for history and cache extraction.",
        "Hunting for persistence mechanisms within browser profiles."
      ],
      link: "#",
      github: "https://github.com/Jaswanth776"
    }
  ];

  return (
    <section id="engineering" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 border-l-2 border-neon-blue pl-6"
        >
          <h2 className="text-3xl font-bold text-white tracking-tight uppercase terminal-text">
            Security Engineering <span className="text-neon-blue">Projects</span>
          </h2>
          <p className="text-gray-400 mt-2 terminal-text text-sm uppercase tracking-widest">
            // Architecture & Implementations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="cyber-panel p-8 flex flex-col h-full hover-target group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-black/40 border border-gray-800 rounded-sm">
                    {project.icon}
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 terminal-text tracking-widest uppercase mb-1">
                      {project.category}
                    </p>
                    <h3 className="text-xl font-bold text-white group-hover:text-neon-blue transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>
                <div className="flex gap-3">
                  <a href={project.github} className="text-gray-500 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                    <Code className="w-5 h-5" />
                  </a>
                  <a href={project.link} className="text-gray-500 hover:text-neon-blue transition-colors" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-6 flex-grow">
                {project.description}
              </p>

              <div className="mb-6 space-y-2">
                <p className="text-xs terminal-text text-gray-500 uppercase">Key Objectives_</p>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-neon-blue mt-1 text-xs">&gt;</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-800/50">
                {project.tech.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="px-2 py-1 text-xs terminal-text bg-neon-blue/10 text-neon-blue border border-neon-blue/20 rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
