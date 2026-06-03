/* ========== PROTOCOLO FINAL — NUCLEAR CINEMATIC (ENHANCED) ========== */

let pCtx = null;
let pCanvas = null;
let pC = null;

let protParticles = [];
let protMissiles = [];
let protEmbers = [];
let protAsh = [];
let protSmoke = [];
let protShocks = [];
let protSecExplosions = [];
let protAnimId = null;
let protPhase = 'idle';
let protSirenOsc = null;
let protSirenGain = null;

function protAudio() {
  if (!pCtx || pCtx.state === 'closed') {
    pCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return pCtx;
}

/* ========== SOUNDS ========== */
function playSiren() {
  const ctx = protAudio();
  protSirenOsc = ctx.createOscillator();
  protSirenGain = ctx.createGain();
  protSirenGain.gain.setValueAtTime(0, ctx.currentTime);
  protSirenGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.5);
  protSirenOsc.connect(protSirenGain);
  protSirenGain.connect(ctx.destination);
  protSirenOsc.type = 'sawtooth';
  const now = ctx.currentTime;
  for (let i = 0; i < 50; i++) {
    const t = now + i * 0.35;
    protSirenOsc.frequency.setValueAtTime(400, t);
    protSirenOsc.frequency.setValueAtTime(850, t + 0.175);
  }
  protSirenOsc.start(now);
  protSirenOsc.stop(now + 20);
}

function stopSiren() {
  if (protSirenGain && pCtx) {
    try { protSirenGain.gain.linearRampToValueAtTime(0, pCtx.currentTime + 3); } catch (_) {}
  }
}

function playLaunch() {
  const ctx = protAudio();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(60, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 1);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 1.2);
}

function playExplosion() {
  const ctx = protAudio();
  const dur = 3;
  const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const t = i / ctx.sampleRate;
    const env = t < 0.05 ? t / 0.05 : Math.pow(1 - (t - 0.05) / (dur - 0.05), 1.5);
    data[i] = (Math.random() * 2 - 1) * env * 0.95;
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(3000, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + dur);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.9, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
  src.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  src.start(ctx.currentTime);
}

/* multi-layered nuclear explosion — 4 phases */
function playExplosion() {
  const ctx = protAudio();

  /* PHASE 1: Deep low boom */
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  gain1.gain.setValueAtTime(0.8, ctx.currentTime);
  gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);
  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(30, ctx.currentTime);
  osc1.frequency.exponentialRampToValueAtTime(8, ctx.currentTime + 2);
  osc1.start(ctx.currentTime);
  osc1.stop(ctx.currentTime + 2.5);

  /* PHASE 2: Massive white noise burst */
  const durB = 3.5;
  const bufB = ctx.createBuffer(1, ctx.sampleRate * durB, ctx.sampleRate);
  const dataB = bufB.getChannelData(0);
  for (let i = 0; i < dataB.length; i++) {
    const t = i / ctx.sampleRate;
    const env = t < 0.03 ? t / 0.03 : Math.pow(1 - (t - 0.03) / (durB - 0.03), 1.3);
    dataB[i] = (Math.random() * 2 - 1) * env * 0.95;
  }
  const srcB = ctx.createBufferSource();
  srcB.buffer = bufB;
  const filtB = ctx.createBiquadFilter();
  filtB.type = 'lowpass';
  filtB.frequency.setValueAtTime(4000, ctx.currentTime);
  filtB.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + durB);
  const gainB = ctx.createGain();
  gainB.gain.setValueAtTime(0.7, ctx.currentTime);
  gainB.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durB);
  srcB.connect(filtB);
  filtB.connect(gainB);
  gainB.connect(ctx.destination);
  srcB.start(ctx.currentTime);
}

/* PHASE 3: Sharp crack at t+0.5s */
function playExplosionCrack() {
  const ctx = protAudio();
  const dur = 0.3;
  const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const t = i / ctx.sampleRate;
    const env = Math.pow(1 - t / dur, 3);
    data[i] = (Math.random() * 2 - 1) * env * 0.5;
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const filt = ctx.createBiquadFilter();
  filt.type = 'highpass';
  filt.frequency.setValueAtTime(800, ctx.currentTime);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
  src.connect(filt);
  filt.connect(gain);
  gain.connect(ctx.destination);
  src.start(ctx.currentTime);
}

/* PHASE 4a: Rolling aftershock */
function playAftershock(delay) {
  const ctx = protAudio();
  const dur = 0.8;
  const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const t = i / ctx.sampleRate;
    const env = Math.pow(1 - t / dur, 2);
    data[i] = (Math.random() * 2 - 1) * env * 0.3;
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const filt = ctx.createBiquadFilter();
  filt.type = 'lowpass';
  filt.frequency.setValueAtTime(200, ctx.currentTime);
  filt.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + dur);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.4, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
  src.connect(filt);
  filt.connect(gain);
  gain.connect(ctx.destination);
  src.start(ctx.currentTime + delay);
}

