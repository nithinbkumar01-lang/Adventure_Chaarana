

export const Background = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Desktop Landscape Background */}
      <div 
        className="hidden md:block absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2670")' }}
      />
      {/* Mobile Portrait Background */}
      <div 
        className="md:hidden absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519904981063-b0144236c283?auto=format&fit=crop&q=80&w=1000")' }}
      />
      {/* Overlay for legibility */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
    </div>
  );
};
