import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALPHA_BGS, RESEARCH_API_URL, INITIAL_ARTICLES } from './config/constants';

// --- 页面级组件 ---
import ArticleView from './components/ArticleView';

// --- 首页板块组件 ---
import HeroCard from './components/HeroCard';
import ResearchCard from './components/ResearchCard';
import CryptoNewsCard from './components/CryptoNewsCard';
import ToolsCard from './components/ToolsCard';
import GalleryCard from './components/GalleryCard';
import SocialCard from './components/SocialCard';
import GalleryModal from './components/GalleryModal';

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState('home');
  const [selectedId, setSelectedId] = useState(null);
  const [copyStatus, setCopyStatus] = useState(null);
  const [bgIndex, setBgIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [btcPrice, setBtcPrice] = useState(null);
  const [btcChange, setBtcChange] = useState(0);
  const [btcTrend, setBtcTrend] = useState("neutral");
  const [articles, setArticles] = useState([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [syncStatus, setSyncStatus] = useState("idle");

  useEffect(() => {
    setMounted(true);

    const bgTimer = setInterval(() => setBgIndex((prev) => (prev + 1) % ALPHA_BGS.length), 5000);

    const fetchMarket = async () => {
      try {
        const res = await fetch("https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT");
        const data = await res.json();
        setBtcPrice(parseFloat(data.lastPrice).toLocaleString(undefined, { minimumFractionDigits: 2 }));
        setBtcChange(parseFloat(data.priceChangePercent));
        setBtcTrend(parseFloat(data.priceChangePercent) >= 0 ? "bull" : "bear");
      } catch (e) {
        console.warn("[Market Restricted]");
      }
    };

    const syncResearch = async () => {
      setIsLoadingArticles(true);
      setSyncStatus("loading");
      console.log("[Notion Sync] Connecting to:", RESEARCH_API_URL);

      try {
        const res = await fetch(RESEARCH_API_URL);
        if (!res.ok) throw new Error(`HTTP_${res.status}`);
        const result = await res.json();

        if (result?.success && result?.data?.length > 0) {
          console.log("[Notion Sync] Data Decrypted successfully.");
          const formatted = result.data.map(article => ({
            id: String(article.id),
            title: String(article.title || "Untitled"),
            tag: String((article.tags && article.tags[0]) || "RESEARCH"),
            date: article.lastEdited ? new Date(article.lastEdited).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit' }) : "2025.01",
            content: String(article.summary || article.content || "Content decrypting...")
          }));
          setArticles(formatted.slice(0, 3));
          setSyncStatus("success");
        } else {
          throw new Error("EMPTY_OR_INVALID_DATA");
        }
      } catch (e) {
        console.warn("[Notion Sync] Terminal Interrupted, using local cache:", e.message);
        setArticles(INITIAL_ARTICLES);
        setSyncStatus("error");
      } finally {
        setIsLoadingArticles(false);
      }
    };

    fetchMarket();
    syncResearch();

    const marketInt = setInterval(fetchMarket, 5000);
    return () => {
      clearInterval(bgTimer);
      clearInterval(marketInt);
    };
  }, []);

  const handleCopy = (address, type) => {
    const el = document.createElement('textarea');
    el.value = address;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    setCopyStatus(type);
    document.body.removeChild(el);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const handleArticleClick = (id) => {
    setSelectedId(id);
    setView('article');
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#08080a] text-slate-200 selection:bg-purple-500/30 font-sans p-4 md:p-8 lg:p-12 overflow-x-hidden font-inter">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Noto+Serif+SC:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap');
        .font-serif { font-family: 'Noto Serif SC', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes aurora { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(2%, 2%) scale(1.03); } }
        .animate-aurora { animation: aurora 20s ease-in-out infinite; }
        .loading-shimmer { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent); background-size: 200% 100%; animation: shimmer 2s infinite; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.2); border-radius: 10px; }
      `}</style>

      {/* --- 全局动态背景 --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] left-[-5%] w-[60%] h-[60%] bg-purple-900/10 rounded-full blur-[140px] animate-aurora" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] bg-cyan-900/10 rounded-full blur-[140px] animate-aurora" style={{ animationDelay: '-10s' }} />
      </div>

      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto relative z-10 pt-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-min gap-6">
              {/* 1. Who I Am */}
              <HeroCard
                btcPrice={btcPrice}
                btcTrend={btcTrend}
                btcChange={btcChange}
                handleCopy={handleCopy}
                copyStatus={copyStatus}
              />

              {/* 2. 投研分析 */}
              <ResearchCard
                articles={articles}
                isLoadingArticles={isLoadingArticles}
                syncStatus={syncStatus}
                onArticleClick={handleArticleClick}
              />

              {/* 3. Crypto News */}
              <CryptoNewsCard bgIndex={bgIndex} />

              {/* 4. 常用工具 */}
              <ToolsCard />

              {/* 5. Fragments 画廊入口 */}
              <GalleryCard onOpen={() => setIsGalleryOpen(true)} />

              {/* 6. Find Me 社交链接 */}
              <SocialCard />
            </div>
          </motion.div>
        ) : (
          <ArticleView
            key="article"
            articleId={selectedId}
            currentArticles={articles}
            onBack={() => setView('home')}
          />
        )}
      </AnimatePresence>

      {/* --- 页脚 --- */}
      <footer className="mt-32 mb-16 flex flex-col items-center gap-6 opacity-20">
        <div className="h-[1px] w-12 bg-white/10" />
        <div className="text-center">
          <p className="text-[10px] tracking-[0.5em] uppercase text-white font-mono">Roy Huang ｜ ACCESS_LEVEL_01 ｜ 2025</p>
        </div>
      </footer>

      {/* --- 画廊模态框 --- */}
      <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
    </div>
  );
}