/* PHASE 4b: Debris crackle */
function playCrackle(delay) {
  const ctx = protAudio();
  const dur = 0.15;
  const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.2;
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const filt = ctx.createBiquadFilter();
  filt.type = 'bandpass';
  filt.frequency.setValueAtTime(2000, ctx.currentTime);
  filt.Q.setValueAtTime(0.5, ctx.currentTime);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
  src.connect(filt);
  filt.connect(gain);
  gain.connect(ctx.destination);
  src.start(ctx.currentTime + delay);
}

/* PHASE 5: Distant aftermath rumble */
function playDistantRumble() {
  const ctx = protAudio();
  const dur = 6;
  const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const t = i / ctx.sampleRate;
    const env = Math.pow(1 - t / dur, 2);
    data[i] = (Math.random() * 2 - 1) * env * 0.1;
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const filt = ctx.createBiquadFilter();
  filt.type = 'lowpass';
  filt.frequency.setValueAtTime(60, ctx.currentTime);
  filt.frequency.exponentialRampToValueAtTime(15, ctx.currentTime + dur);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
  src.connect(filt);
  filt.connect(gain);
  gain.connect(ctx.destination);
  src.start(ctx.currentTime);
}

/* ========== SETUP ========== */
function setupProtCanvas() {
  pCanvas = document.createElement('canvas');
  pCanvas.id = 'prot-canvas';
  pCanvas.width = window.innerWidth;
  pCanvas.height = window.innerHeight;
  document.body.appendChild(pCanvas);
  pC = pCanvas.getContext('2d');
}

/* ========== MAIN ENTRY ========== */
function showProtocoloFinal() {
  protPhase = 'active';
  game.phase = 'protocolo';

  document.getElementById('nav-bar').style.display = 'none';
  document.getElementById('click-left').style.display = 'none';
  document.getElementById('click-right').style.display = 'none';

  /* overlay */
  const overlay = document.createElement('div');
  overlay.id = 'prot-overlay';
  overlay.style.background = 'rgba(0,0,0,0)';
  document.body.appendChild(overlay);

  /* red base overlay */
  const red = document.createElement('div');
  red.id = 'prot-red-overlay';
  document.body.appendChild(red);

  /* glitch overlay */
  const glitch = document.createElement('div');
  glitch.id = 'prot-glitch';
  document.body.appendChild(glitch);

  /* scanlines */
  const scan = document.createElement('div');
  scan.id = 'prot-scanlines';
  document.body.appendChild(scan);

  /* dust overlay */
  const dust = document.createElement('div');
  dust.id = 'prot-dust';
  document.body.appendChild(dust);

  /* bottom glow */
  const glow = document.createElement('div');
  glow.id = 'prot-glow';
  document.body.appendChild(glow);

  /* flash */
  const flash = document.createElement('div');
  flash.id = 'prot-flash';
  document.body.appendChild(flash);

  setupProtCanvas();

  /* DARKEN + effects */
  requestAnimationFrame(() => {
    overlay.style.background = 'rgba(0,0,0,0.95)';
    overlay.style.transition = 'background 0.8s ease';
    red.style.opacity = '0.15';
    glitch.style.opacity = '1';
    scan.style.opacity = '1';
  });

  playSiren();

  /* === TIMELINE === */
  showAlertMessages();
  setTimeout(() => showCounter(), 2000);
  setTimeout(() => launchPhase(), 3200);
  setTimeout(() => triggerExplosion(), 5000);
  setTimeout(() => startAftermath(), 7300);
  setTimeout(() => cinematicReveal(), 8500);
}

/* ========== FASE 1 — ALERTA ========== */
const ALERT_MSGS = [
  { text: 'ALERTA MÁXIMO', size: 'clamp(1.8rem,3.5vw,2.8rem)', weight: '900', color: '#ff2222', shadow: '0 0 50px rgba(255,0,0,0.5)', delay: 300 },
  { text: 'PROTOCOLO NUCLEAR ATIVADO', size: 'clamp(0.9rem,1.5vw,1.2rem)', weight: '700', color: '#ff5555', shadow: '0 0 25px rgba(255,0,0,0.2)', delay: 600 },
  { text: 'EVACUAÇÃO IMEDIATA', size: 'clamp(0.9rem,1.5vw,1.2rem)', weight: '700', color: '#ff6666', shadow: '0 0 25px rgba(255,0,0,0.2)', delay: 600 },
  { text: 'COMUNICAÇÃO COMPROMETIDA', size: 'clamp(0.9rem,1.5vw,1.2rem)', weight: '700', color: '#ff6666', shadow: '0 0 25px rgba(255,0,0,0.2)', delay: 600 },
];

