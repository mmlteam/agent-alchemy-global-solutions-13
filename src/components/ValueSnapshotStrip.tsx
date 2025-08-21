const ValueSnapshotStrip = () => {
  return (
    <section className="py-section-sm bg-[#1E293B]">
      <div className="container mx-auto px-6">
        <div className="text-center text-white">
          <div className="flex flex-wrap justify-center items-center gap-8 text-lg font-medium">
            <div className="flex items-center gap-2">
              <span>⏱</span>
              <span>87% tasks automated</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-white/50 rounded-full"></div>
            <div className="flex items-center gap-2">
              <span>💰</span>
              <span>6.3× ROI in 60 days</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-white/50 rounded-full"></div>
            <div className="flex items-center gap-2">
              <span>⚡</span>
              <span>Launch in &lt; 30 days</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSnapshotStrip;