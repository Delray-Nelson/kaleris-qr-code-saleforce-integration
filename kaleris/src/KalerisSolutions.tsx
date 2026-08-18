import { useEffect, useRef, useState } from "react";

const CSS_SOL = `
.rds{--bg:#FBFBF9;--surface:#fff;--ink:#0E1A24;--ink-2:#47585F;--muted:#8695A0;--green:#00B060;--green-dk:#009651;--line-2:rgba(14,26,36,.06);--fd:'Archivo',sans-serif;--fb:'Inter',sans-serif;
  position:relative;background-color:var(--bg);background-image:radial-gradient(rgba(14,26,36,.05) 1px,transparent 1px);background-size:26px 26px;color:var(--ink);font-family:var(--fb);padding:104px 0;-webkit-font-smoothing:antialiased}
.rds *{box-sizing:border-box}
.rds-grid{position:relative;z-index:1;max-width:1140px;margin:0 auto;padding:0 28px;display:grid;grid-template-columns:.8fr 1.2fr;gap:60px;align-items:start}
.rds-left{position:sticky;top:100px;background:var(--green);border-radius:24px;padding:44px 40px;color:var(--ink)}
.rds-left .eyebrow{font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.92)}
.rds-left h2{font-family:var(--fd);font-weight:800;font-size:clamp(30px,3.8vw,46px);line-height:1.06;letter-spacing:-.02em;margin-top:14px}
.rds-left p{color:rgba(255,255,255,.92);font-size:16px;line-height:1.7;margin-top:20px;max-width:34ch}
.rds-all{display:inline-flex;align-items:center;gap:7px;margin-top:24px;font-weight:700;font-size:14px;color:var(--ink);cursor:pointer;transition:gap .22s ease,opacity .22s ease}
.rds-all:hover{gap:12px;opacity:.78}
.rds-all:hover svg{transform:translate(3px,-3px)}
.rds-all svg{width:15px;height:15px;transition:transform .22s ease}
.rds-right{display:flex;flex-direction:column;gap:26px}
.rds-card{background:var(--surface);border:1px solid var(--line-2);border-radius:20px;overflow:hidden;cursor:pointer;transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease}
.rds-card.on{border-color:rgba(0,176,96,.4);box-shadow:0 34px 74px -42px rgba(14,26,36,.45);transform:translateY(-3px)}
.rds-img{position:relative;height:236px;overflow:hidden;background:#0a1a24}
.rds-img img{width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.2,.7,.2,1)}
.rds-card.on .rds-img img{transform:scale(1.05)}
.rds-tags{position:absolute;top:14px;left:14px;display:flex;gap:8px}
.rds-tag{background:rgba(9,20,26,.66);color:#fff;font-size:11px;font-weight:600;letter-spacing:.02em;padding:5px 11px;border-radius:999px;backdrop-filter:blur(5px)}
.rds-body{padding:24px 26px 26px}
.rds-body h3{font-family:var(--fd);font-weight:800;font-size:22px;letter-spacing:-.01em}
.rds-body p{color:var(--ink-2);font-size:14.5px;line-height:1.6;margin-top:10px;max-width:46ch}
.rds-more{display:inline-flex;align-items:center;gap:7px;margin-top:16px;font-weight:600;font-size:14px;color:var(--green-dk)}
.rds-more svg{width:15px;height:15px}
@media(max-width:900px){.rds-grid{grid-template-columns:1fr;gap:32px}.rds-left{position:static;padding:34px 28px}.rds{padding:76px 0}}
@media(prefers-reduced-motion:reduce){.rds-bg .layer,.rds-card,.rds-img img{transition:none}}
`;

const SOL = [
  { num: "01", tag: "TOS · Marine", title: "Terminal Operations", body: "The market-leading TOS — optimize every terminal across all volumes and cargo types.", img: "/images/terminal.webp" },
  { num: "02", tag: "TMS · Shippers", title: "Transportation Management", body: "Take control of how you incur costs across inventory, scheduling, and accessorial charges.", img: "/images/transportation.webp" },
  { num: "03", tag: "YMS · Yard", title: "Yard Management", body: "Real-time location, automated gate check-in, and task automation — ABI Research's #1 YMS.", img: "/images/yard.webp" },
  { num: "04", tag: "EVP · Network", title: "Execution & Visibility Platform", body: "Connect ports, terminals, inland facilities, and shippers in one accelerated ecosystem.", img: "/images/evp.webp" },
  { num: "05", tag: "CVS · Ocean", title: "Carrier & Vessel Solutions", body: "Proven maritime technology for safe, efficient, environmentally-friendly ocean transit.", img: "/images/carrier.webp" },
  { num: "06", tag: "Rail · Intermodal", title: "Rail Solutions", body: "A live view of rail assets and metrics at your fingertips — cut demurrage and dwell.", img: "/images/rail.webp" },
  { num: "07", tag: "MRO · Fleet", title: "Maintenance & Repair", body: "Automate and streamline full-cycle railcar and intermodal maintenance and repair.", img: "/images/maintenance.webp" },
];

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
);

export default function KalerisSolutions() {
  const [scrollActive, setScrollActive] = useState(0);
  const [hoverActive, setHoverActive] = useState(null);
  const active = hoverActive != null ? hoverActive : scrollActive;
  const cardRefs = useRef([]);
  const ratios = useRef({});

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratios.current[e.target.dataset.i] = e.isIntersecting ? e.intersectionRatio : 0;
        });
        let best = 0, br = -1;
        for (const k in ratios.current) {
          if (ratios.current[k] > br) { br = ratios.current[k]; best = Number(k); }
        }
        setScrollActive(best);
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1], rootMargin: "-24% 0px -30% 0px" }
    );
    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="rds" id="solutions">
      <style>{CSS_SOL}</style>
      <div className="rds-grid">
        <div className="rds-left">
          <span className="eyebrow">Solutions</span>
          <h2>Result-driven solutions across modes and nodes</h2>
          <p>One platform that adapts seamlessly across every mode and node — terminal, yard, transport, ocean, and rail.</p>
          <a className="rds-all" href="#">Explore all solutions <Arrow /></a>
        </div>
        <div className="rds-right">
          {SOL.map((s, i) => (
            <article
              key={s.title}
              data-i={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={"rds-card" + (active === i ? " on" : "")}
              onMouseEnter={() => setHoverActive(i)}
              onMouseLeave={() => setHoverActive(null)}
            >
              <div className="rds-img">
                <img src={s.img} alt={s.title} loading="lazy" decoding="async" width={1200} height={720} />
                <div className="rds-tags">
                  {s.tag.split(" · ").map((t) => <span className="rds-tag" key={t}>{t}</span>)}
                </div>
              </div>
              <div className="rds-body">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <a className="rds-more" href="#" onClick={(e) => e.stopPropagation()}>Learn more <Arrow /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