function showAlertMessages() {
  const overlay = document.getElementById('prot-overlay');
  const red = document.getElementById('prot-red-overlay');
  if (!overlay) return;

  let totalD = 300;
  ALERT_MSGS.forEach((m, i) => {
    totalD += m.delay;
    setTimeout(() => {
      /* red flash pulse per message */
      if (red) {
        red.style.opacity = '0.4';
        setTimeout(() => { red.style.opacity = '0.15'; }, 200);
      }

      const p = document.createElement('p');
      p.className = 'prot-alert-line glitch-text';
      p.textContent = m.text;
      p.style.fontSize = m.size;
      p.style.fontWeight = m.weight;
      p.style.color = m.color;
      p.style.textShadow = m.shadow;
      overlay.appendChild(p);

      setTimeout(() => {
        p.style.opacity = '1';
        p.style.transition = 'opacity 0.2s ease';
        setTimeout(() => { p.style.transition = 'opacity 0.5s ease'; }, 300);
      }, 50);

      /* shake the text on arrival */
      setTimeout(() => {
        p.classList.add('shake');
        setTimeout(() => p.classList.remove('shake'), 500);
      }, 100);
    }, totalD);
  });
}

/* ========== FASE 1b — CONTADOR ========== */
function showCounter() {
  const overlay = document.getElementById('prot-overlay');
  if (!overlay) return;
  const red = document.getElementById('prot-red-overlay');

  const el = document.createElement('div');
  el.id = 'prot-counter';
  overlay.appendChild(el);

  let count = 3;
  function tick() {
    if (count > 0) {
      el.textContent = count;
      el.style.opacity = '1';
      el.style.transform = 'scale(1.4)';
      playLaunch();

      /* bright red flash per count */
      if (red) {
        red.style.opacity = '0.5';
        setTimeout(() => { red.style.opacity = '0.15'; }, 200);
      }

      setTimeout(() => {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.6)';
      }, 450);
      count--;
      setTimeout(tick, 800);
    }
  }
  tick();
}

/* ========== FASE 2 — LANÇAMENTO ========== */
function launchPhase() {
  protPhase = 'missiles';
  const w = pCanvas.width;
  const h = pCanvas.height;

  /* shake starts */
  startShake(2, 0.4);

  const dirs = [
    { x: -120, y: h * 0.72, angle: 0.18 },
    { x: w * 0.92, y: -100, angle: -0.38 },
    { x: -100, y: h * 0.22, angle: -0.04 },
    { x: w * 1.15, y: h * 0.45, angle: 2.8 },
    { x: -120, y: h * 0.48, angle: 0.07 },
    { x: w * 0.65, y: h * 1.15, angle: -0.28 },
    { x: -100, y: h * 0.88, angle: 0.38 },
    { x: w * 0.3, y: -90, angle: -0.5 },
    { x: -110, y: h * 0.35, angle: 0.15 },
  ];

  dirs.forEach((d, i) => {
    setTimeout(() => {
      playLaunch();
      protMissiles.push({
        x: d.x, y: d.y, angle: d.angle,
        speed: 4 + Math.random() * 3,
        trail: [], active: true, life: 300
      });
    }, i * 150);
  });

  startAnimLoop();
}

let shakeAmp = 0;
let shakeDecay = 0;

function startShake(amp, decay) {
  shakeAmp = amp;
  shakeDecay = decay;
}

function updateShake() {
  if (shakeAmp > 0.1) {
    const dx = (Math.random() - 0.5) * shakeAmp * 2;
    const dy = (Math.random() - 0.5) * shakeAmp * 2;
    document.body.style.transform = `translate(${dx}px, ${dy}px)`;
    shakeAmp *= (1 - shakeDecay * 0.05);
  } else {
    document.body.style.transform = '';
  }
}

