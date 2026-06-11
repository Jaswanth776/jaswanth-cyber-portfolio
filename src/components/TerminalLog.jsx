import React from 'react';
import { Terminal } from 'lucide-react';

const TerminalLog = ({ logs, title = "syslog" }) => {
  return (
    <div className="terminal-window w-full my-4">
      <div className="p-4 overflow-x-auto">
        <div className="flex items-center gap-2 mb-3 border-b border-gray-800 pb-2">
          <Terminal size={16} className="text-gray-500" />
          <span className="text-gray-500 text-sm">{title}</span>
        </div>
        <div className="terminal-text text-sm space-y-1">
          {logs.map((log, index) => (
            <div key={index} className="flex gap-3">
              <span className="text-gray-600 select-none">[{log.time || '00:00:00'}]</span>
              <span className={`
                ${log.type === 'error' ? 'text-red-400' : ''}
                ${log.type === 'warning' ? 'text-yellow-400' : ''}
                ${log.type === 'success' ? 'neon-text-green' : ''}
                ${log.type === 'info' ? 'neon-text-blue' : 'text-gray-300'}
              `}>
                {log.message}
              </span>
            </div>
          ))}
          <div className="flex gap-3 mt-2">
            <span className="text-gray-600">root@sys:~#</span>
            <span className="cursor-blink w-2 h-4 bg-gray-400 inline-block"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalLog;
