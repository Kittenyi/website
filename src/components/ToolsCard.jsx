import { Layers } from 'lucide-react';
import { WEAPONRY } from '../config/constants';
import BentoCard from './ui/BentoCard';
import SectionTitle from './ui/SectionTitle';

const ToolsCard = () => {
  return (
    <BentoCard span="md:col-span-1" className="p-6">
      <SectionTitle icon={Layers}>常用工具</SectionTitle>
      <div className="space-y-6">
        <div>
          <p className="text-[8px] text-purple-400/40 font-bold uppercase tracking-[0.2em] mb-3 ml-1 font-mono">Web3 Engine</p>
          <div className="grid grid-cols-2 gap-2">
            {WEAPONRY.web3.map(item => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1.5 rounded-xl bg-purple-500/5 border border-white/5 text-[9px] text-center text-white/40 hover:text-white transition-all font-mono"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[8px] text-cyan-400/40 font-bold uppercase tracking-[0.2em] mb-3 ml-1 font-mono">AI Intelligence</p>
          <div className="grid grid-cols-2 gap-2">
            {WEAPONRY.ai.map(item => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1.5 rounded-xl bg-cyan-500/5 border border-white/5 text-[9px] text-center text-white/40 hover:text-white transition-all font-mono"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </BentoCard>
  );
};

export default ToolsCard;
