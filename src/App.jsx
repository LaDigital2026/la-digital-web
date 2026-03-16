// v5 - mobile popups, navbar spacing, hero margins
import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";

const SLACK_CHANNEL_ID = "C06LB0SMXPV";

/* ═══ TOKENS ═══ */
const t = {
  bg: "#FFFFFF", bgAlt: "#F5F5F2", text: "#1A1A1A", textMuted: "#7A7A72",
  accent: "#5A9A6E", accentLight: "#5A9A6E10", accentMid: "#5A9A6E20",
  accentHover: "#4A8A5E", border: "#E8E8E4", card: "#FFFFFF",
  dark: "#141413", darkCard: "#1F1F1D",
};


const LOGO = "data:image/png;base64,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";

/* ═══ CONTENT ═══ */
const defaultContent = {
  seo: {
    metaTitle: "LA DIGITAL | Agencia Shopify, Meta Ads, Google Ads e IA para eCommerce",
    metaDescription: "Agencia eCommerce especializada en desarrollo Shopify, campañas en Meta Ads y Google Ads, e inteligencia artificial aplicada a tiendas online. Basque Country, España.",
    h1: "Agencia eCommerce Shopify, publicidad digital e inteligencia artificial para marcas que quieren escalar",
    h2Services: "Servicios de desarrollo Shopify, gestión de Meta Ads y Google Ads, y consultoría IA",
    h2Tech: "Plataformas y herramientas que dominamos",
    h2Process: "Cómo trabajamos: del análisis al crecimiento de tu eCommerce",
    h2Cases: "Casos de éxito reales con nuestros clientes eCommerce",
    h2Contact: "Solicita presupuesto para tu proyecto Shopify o eCommerce",
  },
  hero: { tag: "Agencia Shopify · Meta Ads · Google Ads · IA", titleLight: "Desarrollo eCommerce en Shopify,", titleBold: "publicidad digital e IA", subtitle: "Agencia especializada en Shopify, campañas en Meta Ads y Google Ads, e inteligencia artificial aplicada a marcas que quieren escalar su negocio online." },
  services: [
    { icon: "◇", title: "Shopify Dev", sub: "Desarrollo & Migración", short: "Tiendas Shopify optimizadas para conversión. Diseño custom e integraciones.", tags: ["Desarrollo custom", "Migración", "Optimización"], detail: { title: "Desarrollo Shopify", body: "Creamos tiendas Shopify desde cero o migramos tu eCommerce actual con cero pérdida de SEO. Temas custom, integraciones de pago, logística y ERP.", bullets: ["Diseño y desarrollo custom de themes", "Migración desde cualquier plataforma", "Integraciones con ERP, CRM y logística", "Optimización de velocidad y conversión", "Soporte post-lanzamiento"] } },
    { icon: "◎", title: "PPC Manager", sub: "Meta Ads & Google Ads", short: "Gestión de campañas con foco en ROAS. Estrategia, creatividades y optimización.", tags: ["Meta Ads", "Google Ads", "ROAS"], detail: { title: "Publicidad Digital", body: "Campañas en Meta Ads y Google Ads con enfoque full-funnel. Desde awareness hasta retargeting.", bullets: ["Estrategia full-funnel personalizada", "Creatividades y copy optimizados", "A/B testing continuo", "Reportes semanales", "Optimización de ROAS y CAC"] } },
    { icon: "⬡", title: "AI Grow", sub: "IA Aplicada a Negocio", short: "Inteligencia artificial integrada en tus procesos para escalar más rápido.", tags: ["Automatización", "Predicción", "Personalización"], detail: { title: "IA para tu Negocio", body: "Aplicamos IA donde más impacto genera: automatización, análisis predictivo y personalización.", bullets: ["Automatización de workflows con IA", "Análisis predictivo de demanda", "Personalización de experiencia", "Chatbots inteligentes", "Integración con herramientas actuales"] } },
    { icon: "△", title: "Consultoría", sub: "Estrategia eCommerce", short: "Análisis profundo y hoja de ruta para escalar con datos y estrategia.", tags: ["Auditoría", "Roadmap", "KPIs"], detail: { title: "Consultoría Estratégica", body: "Radiografía completa de tu negocio digital: competencia, auditoría técnica, funnel y KPIs.", bullets: ["Auditoría técnica y de UX", "Análisis competitivo", "Definición de KPIs", "Roadmap estratégico", "Seguimiento trimestral"] } },
  ],
  steps: [
    { n: "01", title: "Descubrimiento", desc: "Analizamos tu negocio, objetivos y competencia." },
    { n: "02", title: "Propuesta", desc: "Plan a medida con timeline, KPIs y presupuesto." },
    { n: "03", title: "Ejecución", desc: "Comunicación constante vía Slack y sprints semanales." },
    { n: "04", title: "Crecimiento", desc: "Optimización basada en datos. Iteramos y escalamos." },
  ],
  cases: [
    { brand: "Batela 1991", tag: "Shopify + Apps IA", metric: 180, metricPrefix: "+", metricSuffix: "%", metricLabel: "tráfico orgánico", desc: "Moda y decoración náutica desde el País Vasco. Gestión integral de dos tiendas Shopify, SEO multiidioma (ES/EN/FR), optimización de fichas de producto y creación de apps internas con IA.", period: "Proyecto continuo", logoUrl: "" },
    { brand: "Petite Marmotte", tag: "Shopify + Migración", metric: 0, metricPrefix: "", metricSuffix: "", metricLabel: "migración en curso", desc: "Marca de productos para bebés en algodón orgánico con 75K seguidores en Instagram. Migración de PrestaShop a Shopify, rediseño de experiencia de compra y estrategia de marketing digital.", period: "En curso", logoUrl: "" },
    { brand: "Tantä Rainwear", tag: "eCommerce + PPC", metric: 6.8, metricPrefix: "", metricSuffix: "x", metricLabel: "ROAS medio", desc: "Chubasqueros e impermeables premium nacidos en el País Vasco. Gestión de campañas en Meta Ads y Google Ads con un crecimiento de ventas anual del 70%.", period: "Proyecto continuo", logoUrl: "" },
  ],
  contact: { tag: "Contacto", title: "Cuéntanos", titleBold: "tu proyecto", subtitle: "Nuestro equipo recibe tu mensaje al instante y te contactamos en menos de 24 horas." },
};

const ContentCtx = createContext();

/* ═══ HOOKS ═══ */
function useInView(th = 0.1) {
  const ref = useRef(null); const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } }, { threshold: th }); o.observe(el); return () => o.disconnect(); }, [th]);
  return [ref, v];
}

/* ═══ ANIMATION COMPONENTS ═══ */

