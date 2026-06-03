/* ========== SPLASH SEQUENCE ========== */
function runSplash(callback) {
  const splash = document.getElementById('splash-screen');
  splash.classList.add('visible');

  const lines = [
    { text: 'ABRINDO ARQUIVO CENTRAL...', cls: '', delay: 400 },
    { text: 'LOCALIZAÇÃO: BERLIM — SETOR AMERICANO', cls: '', delay: 600 },
    { text: 'CREDENCIAIS VERIFICADAS.', cls: 'classified', delay: 500 },
    { text: '', cls: 'divider', delay: 300 },
    { text: 'CLASSIFICAÇÃO: VERTRAULICH', cls: 'warning', delay: 400 },
    { text: 'DOSSIÊ FROST SHADOW', cls: 'classified', delay: 500 },
    { text: 'MATERIAL DESCLASSIFICADO — 1995', cls: '', delay: 300 },
    { text: 'CONTEÚDO: DOCUMENTOS RECUPERADOS', cls: 'security', delay: 600 },
    { text: '', cls: 'divider', delay: 400 },
    { text: 'ARQUIVO PRONTO.///', cls: '', delay: 800 }
  ];

  let i = 0;
  function showNext() {
    if (i >= lines.length) {
      setTimeout(() => {
        splash.classList.remove('visible');
        splash.classList.add('hidden');
        setTimeout(() => {
          splash.style.display = 'none';
          document.getElementById('hud').classList.add('visible');
          if (callback) callback();
        }, 900);
      }, 600);
      return;
    }

    const line = lines[i];
    if (line.cls === 'divider') {
      const div = document.createElement('div');
      div.className = 'splash-divider';
      div.style.opacity = '0';
      splash.appendChild(div);
      setTimeout(() => { div.style.opacity = '1'; div.style.transition = 'opacity 0.5s'; }, 50);
      i++;
      setTimeout(showNext, line.delay);
      return;
    }

    const p = document.createElement('p');
    p.className = 'splash-line' + (line.cls ? ' ' + line.cls : '');
    splash.appendChild(p);

    let pos = 0;
    const fullText = line.text;
    function type() {
      if (pos < fullText.length) {
        p.textContent = fullText.slice(0, pos + 1) + (pos < fullText.length - 1 ? '█' : '');
        pos++;
        setTimeout(type, 20 + Math.random() * 15);
      } else {
        p.textContent = fullText;
        p.style.opacity = '1';
        p.style.transition = 'opacity 0.3s';
        i++;
        setTimeout(showNext, line.delay);
      }
    }
    setTimeout(type, 100);
  }

  showNext();

  /* Progress indicator */
  setTimeout(() => {
    const prog = document.createElement('p');
    prog.id = 'splash-progress';
    prog.textContent = 'INICIALIZANDO...';
    splash.appendChild(prog);
    setTimeout(() => { prog.style.opacity = '1'; prog.style.transition = 'opacity 1s'; }, 50);
  }, 2000);
}

