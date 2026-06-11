import { useState, useEffect } from 'react';
import { Shield, Activity, Wifi } from 'lucide-react';

const SystemStatus = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [threatLevel, setThreatLevel] = useState('LOW');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      
      // Randomly change threat level occasionally for effect
      if (Math.random() > 0.95) {
        const levels = ['LOW', 'MODERATE', 'ELEVATED'];
        setThreatLevel(levels[Math.floor(Math.random() * levels.length)]);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getThreatColor = () => {
    switch(threatLevel) {
      case 'MODERATE': return 'text-yellow-400';
      case 'ELEVATED': return 'text-orange-500';
      case 'HIGH': return 'neon-text-red';
      default: return 'neon-text-green';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 terminal-text text-xs pointer-events-none">
      <div className="cyber-panel px-4 py-2 flex items-center gap-3">
        <Wifi size={14} className="neon-text-blue animate-pulse" />
        <span className="text-gray-400">SYS_STATUS:</span>
        <span className="neon-text-green">ONLINE</span>
      </div>
      
      <div className="cyber-panel px-4 py-2 flex items-center gap-3">
        <Shield size={14} className={getThreatColor()} />
        <span className="text-gray-400">THREAT_LVL:</span>
        <span className={getThreatColor()}>{threatLevel}</span>
      </div>

      <div className="cyber-panel px-4 py-2 flex items-center gap-3">
        <Activity size={14} className="neon-text-green" />
        <span className="text-gray-400">SYS_TIME:</span>
        <span className="text-gray-200">{time}</span>
      </div>
    </div>
  );
};

export default SystemStatus;