// Fade up (basic)
function FadeUp({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView(0.06);
  return <div ref={ref} style={{ ...style, opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(36px)", transition: `opacity .8s cubic-bezier(.16,1,.3,1) ${delay}s, transform .8s cubic-bezier(.16,1,.3,1) ${delay}s` }}>{children}</div>;
}

// Slide from left
function SlideLeft({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView(0.06);
  return <div ref={ref} style={{ ...style, opacity: v ? 1 : 0, transform: v ? "translateX(0)" : "translateX(-60px)", transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${delay}s, transform .9s cubic-bezier(.16,1,.3,1) ${delay}s` }}>{children}</div>;
}

// Slide from right
function SlideRight({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView(0.06);
  return <div ref={ref} style={{ ...style, opacity: v ? 1 : 0, transform: v ? "translateX(0)" : "translateX(60px)", transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${delay}s, transform .9s cubic-bezier(.16,1,.3,1) ${delay}s` }}>{children}</div>;
}

// Scale in
function ScaleIn({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView(0.06);
  return <div ref={ref} style={{ ...style, opacity: v ? 1 : 0, transform: v ? "scale(1)" : "scale(0.9)", transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}s, transform .7s cubic-bezier(.16,1,.3,1) ${delay}s` }}>{children}</div>;
}

// Word-by-word reveal
function WordReveal({ text, bold = false, color = t.text, delay = 0, fontSize = "clamp(26px,4.5vw,44px)" }) {
  const [ref, v] = useInView(0.1);
  const words = text.split(" ");
  return (
    <span ref={ref} style={{ display: "inline" }}>
      {words.map((w, i) => (
        <span key={i} style={{
          display: "inline-block", marginRight: "0.28em",
          opacity: v ? 1 : 0,
          transform: v ? "translateY(0) rotateX(0deg)" : "translateY(18px) rotateX(-40deg)",
          transition: `opacity .5s cubic-bezier(.16,1,.3,1) ${delay + i * 0.06}s, transform .6s cubic-bezier(.16,1,.3,1) ${delay + i * 0.06}s`,
          fontWeight: bold ? 500 : 300, color, fontSize, letterSpacing: "-0.03em", lineHeight: 1.15,
        }}>{w}</span>
      ))}
    </span>
  );
}

// Animated counter
function AnimCounter({ value, prefix = "", suffix = "", duration = 1800, style = {} }) {
  const [ref, v] = useInView(0.2);
  const [display, setDisplay] = useState(0);
  const isFloat = value % 1 !== 0;
  useEffect(() => {
    if (!v) return;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(isFloat ? parseFloat((value * eased).toFixed(1)) : Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [v, value, duration, isFloat]);
  return <span ref={ref} style={style}>{prefix}{display}{suffix}</span>;
}

// Line reveal (horizontal line that grows)
function LineReveal({ color = t.accent, delay = 0, width = "100%", height = 1 }) {
  const [ref, v] = useInView(0.1);
  return <div ref={ref} style={{ width, height, background: color, opacity: 0.3, transform: v ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: `transform 1s cubic-bezier(.16,1,.3,1) ${delay}s` }} />;
}

// Stagger container wrapper — just provides delay math
function staggerDelay(index, base = 0.08) { return index * base; }

function ArrowR({ s = 14, c = "currentColor" }) { return <svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>; }

/* ═══ FONTS ═══ */
function Fonts() {
  useEffect(() => {
    const l = document.createElement("link"); l.href = "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap"; l.rel = "stylesheet"; document.head.appendChild(l);
    const s = document.createElement("style");
    s.textContent = `*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}body{margin:0;background:#FFFFFF;font-family:'DM Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased}::selection{background:${t.accent}20}@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}`;
    document.head.appendChild(s);
    return () => { document.head.removeChild(l); document.head.removeChild(s); };
  }, []); return null;
}

/* ═══ NAVBAR ═══ */
function Navbar({ onContact, isMobile }) {
  const [sc, setSc] = useState(false);
  useEffect(() => { const h = () => setSc(window.scrollY > 50); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      height: isMobile ? 50 : 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: isMobile ? "0 12px" : "0 clamp(20px,5vw,72px)",
      background: sc ? "rgba(255,255,255,0.88)" : t.bg,
      backdropFilter: sc ? "blur(24px) saturate(180%)" : "none",
      borderBottom: sc ? `1px solid ${t.border}` : "1px solid transparent",
      transition: "all .4s ease",
    }}>
      <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
        <img src={LOGO} alt="LA DIGITAL" style={{ height: isMobile ? 30 : 40, objectFit: "contain" }} />
      </div>
      <button onClick={onContact} style={{
        fontSize: isMobile ? 11 : 12.5, fontWeight: 500, letterSpacing: "0.02em",
        color: "#fff", background: t.text, border: "none", borderRadius: 100,
        padding: isMobile ? "7px 14px" : "8px 20px",
        cursor: "pointer", transition: "all .3s ease", flexShrink: 0,
      }}
        onMouseEnter={e => e.currentTarget.style.background = t.accent}
        onMouseLeave={e => e.currentTarget.style.background = t.text}
      >Hablemos</button>
    </nav>
  );
}

/* ═══ HERO (with staggered word entrance) ═══ */
function Hero({ onContact, isMobile }) {
  const [ld, setLd] = useState(false);
  const { hero, seo } = useContext(ContentCtx);
  useEffect(() => { setTimeout(() => setLd(true), 100); }, []);
  const a = d => ({ opacity: ld ? 1 : 0, transform: ld ? "translateY(0)" : "translateY(24px)", transition: `all 1s cubic-bezier(.16,1,.3,1) ${d}s` });
  const heroFontSize = isMobile ? 36 : 78;
  return (
    <section style={{ minHeight: isMobile ? "75svh" : "85svh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: isMobile ? "60px 20px 40px" : "80px 72px 48px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", background: `radial-gradient(circle,${t.accent}06 0%,transparent 70%)`, top: "5%", right: "-10%", pointerEvents: "none" }} />
      <div style={a(0.1)}><span style={{ fontSize: isMobile ? 9 : 10.5, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: t.accent }}>{hero.tag}</span></div>

      {/* Visual H1 with animation */}
      <div aria-hidden="true" style={{ maxWidth: 860, marginTop: isMobile ? 16 : 24, overflow: "hidden" }}>
        <span style={{
          display: "block", textAlign: "center",
          opacity: ld ? 1 : 0, transform: ld ? "translateX(0)" : "translateX(-100%)",
          transition: "all 1.1s cubic-bezier(.16,1,.3,1) 0.15s",
        }}>
          {hero.titleLight.split(" ").map((w, i) => (
            <span key={`l${i}`} style={{
              display: "inline-block", marginRight: "0.25em",
              fontSize: heroFontSize, fontWeight: 300, color: t.text, letterSpacing: "-0.035em", lineHeight: 1.1,
              opacity: ld ? 1 : 0,
              transition: `opacity .6s cubic-bezier(.16,1,.3,1) ${0.4 + i * 0.07}s`,
            }}>{w}</span>
          ))}
        </span>
        <span style={{
          display: "block", textAlign: "center",
          opacity: ld ? 1 : 0, transform: ld ? "translateX(0)" : "translateX(100%)",
          transition: "all 1.1s cubic-bezier(.16,1,.3,1) 0.25s",
        }}>
          {hero.titleBold.split(" ").map((w, i) => (
            <span key={`b${i}`} style={{
              display: "inline-block", marginRight: "0.25em",
              fontSize: heroFontSize, fontWeight: 500, color: t.accent, letterSpacing: "-0.035em", lineHeight: 1.1,
              opacity: ld ? 1 : 0,
              transition: `opacity .6s cubic-bezier(.16,1,.3,1) ${0.55 + i * 0.07}s`,
            }}>{w}</span>
          ))}
        </span>
      </div>
      {/* Semantic H1 for SEO — visually hidden */}
      <h1 style={{ width: 0, height: 0, overflow: "hidden", opacity: 0, position: "absolute", pointerEvents: "none" }}>{seo.h1}</h1>

      <p style={{ ...a(0.8), fontSize: isMobile ? 13 : 18, fontWeight: 400, lineHeight: 1.65, color: t.textMuted, maxWidth: 460, marginTop: isMobile ? 16 : 24, padding: isMobile ? "0 4px" : 0 }}>{hero.subtitle}</p>

      <div style={{ ...a(0.95), display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginTop: isMobile ? 24 : 36 }}>
        <button onClick={onContact} style={{ fontSize: isMobile ? 13 : 14, fontWeight: 500, color: "#fff", background: t.accent, border: "none", borderRadius: 100, padding: isMobile ? "11px 24px" : "13px 32px", cursor: "pointer", transition: "all .3s ease", display: "flex", alignItems: "center", gap: 7 }}
          onMouseEnter={e => { e.currentTarget.style.background = t.accentHover; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${t.accent}28`; }}
          onMouseLeave={e => { e.currentTarget.style.background = t.accent; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
          Empezar proyecto <ArrowR s={14} c="#fff" />
        </button>
        <button onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })} style={{ fontSize: isMobile ? 13 : 14, fontWeight: 500, color: t.text, background: "transparent", border: `1.5px solid ${t.border}`, borderRadius: 100, padding: isMobile ? "11px 24px" : "13px 32px", cursor: "pointer", transition: "all .3s ease" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.text; }}>Ver servicios</button>
      </div>
    </section>
  );
}

/* ═══ SERVICES ═══ */
function ServiceModal({ service, onClose, isMobile }) {
  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);

  const headerStyles = {
    "◇": { bg: "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 50%, #A5D6A7 100%)", accent: "#96BF48" },
    "◎": { bg: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 50%, #90CAF9 100%)", accent: "#0081FB" },
    "⬡": { bg: "linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 50%, #FFCC80 100%)", accent: "#D4A574" },
    "△": { bg: "linear-gradient(135deg, #E8F5E9 0%, #DCEDC8 50%, #C5E1A5 100%)", accent: "#5A9A6E" },
  };
  const hdr = headerStyles[service.icon] || headerStyles["◇"];

  const handleCTA = () => {
    onClose();
    setTimeout(() => {
      document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(0,0,0,0.4)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      display: "flex",
      alignItems: isMobile ? "flex-end" : "center",
      justifyContent: "center",
      padding: isMobile ? 0 : 16,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: t.card,
        borderRadius: isMobile ? "20px 20px 0 0" : 24,
        width: "100%",
        maxWidth: isMobile ? "100%" : 520,
        maxHeight: isMobile ? "90vh" : "88vh",
        overflow: "hidden",
        boxShadow: isMobile
          ? "0 -8px 40px rgba(0,0,0,0.15)"
          : "0 32px 80px rgba(0,0,0,0.15), 0 0 0 0.5px rgba(0,0,0,0.06)",
        position: "relative",
        animation: isMobile ? "slideUp .3s cubic-bezier(.16,1,.3,1)" : "fadeUp .3s ease",
      }}>
        {/* Drag handle on mobile */}
        {isMobile && <div style={{ padding: "10px 0 0", display: "flex", justifyContent: "center" }}><div style={{ width: 36, height: 4, borderRadius: 2, background: t.border }} /></div>}

        {/* Decorative header */}
        <div style={{
          position: "relative", height: isMobile ? 100 : 140, overflow: "hidden",
          background: hdr.bg,
        }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }} viewBox="0 0 520 140" preserveAspectRatio="none">
            <circle cx="420" cy="30" r="80" fill={hdr.accent} />
            <circle cx="80" cy="120" r="60" fill={hdr.accent} />
            <circle cx="260" cy="-20" r="50" fill={hdr.accent} />
            <rect x="300" y="80" width="120" height="60" rx="20" fill={hdr.accent} opacity="0.5" />
          </svg>
          <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", background: "rgba(255,255,255,0.3)" }} />
          <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: isMobile ? 44 : 56, height: isMobile ? 44 : 56, borderRadius: isMobile ? 12 : 16, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? 20 : 24, color: hdr.accent, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>{service.icon}</div>
          </div>
          <button onClick={onClose} style={{
            position: "absolute", top: isMobile ? 8 : 12, right: isMobile ? 8 : 12,
            background: "rgba(255,255,255,0.5)", backdropFilter: "blur(10px)",
            border: "none", borderRadius: 100,
            width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: 14, color: t.textMuted, transition: "all .2s", zIndex: 2,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.8)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.5)"; }}
          >✕</button>
        </div>

        {/* Content */}
        <div style={{ padding: isMobile ? "20px 20px 28px" : "28px 32px 32px", overflowY: "auto", maxHeight: isMobile ? "calc(90vh - 114px)" : "calc(88vh - 140px)" }}>
          <span style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: t.accent, display: "block", marginBottom: 6 }}>{service.sub}</span>
          <h3 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, color: t.text, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.2 }}>{service.detail.title}</h3>
          <p style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.7, color: t.textMuted, marginBottom: 20 }}>{service.detail.body}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
            {service.detail.bullets.map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 5, height: 5, borderRadius: 5, background: t.accent, flexShrink: 0, opacity: 0.5 }} />
                <span style={{ fontSize: isMobile ? 13 : 14, lineHeight: 1.5, color: t.text }}>{b}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
            {service.tags.map(tg => (
              <span key={tg} style={{ fontSize: 11, fontWeight: 500, color: t.textMuted, background: t.bgAlt, borderRadius: 100, padding: "5px 14px" }}>{tg}</span>
            ))}
          </div>

          <button onClick={handleCTA} style={{
            width: "100%", padding: isMobile ? "13px" : "14px",
            fontSize: isMobile ? 14 : 14.5, fontWeight: 500, color: "#fff", background: t.accent,
            border: "none", borderRadius: 12, cursor: "pointer", transition: "all .3s",
            boxShadow: "0 4px 14px rgba(90,154,110,0.2)",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = t.accentHover; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = t.accent; e.currentTarget.style.transform = "translateY(0)"; }}
          >Solicitar información</button>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service, index, isMobile, onOpen }) {
  const [hov, setHov] = useState(false);
  const Wrapper = index % 2 === 0 ? SlideLeft : SlideRight;
  return (
    <Wrapper delay={staggerDelay(index, 0.1)}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={() => onOpen(service)}
        style={{ position: "relative", background: t.card, borderRadius: 16, padding: "28px 22px 22px", border: `1px solid ${hov ? t.accent + "30" : t.border}`, transition: "all .3s cubic-bezier(.16,1,.3,1)", transform: hov ? "translateY(-2px)" : "translateY(0)", boxShadow: hov ? "0 12px 36px rgba(0,0,0,0.06)" : "0 1px 3px rgba(0,0,0,0.02)", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}>
        <ScaleIn delay={staggerDelay(index, 0.1) + 0.1}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: t.accentLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: t.accent, marginBottom: 16 }}>{service.icon}</div>
        </ScaleIn>
        <span style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: t.accent, marginBottom: 4, display: "block" }}>{service.sub}</span>
        <h3 style={{ fontSize: 20, fontWeight: 500, color: t.text, margin: "0 0 8px", letterSpacing: "-0.01em" }}>{service.title}</h3>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: t.textMuted, margin: "0 0 16px", flex: 1 }}>{service.short}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {service.tags.map(tg => <span key={tg} style={{ fontSize: 11, fontWeight: 500, color: t.textMuted, background: t.bgAlt, borderRadius: 100, padding: "4px 11px" }}>{tg}</span>)}
        </div>
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 5, color: t.accent, fontSize: 12.5, fontWeight: 500 }}>Ver más <ArrowR s={12} c={t.accent} /></div>
      </div>
    </Wrapper>
  );
}



function Services({ isMobile }) {
  const { services, seo } = useContext(ContentCtx);
  const [modal, setModal] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = -rect.top / (rect.height + window.innerHeight);
      setScrollY(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const p = scrollY * 60; // parallax intensity

  return (
    <section id="servicios" ref={sectionRef} style={{ padding: "80px clamp(16px,5vw,72px)", position: "relative", overflow: "hidden" }}>
      {/* Parallax blurred background shapes */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {/* Soft green wash — moves up slowly */}
        <div style={{
          position: "absolute", top: `calc(-5% + ${p * 0.5}px)`, right: "-8%",
          width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(90,154,110,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
          transition: "top 0.1s linear",
        }} />
        {/* Blue accent — moves down slowly */}
        <div style={{
          position: "absolute", bottom: `calc(0% - ${p * 0.3}px)`, left: "-5%",
          width: 260, height: 260, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(66,133,244,0.05) 0%, transparent 70%)",
          filter: "blur(50px)",
          transition: "bottom 0.1s linear",
        }} />
        {/* Warm glow — center, subtle drift */}
        <div style={{
          position: "absolute", top: `calc(40% + ${p * 0.4}px)`, left: "45%",
          width: 200, height: 200, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,165,116,0.04) 0%, transparent 70%)",
          filter: "blur(50px)",
          transition: "top 0.1s linear",
        }} />
        {/* Very subtle dot grid texture */}
        <svg style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 400, opacity: 0.025 }} viewBox="0 0 400 400">
          {Array.from({ length: 10 }).map((_, r) =>
            Array.from({ length: 10 }).map((_, c) =>
              <circle key={`${r}-${c}`} cx={20 + c * 40} cy={20 + r * 40} r="1.5" fill="#1A1A1A" />
            )
          )}
        </svg>
      </div>

      <div style={{ maxWidth: 1220, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 56, position: "relative" }}>
          <FadeUp><span style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: t.accent, display: "block", marginBottom: 12 }}>Servicios</span></FadeUp>
          <div>
            <WordReveal text="Todo lo que necesitas" delay={0} />
            <br />
            <WordReveal text="para escalar" bold color={t.text} delay={0.3} />
          </div>
          <FadeUp delay={0.4}><p style={{ fontSize: 15, color: t.textMuted, lineHeight: 1.6, maxWidth: 480, margin: "16px auto 0" }}>Cada servicio diseñado para impulsar tu eCommerce con tecnología, datos y estrategia.</p></FadeUp>
          <h2 style={{ width: 0, height: 0, overflow: "hidden", opacity: 0, position: "absolute", pointerEvents: "none" }}>{seo.h2Services}</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: 16 }}>
          {services.map((s, i) => <ServiceCard key={s.title} service={s} index={i} isMobile={isMobile} onOpen={setModal} />)}
        </div>
      </div>
      {modal && <ServiceModal service={modal} onClose={() => setModal(null)} isMobile={isMobile} />}
    </section>
  );
}

/* ═══ TECH STACK ═══ */
const techLogos = [
  { name: "Shopify", color: "#96BF48" },
  { name: "Meta Ads", color: "#0081FB" },
  { name: "Google Ads", color: "#4285F4" },
  { name: "Google Analytics", color: "#E37400" },
  { name: "Klaviyo", color: "#2B2B2B" },
  { name: "Omnisend", color: "#1463FF" },
  { name: "Slack", color: "#4A154B" },
  { name: "GitHub", color: "#24292E" },
  { name: "Figma", color: "#A259FF" },
  { name: "Lovable", color: "#FF6B6B" },
  { name: "Claude AI", color: "#D4A574" },
  { name: "ChatGPT", color: "#10A37F" },
  { name: "Gemini", color: "#4285F4" },
  { name: "Copilot", color: "#2B88D8" },
  { name: "Semrush", color: "#FF642D" },
];

function TechStack() {
  const [ref, inView] = useInView(0.1);
  return (
    <section ref={ref} style={{ padding: "56px clamp(16px,5vw,72px)", background: t.bg }}>
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: t.accent, display: "block", marginBottom: 10 }}>Tecnologías</span>
            <h2 style={{ fontSize: "clamp(22px,3.5vw,34px)", fontWeight: 300, color: t.text, letterSpacing: "-0.02em" }}>
              Herramientas que <span style={{ fontWeight: 500 }}>dominamos</span>
            </h2>
          </div>
        </FadeUp>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          {techLogos.map((tech, i) => (
            <div key={tech.name} style={{
              display: "flex", alignItems: "center", gap: 8,
              background: t.card, border: `1px solid ${t.border}`, borderRadius: 100,
              padding: "10px 20px",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0) scale(1)" : "translateY(16px) scale(0.92)",
              transition: `all .5s cubic-bezier(.16,1,.3,1) ${i * 0.05}s`,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: 8, background: tech.color, flexShrink: 0,
              }} />
              <span style={{ fontSize: 13, fontWeight: 500, color: t.text, whiteSpace: "nowrap" }}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ PROCESS ═══ */
function Process({ isMobile }) {
  const { steps } = useContext(ContentCtx);
  return (
    <section style={{ padding: "72px clamp(16px,5vw,72px)", background: t.dark, color: "#fff" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <FadeUp><span style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: t.accent, display: "block", marginBottom: 12 }}>Proceso</span></FadeUp>
          <FadeUp delay={0.1}>
            <h2 style={{ fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.15 }}>Así <span style={{ fontWeight: 500 }}>trabajamos</span></h2>
          </FadeUp>
          <FadeUp delay={0.2}><div style={{ margin: "20px auto 0" }}><LineReveal color="rgba(255,255,255,0.15)" width="80px" height={1} delay={0.4} /></div></FadeUp>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: isMobile ? 24 : 36 }}>
          {steps.map((s, i) => (
            <SlideLeft key={s.n} delay={i * 0.12}>
              <div>
                <span style={{ fontSize: 40, fontWeight: 300, color: t.accent, lineHeight: 1, display: "block", marginBottom: 10, opacity: 0.45 }}>{s.n}</span>
                <LineReveal color={t.accent} width="24px" height={2} delay={i * 0.12 + 0.3} />
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, marginTop: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "rgba(255,255,255,0.45)" }}>{s.desc}</p>
              </div>
            </SlideLeft>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ CASES ═══ */
function CaseCard({ c, index, isMobile, style: outerStyle = {} }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...outerStyle, background: t.card, borderRadius: 16, padding: isMobile ? "24px 20px" : "32px 28px", border: `1px solid ${hov ? t.accent + "30" : t.border}`, transition: "all .3s ease", transform: hov ? "translateY(-2px)" : "none", boxShadow: hov ? "0 12px 36px rgba(0,0,0,0.04)" : "0 1px 3px rgba(0,0,0,0.02)", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Logo area */}
      <div style={{ marginBottom: 16, height: 48, display: "flex", alignItems: "center" }}>
        {c.logoUrl ? (
          <img src={c.logoUrl} alt={c.brand} style={{ maxHeight: 40, maxWidth: 140, objectFit: "contain", borderRadius: 4 }} />
        ) : (
          <div style={{ height: 40, width: 40, borderRadius: 10, background: t.accentLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 600, color: t.accent }}>
            {c.brand.charAt(0)}
          </div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div>
          <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: t.accent, background: t.accentLight, padding: "3px 10px", borderRadius: 100 }}>{c.tag}</span>
          <h3 style={{ fontSize: 19, fontWeight: 500, color: t.text, marginTop: 10, letterSpacing: "-0.01em" }}>{c.brand}</h3>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          {c.metric > 0 ? (
            <>
              <div style={{ fontSize: 30, fontWeight: 600, color: t.accent, lineHeight: 1, letterSpacing: "-0.03em" }}>
                <AnimCounter value={c.metric} prefix={c.metricPrefix} suffix={c.metricSuffix} />
              </div>
              <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{c.metricLabel}</div>
            </>
          ) : (
            <div style={{ background: t.accentLight, border: `1px solid ${t.accent}20`, borderRadius: 8, padding: "8px 12px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: t.accent, letterSpacing: "0.04em" }}>NUEVO</div>
              <div style={{ fontSize: 10, color: t.textMuted, marginTop: 1 }}>{c.metricLabel}</div>
            </div>
          )}
        </div>
      </div>
      <div style={{ width: "100%", height: 1, background: t.border, opacity: 0.6, marginBottom: 12 }} />
      <p style={{ fontSize: 14, lineHeight: 1.6, color: t.textMuted, margin: "0 0 12px", flex: 1 }}>{c.desc}</p>
      <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ width: 12, height: 1, background: t.accent, display: "inline-block", opacity: 0.5 }} />{c.period}
      </div>
    </div>
  );
}

function CarouselArrow({ direction, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: 40, height: 40, borderRadius: 40, border: `1.5px solid ${disabled ? t.border : t.accent + "40"}`,
      background: disabled ? "transparent" : t.card, display: "flex", alignItems: "center", justifyContent: "center",
      cursor: disabled ? "default" : "pointer", transition: "all .2s", opacity: disabled ? 0.3 : 1,
      boxShadow: disabled ? "none" : "0 2px 8px rgba(0,0,0,0.04)",
    }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.background = t.accent; e.currentTarget.style.borderColor = t.accent; e.currentTarget.querySelector("svg").style.stroke = "#fff"; } }}
      onMouseLeave={e => { if (!disabled) { e.currentTarget.style.background = t.card; e.currentTarget.style.borderColor = t.accent + "40"; e.currentTarget.querySelector("svg").style.stroke = t.text; } }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transition: "stroke .2s" }}>
        {direction === "left"
          ? <path d="M10 3L5 8L10 13" stroke={t.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          : <path d="M6 3L11 8L6 13" stroke={t.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        }
      </svg>
    </button>
  );
}

function Cases({ isMobile }) {
  const { cases } = useContext(ContentCtx);
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // Check scroll availability
  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 5);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => { el.removeEventListener("scroll", checkScroll); window.removeEventListener("resize", checkScroll); };
  }, [checkScroll, cases.length]);

  // Intersection observer for entrance animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = isMobile ? 300 : 370;
    el.scrollBy({ left: dir === "left" ? -cardW : cardW, behavior: "smooth" });
  };

  const cardWidth = isMobile ? 280 : 350;
  const showArrows = cases.length > (isMobile ? 1 : 3);

  return (
    <section id="casos" ref={sectionRef} style={{ padding: "72px 0", background: t.bgAlt, overflow: "hidden" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 clamp(16px,5vw,72px)" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <FadeUp><span style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: t.accent, display: "block", marginBottom: 12 }}>Casos de éxito</span></FadeUp>
          <div>
            <WordReveal text="Resultados que" delay={0} />
            <br />
            <WordReveal text="hablan por sí solos" bold delay={0.25} />
          </div>
        </div>

        {/* Arrows */}
        {showArrows && (
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 16, padding: "0 4px" }}>
            <CarouselArrow direction="left" onClick={() => scroll("left")} disabled={!canLeft} />
            <CarouselArrow direction="right" onClick={() => scroll("right")} disabled={!canRight} />
          </div>
        )}
      </div>

      {/* Scrollable track */}
      <div ref={scrollRef} style={{
        display: "flex", gap: 16, overflowX: "auto", scrollSnapType: "x mandatory",
        padding: `0 clamp(16px,5vw,72px) 8px`, scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
      }}>
        <style>{`[data-cases-scroll]::-webkit-scrollbar{display:none}`}</style>
        {cases.map((c, i) => (
          <div key={i} data-cases-scroll="" style={{
            minWidth: cardWidth, maxWidth: cardWidth, scrollSnapAlign: "start", flexShrink: 0,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0) scale(1)" : `translateX(${60 + i * 20}px) scale(0.95)`,
            transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${i * 0.1}s, transform .8s cubic-bezier(.16,1,.3,1) ${i * 0.1}s`,
          }}>
            <CaseCard c={c} index={i} isMobile={isMobile} />
          </div>
        ))}
        {/* Spacer at end for padding */}
        <div style={{ minWidth: 1, flexShrink: 0 }} />
      </div>

      {/* Dot indicators */}
      {cases.length > 3 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20 }}>
          {cases.map((_, i) => (
            <div key={i} style={{ width: 6, height: 6, borderRadius: 6, background: t.accent, opacity: 0.2 + (i === 0 ? 0.5 : 0), transition: "opacity .3s" }} />
          ))}
        </div>
      )}
    </section>
  );
}