/* ========== FASE 3 — IMPACTO (15× ESCALA) ========== */
function triggerExplosion() {
  protPhase = 'explosion';
  const w = pCanvas.width;
  const h = pCanvas.height;
  const cx = w / 2;
  const cy = h / 2;

  /* kill missiles */
  protMissiles.forEach(m => { m.active = false; });

  /* massive white flash — longer, brighter */
  const flash = document.getElementById('prot-flash');
  if (flash) {
    flash.style.opacity = '1';
    flash.style.transition = 'none';
    setTimeout(() => {
      flash.style.transition = 'opacity 0.8s ease';
      flash.style.opacity = '0';
      setTimeout(() => {
        if (flash.parentNode) flash.parentNode.removeChild(flash);
      }, 1000);
    }, 500);
  }

  playExplosion();

  /* schedule multi-phase explosion sounds */
  setTimeout(playExplosionCrack, 500);
  setTimeout(() => playAftershock(0), 900);
  setTimeout(() => playAftershock(0), 1500);
  setTimeout(() => playAftershock(0), 2400);
  setTimeout(() => playCrackle(0), 1200);
  setTimeout(() => playCrackle(0), 1800);
  setTimeout(() => playCrackle(0), 2200);
  setTimeout(() => playCrackle(0), 2800);
  setTimeout(() => playCrackle(0), 3500);

  /* massive camera shake */
  startShake(15, 1.2);

  /* huge shockwave */
  protShocks.push({ x: cx, y: cy, r: 10, alpha: 0.9, speed: 25 });
  /* second shockwave offset, delayed */
  setTimeout(() => {
    protShocks.push({ x: cx + (Math.random() - 0.5) * 200, y: cy + (Math.random() - 0.5) * 150, r: 5, alpha: 0.6, speed: 18 });
  }, 400);
  /* third shockwave near edge */
  setTimeout(() => {
    protShocks.push({ x: Math.random() * w, y: Math.random() * h, r: 3, alpha: 0.4, speed: 15 });
  }, 800);

  /* delayed second flash (nuclear double-flash) */
  setTimeout(() => {
    const flash2 = document.getElementById('prot-flash');
    if (flash2 && flash2.parentNode) {
      flash2.style.opacity = '0.6';
      flash2.style.transition = 'none';
      setTimeout(() => {
        flash2.style.transition = 'opacity 0.5s ease';
        flash2.style.opacity = '0';
      }, 200);
    }
  }, 700);

  /* ===== 15× PARTICLES ===== */

  /* FIRE — 1500 particles, huge, fast */
  for (let i = 0; i < 1500; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 20;
    protParticles.push({
      x: cx + (Math.random() - 0.5) * 200,
      y: cy + (Math.random() - 0.5) * 180,
      vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 5,
      vy: Math.sin(angle) * speed - 2 - Math.random() * 6,
      life: 50 + Math.random() * 120,
      maxLife: 50 + Math.random() * 120,
      size: 5 + Math.random() * 14,
      color: `hsl(${10 + Math.random() * 30}, 100%, ${45 + Math.random() * 40}%)`,
      type: 'fire'
    });
  }

  /* DEBRIS — 1200 chunks */
  for (let i = 0; i < 1200; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 5 + Math.random() * 25;
    protParticles.push({
      x: cx + (Math.random() - 0.5) * 180,
      y: cy + (Math.random() - 0.5) * 150,
      vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 4,
      vy: Math.sin(angle) * speed - 3 - Math.random() * 6,
      life: 60 + Math.random() * 140,
      maxLife: 60 + Math.random() * 140,
      size: 3 + Math.random() * 10,
      color: `hsl(0, 0%, ${5 + Math.random() * 35}%)`,
      type: 'debris'
    });
  }

  /* SPARKS — 800 tiny bright */
  for (let i = 0; i < 800; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 8 + Math.random() * 30;
    protParticles.push({
      x: cx + (Math.random() - 0.5) * 150,
      y: cy + (Math.random() - 0.5) * 120,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - Math.random() * 3,
      life: 20 + Math.random() * 40,
      maxLife: 20 + Math.random() * 40,
      size: 2 + Math.random() * 5,
      color: `hsl(${45 + Math.random() * 15}, 100%, ${75 + Math.random() * 25}%)`,
      type: 'spark'
    });
  }

  /* SHRAPNEL — 600 fast, sharp */
  for (let i = 0; i < 600; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 10 + Math.random() * 40;
    protParticles.push({
      x: cx + (Math.random() - 0.5) * 120,
      y: cy + (Math.random() - 0.5) * 100,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 15 + Math.random() * 25,
      maxLife: 15 + Math.random() * 25,
      size: 1 + Math.random() * 3,
      color: `hsl(0, 0%, ${60 + Math.random() * 40}%)`,
      type: 'spark'
    });
  }

  /* MUSHROOM CLOUD updraft — 400 rising fire/smoke */
  const mcX = cx + (Math.random() - 0.5) * 100;
  for (let i = 0; i < 400; i++) {
    const angle = (Math.random() - 0.5) * 0.8;
    const speed = 2 + Math.random() * 8;
    protParticles.push({
      x: mcX + (Math.random() - 0.5) * 150,
      y: cy + (Math.random() - 0.5) * 50,
      vx: Math.sin(angle) * speed * 0.5,
      vy: -speed * (1 + Math.random()),
      life: 80 + Math.random() * 120,
      maxLife: 80 + Math.random() * 120,
      size: 8 + Math.random() * 18,
      color: `hsl(${20 + Math.random() * 20}, 100%, ${30 + Math.random() * 30}%)`,
      type: 'fire'
    });
  }

  /* CORNER BURSTS — fire from all 4 corners */
  const corners = [
    { x: 0, y: 0 },
    { x: w, y: 0 },
    { x: 0, y: h },
    { x: w, y: h }
  ];
  corners.forEach(c => {
    for (let i = 0; i < 200; i++) {
      const ang = Math.random() * Math.PI * 2;
      const sp = 3 + Math.random() * 12;
      protParticles.push({
        x: c.x + (Math.random() - 0.5) * 60,
        y: c.y + (Math.random() - 0.5) * 60,
        vx: Math.cos(ang) * sp + (c.x === 0 ? 1 : -1) * Math.random() * 5,
        vy: Math.sin(ang) * sp + (c.y === 0 ? 1 : -1) * Math.random() * 5,
        life: 40 + Math.random() * 80,
        maxLife: 40 + Math.random() * 80,
        size: 4 + Math.random() * 10,
        color: `hsl(${15 + Math.random() * 25}, 100%, ${50 + Math.random() * 35}%)`,
        type: 'fire'
      });
    }
  });

  /* EDGE DETONATIONS — fire climbing walls */
  for (let side = 0; side < 4; side++) {
    const count = 150;
    for (let i = 0; i < count; i++) {
      let x, y, vx, vy;
      const sp = 2 + Math.random() * 8;
      const ang = Math.random() * Math.PI * 1.5 - Math.PI * 0.25;
      if (side === 0) { /* top */
        x = Math.random() * w; y = 0;
        vx = Math.cos(ang) * sp; vy = Math.sin(ang) * sp * 0.5 + Math.random() * 3;
      } else if (side === 1) { /* bottom */
        x = Math.random() * w; y = h;
        vx = Math.cos(ang) * sp; vy = -Math.sin(ang) * sp * 0.5 - Math.random() * 3;
      } else if (side === 2) { /* left */
        x = 0; y = Math.random() * h;
        vx = Math.cos(ang) * sp * 0.5 + Math.random() * 3; vy = Math.sin(ang) * sp;
      } else { /* right */
        x = w; y = Math.random() * h;
        vx = -Math.cos(ang) * sp * 0.5 - Math.random() * 3; vy = Math.sin(ang) * sp;
      }
      protParticles.push({
        x, y,
        vx, vy,
        life: 30 + Math.random() * 60,
        maxLife: 30 + Math.random() * 60,
        size: 3 + Math.random() * 8,
        color: `hsl(${20 + Math.random() * 20}, 100%, ${50 + Math.random() * 30}%)`,
        type: 'fire'
      });
    }
  }

  /* SMOKE CLOUDS — 80 clouds filling full viewport */
  for (let i = 0; i < 80; i++) {
    protSmoke.push({
      x: Math.random() * w * 1.2 - w * 0.1,
      y: Math.random() * h * 1.2 - h * 0.1,
      r: 50 + Math.random() * 120,
      alpha: 0.3 + Math.random() * 0.5,
      growth: 0.3 + Math.random() * 1.5,
      driftX: (Math.random() - 0.5) * 0.8,
      driftY: -0.3 - Math.random() * 0.6
    });
  }

  /* SECONDARY EXPLOSIONS — 25 across full screen */
  for (let i = 0; i < 25; i++) {
    const sx = Math.random() * w;
    const sy = Math.random() * h;
    protSecExplosions.push({ x: sx, y: sy, delay: i * 150 + 100, triggered: false });
  }

  /* GROUND FIRE — persistent flames across bottom */
  for (let i = 0; i < 300; i++) {
    const x = Math.random() * w;
    protParticles.push({
      x, y: h - 10 - Math.random() * 40,
      vx: (Math.random() - 0.5) * 2,
      vy: -1 - Math.random() * 4,
      life: 60 + Math.random() * 100,
      maxLife: 60 + Math.random() * 100,
      size: 4 + Math.random() * 10,
      color: `hsl(${15 + Math.random() * 25}, 100%, ${45 + Math.random() * 35}%)`,
      type: 'fire'
    });
  }

  /* EMBERS — 120 for aftermath */
  for (let i = 0; i < 120; i++) {
    protEmbers.push({
      x: Math.random() * pCanvas.width,
      y: Math.random() * pCanvas.height * 0.6 + pCanvas.height * 0.2,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -0.2 - Math.random() * 0.8,
      life: 250 + Math.random() * 400,
      size: 1.5 + Math.random() * 4,
      phaseOff: Math.random() * Math.PI * 2
    });
  }

  /* ASH — 100 particles */
  for (let i = 0; i < 100; i++) {
    protAsh.push({
      x: Math.random() * pCanvas.width,
      y: Math.random() * pCanvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: 0.15 + Math.random() * 0.5,
      size: 0.5 + Math.random() * 3,
      phaseOff: Math.random() * Math.PI * 2,
      life: 600 + Math.random() * 600
    });
  }

  /* red/orange glow overlay */
  const red = document.getElementById('prot-red-overlay');
  if (red) {
    red.style.background = 'radial-gradient(ellipse at 50% 50%, rgba(255,50,0,0.25), rgba(139,30,30,0.12))';
  }

  const glow = document.getElementById('prot-glow');
  if (glow) glow.style.opacity = '1';

  const dust = document.getElementById('prot-dust');
  if (dust) dust.style.opacity = '1';

  setTimeout(() => { protPhase = 'aftermath'; }, 2500);
}

