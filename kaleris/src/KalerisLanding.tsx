import { useEffect, useRef, useState } from "react";
import KalerisSolutions from "./KalerisSolutions";
import KalerisGlobe from "./KalerisGlobe";

const Mark = ({ light }) => (
  <svg className="mark" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M39.06 25.63C34.03 22.44 29.09 19.32 24.07 16.13 27.73 10.74 31.37 5.39 35.02 0.03H52.94C53.9 0.65 54.89 1.29 55.97 1.98 50.37 9.91 44.72 17.68 39.06 25.63Z" fill="#00B060"/>
    <path d="M24.14 39.81C29.1 36.66 34.01 33.55 38.85 30.48 39.25 30.53 39.39 30.77 39.53 30.96 41.57 33.83 43.59 36.71 45.63 39.58 48.39 43.44 51.16 47.29 53.93 51.14 54.41 51.81 54.93 52.46 55.41 53.13 55.59 53.39 55.81 53.64 55.83 54.03 55.06 54.71 54.12 55.15 53.23 55.75H35C34.39 55.34 34.09 54.62 33.68 54 31.81 51.23 29.94 48.47 28.02 45.74 26.78 43.98 25.61 42.17 24.41 40.38Z" fill="#00B060"/>
    <path d="M0 2.03C0.94 1.42 1.84 0.83 2.75 0.25 3.06 0.05 3.41 0 3.78 0 7.56 0.01 11.34 0.01 15.11 0 15.57 0 15.96 0.11 16.33 0.36 17.17 0.9 18.02 1.44 18.89 2V23.41C18.62 23.64 18.32 23.53 18.04 23.53 13.5 23.54 8.96 23.53 4.42 23.54 3.82 23.54 3.32 23.4 2.82 23.05 1.91 22.42 0.95 21.86 0 21.26Z" fill="#00B060"/>
    <path d="M18.87 53.99C17.94 54.58 17.04 55.16 16.1 55.76H2.81C1.9 55.18 0.97 54.58 0.01 53.97V34.79C0.98 34.02 2.12 33.41 3.2 32.7 3.44 32.54 3.7 32.45 4.01 32.45 8.91 32.47 13.82 32.47 18.72 32.48 18.75 32.48 18.78 32.51 18.87 32.55Z" fill="#00B060"/>
  </svg>
);

const METRICS = [
  { num: 620, suffix: "+", rest: "use Kaleris TOS" },
  { num: 350, suffix: "+", rest: "shipper yards optimized" },
  { num: 50, suffix: "%", rest: "of the world's cargo, managed" },
  { num: 10000, suffix: "+", rest: "fleets under management" },
];