/* ═══ CONTACT ═══ */
function Contact() {
  const { contact } = useContext(ContentCtx);
  const [form, setForm] = useState({ nombre: "", email: "", servicio: "", mensaje: "" });
  const [status, setStatus] = useState("idle");
  const ch = e => setForm({ ...form, [e.target.name]: e.target.value });
  const ok = form.nombre && form.email && form.servicio;
  const submit = async () => {
    if (!ok) return; setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Error");
      setStatus("sent");
    } catch { setStatus("error"); }
  };
  const inp = { fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: 14.5, width: "100%", padding: "14px 16px", background: t.card, border: `1.5px solid ${t.border}`, borderRadius: 10, outline: "none", color: t.text, transition: "border-color .3s", boxSizing: "border-box" };

  return (
    <section id="contacto" style={{ padding: "72px clamp(16px,5vw,72px)", maxWidth: 540, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <FadeUp><span style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: t.accent, display: "block", marginBottom: 12 }}>{contact.tag}</span></FadeUp>
        <div>
          <WordReveal text={contact.title} delay={0} fontSize="clamp(26px,4.2vw,40px)" />
          {" "}
          <WordReveal text={contact.titleBold} bold delay={0.15} fontSize="clamp(26px,4.2vw,40px)" />
        </div>
        <FadeUp delay={0.3}><p style={{ fontSize: 14.5, color: t.textMuted, lineHeight: 1.6, marginTop: 12 }}>{contact.subtitle}</p></FadeUp>
      </div>
      {status === "sent" ? (
        <ScaleIn>
          <div style={{ textAlign: "center", padding: 36, background: t.card, borderRadius: 16, border: `1px solid ${t.accent}22` }}>
            <div style={{ width: 44, height: 44, borderRadius: 44, background: t.accentLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", color: t.accent, fontSize: 20 }}>✓</div>
            <h3 style={{ fontSize: 22, fontWeight: 500, color: t.text, marginBottom: 8 }}>Mensaje enviado</h3>
            <p style={{ fontSize: 14.5, color: t.textMuted, lineHeight: 1.6 }}>Te contactamos en menos de 24h.</p>
          </div>
        </ScaleIn>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            <input key="n" name="nombre" placeholder="Tu nombre" value={form.nombre} onChange={ch} style={inp} onFocus={e => e.target.style.borderColor = t.accent} onBlur={e => e.target.style.borderColor = t.border} />,
            <input key="e" name="email" type="email" placeholder="tu@email.com" value={form.email} onChange={ch} style={inp} onFocus={e => e.target.style.borderColor = t.accent} onBlur={e => e.target.style.borderColor = t.border} />,
            <select key="s" name="servicio" value={form.servicio} onChange={ch} style={{ ...inp, appearance: "none", color: form.servicio ? t.text : t.textMuted, cursor: "pointer" }} onFocus={e => e.target.style.borderColor = t.accent} onBlur={e => e.target.style.borderColor = t.border}>
              <option value="" disabled>¿Qué servicio te interesa?</option>
              <option>Shopify Dev</option><option>PPC Manager</option><option>AI Grow</option><option>Consultoría eCommerce</option><option>Varios servicios</option>
            </select>,
            <textarea key="m" name="mensaje" placeholder="Cuéntanos tu proyecto... (opcional)" value={form.mensaje} onChange={ch} rows={3} style={{ ...inp, resize: "vertical", minHeight: 80 }} onFocus={e => e.target.style.borderColor = t.accent} onBlur={e => e.target.style.borderColor = t.border} />,
          ].map((el, i) => <SlideRight key={i} delay={0.35 + i * 0.08}>{el}</SlideRight>)}
          <FadeUp delay={0.7}>
            <button onClick={submit} disabled={status === "sending" || !ok} style={{ fontSize: 14.5, fontWeight: 500, color: "#fff", background: (status === "sending" || !ok) ? t.textMuted : t.accent, border: "none", borderRadius: 10, padding: 15, cursor: (status === "sending" || !ok) ? "not-allowed" : "pointer", transition: "all .3s ease", marginTop: 4, width: "100%" }}
              onMouseEnter={e => { if (ok && status !== "sending") e.currentTarget.style.background = t.accentHover; }}
              onMouseLeave={e => { if (ok && status !== "sending") e.currentTarget.style.background = t.accent; }}>
              {status === "sending" ? "Enviando..." : "Enviar mensaje"}
            </button>
          </FadeUp>
          {status === "error" && <p style={{ fontSize: 13, color: "#c44", textAlign: "center" }}>Error. Inténtalo de nuevo.</p>}
        </div>
      )}
    </section>
  );
}

