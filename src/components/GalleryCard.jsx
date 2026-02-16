import { Camera } from 'lucide-react';
import { BEIJING_JOURNEY } from '../config/constants';
import BentoCard from './ui/BentoCard';
import SectionTitle from './ui/SectionTitle';

const GalleryCard = ({ onOpen }) => {
  return (
    <BentoCard
      span="md:col-span-1"
      className="p-0 relative group min-h-[220px] cursor-pointer"
      onClick={onOpen}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent z-10" />
      <div className="p-8 relative z-20 h-full flex flex-col justify-end">
        <SectionTitle icon={Camera}>Fragments</SectionTitle>
        <p className="text-xl font-serif italic text-white/70 mb-2 leading-none">"Noise into Logic."</p>
      </div>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:scale-110 transition-all duration-700"
        style={{ backgroundImage: `url(${BEIJING_JOURNEY.images[0]})` }}
      />
    </BentoCard>
  );
};

export default GalleryCard;