/* ========== BACKGROUND CANVAS — SCANNED DOSSIER ========== */
function setupBackground() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    drawPaperBase();
    drawBinderHoles();
    drawFoldLines();
    drawPageNumber();
    drawArchiveStamps();
    drawStainMarks();
    drawNoise();
  }

  /* aged paper base */
  function drawPaperBase() {
    const grd = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7);
    grd.addColorStop(0, 'rgba(40, 38, 32, 0.5)');
    grd.addColorStop(0.6, 'rgba(30, 28, 24, 0.3)');
    grd.addColorStop(1, 'rgba(13, 13, 13, 0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);

    /* subtle paper grain lines */
    ctx.save();
    ctx.strokeStyle = 'rgba(214, 195, 165, 0.005)';
    ctx.lineWidth = 0.3;
    for (let i = 0; i < 60; i++) {
      const y = Math.random() * h;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y + (Math.random() - 0.5) * 3);
      ctx.stroke();
    }
    ctx.restore();
  }

  /* ring binder holes on left edge */
  function drawBinderHoles() {
    ctx.save();
    ctx.fillStyle = 'rgba(214, 195, 165, 0.025)';
    ctx.strokeStyle = 'rgba(139, 30, 30, 0.008)';
    ctx.lineWidth = 0.3;

    const holeSpacing = h / 8;
    const holeX = 25;

    for (let i = 0; i < 9; i++) {
      const y = holeSpacing * i + holeSpacing / 2;
      ctx.beginPath();
      ctx.arc(holeX, y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      /* reinforcement ring */
      ctx.beginPath();
      ctx.arc(holeX, y, 6, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  /* fold/crease lines (like paper was folded) */
  function drawFoldLines() {
    ctx.save();
    ctx.strokeStyle = 'rgba(214, 195, 165, 0.008)';
    ctx.lineWidth = 0.5;

    /* vertical fold */
    ctx.beginPath();
    ctx.moveTo(w * 0.3, 0);
    ctx.lineTo(w * 0.3, h);
    ctx.stroke();

    /* horizontal folds */
    const foldYs = [h * 0.25, h * 0.5, h * 0.75];
    foldYs.forEach(y => {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    });
    ctx.restore();
  }

  /* page number */
  function drawPageNumber() {
    ctx.save();
    ctx.font = '8px "Courier New", monospace';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = 'rgba(214, 195, 165, 0.015)';
    ctx.fillText('— PÁGINA 1 DE 1 —', w - 15, h - 8);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'rgba(214, 195, 165, 0.008)';
    ctx.font = '6px "Courier New", monospace';
    ctx.fillText('FS-1962-DOSS-0042', 12, 8);
    ctx.restore();
  }

  /* faint archive stamps */
  function drawArchiveStamps() {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    /* large faint GEHEIM watermark */
    ctx.save();
    ctx.translate(w * 0.6, h * 0.45);
    ctx.rotate(-0.08);
    ctx.font = 'bold 56px "Courier New", monospace';
    ctx.fillStyle = 'rgba(139, 30, 30, 0.018)';
    ctx.fillText('GEHEIM', 0, 0);
    ctx.restore();

    /* DESCLASSIFICADO stamp */
    ctx.save();
    ctx.translate(w * 0.75, h * 0.25);
    ctx.rotate(0.05);
    ctx.font = 'bold 14px "Courier New", monospace';
    ctx.fillStyle = 'rgba(201, 162, 39, 0.015)';
    ctx.fillText('DESCLASSIFICADO', 0, 0);
    ctx.restore();

    /* archive reference stamp */
    ctx.save();
    ctx.translate(w * 0.82, h * 0.82);
    ctx.rotate(-0.04);
    ctx.font = '10px "Courier New", monospace';
    ctx.fillStyle = 'rgba(63, 63, 63, 0.015)';
    ctx.fillText('ARQUIVO CENTRAL DE BERLIM', 0, 0);
    ctx.fillText('N° REF: BRL-ARCH-62/004', 0, 14);
    ctx.restore();

    /* red Soviet stamp bottom left */
    ctx.save();
    ctx.translate(w * 0.15, h * 0.78);
    ctx.rotate(0.06);
    ctx.strokeStyle = 'rgba(139, 30, 30, 0.008)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI * 2);
    ctx.stroke();
    ctx.font = '6px "Courier New", monospace';
    ctx.fillStyle = 'rgba(139, 30, 30, 0.01)';
    ctx.fillText('KGB', 0, 2);
    ctx.restore();

    ctx.restore();
  }

  /* random stain / coffee ring marks */
  function drawStainMarks() {
    ctx.save();

    for (let s = 0; s < 3; s++) {
      const cx = 60 + Math.random() * (w - 120);
      const cy = 40 + Math.random() * (h - 80);
      const r = 15 + Math.random() * 35;

      ctx.strokeStyle = 'rgba(214, 195, 165, 0.004)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      /* inner irregular fill */
      ctx.fillStyle = 'rgba(214, 195, 165, 0.002)';
      ctx.beginPath();
      ctx.arc(cx + Math.random() * 4 - 2, cy + Math.random() * 4 - 2, r * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  /* paper noise / scan grain */
  function drawNoise() {
    const scale = 0.2;
    const nw = Math.ceil(w * scale);
    const nh = Math.ceil(h * scale);
    const offscreen = document.createElement('canvas');
    offscreen.width = nw;
    offscreen.height = nh;
    const offCtx = offscreen.getContext('2d');
    const imageData = offCtx.createImageData(nw, nh);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = 60 + Math.random() * 50;
      data[i] = v * 0.55;
      data[i + 1] = v * 0.5;
      data[i + 2] = v * 0.35;
      data[i + 3] = 4;
    }
    offCtx.putImageData(imageData, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(offscreen, 0, 0, nw, nh, 0, 0, w, h);
  }

  resize();
  window.addEventListener('resize', resize);
}

/* ========== HUD CLOCK ========== */
function startHUDClock() {
  function update() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const el = document.getElementById('hud-clock');
    if (el) el.textContent = h + ':' + m + ':' + s;
  }
  update();
  setInterval(update, 1000);
}

/* ========== MAIN INIT ========== */
function init() {
  setupBackground();
  startHUDClock();
  buildDots();
  setupKeyboard();
  setupClickZones();
  setupTouch();
  renderSlide(0);
}

document.addEventListener('DOMContentLoaded', () => {
  runSplash(init);
});
