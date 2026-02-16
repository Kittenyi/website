import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Loader2, WifiOff, Clock } from 'lucide-react';
import { ARTICLE_DETAIL_API, INITIAL_ARTICLES } from '../config/constants';
import BentoCard from './ui/BentoCard';

const ArticleView = ({ articleId, onBack, currentArticles = [] }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetail = async () => {
      setLoading(true);
      setError(null);

      const baseInfo = [...currentArticles, ...INITIAL_ARTICLES].find(a => String(a.id) === String(articleId));
      if (baseInfo) setData(baseInfo);

      try {
        const res = await fetch(`${ARTICLE_DETAIL_API}${articleId}`);
        if (!res.ok) throw new Error("CORS_OR_NETWORK_ERROR");
        const result = await res.json();
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error("API_RETURNED_FALSE");
        }
      } catch (e) {
        console.error("[Article Sync Error]:", e);
        setError("LINK_OFFLINE_OR_CORS");
      } finally {
        setLoading(false);
      }
    };

    loadDetail();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [articleId, currentArticles]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="max-w-4xl mx-auto pt-10 pb-32 px-4 md:px-0 relative z-20"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white/40 hover:text-purple-400 transition-all mb-12 group px-4 py-2 rounded-xl hover:bg-white/5 active:scale-95"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-bold uppercase tracking-[0.2em] font-mono font-bold italic">Terminal_Return</span>
      </button>

      <BentoCard className="p-8 md:p-16 border-purple-500/20 shadow-[0_0_80px_rgba(168,85,247,0.1)]">
        {loading && !data ? (
          <div className="flex flex-col items-center justify-center py-40 gap-8">
            <Loader2 className="animate-spin text-purple-500" size={48} />
            <p className="text-[10px] font-mono text-white/20 animate-pulse tracking-[0.5em] uppercase">Syncing_Decrypted_Node</p>
          </div>
        ) : (
          <article className="relative">
            {error && (
              <div className="mb-12 px-6 py-4 rounded-2xl bg-red-500/5 border border-red-500/20 text-red-400 text-[11px] font-mono flex items-center gap-3">
                <WifiOff size={16} /> [SYSTEM]: {error} - DISPLAYING_CACHED_STREAM
              </div>
            )}

            <header className="mb-16 border-b border-white/5 pb-16">
              <div className="flex flex-wrap items-center gap-5 mb-10">
                <span className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-[10px] font-black text-purple-400 uppercase tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  {typeof data?.tag === 'string' ? data.tag : "DEEP_RESEARCH"}
                </span>
                <span className="text-[10px] text-white/30 font-mono flex items-center gap-2">
                  <Clock size={12} className="text-purple-500/50" /> {data?.date || "2025.XX"}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-black text-white leading-[1.1] mb-6 drop-shadow-2xl tracking-tighter">
                {String(data?.title || "Untitled Transmission")}
              </h1>
            </header>

            <div className="article-body text-lg md:text-xl text-white/80 font-serif leading-[1.8] space-y-12 prose prose-invert max-w-none">
              {data?.content ? (
                <div dangerouslySetInnerHTML={{ __html: String(data.content) }} />
              ) : (
                <div className="py-20 flex flex-col gap-6 opacity-10">
                  <div className="h-6 w-full bg-white rounded-lg animate-pulse" />
                  <div className="h-6 w-5/6 bg-white rounded-lg animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="h-6 w-4/6 bg-white rounded-lg animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
            </div>

            <footer className="mt-32 pt-16 border-t border-white/5 flex flex-col items-center gap-8 opacity-40">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_15px_#a855f7] animate-ping" />
              <p className="text-[10px] font-mono uppercase tracking-[0.6em] text-white/20 font-bold">End of Encrypted Stream</p>
            </footer>
          </article>
        )}
      </BentoCard>
    </motion.div>
  );
};

export default ArticleView;
