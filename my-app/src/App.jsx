import { useState, useEffect, useRef } from "react";

const MODELS = [
  {
    name: "S-Class",
    tagline: "The pinnacle of automotive luxury",
    desc: "Redefining first class. Every journey becomes a statement — whisper-quiet, impossibly smooth, technologically supreme.",
    badge: "SEDAN",
    color: "#B8966A",
  },
  {
    name: "EQS",
    tagline: "Electric. Silent. Extraordinary.",
    desc: "Zero emissions, infinite presence. The electric future of Mercedes-Benz arrives without compromise.",
    badge: "ELECTRIC",
    color: "#7AB3D0",
  },
  {
    name: "G-Class",
    tagline: "Born legendary. Still untamed.",
    desc: "Six decades of uncompromising off-road mastery wrapped in an icon that refuses to be anything but itself.",
    badge: "SUV",
    color: "#9B8B7A",
  },
  {
    name: "AMG GT",
    tagline: "Pure performance, no apologies.",
    desc: "Handcrafted in Affalterbach. The AMG GT doesn't just move — it tears reality apart at 630 horsepower.",
    badge: "PERFORMANCE",
    color: "#C0392B",
  },
];

const STATS = [
  { value: "137", label: "Years of Engineering" },
  { value: "2.4M+", label: "Vehicles Sold in 2024" },
  { value: "56", label: "Global Markets" },
  { value: "650+", label: "Patents Filed Annually" },
];

const PILLARS = [
  {
    num: "01",
    title: "Design Philosophy",
    body: "Sensual purity. Every curve is a conversation between beauty and function — nothing is accidental, nothing is excessive.",
  },
  {
    num: "02",
    title: "Engineering Mastery",
    body: "From the first internal combustion engine to today's adaptive AI suspension — we don't follow progress, we define it.",
  },
  {
    num: "03",
    title: "Safety Innovation",
    body: "Pre-Safe, Distronic, Night Vision. We invented active safety so the unexpected stays hypothetical.",
  },
  {
    num: "04",
    title: "Electrification",
    body: "The EQ family brings silence, range, and charging speeds that turn long journeys into long conversations.",
  },
];

const MARQUEE_ITEMS = [
  "S-CLASS", "AMG GT", "EQS", "G-CLASS", "C-CLASS", "GLE", "MAYBACH", "EQE", "CLA", "SL"
];

// Minimal SVG star logo
function StarLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="17" stroke="#B8966A" strokeWidth="1.5"/>
      <polygon
        points="18,6 20.5,14.5 29.5,14.5 22.5,20 25,28.5 18,23 11,28.5 13.5,20 6.5,14.5 15.5,14.5"
        fill="none"
        stroke="#B8966A"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Mercedes 3-pointed star SVG
function ThreeStar({ size = 60, color = "#B8966A" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="48" stroke={color} strokeWidth="2"/>
      <circle cx="50" cy="50" r="4" fill={color}/>
      {/* Three spokes */}
      <line x1="50" y1="50" x2="50" y2="5" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="50" y1="50" x2="91.3" y2="72.5" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="50" y1="50" x2="8.7" y2="72.5" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Outer ring detail */}
      <circle cx="50" cy="50" r="38" stroke={color} strokeWidth="0.5" strokeDasharray="4 6"/>
    </svg>
  );
}

