import { motion } from 'framer-motion';
import { Twitter, Send, Book, Disc, Globe } from 'lucide-react';
import { SOCIAL_LINKS } from '../config/constants';
import BentoCard from './ui/BentoCard';
import SectionTitle from './ui/SectionTitle';

const ICON_MAP = {
  Twitter: <Twitter size={18} />,
  Telegram: <Send size={18} />,
  Red: <Book size={18} />,
  Discord: <Disc size={18} />
};

const SocialCard = () => {
  return (
    <BentoCard span="md:col-span-1" className="p-8 flex flex-col justify-between">
      <SectionTitle icon={Globe}>Find Me</SectionTitle>
      <div className="grid grid-cols-2 gap-4">
        {SOCIAL_LINKS.map((social, i) => (
          <motion.a
            key={i}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-purple-500/10 transition-colors text-white/30 hover:text-white"
          >
            {ICON_MAP[social.label]}
            <span className="text-[8px] mt-2 uppercase font-bold tracking-widest opacity-40 font-mono">{social.label}</span>
          </motion.a>
        ))}
      </div>
    </BentoCard>
  );
};

export default SocialCard;
