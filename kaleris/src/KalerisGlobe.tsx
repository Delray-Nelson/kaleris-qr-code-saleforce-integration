import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const LANDMASK = "data:image/png;base64,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";

const CSS_GLOBE = `
.glw{--ink:#0E1A24;--green:#00B060;--mint:#12D989;--navy:#0A1922;position:relative;background-color:#FBFBF9;background-image:radial-gradient(rgba(14,26,36,.05) 1px,transparent 1px);background-size:26px 26px;color:#0E1A24;font-family:Inter,system-ui,sans-serif;overflow:hidden;padding:64px 0}
.glw *{box-sizing:border-box}
.glw .head{text-align:center;position:relative;z-index:4;margin-bottom:8px}
.glw .eyebrow{font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#009651}
.glw .head h2{font-family:'Archivo',Inter,sans-serif;font-weight:800;font-size:clamp(28px,4vw,44px);letter-spacing:-.02em;margin:12px 0 0}
.glw .head p{color:#47585F;font-size:15px;margin-top:12px}
.glw .stagewrap{position:relative;height:640px;max-width:1180px;margin:0 auto}
.glw .stage{position:absolute;inset:0;z-index:1;touch-action:none;cursor:grab}
.glw .stage canvas{display:block;width:100%;height:100%}
.glw .stage:active{cursor:grabbing}
.glw .lines{position:absolute;inset:0;z-index:2;pointer-events:none;width:100%;height:100%}
.glw .lines line{stroke:#00B060;stroke-width:1.4}
.glw .node{position:absolute;top:0;left:0;z-index:3;width:34px;height:34px;margin:-17px 0 0 -17px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;will-change:transform,opacity}
.glw .node::before{content:"";position:absolute;width:34px;height:34px;border-radius:50%;border:1.5px solid rgba(0,176,96,.5);animation:glpulse 2.4s ease-out infinite}
.glw .node::after{content:"";width:11px;height:11px;border-radius:50%;background:#00B060;box-shadow:0 0 10px 2px rgba(0,176,96,.5)}
.glw .node.active::after{width:15px;height:15px;background:#009651;box-shadow:0 0 14px 4px rgba(0,176,96,.6)}
@keyframes glpulse{0%{transform:scale(.5);opacity:.9}100%{transform:scale(1.6);opacity:0}}
.glw .card{position:absolute;z-index:3;width:250px;background:#fff;border:1px solid rgba(14,26,36,.08);border-radius:16px;padding:18px 20px;cursor:pointer;transition:border-color .25s,background .25s,transform .25s,box-shadow .25s}
.glw .card:hover{border-color:rgba(0,176,96,.45)}
.glw .card.active{border-color:#00B060;background:#fff;box-shadow:0 30px 70px -34px rgba(14,26,36,.4);transform:scale(1.03)}
.glw .card .num{font-size:12px;font-weight:700;letter-spacing:.1em;color:#009651}
.glw .card .title{font-family:'Archivo',Inter,sans-serif;font-weight:800;font-size:17px;margin-top:6px}
.glw .card .desc{font-size:12.5px;color:#47585F;margin-top:6px;line-height:1.5}
.glw .card .more{display:inline-flex;align-items:center;gap:6px;margin-top:14px;font-size:13px;font-weight:600;color:#009651}
.glw .card .more svg{width:14px;height:14px}
.glw .card .x{position:absolute;top:10px;right:12px;background:none;border:none;color:rgba(14,26,36,.4);font-size:18px;line-height:1;cursor:pointer}
.glw .card.l1{left:20px;top:44px}.glw .card.l2{left:20px;top:262px}.glw .card.l3{left:20px;top:480px}
.glw .card.r1{right:20px;top:44px}.glw .card.r2{right:20px;top:262px}.glw .card.r3{right:20px;top:480px}
.glw .hint{position:absolute;left:0;right:0;bottom:8px;z-index:4;text-align:center;font-size:12px;color:#8695A0}
@media(max-width:900px){
  .glw .stagewrap{height:auto}
  .glw .stage{position:relative;height:340px;z-index:0;pointer-events:none;touch-action:auto}
  .glw .lines,.glw .node{display:none}
  .glw .card{position:static;width:auto;margin:10px auto 0;max-width:520px;transform:none}
  .glw .card.active{transform:none}
  .glw .cardwrap{padding:8px 20px 0;position:relative;z-index:1}
}
`;