const LOGOS = [
  { name: "NovaTrans", icon: (<svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8"/><circle cx="3" cy="17" r="1.6"/><circle cx="21" cy="7" r="1.6"/></svg>) },
  { name: "CargoLink", icon: (<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="12" rx="1.5"/><path d="M8 7v12M13 7v12"/></svg>) },
  { name: "SwiftPort", icon: (<svg viewBox="0 0 24 24"><path d="M3 12h11l-4-4M14 12l-4 4"/><path d="M19 4v16"/></svg>) },
  { name: "GridVault", icon: (<svg viewBox="0 0 24 24"><path d="M12 2l8 5v10l-8 5-8-5V7z"/><path d="M12 12l8-5M12 12v10M12 12L4 7"/></svg>) },
  { name: "RouteMax", icon: (<svg viewBox="0 0 24 24"><path d="M7 21c0-5 4-4.5 4-9a2 2 0 10-4 0"/><circle cx="17" cy="8" r="3"/><path d="M17 11v7"/></svg>) },
];

const SOLUTIONS = [
  { title: "Terminal Operations", body: "Optimize every terminal — vessel, yard, and gate — on the market-leading TOS.", img: "/images/terminal.webp" },
  { title: "Transportation Management", body: "Control inventory, scheduling, and accessorial costs across your network.", img: "/images/transportation.webp" },
  { title: "Yard Management", body: "Real-time asset location, automated gate check-in, and task automation.", img: "/images/yard.webp" },
  { title: "Execution & Visibility Platform", body: "Connect ports, terminals, inland facilities, and shippers in one ecosystem.", img: "/images/evp.webp" },
  { title: "Carrier & Vessel Solutions", body: "Digital maritime technology for safe, efficient ocean transportation.", img: "/images/carrier.webp" },
  { title: "Rail Solutions", body: "A live view of rail assets and metrics — cut demurrage and dwell.", img: "/images/rail.webp" },
  { title: "Maintenance & Repair", body: "Automate full-cycle railcar and intermodal maintenance and repair.", img: "/images/maintenance.webp" },
];

const EVP = [
  { t: "Complex Terminals", d: "High-automation mega terminals", k: "01" },
  { t: "Conventional Terminals", d: "N4, Octopi, Master Terminal, conventional sites", k: "02" },
  { t: "Global Terminal Operators", d: "Operators with multiple facilities", k: "03" },
  { t: "Shipper Systems", d: "Transportation management systems & platforms", k: "04" },
  { t: "3PLs", d: "Yard, orders, and warehouse management systems", k: "05" },
  { t: "Beneficial Cargo Owners", d: "Importers, exporters, port community systems", k: "06" },
];

const EVENTS = [
  "MSKU 4471820 · Gate 3 · checked in",
  "Reefer R-22 · status → available",
  "Berth 3 · vessel ETA updated 11:20",
  "Dock D-7 · now open",
  "TCLU 6650914 · moved to slot C4",
  "Trailer T-4471 · departed Gate 1",
];

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { el.classList.add("in"); io.unobserve(el); } }), { threshold: 0.2 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "" }) {
  const ref = useReveal();
  return <div ref={ref} className={"reveal " + className}>{children}</div>;
}

function QR() {
  const on = new Set([0,2,3,5,7,8,10,12,13,15,18,20,23,24,26,29,31,33,34,37,40,41,43,46,48,51,52,55,58,60,63,64,66,69,71,74,76,79,81,84,86,88,91,93,96,98,100,103,105,108,110,113,115,118,120]);
  return <div className="qr"><div className="qr-grid">{Array.from({ length: 121 }).map((_, i) => <i key={i} className={on.has(i) ? "" : "off"} />)}</div></div>;
}

function LiveBand() {
  const [m, setM] = useState({ tp: 1284, dw: 3.8, ac: 99.4 });
  const [ev, setEv] = useState(0);
  const ref = useReveal();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const a = setInterval(() => setM((p) => ({
      tp: Math.max(1180, Math.min(1390, p.tp + Math.round((Math.random() - 0.5) * 36))),
      dw: Math.max(3.3, Math.min(4.4, +(p.dw + (Math.random() - 0.5) * 0.18).toFixed(1))),
      ac: Math.max(98.9, Math.min(99.9, +(p.ac + (Math.random() - 0.5) * 0.14).toFixed(1))),
    })), 2000);
    const b = setInterval(() => setEv((v) => (v + 1) % EVENTS.length), 2200);
    return () => { clearInterval(a); clearInterval(b); };
  }, []);
  return (
    <section className="rt" style={{ backgroundImage: "url(/images/carrier.webp)" }}>
      <span className="rt-ping" aria-hidden="true"><i /><i /><b /></span>
      <div className="rt-scan" aria-hidden="true" />
      <div className="wrap"><div className="rt-in reveal" ref={ref}>
        <span className="rt-live"><i />LIVE EXECUTION</span>
        <h2>Every move, visible in real time.</h2>
        <p>From vessel to yard to gate — Kaleris streams every event as it happens, so your team acts on live data, not yesterday's reports.</p>
        <div className="rt-stats">
          <div className="s"><div className="v">{m.tp.toLocaleString()}<span className="u"> mv/hr</span></div><div className="l">Throughput</div></div>
          <div className="s"><div className="v">{m.dw.toFixed(1)}<span className="u">h</span></div><div className="l">Avg dwell</div></div>
          <div className="s"><div className="v">{m.ac.toFixed(1)}<span className="u">%</span></div><div className="l">Inventory accuracy</div></div>
        </div>
        <div className="rt-ticker"><span className="dot" /><span className="ev" key={ev}>{EVENTS[ev]}</span></div>
      </div></div>
    </section>
  );
}

