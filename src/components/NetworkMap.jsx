import { useEffect, useRef, useState } from 'react';

export default function NetworkMap() {
  const canvasRef = useRef(null);
  const [hoverNode, setHoverNode] = useState(null);

  const nodes = [
    { id: 'user', label: 'User', x: 50, y: 150, color: '#ffffff' },
    { id: 'nextcloud', label: 'Nextcloud (Core)', x: 200, y: 150, color: '#00f0ff' },
    { id: 'syslog', label: 'Syslog (Agentless)', x: 350, y: 150, color: '#a855f7' },
    { id: 'siem', label: 'SIEM (Node U3)', x: 550, y: 150, color: '#00ff41' },
    { id: 'dashboard', label: 'Grafana Dashboard', x: 750, y: 150, color: '#fbbf24' },
    { id: 'block', label: 'Fail2Ban (IP Block)', x: 550, y: 250, color: '#ff003c' }
  ];

  const connections = [
    { from: 'user', to: 'nextcloud', type: 'normal' },
    { from: 'nextcloud', to: 'syslog', type: 'normal' },
    { from: 'syslog', to: 'siem', type: 'normal' },
    { from: 'siem', to: 'dashboard', type: 'normal' },
    { from: 'siem', to: 'block', type: 'alert' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];

    // Initialize particles for data flow
    connections.forEach(conn => {
      for(let i=0; i<3; i++) {
        particles.push({
          connection: conn,
          progress: Math.random(),
          speed: 0.005 + (Math.random() * 0.005)
        });
      }
    });

    const render = () => {
      // Clear canvas with trail effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      connections.forEach(conn => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        // Curve to add dynamic feel
        const cpX = (fromNode.x + toNode.x) / 2;
        const cpY = (fromNode.y + toNode.y) / 2 - 20;
        ctx.quadraticCurveTo(cpX, cpY, toNode.x, toNode.y);
        ctx.strokeStyle = conn.type === 'alert' ? 'rgba(255, 0, 60, 0.3)' : 'rgba(0, 240, 255, 0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Draw animated particles
      particles.forEach(p => {
        const fromNode = nodes.find(n => n.id === p.connection.from);
        const toNode = nodes.find(n => n.id === p.connection.to);
        
        p.progress += p.speed;
        if (p.progress >= 1) p.progress = 0;

        // Quadratic bezier calculation
        const cpX = (fromNode.x + toNode.x) / 2;
        const cpY = (fromNode.y + toNode.y) / 2 - 20;
        
        const t = p.progress;
        const x = Math.pow(1 - t, 2) * fromNode.x + 2 * (1 - t) * t * cpX + Math.pow(t, 2) * toNode.x;
        const y = Math.pow(1 - t, 2) * fromNode.y + 2 * (1 - t) * t * cpY + Math.pow(t, 2) * toNode.y;

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.connection.type === 'alert' ? '#ff003c' : '#00ff41';
        ctx.shadowBlur = 10;
        ctx.shadowColor = ctx.fillStyle;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        // Node pulse
        ctx.beginPath();
        ctx.arc(node.x, node.y, 15 + Math.sin(Date.now() / 200) * 2, 0, Math.PI * 2);
        ctx.strokeStyle = `${node.color}55`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.font = "10px 'Fira Code', monospace";
        ctx.fillStyle = "#888";
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y + 30);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[350px] bg-black/60 border border-gray-800 rounded-md overflow-hidden cyber-panel">
      <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
        <div className="w-2 h-2 bg-neon-red rounded-full animate-ping"></div>
        <span className="text-[10px] terminal-text text-neon-red tracking-widest uppercase">Live Network Monitor</span>
      </div>
      
      {/* Canvas wide enough to fit nodes */}
      <div className="w-full h-full overflow-x-auto overflow-y-hidden hide-scrollbar flex items-center justify-center">
        <canvas 
          ref={canvasRef} 
          width={850} 
          height={350} 
          className="max-w-none"
        />
      </div>
    </div>
  );
}
