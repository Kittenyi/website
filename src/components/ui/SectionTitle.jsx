const SectionTitle = ({ children, icon: Icon, isHighlighted = false }) => (
  <h2 className={`font-bold tracking-[0.3em] uppercase mb-6 px-2 flex items-center gap-2 transition-all duration-700 ${
    isHighlighted 
      ? "text-[12px] text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,1)]" 
      : "text-[10px] text-white/30"
  }`}>
    {Icon && <Icon size={isHighlighted ? 15 : 12} strokeWidth={3} />}
    {children}
  </h2>
);

export default SectionTitle;
