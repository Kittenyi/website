import { TrendingUp, Smartphone, Copy, Check } from 'lucide-react';
import { SOL_ADDRESS, BSC_ADDRESS } from '../config/constants';
import BentoCard from './ui/BentoCard';
import SectionTitle from './ui/SectionTitle';
import RealTimeCyberKLine from './RealTimeCyberKLine';

const HeroCard = ({ btcPrice, btcTrend, btcChange, handleCopy, copyStatus }) => {
  return (
    <BentoCard span="md:col-span-4 md:row-span-2" className="p-10 flex flex-col justify-center min-h-[420px] relative" glowSize="300px">
      <RealTimeCyberKLine currentPrice={btcPrice} />
      
      {/* BTC 实时价格 */}
      <div className="absolute top-10 right-10 z-20 flex flex-col items-end">
        <div className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/5 backdrop-blur-xl flex flex-col items-end shadow-2xl">
          <div className="flex items-center gap-1 mb-0.5">
            <div className={`w-1 h-1 rounded-full animate-pulse ${btcTrend === 'bull' ? 'bg-[#00ff9d]' : 'bg-[#ff0055]'}`} />
            <span className="text-[7px] font-black text-white/30 uppercase tracking-[0.15em] font-mono">BTC / USDT LIVE</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[9px] font-bold text-white/15 font-mono">$</span>
            <span className="text-lg md:text-xl font-mono font-bold text-white/95 tabular-nums tracking-tighter">{btcPrice || "SYNCING..."}</span>
          </div>
          <div className={`text-[8px] font-bold mt-0.5 font-mono ${btcTrend === 'bull' ? 'text-[#00ff9d]' : 'text-[#ff0055]'}`}>
            {btcChange > 0 ? "▲" : "▼"} {Math.abs(btcChange)}%
          </div>
        </div>
      </div>

      {/* 个人信息 */}
      <div className="relative z-10">
        <SectionTitle icon={TrendingUp} isHighlighted={true}>Who I Am</SectionTitle>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
          <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-full overflow-hidden border border-white/10 bg-[#15151a] shadow-[0_0_60px_rgba(168,85,247,0.25)] group-hover:scale-105 transition-all">
            <img src="https://i.imgur.com/vIqbp9s.png" alt="Roy" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-serif font-black text-white leading-tight tracking-[-0.03em] mb-4 flex items-baseline bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Roy Huang <span className="ml-4 text-xs md:text-sm font-inter font-normal text-white/20 uppercase tracking-[0.4em]">｜ 01 ｜ ENFJ</span>
            </h1>
            <p className="text-[10px] md:text-xs font-inter font-semibold text-white/70 uppercase tracking-[0.25em] flex items-center flex-wrap gap-x-1">
              👿 Crypto degen <span className="mx-2 opacity-40 text-sm">|</span> 🤖 Content producer in AI
            </p>
          </div>
        </div>

        <p className="text-base md:text-lg text-white/90 font-serif font-medium leading-relaxed md:leading-loose tracking-wide max-w-4xl border-t border-white/5 pt-6 mb-8 italic">
          前国企搬砖，2年Carbon Broker经历。2024.3进入链上冲浪，Meme Coins 100x Hunter。擅长链上数据投研分析，Alpha早期信息捕获，Ai产品体验测评玩家。
        </p>

        {/* 钱包地址 */}
        <div className="pt-8 border-t border-white/5">
          <p className="text-[10px] font-mono text-white/50 uppercase tracking-[0.4em] mb-6 italic">"Talk is cheap, show me the wallet"</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group/item">
              <div className="flex justify-between items-center mb-1">
                <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest flex items-center gap-2">
                  <Smartphone size={10} /> SOLANA
                </p>
                <button
                  onClick={() => handleCopy(SOL_ADDRESS, 'sol')}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-purple-500/20 transition-colors text-white/20 hover:text-white"
                >
                  {copyStatus === 'sol' ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                </button>
              </div>
              <a
                href={`https://gmgn.ai/sol/address/${SOL_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-white/20 break-all hover:text-purple-300 cursor-pointer block"
              >
                {SOL_ADDRESS}
              </a>
            </div>
            <div className="group/item">
              <div className="flex justify-between items-center mb-1">
                <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest flex items-center gap-2">
                  <Smartphone size={10} /> BSC
                </p>
                <button
                  onClick={() => handleCopy(BSC_ADDRESS, 'bsc')}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-purple-500/20 transition-colors text-white/20 hover:text-white"
                >
                  {copyStatus === 'bsc' ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                </button>
              </div>
              <a
                href={`https://gmgn.ai/bsc/address/${BSC_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-white/20 break-all hover:text-purple-300 cursor-pointer block"
              >
                {BSC_ADDRESS}
              </a>
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
};

export default HeroCard;
