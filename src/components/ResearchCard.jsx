import { BarChart3, Loader2, ChevronRight, ArrowUpRight } from 'lucide-react';
import { NOTION_DATABASE_URL } from '../config/constants';
import BentoCard from './ui/BentoCard';
import SectionTitle from './ui/SectionTitle';

const ResearchCard = ({ articles, isLoadingArticles, syncStatus, onArticleClick }) => {
  return (
    <BentoCard span="md:col-span-2 md:row-span-2" className="p-10 flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-10 shrink-0">
        <SectionTitle icon={BarChart3}>投研分析</SectionTitle>
        <div className="flex items-center gap-2">
          {isLoadingArticles && <Loader2 size={12} className="animate-spin text-purple-500/50" />}
          <span className={`text-[8px] font-mono uppercase tracking-widest ${syncStatus === 'success' ? 'text-green-500/50' : 'text-white/20'}`}>
            {syncStatus === 'success' ? 'Node_Linked' : 'Syncing_Node'}
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-6">
        {isLoadingArticles ? 
          [1, 2, 3].map(i => <div key={i} className="h-20 w-full bg-white/5 rounded-2xl loading-shimmer border border-white/5" />) :
          articles.map((item, i) => (
            <div
              key={item.id || i}
              onClick={() => onArticleClick(item.id)}
              className="group/article flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-purple-500/5 hover:border-purple-500/20 transition-all duration-500 cursor-pointer shadow-sm"
            >
              <div className="flex-1 pr-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[8px] text-purple-400/60 font-bold uppercase px-2 py-0.5 rounded-md bg-purple-500/5 border border-purple-500/10 font-mono tracking-tighter">
                    {item.tag}
                  </span>
                  <span className="text-[8px] text-white/20 font-mono tracking-widest">{item.date}</span>
                </div>
                <h3 className="text-base md:text-lg font-serif text-white/80 group-hover/article:text-white transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-all border border-white/5">
                <ChevronRight size={16} className="text-white/10 group-hover:text-purple-400 transition-all" />
              </div>
            </div>
          ))
        }
      </div>

      <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between opacity-30 px-2">
        <p className="text-[9px] text-white font-mono uppercase tracking-[0.3em]">Encrypted_Database_01</p>
        <a href={NOTION_DATABASE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
          <ArrowUpRight size={14} />
        </a>
      </div>
    </BentoCard>
  );
};

export default ResearchCard;
