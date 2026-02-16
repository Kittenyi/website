import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const RealTimeCyberKLine = ({ currentPrice }) => {
  const [candles, setCandles] = useState([]);
  const lastPriceRef = useRef(null);

  useEffect(() => {
    if (!currentPrice) return;

    const priceNum = parseFloat(currentPrice.replace(/,/g, ''));
    if (lastPriceRef.current === null) {
      const initial = Array.from({ length: 45 }).map((_, i) => ({
        id: `init-${i}`,
        open: 50,
        close: 50 + (Math.random() - 0.5) * 35,
        isBull: Math.random() > 0.5
      }));
      setCandles(initial);
      lastPriceRef.current = priceNum;
      return;
    }

    const ratio = (priceNum - lastPriceRef.current) / lastPriceRef.current;
    const change = ratio * 100000;
    const newCandle = {
      id: Date.now(),
      open: 50,
      close: 50 + change,
      isBull: priceNum >= lastPriceRef.current
    };

    setCandles(prev => [...prev.slice(1), newCandle]);
    lastPriceRef.current = priceNum;
  }, [currentPrice]);

  return (
    <div className="absolute inset-0 z-0 opacity-30 pointer-events-none overflow-hidden select-none">
      <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <defs>
          <filter id="kGlow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {candles.map((c, i) => {
          const color = c.isBull ? '#00ff9d' : '#ff0055';
          const y = 100 - Math.max(c.open, c.close);
          const h = Math.max(2.5, Math.abs(c.open - c.close));
          return (
            <motion.g key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <rect x={i * 22 + 4} y={y} width="14" height={h} fill={color} style={{ filter: 'url(#kGlow)' }} opacity="0.8" />
              <rect x={i * 22 + 4} y={y} width="14" height="1.5" fill="white" opacity="0.2" />
            </motion.g>
          );
        })}
      </svg>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
  );
};

export default RealTimeCyberKLine;