/* ========== FASE 4 — PÓS-IMPACTO ========== */
function startAftermath() {
  protPhase = 'aftermath';

  const overlay = document.getElementById('prot-overlay');
  if (overlay) {
    overlay.innerHTML = '';
    overlay.style.background = 'rgba(0,0,0,0.97)';
  }

  /* fade red overlay to warm tone */
  const red = document.getElementById('prot-red-overlay');
  if (red) {
    red.style.background = 'rgba(80, 20, 0, 0.06)';
    red.className = '';
    red.style.animation = 'none';
  }

  stopSiren();
  playDistantRumble();

  /* glitch stops */
  const glitch = document.getElementById('prot-glitch');
  if (glitch) {
    glitch.className = '';
    glitch.style.opacity = '0';
  }

  const scan = document.getElementById('prot-scanlines');
  if (scan) scan.style.opacity = '0.3';
}

/* ========== ANIMATION LOOP ========== */
function startAnimLoop() {
  if (protAnimId) return;

  function frame() {
    const w = pCanvas.width;
    const h = pCanvas.height;
    pC.clearRect(0, 0, w, h);

    if (protPhase === 'missiles' || protPhase === 'explosion') {
      updateMissiles(w, h);
    }

    if (protPhase === 'explosion' || protPhase === 'aftermath') {
      updateShockwaves();
      updateParticles();
      updateSmoke();
      updateSecExplosions(w, h);
    }

    if (protPhase === 'aftermath') {
      updateEmbers();
      updateAsh(w, h);
    }

    updateShake();

    if (protPhase !== 'idle' && protPhase !== 'reveal') {
      protAnimId = requestAnimationFrame(frame);
    } else {
      protAnimId = null;
    }
  }
  protAnimId = requestAnimationFrame(frame);
}

