import { motion } from 'framer-motion';

export default function ToolsInAction() {
  const tools = [
    {
      name: "Wazuh",
      category: "SIEM / XDR",
      color: "text-blue-400",
      border: "border-blue-400/30",
      usage: "Deployed as the core SIEM to aggregate endpoint logs, enforce compliance (MITRE ATT&CK mapping), and execute active response scripts (e.g., firewall blocking) upon critical alert triggers."
    },
    {
      name: "Sysmon",
      category: "Endpoint Telemetry",
      color: "text-purple-400",
      border: "border-purple-400/30",
      usage: "Configured advanced XML rulesets to log process creation (Event ID 1), network connections (Event ID 3), and file creations, feeding high-fidelity data into Wazuh for threat hunting."
    },
    {
      name: "Suricata",
      category: "Network IDS",
      color: "text-red-400",
      border: "border-red-400/30",
      usage: "Utilized for deep packet inspection and signature-based detection. Configured Emerging Threats (ET) rulesets to detect malicious lateral movement and exploit attempts in real-time."
    },
    {
      name: "TheHive",
      category: "Case Management",
      color: "text-yellow-400",
      border: "border-yellow-400/30",
      usage: "Integrated via Webhooks to automatically generate incident cases from SIEM alerts. Used for structuring investigation notes, IOC tracking, and orchestrating response workflows."
    }
  ];

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 border-l-2 border-purple-400 pl-6"
        >
          <h2 className="text-3xl font-bold text-white tracking-tight uppercase terminal-text">
            Security Tool <span className="text-purple-400">Implementation</span>
          </h2>
          <p className="text-gray-400 mt-2 terminal-text text-sm uppercase tracking-widest">
            // Operational Tooling Context
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`cyber-panel p-6 border-l-4 ${tool.border} hover-target group`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-xl font-bold terminal-text ${tool.color}`}>{tool.name}</h3>
                <span className="text-[10px] bg-white/5 px-2 py-1 rounded-sm text-gray-400 tracking-widest uppercase">
                  {tool.category}
                </span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                {tool.usage}
              </p>
              
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-[10px] terminal-text text-gray-500 uppercase">&gt; System Integration Verified</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
