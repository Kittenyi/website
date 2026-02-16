import { motion, useMotionValue, useTransform } from 'framer-motion';

const BentoCard = ({ children, className = "", delay = 0, span = "col-span-1", onClick, glowSize = "500px" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`relative group rounded-[32px] overflow-hidden bg-[rgba(15,15,20,0.85)] border border-white/10 backdrop-blur-[20px] transition-all duration-700 hover:border-purple-500/40 ${span} ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 group-hover:opacity-100 transition duration-500"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(${glowSize} circle at ${x}px ${y}px, rgba(168, 85, 247, 0.15), transparent 70%)`
          )
        }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  );
};

export default BentoCard;