/* ========== UPDATE FUNCTIONS ========== */
function updateMissiles(w, h) {
  protMissiles.forEach(m => {
    if (!m.active) return;
    m.x += Math.cos(m.angle) * m.speed;
    m.y += Math.sin(m.angle) * m.speed;
    m.life--;

    m.trail.push({ x: m.x, y: m.y, life: 45, spread: Math.random() * 3 });
    m.trail.forEach(t => t.life--);

    /* thick smoke trail — two layers */
    m.trail.forEach(t => {
      const a = (t.life / 45) * 0.35;
      if (a <= 0) return;
      /* dark core */
      const sc = (45 - t.life) * 0.5 + t.spread;
      pC.fillStyle = `rgba(60,55,50,${a * 0.4})`;
      pC.beginPath();
      pC.arc(t.x + (Math.random() - 0.5) * 4, t.y + (Math.random() - 0.5) * 4, sc, 0, Math.PI * 2);
      pC.fill();
      /* lighter outer */
      pC.fillStyle = `rgba(180,175,165,${a * 0.25})`;
      pC.beginPath();
      pC.arc(t.x + (Math.random() - 0.5) * 6, t.y + (Math.random() - 0.5) * 6, sc * 1.6, 0, Math.PI * 2);
      pC.fill();
    });
    m.trail = m.trail.filter(t => t.life > 0);

    /* body */
    pC.save();
    pC.translate(m.x, m.y);
    pC.rotate(m.angle);

    const len = 42;
    const w2 = 5;

    /* fuselage */
    pC.fillStyle = '#3a3a3a';
    pC.fillRect(-len * 0.3, -w2, len * 0.65, w2 * 2);
    /* nose cone */
    pC.fillStyle = '#4a4a4a';
    pC.beginPath();
    pC.moveTo(len * 0.35, 0);
    pC.lineTo(len * 0.15, -w2 * 0.8);
    pC.lineTo(len * 0.15, w2 * 0.8);
    pC.closePath();
    pC.fill();
    /* nose tip — red */
    pC.fillStyle = '#aa2222';
    pC.beginPath();
    pC.moveTo(len * 0.42, 0);
    pC.lineTo(len * 0.30, -w2 * 0.5);
    pC.lineTo(len * 0.30, w2 * 0.5);
    pC.closePath();
    pC.fill();
    /* fin top */
    pC.fillStyle = '#2a2a2a';
    pC.beginPath();
    pC.moveTo(-len * 0.28, -w2);
    pC.lineTo(-len * 0.32, -w2 * 0.2);
    pC.lineTo(-len * 0.18, -w2 * 0.1);
    pC.lineTo(-len * 0.18, -w2);
    pC.closePath();
    pC.fill();
    /* fin bottom */
    pC.beginPath();
    pC.moveTo(-len * 0.28, w2);
    pC.lineTo(-len * 0.32, w2 * 0.2);
    pC.lineTo(-len * 0.18, w2 * 0.1);
    pC.lineTo(-len * 0.18, w2);
    pC.closePath();
    pC.fill();
    /* rear band */
    pC.fillStyle = '#555';
    pC.fillRect(-len * 0.28, -w2 - 1, 3, w2 * 2 + 2);

    /* flame — outer glow */
    const flO = 0.2 + Math.random() * 0.3;
    pC.fillStyle = `rgba(255,100,0,${flO})`;
    const flLenO = 18 + Math.random() * 10;
    pC.beginPath();
    pC.moveTo(-len * 0.3 + Math.random() * 2, 0);
    pC.lineTo(-len * 0.3 - flLenO, -w2 * 1.8 + Math.random() * 2);
    pC.lineTo(-len * 0.3 - flLenO, w2 * 1.8 - Math.random() * 2);
    pC.closePath();
    pC.fill();
    /* flame — inner bright */
    const flI = 0.5 + Math.random() * 0.5;
    pC.fillStyle = `rgba(255,220,50,${flI})`;
    const flLenI = 12 + Math.random() * 6;
    pC.beginPath();
    pC.moveTo(-len * 0.3, 0);
    pC.lineTo(-len * 0.3 - flLenI, -w2 * 0.6 + Math.random());
    pC.lineTo(-len * 0.3 - flLenI, w2 * 0.6 - Math.random());
    pC.closePath();
    pC.fill();
    /* flame — white core */
    const flC = 0.3 + Math.random() * 0.4;
    pC.fillStyle = `rgba(255,255,240,${flC})`;
    const flLenC = 6 + Math.random() * 4;
    pC.beginPath();
    pC.moveTo(-len * 0.3, 0);
    pC.lineTo(-len * 0.3 - flLenC, -w2 * 0.3);
    pC.lineTo(-len * 0.3 - flLenC, w2 * 0.3);
    pC.closePath();
    pC.fill();

    pC.restore();

    if (m.life <= 0 || m.x > w + 150 || m.x < -250 || m.y > h + 150 || m.y < -250) {
      m.active = false;
    }
  });
}