// Car silhouette SVG (S-Class profile)
function CarSilhouette({ opacity = 1 }) {
  return (
    <svg viewBox="0 0 900 320" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 900, opacity }}>
      {/* Body */}
      <path
        d="M80 220 Q100 180 180 150 Q280 110 380 105 Q480 100 560 108 Q640 115 700 140 Q760 165 800 190 L820 220 Z"
        fill="#1a1a1a" stroke="#B8966A" strokeWidth="1.5"
      />
      {/* Roof */}
      <path
        d="M220 150 Q290 80 400 72 Q510 65 600 88 Q660 105 700 140"
        fill="none" stroke="#B8966A" strokeWidth="1.5"
      />
      {/* Windows */}
      <path d="M240 148 Q270 100 340 90 Q395 84 420 100 L420 145 Z" fill="#0a0a0a" stroke="#B8966A" strokeWidth="0.8"/>
      <path d="M425 145 L425 95 Q480 82 530 90 Q580 98 600 125 L600 148 Z" fill="#0a0a0a" stroke="#B8966A" strokeWidth="0.8"/>
      <path d="M605 148 L610 130 Q650 115 680 138 Z" fill="#0a0a0a" stroke="#B8966A" strokeWidth="0.8"/>
      {/* Wheels */}
      <circle cx="210" cy="225" r="42" fill="#111" stroke="#B8966A" strokeWidth="1.5"/>
      <circle cx="210" cy="225" r="26" fill="#0a0a0a" stroke="#888" strokeWidth="1"/>
      <circle cx="210" cy="225" r="8" fill="#B8966A"/>
      <circle cx="660" cy="225" r="42" fill="#111" stroke="#B8966A" strokeWidth="1.5"/>
      <circle cx="660" cy="225" r="26" fill="#0a0a0a" stroke="#888" strokeWidth="1"/>
      <circle cx="660" cy="225" r="8" fill="#B8966A"/>
      {/* Ground line */}
      <line x1="100" y1="267" x2="780" y2="267" stroke="#B8966A" strokeWidth="0.5" strokeDasharray="8 12"/>
      {/* Front detail */}
      <path d="M80 220 Q75 230 78 240 L160 240 Q120 235 80 220Z" fill="#222" stroke="#B8966A" strokeWidth="0.8"/>
      {/* Rear detail */}
      <path d="M820 220 Q835 230 830 240 L750 240 Q790 235 820 220Z" fill="#222" stroke="#B8966A" strokeWidth="0.8"/>
      {/* Headlight */}
      <ellipse cx="100" cy="210" rx="14" ry="8" fill="none" stroke="#B8966A" strokeWidth="1.2"/>
      {/* Taillight */}
      <rect x="795" y="200" width="18" height="10" rx="2" fill="none" stroke="#C0392B" strokeWidth="1.2"/>
    </svg>
  );
}