export default function KalerisLanding() {
  const [mi, setMi] = useState(0);
  const [count, setCount] = useState(METRICS[0].num);
  const videoRef = useRef(null);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    const tryPlay = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    tryPlay();
    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("canplay", tryPlay);
    const onInteract = () => {
      tryPlay();
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("click", onInteract);
    };
    window.addEventListener("touchstart", onInteract, { passive: true });
    window.addEventListener("scroll", onInteract, { passive: true });
    window.addEventListener("click", onInteract);
    return () => {
      v.removeEventListener("loadeddata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("click", onInteract);
    };
  }, []);
  useEffect(() => { const t = setInterval(() => setMi((v) => (v + 1) % METRICS.length), 3600); return () => clearInterval(t); }, []);
  useEffect(() => {
    const target = METRICS[mi].num;
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) { setCount(target); return; }
    let raf = 0; const dur = 700, start = performance.now();
    const tick = (t) => { const p = Math.min(1, (t - start) / dur); const e = 1 - Math.pow(1 - p, 3); setCount(Math.round(e * target)); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mi]);
  const submit = () => {
    const b = document.getElementById("demoBtn");
    if (b) { b.textContent = "Message sent ✓"; b.style.background = "#3FD98C"; setTimeout(() => { b.textContent = "Get a demo"; b.style.background = ""; }, 2400); }
  };

  return (
    <div className="kl">
      {/* HERO — full-width video card */}
      <header className="hero" id="top">
        <div className="hero-card">
          <div className="hero-bg" />
          <video
            ref={videoRef}
            className="hero-video"
            src="/hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            preload="none"
            poster="/images/carrier.webp"
            aria-label="Aerial view of a Kaleris container vessel at sea"
          >
            <track kind="captions" />
          </video>
          <div className="hero-shade" />
          <div className="hero-content">
            <div className="hero-inner">
            <div className="hero-left">
              <div className="brand"><Mark light /><span className="wm light">KALERIS</span></div>
              <h1><span className="metric" key={mi}><span className="g">{count.toLocaleString()}{METRICS[mi].suffix}</span> <span className="rest">{METRICS[mi].rest}</span></span></h1>
              <p className="sub">Supply Chain Execution Software</p>
            </div>
            <div className="hero-cta">
              <a href="#solutions" className="btn btn-ghost">Learn more</a>
              <a href="#contact" className="btn btn-green">Get a demo</a>
            </div>
            </div>
          </div>
        </div>
        <div className="clients">
          <div className="trusted">Trusted by global logistics leaders</div>
          <div className="logos"><div className="logos-track">{[...LOGOS, ...LOGOS].map((L, i) => (<span className="lg" key={i}>{L.icon}<b>{L.name}</b></span>))}</div></div>
        </div>
      </header>

      <main>
      {/* INTRO */}
      <section className="intro"><div className="wrap"><Reveal className="intro-grid">
        <div><span className="eyebrow">Every move matters</span><h2>Real-time visibility across every mode and node.</h2></div>
        <p>Hundreds of the world's largest organizations rely on Kaleris to gain real-time visibility and the execution tools to automate and optimize the movement of goods through the supply chain.</p>
      </Reveal></div></section>

      {/* SOLUTIONS — scroll cards */}
      <KalerisSolutions />

      {/* REAL-TIME BAND */}
      <LiveBand />

      {/* EVP — particle globe */}
      <KalerisGlobe />

      {/* QUOTE */}
      <section className="quote" style={{ backgroundImage: "url(/images/terminal.webp)" }}><div className="wrap">
        <Reveal><span className="eyebrow">Customer story</span>
          <blockquote>&ldquo;Kaleris turned our terminal bottleneck into our highest-throughput facility within 90 days.&rdquo;</blockquote>
          <div className="who">Marcus Lindqvist</div>
          <div className="role">Global Director of Logistics Operations · Kerry Siam Seaport</div>
        </Reveal>
      </div></section>

      {/* CONTACT — form + QR */}
      <section className="contact" id="contact">
        <div className="contact-in">
          <Reveal>
            <span className="eyebrow">Get in touch</span>
            <h2>See Kaleris in action.</h2>
            <p className="lead">Scan the code to open a live view of the platform, or send us a note and our team will reach out.</p>
            <div className="qr-row">
              <QR />
              <div className="qr-cap"><div className="h">Open the live demo</div><div className="s">The same operational board your team would use.</div></div>
            </div>
          </Reveal>
          <Reveal className="lead-card">
            <h3>Contact us</h3>
            <div className="note">Your details go straight to our team in Salesforce.</div>
            <form action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00Dfn00000J1dUD" method="POST" className="fld">
              <input type="hidden" name="oid" defaultValue="00Dfn00000J1dUD" />
              <input type="hidden" name="retURL" defaultValue="https://klrs-stack.pro" />
              <input type="hidden" id="lead_source" name="lead_source" defaultValue="QR Code Scan" />
              <div><label htmlFor="first_name">First name</label><input id="first_name" maxLength={40} name="first_name" placeholder="Jane" required /></div>
              <div><label htmlFor="last_name">Last name</label><input id="last_name" maxLength={80} name="last_name" placeholder="Doe" required /></div>
              <div className="full"><label htmlFor="email">Work email</label><input id="email" maxLength={80} name="email" type="email" placeholder="jane@enterprise.com" required /></div>
              <div className="full"><label htmlFor="company">Company</label><input id="company" maxLength={40} name="company" placeholder="Enterprise Port Authority" /></div>
              <div className="full"><button type="submit" className="btn btn-green" style={{ width: "100%", marginTop: "12px" }}>Get a demo</button></div>
            </form>
          </Reveal>
        </div>
      </section>

      </main>

      {/* FOOTER */}
      <footer><div className="wrap">
        <div className="foot-top">
          <div className="foot-brand"><div className="brand"><Mark light /><span className="wm light">KALERIS</span></div><div className="hq">Headquarters<br />3460 Preston Ridge Rd. Suite 600<br />Alpharetta, GA 30005, USA</div><div className="serving">Serving 105+ Countries</div></div>
          <div className="foot-cols">
            <div><h4>Solutions</h4><a href="#solutions">Yard Management</a><a href="#solutions">Transportation</a><a href="#solutions">Terminal Operating</a><a href="#solutions">Carrier &amp; Vessel</a><a href="#solutions">Execution &amp; Visibility</a><a href="#solutions">Maintenance &amp; Repair</a></div>
            <div><h4>Industries</h4><a href="#">Automotive</a><a href="#">Consumer Goods</a><a href="#">Energy &amp; Mining</a><a href="#">Food + Beverage</a><a href="#">Manufacturing</a><a href="#">Retail</a></div>
            <div><h4>Resources</h4><a href="#">White Papers</a><a href="#">Webinars</a><a href="#">Support</a><a href="#">Certification</a><a href="#">Training</a></div>
            <div><h4>About</h4><a href="#">Company</a><a href="#">Leadership</a><a href="#">Partners</a><a href="#">Sustainability</a><a href="#">Careers</a></div>
          </div>
        </div>
        <div className="foot-legal"><span>Copyright 2026 Kaleris | All Rights Reserved.</span><span className="links"><a href="#">Support</a><a href="#">Login</a><a href="#">Contact</a><a href="#">Compliance</a><a href="#">Privacy Policy</a></span></div>
      </div></footer>
    </div>
  );
}