function updateShockwaves() {
  protShocks.forEach(s => {
    s.r += s.speed;
    s.alpha -= 0.025;
    if (s.alpha > 0) {
      pC.strokeStyle = `rgba(255,255,255,${s.alpha})`;
      pC.lineWidth = 3;
      pC.beginPath();
      pC.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      pC.stroke();
      /* inner ring */
      pC.strokeStyle = `rgba(255,200,100,${s.alpha * 0.5})`;
      pC.lineWidth = 1.5;
      pC.beginPath();
      pC.arc(s.x, s.y, s.r * 0.8, 0, Math.PI * 2);
      pC.stroke();
    }
  });
  protShocks = protShocks.filter(s => s.alpha > 0);
}

function updateParticles() {
  protParticles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.05;
    p.vx *= 0.98;
    p.life--;
    const a = p.life / p.maxLife;
    if (a <= 0) return;
    const s = p.size * a;

    pC.globalAlpha = a;
    pC.fillStyle = p.color;
    pC.beginPath();
    pC.arc(p.x, p.y, s, 0, Math.PI * 2);
    pC.fill();

    /* glow for fire */
    if (p.type === 'fire') {
      pC.fillStyle = `rgba(255,200,50,${a * 0.15})`;
      pC.beginPath();
      pC.arc(p.x, p.y, s * 2.5, 0, Math.PI * 2);
      pC.fill();
    }

    /* brightness for sparks */
    if (p.type === 'spark') {
      pC.fillStyle = `rgba(255,255,255,${a * 0.4})`;
      pC.beginPath();
      pC.arc(p.x, p.y, s * 1.5, 0, Math.PI * 2);
      pC.fill();
    }
  });
  pC.globalAlpha = 1;
  protParticles = protParticles.filter(p => p.life > 0);
}

function updateSmoke() {
  protSmoke.forEach(s => {
    s.r += s.growth * 0.15;
    s.x += s.driftX;
    s.y += s.driftY;
    s.alpha -= 0.003;

    const a = Math.max(0, s.alpha) * 0.3;
    if (a <= 0) return;

    /* dark smoke */
    pC.fillStyle = `rgba(20, 18, 15, ${a})`;
    pC.beginPath();
    pC.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    pC.fill();

    /* slightly lighter core */
    pC.fillStyle = `rgba(40, 35, 30, ${a * 0.15})`;
    pC.beginPath();
    pC.arc(s.x + s.driftX * 3, s.y + s.driftY * 3, s.r * 0.5, 0, Math.PI * 2);
    pC.fill();
  });
  protSmoke = protSmoke.filter(s => s.alpha > 0);
}

function updateSecExplosions(w, h) {
  protSecExplosions.forEach(se => {
    if (se.triggered) return;
    if (se.delay <= 0) {
      se.triggered = true;
      /* spawn large secondary burst */
      for (let i = 0; i < 80; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 12;
        protParticles.push({
          x: se.x, y: se.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          life: 25 + Math.random() * 50,
          maxLife: 25 + Math.random() * 50,
          size: 3 + Math.random() * 7,
          color: `hsl(${15 + Math.random() * 25}, 100%, ${50 + Math.random() * 35}%)`,
          type: 'fire'
        });
      }
      /* large flash */
      const flash = document.createElement('div');
      flash.style.cssText = `position:fixed;left:${se.x}px;top:${se.y}px;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,#fff 0%,rgba(255,200,100,0.8) 40%,transparent 70%);z-index:20003;pointer-events:none;opacity:0.7;transform:translate(-50%,-50%);transition:opacity 0.4s ease;`;
      document.body.appendChild(flash);
      setTimeout(() => { flash.style.opacity = '0'; }, 150);
      setTimeout(() => { if (flash.parentNode) flash.parentNode.removeChild(flash); }, 700);
    }
    se.delay -= 16;
  });
}