const NODES = [
  { num: "01", title: "Complex Terminals", desc: "High-automation mega terminals", cls: "l1", dir: [-0.8, 0.55, 0.25] },
  { num: "02", title: "Conventional Terminals", desc: "N4, Octopi, Master Terminal, conventional sites", cls: "l2", dir: [-1.0, 0.0, 0.05] },
  { num: "03", title: "Global Terminal Operators", desc: "Operators with multiple facilities", cls: "l3", dir: [-0.8, -0.55, 0.25] },
  { num: "04", title: "Shipper Systems", desc: "Transportation management systems & platforms", cls: "r1", dir: [0.8, 0.55, 0.25] },
  { num: "05", title: "3PLs", desc: "Yard, orders, and warehouse management systems", cls: "r2", dir: [1.0, 0.0, 0.05] },
  { num: "06", title: "Beneficial Cargo Owners", desc: "Importers, exporters, port community systems", cls: "r3", dir: [0.8, -0.55, 0.25] },
];

const SPH = 1.5;

export default function KalerisGlobe() {
  const wrapRef = useRef(null);
  const stageRef = useRef(null);
  const svgRef = useRef(null);
  const lineRefs = useRef([]);
  const nodeRefs = useRef([]);
  const cardRefs = useRef([]);
  const [hover, setHover] = useState(null);
  const [pinned, setPinned] = useState(null);
  const active = pinned != null ? pinned : hover;
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const stage = stageRef.current;
    const wrap = wrapRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

    // round soft dot texture
    const cv = document.createElement("canvas"); cv.width = cv.height = 64;
    const cx = cv.getContext("2d");
    const g = cx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.4, "rgba(255,255,255,0.55)"); g.addColorStop(1, "rgba(255,255,255,0)");
    cx.fillStyle = g; cx.fillRect(0, 0, 64, 64);
    const dot = new THREE.Texture(cv); dot.needsUpdate = true;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 4.0;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    stage.appendChild(renderer.domElement);

    // full-sphere base layer + denser land layer (dot-matrix Earth, no gaps)
    const baseMat = new THREE.PointsMaterial({
      size: 0.022, map: dot, color: new THREE.Color(0x66C79A), transparent: true, opacity: 0.4,
      blending: THREE.NormalBlending, depthWrite: false, sizeAttenuation: true,
    });
    const landMat = new THREE.PointsMaterial({
      size: 0.032, map: dot, color: new THREE.Color(0x00A65A), transparent: true, opacity: 0.95,
      blending: THREE.NormalBlending, depthWrite: false, sizeAttenuation: true,
    });
    const group = new THREE.Group();
    scene.add(group);
    let basePts: THREE.Points | null = null;
    let landPts: THREE.Points | null = null;
    let baseGeo: THREE.BufferGeometry | null = null;
    let landGeo: THREE.BufferGeometry | null = null;

    const fib = (n: number) => {
      const out = [];
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2;
        const rad = Math.sqrt(Math.max(0, 1 - y * y));
        const th = golden * i;
        out.push([Math.cos(th) * rad, y, Math.sin(th) * rad]);
      }
      return out;
    };

    // base scatter: entire sphere, faint — fills every gap so it reads as a solid globe
    const basePos = new Float32Array(9000 * 3);
    fib(9000).forEach(([x, y, z], i) => { basePos[i * 3] = x * SPH; basePos[i * 3 + 1] = y * SPH; basePos[i * 3 + 2] = z * SPH; });
    baseGeo = new THREE.BufferGeometry();
    baseGeo.setAttribute("position", new THREE.BufferAttribute(basePos, 3));
    basePts = new THREE.Points(baseGeo, baseMat);
    group.add(basePts);

    // land layer: dense, bright — sampled from the land mask
    const mimg = new Image();
    mimg.onload = () => {
      const mc = document.createElement("canvas");
      mc.width = mimg.width; mc.height = mimg.height;
      const mx = mc.getContext("2d"); if (!mx) return;
      mx.drawImage(mimg, 0, 0);
      const md = mx.getImageData(0, 0, mimg.width, mimg.height).data;
      const arr = [];
      fib(30000).forEach(([x, y, z]) => {
        const lat = Math.asin(Math.max(-1, Math.min(1, y)));
        const lon = Math.atan2(z, x);
        const u = lon / (2 * Math.PI) + 0.5;
        const v = 0.5 - lat / Math.PI;
        const px = Math.min(mimg.width - 1, Math.max(0, Math.floor(u * mimg.width)));
        const py = Math.min(mimg.height - 1, Math.max(0, Math.floor(v * mimg.height)));
        if (md[(py * mimg.width + px) * 4] > 110) arr.push(x * SPH, y * SPH, z * SPH);
      });
      landGeo = new THREE.BufferGeometry();
      landGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(arr), 3));
      landPts = new THREE.Points(landGeo, landMat);
      group.add(landPts);
    };
    mimg.src = LANDMASK;

    const baseDirs = NODES.map((n) => new THREE.Vector3(...n.dir).normalize().multiplyScalar(SPH));
    const wp = new THREE.Vector3();

    let W = 1, H = 1;
    const resize = () => {
      W = Math.max(1, stage.clientWidth); H = Math.max(1, stage.clientHeight);
      camera.aspect = W / H; camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(stage);

    // drag to rotate
    let dragging = false, lastX = 0, lastY = 0, velY = 0;
    const rot = { x: 0, y: 0 };
    const down = (e) => { dragging = true; lastX = e.clientX; lastY = e.clientY; velY = 0; };
    const move = (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      rot.y += dx * 0.006; rot.x = Math.max(-0.7, Math.min(0.7, rot.x + dy * 0.006));
      velY = dx * 0.006; lastX = e.clientX; lastY = e.clientY;
    };
    const up = () => { dragging = false; };
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (!coarse) {
      stage.addEventListener("pointerdown", down);
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    }

    let raf = 0;
    const animate = () => {
      if (!dragging) { rot.y += reduce ? 0 : 0.0016 + velY; velY *= 0.94; }
      group.rotation.y = rot.y; group.rotation.x = rot.x;
      group.updateMatrixWorld(true);

      const svgRect = svgRef.current ? svgRef.current.getBoundingClientRect() : { left: 0, top: 0 };
      const stageRect = stage.getBoundingClientRect();
      for (let i = 0; i < NODES.length; i++) {
        wp.copy(baseDirs[i]).applyMatrix4(group.matrixWorld);
        const front = wp.z; // >0 toward camera
        const ndc = wp.clone().project(camera);
        const sx = (ndc.x * 0.5 + 0.5) * W;
        const sy = (-ndc.y * 0.5 + 0.5) * H;
        const frontness = Math.max(0, Math.min(1, (front + SPH) / (2 * SPH)));
        const isActive = activeRef.current === i;

        const node = nodeRefs.current[i];
        if (node) { node.style.transform = `translate(${sx}px,${sy}px)`; node.style.opacity = String(0.35 + frontness * 0.65); }

        const line = lineRefs.current[i];
        const card = cardRefs.current[i];
        if (line && card) {
          const cr = card.getBoundingClientRect();
          const leftSide = NODES[i].cls[0] === "l";
          const nx = stageRect.left + sx - svgRect.left;
          const ny = stageRect.top + sy - svgRect.top;
          const ax = (leftSide ? cr.right : cr.left) - svgRect.left;
          const ay = cr.top + cr.height / 2 - svgRect.top;
          line.setAttribute("x1", nx.toFixed(1)); line.setAttribute("y1", ny.toFixed(1));
          line.setAttribute("x2", ax.toFixed(1)); line.setAttribute("y2", ay.toFixed(1));
          line.setAttribute("stroke-opacity", isActive ? "1" : String(0.18 + frontness * 0.5));
          line.setAttribute("stroke-width", isActive ? "2" : "1.3");
          line.setAttribute("stroke-dasharray", isActive ? "0" : "4 5");
        }
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      stage.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      if (baseGeo) baseGeo.dispose(); if (landGeo) landGeo.dispose(); baseMat.dispose(); landMat.dispose(); dot.dispose(); renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  const toggle = (i) => setPinned((p) => (p === i ? null : i));

  return (
    <div className="glw" ref={wrapRef}>
      <style>{CSS_GLOBE}</style>
      <div className="head">
        <div className="eyebrow">Execution + Visibility Platform</div>
        <h2>Connecting the supply chain.</h2>
        <p>One network linking terminals, operators, shippers, 3PLs, and cargo owners.</p>
      </div>
      <div className="stagewrap">
        <div className="stage" ref={stageRef} />
        <svg className="lines" ref={svgRef} preserveAspectRatio="none">
          {NODES.map((_, i) => <line key={i} ref={(el) => (lineRefs.current[i] = el)} />)}
        </svg>
        {NODES.map((n, i) => (
          <div
            key={i}
            ref={(el) => (nodeRefs.current[i] = el)}
            className={"node" + (active === i ? " active" : "")}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onClick={() => toggle(i)}
            aria-label={n.title}
          />
        ))}
        <div className="cardwrap">
          {NODES.map((n, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={"card " + n.cls + (active === i ? " active" : "")}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onClick={() => toggle(i)}
            >
              {pinned === i && <button className="x" onClick={(e) => { e.stopPropagation(); setPinned(null); }}>×</button>}
              <div className="num">{n.num}</div>
              <div className="title">{n.title}</div>
              <div className="desc">{n.desc}</div>
              {active === i && (
                <a className="more" href="#" onClick={(e) => e.stopPropagation()}>
                  Learn more
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