export default function App() {
  const [activeModel, setActiveModel] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", interest: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const heroRef = useRef(null);

  const handleFormChange = (e) => setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleFormSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
    setFormData({ name: "", email: "", phone: "", interest: "", message: "" });
  };

  useEffect(() => {
    const handler = () => {
      setScrollY(window.scrollY);
      setNavSolid(window.scrollY > 60);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Auto-cycle models
  useEffect(() => {
    const t = setInterval(() => setActiveModel(m => (m + 1) % MODELS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const model = MODELS[activeModel];

  return (
    <div style={{ background: "#0A0A0A", color: "#E8E8E8", fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        .nav-link {
          color: #C0C0C0;
          text-decoration: none;
          font-size: 12px;
          letter-spacing: 0.12em;
          font-weight: 500;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #B8966A; }

        .btn-gold {
          background: #B8966A;
          color: #0A0A0A;
          border: none;
          padding: 14px 32px;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          font-family: 'Inter', sans-serif;
        }
        .btn-gold:hover { background: #caa87e; transform: translateY(-1px); }

        .btn-outline {
          background: transparent;
          color: #E8E8E8;
          border: 1px solid rgba(232,232,232,0.3);
          padding: 13px 32px;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
          font-family: 'Inter', sans-serif;
        }
        .btn-outline:hover { border-color: #B8966A; color: #B8966A; }

        .marquee-track {
          display: flex;
          animation: marquee 24s linear infinite;
          white-space: nowrap;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .model-tab {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 10px 20px;
          transition: all 0.2s;
          border-bottom: 1px solid transparent;
        }

        .pillar-card {
          border: 1px solid rgba(232,232,232,0.07);
          padding: 40px 32px;
          transition: border-color 0.3s, transform 0.3s;
          background: rgba(255,255,255,0.015);
        }
        .pillar-card:hover {
          border-color: rgba(184,150,106,0.4);
          transform: translateY(-4px);
        }

        .stat-item {
          text-align: center;
          padding: 40px 20px;
          border-right: 1px solid rgba(232,232,232,0.08);
        }
        .stat-item:last-child { border-right: none; }

        @keyframes glow-pulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.28; transform: scale(1.04); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.8s ease forwards; }
        .fade-up-d1 { animation-delay: 0.1s; opacity: 0; }
        .fade-up-d2 { animation-delay: 0.25s; opacity: 0; }
        .fade-up-d3 { animation-delay: 0.4s; opacity: 0; }

        .contact-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(232,232,232,0.1);
          color: #E8E8E8;
          padding: 14px 18px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          resize: none;
        }
        .contact-input:focus {
          border-color: rgba(184,150,106,0.5);
          background: rgba(184,150,106,0.04);
        }
        .contact-input::placeholder { color: rgba(232,232,232,0.25); }
        select.contact-input option { background: #111; color: #E8E8E8; }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .success-toast {
          animation: slideIn 0.4s ease forwards;
        }
          .stat-item { border-right: none; border-bottom: 1px solid rgba(232,232,232,0.08); }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .pillars-grid { grid-template-columns: 1fr !important; }
          .models-grid { grid-template-columns: 1fr !important; }
          .hero-btns { flex-direction: column !important; }
          .nav-links-desktop { display: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px",
        height: 72,
        background: navSolid ? "rgba(10,10,10,0.96)" : "transparent",
        backdropFilter: navSolid ? "blur(20px)" : "none",
        borderBottom: navSolid ? "1px solid rgba(184,150,106,0.12)" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <ThreeStar size={38} color="#B8966A" />
          <div>
            <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 18, fontWeight: 600, letterSpacing: "0.1em", color: "#E8E8E8" }}>MERCEDES</div>
            <div style={{ fontSize: 9, letterSpacing: "0.22em", color: "#B8966A", marginTop: -2 }}>BENZ</div>
          </div>
        </div>

        {/* Desktop links */}
        <div className="nav-links-desktop" style={{ display: "flex", gap: 36 }}>
          {["Models", "Technology", "Electric", "Experience", "About"].map(l => (
            <a key={l} href={l === "About" ? "#" : "#"} className="nav-link">{l}</a>
          ))}
          <a href="#contact" className="nav-link" style={{ color: "#B8966A" }}>Contact</a>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="btn-outline" style={{ padding: "9px 22px" }}>Configure</button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "none" }}
          >☰</button>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden", paddingTop: 72 }}>
        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
          width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(184,150,106,0.12) 0%, transparent 70%)",
          animation: "glow-pulse 6s ease-in-out infinite",
          pointerEvents: "none",
        }}/>

        {/* Grid lines */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(184,150,106,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(184,150,106,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}/>

        <div style={{ position: "relative", padding: "0 48px 40px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }} className="fade-up fade-up-d1">
            <div style={{ width: 40, height: 1, background: "#B8966A" }}/>
            <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "#B8966A", textTransform: "uppercase" }}>Est. 1886 · Stuttgart</span>
          </div>

          <h1 className="fade-up fade-up-d2" style={{
            fontFamily: "'Cormorant Garant', serif",
            fontSize: "clamp(52px, 8vw, 120px)",
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            marginBottom: 32,
            color: "#E8E8E8",
          }}>
            The Best<br/>
            <em style={{ fontStyle: "italic", color: "#B8966A" }}>or Nothing.</em>
          </h1>

          <p className="fade-up fade-up-d3" style={{
            maxWidth: 540,
            fontSize: 16,
            lineHeight: 1.7,
            color: "rgba(232,232,232,0.55)",
            marginBottom: 44,
            fontWeight: 300,
          }}>
            For over a century, Mercedes-Benz has not merely made cars — it has shaped the very idea of what a car can be. Engineering as art. Precision as poetry.
          </p>

          <div className="hero-btns fade-up fade-up-d3" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button className="btn-gold">Explore Models</button>
            <button className="btn-outline">Watch Film</button>
          </div>
        </div>

        {/* Car illustration */}
        <div style={{
          position: "relative",
          padding: "0 24px",
          marginTop: 20,
          transform: `translateY(${scrollY * 0.08}px)`,
          transition: "transform 0.05s linear",
        }}>
          <CarSilhouette opacity={0.9} />
        </div>

        {/* Bottom label */}
        <div style={{
          position: "absolute", bottom: 32, right: 48,
          display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4,
        }}>
          <div style={{ fontSize: 10, letterSpacing: "0.18em", color: "rgba(232,232,232,0.3)", textTransform: "uppercase" }}>Scroll to explore</div>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(184,150,106,0.6), transparent)", marginLeft: "auto" }}/>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ overflow: "hidden", borderTop: "1px solid rgba(184,150,106,0.15)", borderBottom: "1px solid rgba(184,150,106,0.15)", padding: "18px 0", background: "rgba(184,150,106,0.03)" }}>
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{
              fontSize: 11, letterSpacing: "0.22em", color: "rgba(184,150,106,0.5)",
              marginRight: 60, textTransform: "uppercase", fontWeight: 500,
            }}>
              {item} <span style={{ color: "rgba(184,150,106,0.2)", margin: "0 28px 0 0" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section style={{ padding: "80px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", border: "1px solid rgba(232,232,232,0.07)" }}>
            {STATS.map((s, i) => (
              <div key={i} className="stat-item">
                <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 52, fontWeight: 300, color: "#B8966A", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 11, letterSpacing: "0.14em", color: "rgba(232,232,232,0.4)", textTransform: "uppercase", marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MERCEDES */}
      <section style={{ padding: "80px 48px 100px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 32, height: 1, background: "#B8966A" }}/>
            <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "#B8966A", textTransform: "uppercase" }}>Our Philosophy</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, gap: 32, flexWrap: "wrap" }}>
            <h2 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, lineHeight: 1.1, maxWidth: 500 }}>
              Engineered for those who<br/><em style={{ color: "#B8966A", fontStyle: "italic" }}>refuse to settle.</em>
            </h2>
            <p style={{ maxWidth: 380, fontSize: 15, lineHeight: 1.75, color: "rgba(232,232,232,0.5)", fontWeight: 300 }}>
              Excellence isn't a feature — it's the foundation. Every component, every stitch, every line of code that runs through our vehicles exists only if it passes the harshest standard in the industry.
            </p>
          </div>

          <div className="pillars-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(232,232,232,0.05)" }}>
            {PILLARS.map((p, i) => (
              <div key={i} className="pillar-card">
                <div style={{ fontSize: 11, letterSpacing: "0.14em", color: "rgba(184,150,106,0.5)", marginBottom: 24, fontWeight: 500 }}>{p.num}</div>
                <h3 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 22, fontWeight: 600, marginBottom: 16, lineHeight: 1.2 }}>{p.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(232,232,232,0.5)", fontWeight: 300 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODELS */}
      <section style={{ padding: "80px 48px 100px", background: "#080808" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 32, height: 1, background: "#B8966A" }}/>
            <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "#B8966A", textTransform: "uppercase" }}>The Lineup</span>
          </div>

          <h2 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 300, marginBottom: 52 }}>
            Choose your obsession.
          </h2>

          {/* Model tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid rgba(232,232,232,0.08)", marginBottom: 56, gap: 0, flexWrap: "wrap" }}>
            {MODELS.map((m, i) => (
              <button
                key={i}
                className="model-tab"
                onClick={() => setActiveModel(i)}
                style={{
                  color: activeModel === i ? "#E8E8E8" : "rgba(232,232,232,0.35)",
                  borderBottom: activeModel === i ? `2px solid ${m.color}` : "2px solid transparent",
                  fontWeight: activeModel === i ? 600 : 400,
                }}
              >
                {m.name}
              </button>
            ))}
          </div>

          {/* Active model */}
          <div className="models-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div style={{
                display: "inline-block",
                background: `rgba(${model.badge === "ELECTRIC" ? "122,179,208" : model.badge === "PERFORMANCE" ? "192,57,43" : "184,150,106"}, 0.12)`,
                color: model.color,
                padding: "4px 14px",
                fontSize: 10,
                letterSpacing: "0.18em",
                marginBottom: 24,
                border: `1px solid ${model.color}33`,
              }}>
                {model.badge}
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 300, marginBottom: 20, lineHeight: 1 }}>
                {model.name}
              </h3>
              <p style={{ fontSize: 18, color: "rgba(232,232,232,0.45)", fontFamily: "'Cormorant Garant', serif", fontStyle: "italic", marginBottom: 20 }}>
                {model.tagline}
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(232,232,232,0.45)", fontWeight: 300, maxWidth: 420, marginBottom: 36 }}>
                {model.desc}
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn-gold">Explore {model.name}</button>
                <button className="btn-outline">Build Yours</button>
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <div style={{
                width: "100%", aspectRatio: "16/9",
                background: `radial-gradient(ellipse at center, ${model.color}15, transparent 70%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid rgba(232,232,232,0.06)",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.06 }}>
                  <ThreeStar size={280} color={model.color} />
                </div>
                <div style={{ position: "relative", zIndex: 1, padding: "0 24px", width: "100%" }}>
                  <CarSilhouette opacity={0.85} />
                </div>
                {/* Model name watermark */}
                <div style={{
                  position: "absolute", bottom: 16, right: 20,
                  fontFamily: "'Cormorant Garant', serif",
                  fontSize: 11, letterSpacing: "0.2em",
                  color: "rgba(232,232,232,0.2)",
                  textTransform: "uppercase",
                }}>
                  Mercedes-Benz {model.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY STRIP */}
      <section style={{ padding: "100px 48px", borderTop: "1px solid rgba(184,150,106,0.1)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 80, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: "0 0 320px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 1, background: "#B8966A" }}/>
              <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "#B8966A", textTransform: "uppercase" }}>Intelligence</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, lineHeight: 1.1 }}>
              The car that thinks<br/><em style={{ fontStyle: "italic", color: "#B8966A" }}>alongside you.</em>
            </h2>
          </div>

          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
            {[
              { title: "MBUX Hyperscreen", desc: "56 inches of pure brilliance spanning your entire dashboard with AI-powered anticipation." },
              { title: "Pre-Safe® System", desc: "Detects danger fractions before you can, initiating up to 400 protective measures instantly." },
              { title: "Energizing Comfort", desc: "Synchronized lighting, fragrance, massage, and music adapt to your biometric state." },
              { title: "Digital Light", desc: "High-definition headlights project navigation and warnings directly onto the road." },
            ].map((t, i) => (
              <div key={i}>
                <div style={{ width: 32, height: 1, background: "rgba(184,150,106,0.4)", marginBottom: 16 }}/>
                <h4 style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", marginBottom: 10, color: "#E8E8E8" }}>{t.title}</h4>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(232,232,232,0.4)", fontWeight: 300 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ELECTRIC CTA */}
      <section style={{
        margin: "0 48px 80px",
        padding: "80px 64px",
        background: "linear-gradient(135deg, #0d0d0d 0%, #111 60%, rgba(122,179,208,0.05) 100%)",
        border: "1px solid rgba(122,179,208,0.12)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -60, right: -60, width: 320, height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(122,179,208,0.08), transparent 70%)",
        }}/>
        <div style={{ position: "relative", maxWidth: 560 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.24em", color: "#7AB3D0", textTransform: "uppercase", display: "block", marginBottom: 20 }}>EQ · Electric Intelligence</span>
          <h2 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 300, marginBottom: 20, lineHeight: 1.1 }}>
            The future arrived.<br/><em style={{ fontStyle: "italic", color: "#7AB3D0" }}>Silently.</em>
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(232,232,232,0.45)", fontWeight: 300, marginBottom: 36 }}>
            Up to 770 km of range. 200 kW DC charging. An interior so quiet you'll hear your own thoughts. Meet the EQ family.
          </p>
          <button className="btn-gold" style={{ background: "#7AB3D0", color: "#0A0A0A" }}>Discover EQ</button>
        </div>
      </section>

      {/* CONTACT US */}
      <section id="contact" style={{ padding: "100px 48px", background: "#080808", borderTop: "1px solid rgba(184,150,106,0.1)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 32, height: 1, background: "#B8966A" }}/>
            <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "#B8966A", textTransform: "uppercase" }}>Get In Touch</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 32, marginBottom: 64 }}>
            <h2 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, lineHeight: 1.05 }}>
              We'd love to hear<br/><em style={{ fontStyle: "italic", color: "#B8966A" }}>from you.</em>
            </h2>
            <p style={{ maxWidth: 360, fontSize: 14, lineHeight: 1.75, color: "rgba(232,232,232,0.4)", fontWeight: 300 }}>
              Whether you're configuring your next vehicle, booking a test drive, or simply seeking information — our team is ready to assist with the same precision we put into every car.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 64, alignItems: "start" }}>

            {/* Left — contact info */}
            <div>
              <div style={{ marginBottom: 48 }}>
                {[
                  {
                    icon: "📍",
                    label: "Headquarters",
                    value: "Mercedesstraße 120\n70372 Stuttgart, Germany",
                  },
                  {
                    icon: "📞",
                    label: "Sales Enquiry",
                    value: "+49 711 17-0",
                  },
                  {
                    icon: "✉️",
                    label: "Email Us",
                    value: "contact@mercedes-benz.com",
                  },
                  {
                    icon: "🕐",
                    label: "Showroom Hours",
                    value: "Mon – Sat: 9:00 AM – 7:00 PM\nSun: 11:00 AM – 5:00 PM",
                  },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 20, marginBottom: 32, paddingBottom: 32, borderBottom: i < 3 ? "1px solid rgba(232,232,232,0.06)" : "none" }}>
                    <div style={{ fontSize: 18, marginTop: 2, flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: "0.16em", color: "#B8966A", textTransform: "uppercase", marginBottom: 6, fontWeight: 500 }}>{item.label}</div>
                      <div style={{ fontSize: 14, color: "rgba(232,232,232,0.6)", fontWeight: 300, lineHeight: 1.6, whiteSpace: "pre-line" }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div>
                <div style={{ fontSize: 10, letterSpacing: "0.16em", color: "#B8966A", textTransform: "uppercase", marginBottom: 16, fontWeight: 500 }}>Follow Us</div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {["Instagram", "Twitter / X", "YouTube", "LinkedIn"].map(s => (
                    <a key={s} href="#" style={{
                      textDecoration: "none",
                      fontSize: 11, letterSpacing: "0.1em",
                      color: "rgba(232,232,232,0.4)",
                      border: "1px solid rgba(232,232,232,0.1)",
                      padding: "6px 14px",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = "#B8966A"; e.currentTarget.style.color = "#B8966A"; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(232,232,232,0.1)"; e.currentTarget.style.color = "rgba(232,232,232,0.4)"; }}
                    >{s}</a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(184,150,106,0.1)", padding: "48px 40px", position: "relative" }}>

              {/* Corner accent */}
              <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, borderTop: "2px solid #B8966A", borderRight: "2px solid #B8966A" }}/>
              <div style={{ position: "absolute", bottom: 0, left: 0, width: 60, height: 60, borderBottom: "2px solid rgba(184,150,106,0.3)", borderLeft: "2px solid rgba(184,150,106,0.3)" }}/>

              {formSubmitted ? (
                <div className="success-toast" style={{ textAlign: "center", padding: "60px 20px" }}>
                  <ThreeStar size={56} color="#B8966A" />
                  <h3 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 32, fontWeight: 300, margin: "24px 0 12px" }}>
                    Message Received
                  </h3>
                  <p style={{ fontSize: 14, color: "rgba(232,232,232,0.4)", lineHeight: 1.7 }}>
                    Thank you for reaching out. A Mercedes-Benz representative will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 28, fontWeight: 300, marginBottom: 32 }}>Send a Message</h3>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ fontSize: 10, letterSpacing: "0.14em", color: "rgba(232,232,232,0.35)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Full Name *</label>
                      <input
                        className="contact-input"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 10, letterSpacing: "0.14em", color: "rgba(232,232,232,0.35)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email Address *</label>
                      <input
                        className="contact-input"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ fontSize: 10, letterSpacing: "0.14em", color: "rgba(232,232,232,0.35)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Phone Number</label>
                      <input
                        className="contact-input"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 10, letterSpacing: "0.14em", color: "rgba(232,232,232,0.35)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>I'm Interested In</label>
                      <select
                        className="contact-input"
                        name="interest"
                        value={formData.interest}
                        onChange={handleFormChange}
                        style={{ appearance: "none", cursor: "pointer" }}
                      >
                        <option value="">Select a model</option>
                        <option>S-Class</option>
                        <option>E-Class</option>
                        <option>G-Class</option>
                        <option>AMG GT</option>
                        <option>EQS (Electric)</option>
                        <option>GLE SUV</option>
                        <option>Mercedes-Maybach</option>
                        <option>General Enquiry</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <label style={{ fontSize: 10, letterSpacing: "0.14em", color: "rgba(232,232,232,0.35)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Your Message *</label>
                    <textarea
                      className="contact-input"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="Tell us how we can assist you..."
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                    <p style={{ fontSize: 11, color: "rgba(232,232,232,0.2)", fontWeight: 300 }}>* Required fields</p>
                    <button
                      className="btn-gold"
                      onClick={handleFormSubmit}
                      style={{ padding: "14px 40px", opacity: (!formData.name || !formData.email || !formData.message) ? 0.5 : 1 }}
                    >
                      Send Message
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{
        textAlign: "center", padding: "120px 48px",
        background: "linear-gradient(to bottom, #080808, #0A0A0A)",
      }}>
        <div style={{ display: "inline-block", marginBottom: 40 }}>
          <ThreeStar size={72} color="#B8966A" />
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 300, marginBottom: 24, lineHeight: 1 }}>
          Ready to drive the finest?
        </h2>
        <p style={{ fontSize: 16, color: "rgba(232,232,232,0.4)", marginBottom: 48, fontWeight: 300, maxWidth: 400, margin: "0 auto 48px" }}>
          Locate your nearest Mercedes-Benz showroom or begin configuring your perfect vehicle today.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <button className="btn-gold" style={{ padding: "16px 44px" }}>Find a Dealer</button>
          <button className="btn-outline" style={{ padding: "16px 44px" }}>Configure Online</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(184,150,106,0.1)", padding: "60px 48px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, marginBottom: 60 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <ThreeStar size={40} color="#B8966A" />
                <div>
                  <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 20, fontWeight: 600, letterSpacing: "0.1em" }}>MERCEDES-BENZ</div>
                  <div style={{ fontSize: 9, letterSpacing: "0.22em", color: "#B8966A" }}>THE BEST OR NOTHING</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "rgba(232,232,232,0.3)", fontWeight: 300, lineHeight: 1.6, maxWidth: 280 }}>
                Where engineering meets artistry. Over 137 years of relentless pursuit of perfection.
              </p>
            </div>

            {[
              { title: "Vehicles", links: ["S-Class", "E-Class", "GLE", "AMG GT", "EQS", "G-Class"] },
              { title: "Ownership", links: ["Finance", "Insurance", "Service", "Parts", "Accessories"] },
              { title: "Company", links: ["About", "Innovation", "Sustainability", "Careers", "Press"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize: 11, letterSpacing: "0.14em", color: "#B8966A", textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>{col.title}</div>
                {col.links.map(l => (
                  <div key={l} style={{ marginBottom: 10 }}>
                    <a href="#" style={{ textDecoration: "none", fontSize: 13, color: "rgba(232,232,232,0.4)", fontWeight: 300, transition: "color 0.2s" }}
                       onMouseOver={e => e.target.style.color = "#B8966A"}
                       onMouseOut={e => e.target.style.color = "rgba(232,232,232,0.4)"}
                    >{l}</a>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(232,232,232,0.05)", paddingTop: 28, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 12, color: "rgba(232,232,232,0.2)" }}>© 2026 Mercedes-Benz AG. All rights reserved.</span>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy", "Legal", "Cookies", "Sitemap"].map(l => (
                <a key={l} href="#" style={{ textDecoration: "none", fontSize: 12, color: "rgba(232,232,232,0.2)", letterSpacing: "0.08em" }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
