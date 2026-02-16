import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin } from 'lucide-react';
import { BEIJING_JOURNEY } from '../config/constants';

const GalleryModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] bg-[#0a0a0c]/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="fixed top-8 right-8 text-white/40 hover:text-white transition-colors z-[1010] p-2 bg-white/5 rounded-full border border-white/10"
          >
            <X size={24} />
          </button>

          <div className="relative w-full max-w-6xl py-12">
            <div className="mb-12 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-6"
              >
                <div>
                  <h3 className="text-4xl md:text-7xl font-serif text-white mb-4 tracking-tighter italic">{BEIJING_JOURNEY.city}</h3>
                  <p className="text-white/40 font-inter text-sm md:text-base max-w-xl leading-relaxed">{BEIJING_JOURNEY.desc}</p>
                </div>
                <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 text-white/80 shadow-sm">
                  <MapPin size={18} className="text-purple-400" />
                  <span className="font-mono text-xs tracking-wider uppercase">{BEIJING_JOURNEY.coords}</span>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[60vh]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="md:col-span-7 rounded-[40px] overflow-hidden border border-white/10 group/img relative"
              >
                <img
                  src={BEIJING_JOURNEY.images[0]}
                  alt="Beijing Main"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </motion.div>

              <div className="md:col-span-5 flex flex-col gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex-1 rounded-[40px] overflow-hidden border border-white/10 group/img relative"
                >
                  <img
                    src={BEIJING_JOURNEY.images[1]}
                    alt="Beijing 1"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex-1 rounded-[40px] overflow-hidden border border-white/10 group/img relative"
                >
                  <img
                    src={BEIJING_JOURNEY.images[2]}
                    alt="Beijing 2"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryModal;
