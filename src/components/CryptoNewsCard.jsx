import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { ALPHA_BGS } from '../config/constants';
import BentoCard from './ui/BentoCard';

const CryptoNewsCard = ({ bgIndex }) => {
  return (
    <BentoCard
      span="md:col-span-1"
      className="h-full flex flex-col items-center justify-center cursor-pointer min-h-[160px]"
      onClick={() => window.open('https://t.me/CryptoMarketAggregator', '_blank')}
    >
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${ALPHA_BGS[bgIndex]})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      </div>
      <div className="relative z-10 text-center p-6">
        <Zap size={28} className="mx-auto text-yellow-500 mb-4" fill="currentColor" />
        <p className="text-[10px] font-bold text-white tracking-[0.3em] uppercase">Crypto News</p>
      </div>
    </BentoCard>
  );
};

export default CryptoNewsCard;