function updateEmbers() {
  protEmbers.forEach(e => {
    e.x += e.vx + Math.sin(e.phaseOff + Date.now() * 0.002) * 0.3;
    e.y += e.vy;
    e.life--;

    const flicker = 0.3 + Math.sin(e.phaseOff + Date.now() * 0.004) * 0.4;
    const a = (e.life / 200) * flicker * 0.6;
    if (a <= 0 || e.y < -30) return;

    pC.fillStyle = `rgba(255, ${140 + Math.random() * 80}, ${Math.random() * 40}, ${a})`;
    pC.beginPath();
    pC.arc(e.x, e.y, e.size * (0.6 + flicker * 0.5), 0, Math.PI * 2);
    pC.fill();
  });
  protEmbers = protEmbers.filter(e => e.life > 0 && e.y > -30);

  /* occasionally spawn new embers during aftermath */
  if (protPhase === 'aftermath' && Math.random() < 0.15 && protEmbers.length < 100) {
    protEmbers.push({
      x: Math.random() * pCanvas.width,
      y: pCanvas.height - Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.2 - Math.random() * 0.5,
      life: 200 + Math.random() * 300,
      size: 1 + Math.random() * 2.5,
      phaseOff: Math.random() * Math.PI * 2
    });
  }
}

function updateAsh(w, h) {
  protAsh.forEach(a => {
    a.x += a.vx + Math.sin(a.phaseOff + Date.now() * 0.001) * 0.1;
    a.y += a.vy;
    a.life--;
    if (a.life <= 0 || a.y > h + 10) {
      a.y = -10;
      a.x = Math.random() * w;
      a.life = 500 + Math.random() * 500;
    }
    const alpha = 0.15 + Math.sin(a.phaseOff + Date.now() * 0.002) * 0.1;
    pC.fillStyle = `rgba(180, 170, 160, ${alpha})`;
    pC.beginPath();
    pC.arc(a.x, a.y, a.size, 0, Math.PI * 2);
    pC.fill();
  });
}

/* ========== FASE 5 — REVELAÇÃO ========== */
function cinematicReveal() {
  protPhase = 'reveal';
  if (protAnimId) { cancelAnimationFrame(protAnimId); protAnimId = null; }

  const overlay = document.getElementById('prot-overlay');
  if (!overlay) return;

  /* clean up */
  const cv = document.getElementById('prot-canvas');
  if (cv) cv.remove();
  pCanvas = null; pC = null;

  const elementsToRemove = ['prot-red-overlay', 'prot-glitch', 'prot-scanlines',
    'prot-dust', 'prot-glow', 'prot-flash'];
  elementsToRemove.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });

  overlay.innerHTML = '';
  overlay.style.background = 'rgba(0,0,0,0.98)';
  overlay.style.transition = 'none';

  const lines = [
    { text: 'DESENVOLVIDO POR', size: 'clamp(0.8rem,1.2vw,1rem)', color: '#888', weight: '400', delay: 700, shadow: '' },
    { text: 'EDUARDO KUTZKE', size: 'clamp(2rem,5vw,4rem)', color: '#D6C3A5', weight: '900', delay: 1600, shadow: '0 0 50px rgba(214,195,165,0.2)' },
    { text: '', size: '', color: '', weight: '', delay: 600, shadow: '' },
    { text: 'GUERRA FRIA', size: 'clamp(1rem,2vw,1.5rem)', color: '#C9A227', weight: '900', delay: 1200, shadow: '0 0 40px rgba(201,162,39,0.15)' },
    { text: 'DOSSIÊ INTERATIVO', size: 'clamp(0.7rem,1vw,0.9rem)', color: '#777', weight: '400', delay: 800, shadow: '' },
    { text: '2026', size: 'clamp(0.7rem,1vw,0.9rem)', color: '#555', weight: '400', delay: 500, shadow: '' },
    { text: '', size: '', color: '', weight: '', delay: 900, shadow: '' },
    { text: 'ARQUIVO ENCERRADO', size: 'clamp(0.7rem,1.2vw,1rem)', color: '#666', weight: '400', delay: 1200, shadow: '' },
    { text: 'CLASSIFICAÇÃO REMOVIDA', size: 'clamp(0.6rem,1vw,0.8rem)', color: '#444', weight: '400', delay: 900, shadow: '' },
    { text: 'FIM DA OPERAÇÃO', size: 'clamp(0.6rem,1vw,0.8rem)', color: '#8B1E1E', weight: '700', delay: 700, shadow: '0 0 25px rgba(139,30,30,0.2)' },
  ];

  let totalD = 0;
  lines.forEach(item => {
    totalD += item.delay;
    if (!item.text) {
      const sp = document.createElement('div');
      sp.style.height = '0.8rem';
      setTimeout(() => overlay.appendChild(sp), totalD);
      return;
    }
    const p = document.createElement('p');
    p.className = 'prot-reveal-line';
    p.textContent = item.text;
    p.style.fontSize = item.size;
    p.style.fontWeight = item.weight;
    p.style.color = item.color;
    p.style.textShadow = item.shadow;
    setTimeout(() => {
      overlay.appendChild(p);
      requestAnimationFrame(() => {
        p.style.opacity = '1';
        p.style.transform = 'translateY(0)';
      });
    }, totalD);
  });
}
