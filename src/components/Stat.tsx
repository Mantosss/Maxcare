const Stat = () => {
  return (
    <div>
      {/* ── STATS ──────────────────────────────────────────────────────── */}
      <section className="py-16 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { value: "780K+", label: "Happy Patients" },
            { value: "250+", label: "Expert Doctors" },
            { value: "90+", label: "Awards Won" },
            { value: "100%", label: "Satisfaction" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-extrabold text-cyan-400">{s.value}</p>
              <p className="text-sm text-blue-200 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Stat;