/* ═══ FOOTER ═══ */
function Footer() {
  return (
    <FadeUp>
      <footer style={{ padding: "36px clamp(16px,5vw,72px)", borderTop: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={LOGO} alt="LA DIGITAL" style={{ height: 30, objectFit: "contain" }} />
        </div>
        <span style={{ fontSize: 12, color: t.textMuted }}>© {new Date().getFullYear()} LA DIGITAL · Basque Country</span>
      </footer>
    </FadeUp>
  );
}

/* ═══ ADMIN PANEL ═══ */
function EditField({ label, value, onChange, multiline = false }) {
  const base = { fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: 13, width: "100%", padding: "8px 10px", border: `1px solid ${t.border}`, borderRadius: 6, outline: "none", color: t.text, background: "#fff", boxSizing: "border-box", transition: "border-color .2s" };
  return (
    <div style={{ marginBottom: 10 }}>
      <label style={{ fontSize: 10.5, fontWeight: 500, color: t.textMuted, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>{label}</label>
      {multiline ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} style={{ ...base, resize: "vertical" }} onFocus={e => e.target.style.borderColor = t.accent} onBlur={e => e.target.style.borderColor = t.border} /> : <input value={value} onChange={e => onChange(e.target.value)} style={base} onFocus={e => e.target.style.borderColor = t.accent} onBlur={e => e.target.style.borderColor = t.border} />}
    </div>
  );
}

function AdminPanel({ content, setContent, onClose }) {
  const [tab, setTab] = useState("seo");
  const tabs = [{ id: "seo", label: "SEO" }, { id: "hero", label: "Hero" }, { id: "services", label: "Servicios" }, { id: "steps", label: "Proceso" }, { id: "cases", label: "Casos" }, { id: "contact", label: "Contacto" }];
  const updateHero = (k, v) => setContent(p => ({ ...p, hero: { ...p.hero, [k]: v } }));
  const updateSeo = (k, v) => setContent(p => ({ ...p, seo: { ...p.seo, [k]: v } }));
  const updateContact = (k, v) => setContent(p => ({ ...p, contact: { ...p.contact, [k]: v } }));
  const updateCase = (i, k, v) => setContent(p => { const c = [...p.cases]; c[i] = { ...c[i], [k]: v }; return { ...p, cases: c }; });
  const updateStep = (i, k, v) => setContent(p => { const s = [...p.steps]; s[i] = { ...s[i], [k]: v }; return { ...p, steps: s }; });
  const updateService = (i, k, v) => setContent(p => { const s = [...p.services]; s[i] = { ...s[i], [k]: v }; return { ...p, services: s }; });
  return (
    <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 330, background: "#fff", zIndex: 300, boxShadow: "-4px 0 24px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 14px 10px", borderBottom: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: t.text }}>✏️ Editar contenidos</span>
        <button onClick={onClose} style={{ background: t.bgAlt, border: "none", borderRadius: 100, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 12, color: t.textMuted }}>✕</button>
      </div>
      <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${t.border}`, padding: "0 10px", overflowX: "auto" }}>
        {tabs.map(tb => <button key={tb.id} onClick={() => setTab(tb.id)} style={{ fontSize: 11, fontWeight: tab === tb.id ? 600 : 400, color: tab === tb.id ? t.accent : t.textMuted, background: "none", border: "none", borderBottom: tab === tb.id ? `2px solid ${t.accent}` : "2px solid transparent", padding: "9px 9px 7px", cursor: "pointer", whiteSpace: "nowrap" }}>{tb.label}</button>)}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
        {tab === "seo" && <>
          <div style={{ fontSize: 11, color: t.accent, fontWeight: 500, marginBottom: 12, padding: "8px 10px", background: t.accentLight, borderRadius: 6 }}>🔍 Meta tags y encabezados SEO</div>
          <EditField label="Meta Title (≤60 chars)" value={content.seo.metaTitle} onChange={v => updateSeo("metaTitle", v)} />
          <EditField label="Meta Description (≤155 chars)" value={content.seo.metaDescription} onChange={v => updateSeo("metaDescription", v)} multiline />
          <div style={{ height: 1, background: t.border, margin: "14px 0" }} />
          <div style={{ fontSize: 11, color: t.accent, fontWeight: 500, marginBottom: 12, padding: "8px 10px", background: t.accentLight, borderRadius: 6 }}>📝 Encabezados (H1, H2)</div>
          <EditField label="H1 — Hero (único)" value={content.seo.h1} onChange={v => updateSeo("h1", v)} multiline />
          <EditField label="H2 — Servicios" value={content.seo.h2Services} onChange={v => updateSeo("h2Services", v)} />
          <EditField label="H2 — Tecnologías" value={content.seo.h2Tech} onChange={v => updateSeo("h2Tech", v)} />
          <EditField label="H2 — Proceso" value={content.seo.h2Process} onChange={v => updateSeo("h2Process", v)} />
          <EditField label="H2 — Casos de éxito" value={content.seo.h2Cases} onChange={v => updateSeo("h2Cases", v)} />
          <EditField label="H2 — Contacto" value={content.seo.h2Contact} onChange={v => updateSeo("h2Contact", v)} />
        </>}
        {tab === "hero" && <>
          <EditField label="Etiqueta" value={content.hero.tag} onChange={v => updateHero("tag", v)} />
          <EditField label="Título (light)" value={content.hero.titleLight} onChange={v => updateHero("titleLight", v)} />
          <EditField label="Título (bold)" value={content.hero.titleBold} onChange={v => updateHero("titleBold", v)} />
          <EditField label="Subtítulo" value={content.hero.subtitle} onChange={v => updateHero("subtitle", v)} multiline />
        </>}
        {tab === "services" && content.services.map((s, i) => (
          <div key={i} style={{ marginBottom: 18, paddingBottom: 14, borderBottom: i < 3 ? `1px solid ${t.border}` : "none" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 8 }}>{s.icon} {s.title}</div>
            <EditField label="Subtítulo" value={s.sub} onChange={v => updateService(i, "sub", v)} />
            <EditField label="Descripción" value={s.short} onChange={v => updateService(i, "short", v)} multiline />
          </div>
        ))}
        {tab === "steps" && content.steps.map((s, i) => (
          <div key={i} style={{ marginBottom: 14, paddingBottom: 10, borderBottom: i < 3 ? `1px solid ${t.border}` : "none" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: t.accent, marginBottom: 6 }}>{s.n}</div>
            <EditField label="Título" value={s.title} onChange={v => updateStep(i, "title", v)} />
            <EditField label="Descripción" value={s.desc} onChange={v => updateStep(i, "desc", v)} />
          </div>
        ))}
        {tab === "cases" && <>
          {content.cases.map((c, i) => (
            <div key={i} style={{ marginBottom: 18, paddingBottom: 14, borderBottom: `1px solid ${t.border}`, position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>Caso {i + 1}</div>
                {content.cases.length > 1 && (
                  <button onClick={() => setContent(p => ({ ...p, cases: p.cases.filter((_, idx) => idx !== i) }))} style={{ fontSize: 11, color: "#c44", background: "none", border: "none", cursor: "pointer", padding: "2px 6px" }}>✕ Eliminar</button>
                )}
              </div>
              <EditField label="Logo URL (imagen)" value={c.logoUrl || ""} onChange={v => updateCase(i, "logoUrl", v)} />
              <EditField label="Marca" value={c.brand} onChange={v => updateCase(i, "brand", v)} />
              <EditField label="Etiqueta" value={c.tag} onChange={v => updateCase(i, "tag", v)} />
              <EditField label="Métrica (número)" value={String(c.metric)} onChange={v => updateCase(i, "metric", parseFloat(v) || 0)} />
              <EditField label="Prefijo (+, -, etc)" value={c.metricPrefix} onChange={v => updateCase(i, "metricPrefix", v)} />
              <EditField label="Sufijo (%, x, etc)" value={c.metricSuffix} onChange={v => updateCase(i, "metricSuffix", v)} />
              <EditField label="Label métrica" value={c.metricLabel} onChange={v => updateCase(i, "metricLabel", v)} />
              <EditField label="Descripción" value={c.desc} onChange={v => updateCase(i, "desc", v)} multiline />
              <EditField label="Periodo" value={c.period} onChange={v => updateCase(i, "period", v)} />
            </div>
          ))}
          <button onClick={() => setContent(p => ({ ...p, cases: [...p.cases, { brand: "Nueva Marca", tag: "Servicio", metric: 0, metricPrefix: "+", metricSuffix: "%", metricLabel: "métrica", desc: "Descripción del caso de éxito.", period: "X meses", logoUrl: "" }] }))}
            style={{ width: "100%", padding: "10px", fontSize: 13, fontWeight: 500, color: t.accent, background: t.accentLight, border: `1.5px dashed ${t.accent}40`, borderRadius: 8, cursor: "pointer", transition: "all .2s" }}
            onMouseEnter={e => e.currentTarget.style.background = t.accentMid}
            onMouseLeave={e => e.currentTarget.style.background = t.accentLight}>
            + Añadir caso de éxito
          </button>
        </>}
        {tab === "contact" && <>
          <EditField label="Etiqueta" value={content.contact.tag} onChange={v => updateContact("tag", v)} />
          <EditField label="Título" value={content.contact.title} onChange={v => updateContact("title", v)} />
          <EditField label="Título (bold)" value={content.contact.titleBold} onChange={v => updateContact("titleBold", v)} />
          <EditField label="Subtítulo" value={content.contact.subtitle} onChange={v => updateContact("subtitle", v)} multiline />
        </>}
      </div>
      <div style={{ padding: "10px 14px", borderTop: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: t.accent }}>✓ Cambios guardados</span>
        <button onClick={() => { if (confirm("¿Resetear todos los textos a los valores originales?")) { setContent(defaultContent); } }} style={{ fontSize: 11, color: t.textMuted, background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "4px 10px", cursor: "pointer" }}>Reset</button>
      </div>
    </div>
  );
}

/* ═══ TOOLBAR ═══ */
function Toolbar({ view, setView, editOpen, setEditOpen }) {
  return (
    <div style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", zIndex: 250, background: "rgba(26,26,26,0.92)", backdropFilter: "blur(16px)", borderRadius: 100, padding: "6px 8px", display: "flex", gap: 4, alignItems: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
      {[{ id: "mobile", l: "📱" }, { id: "tablet", l: "📋" }, { id: "desktop", l: "🖥️" }].map(v => (
        <button key={v.id} onClick={() => setView(v.id)} style={{ fontSize: 16, background: view === v.id ? "rgba(255,255,255,0.15)" : "transparent", border: "none", borderRadius: 100, width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{v.l}</button>
      ))}
      <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)", margin: "0 4px" }} />
      <button onClick={() => setEditOpen(o => !o)} style={{ fontSize: 12, fontWeight: 500, color: editOpen ? t.accent : "#fff", background: editOpen ? "rgba(90,154,110,0.2)" : "rgba(255,255,255,0.1)", border: "none", borderRadius: 100, padding: "8px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>✏️ Editar</button>
    </div>
  );
}

/* ═══ MAIN ═══ */
const STORAGE_KEY = "la-digital-content";

export default function LaDigital() {
  const [content, setContent] = useState(defaultContent);
  const [view, setView] = useState("desktop");
  const [editOpen, setEditOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Admin login: go to ladigital.es?admin → prompts for password
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has("admin") && !isAdmin) {
        const pw = prompt("Contraseña de administrador:");
        if (pw === "ladigital2026") {
          setIsAdmin(true);
        } else if (pw !== null) {
          alert("Contraseña incorrecta");
          // Remove ?admin from URL without reload
          window.history.replaceState({}, "", window.location.pathname);
        }
      }
    } catch {}
  }, []);

  // Load saved content on mount
  useEffect(() => {
    async function load() {
      try {
        const result = await window.storage.get(STORAGE_KEY);
        if (result && result.value) {
          const saved = JSON.parse(result.value);
          setContent(prev => {
            const merged = { ...prev };
            for (const key of Object.keys(saved)) {
              if (typeof saved[key] === "object" && !Array.isArray(saved[key]) && saved[key] !== null) {
                merged[key] = { ...prev[key], ...saved[key] };
              } else {
                merged[key] = saved[key];
              }
            }
            return merged;
          });
        }
      } catch (e) {
        // No saved data yet, use defaults
      }
      setLoaded(true);
    }
    load();
  }, []);

  // Save content whenever it changes (after initial load)
  useEffect(() => {
    if (!loaded) return;
    async function save() {
      try {
        await window.storage.set(STORAGE_KEY, JSON.stringify(content));
      } catch (e) {
        console.log("Could not save:", e);
      }
    }
    save();
  }, [content, loaded]);

  const go = () => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  const viewWidth = isAdmin ? (view === "mobile" ? 375 : view === "tablet" ? 768 : "100%") : "100%";
  const isMobile = isAdmin ? view === "mobile" : false;
  const isMobileOrTablet = isAdmin ? view !== "desktop" : false;

  return (
    <ContentCtx.Provider value={content}>
      <div style={{ background: isAdmin ? "#E0E0DC" : t.bg, minHeight: "100vh", paddingBottom: isAdmin ? 72 : 0 }}>
        <Fonts />
        <div style={{ width: viewWidth, maxWidth: "100%", margin: isAdmin && view !== "desktop" ? "0 auto" : "0", background: t.bg, minHeight: "100vh", boxShadow: isAdmin && view !== "desktop" ? "0 0 40px rgba(0,0,0,0.1)" : "none", transition: "width .4s cubic-bezier(.16,1,.3,1)", position: "relative", overflow: "visible" }}>
          <Navbar onContact={go} isMobile={isMobile} />
          <Hero onContact={go} isMobile={isMobile} />
          <Services isMobile={isMobileOrTablet} />
          <TechStack />
          <Process isMobile={isMobile} />
          <Cases isMobile={isMobileOrTablet} />
          <Contact />
          <Footer />
        </div>
        {isAdmin && <Toolbar view={view} setView={setView} editOpen={editOpen} setEditOpen={setEditOpen} />}
        {isAdmin && editOpen && <AdminPanel content={content} setContent={setContent} onClose={() => setEditOpen(false)} />}
      </div>
    </ContentCtx.Provider>
  );
}
