const game = {
  phase: 'inactive',
  q: 0,
  obtained: 0,
  leaked: 0,
  security: 100
};

let ambCtx = null;
let ambOsc = null;
let ambGain = null;
let toneCtx = null;

function startAmbient() {
  try {
    ambCtx = new (window.AudioContext || window.webkitAudioContext)();
    ambOsc = ambCtx.createOscillator();
    ambGain = ambCtx.createGain();
    const lfo = ambCtx.createOscillator();
    const lfoGain = ambCtx.createGain();
    lfo.frequency.setValueAtTime(0.5, ambCtx.currentTime);
    lfoGain.gain.setValueAtTime(8, ambCtx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(ambOsc.frequency);
    ambOsc.type = 'sine';
    ambOsc.frequency.setValueAtTime(60, ambCtx.currentTime);
    ambGain.gain.setValueAtTime(0.025, ambCtx.currentTime);
    ambOsc.connect(ambGain);
    ambGain.connect(ambCtx.destination);
    ambOsc.start();
    lfo.start();
  } catch (_) {}
}

function stopAmbient() {
  try { ambOsc?.stop(); ambCtx?.close(); } catch (_) {}
  ambCtx = null; ambOsc = null; ambGain = null;
}

function playTone(type) {
  try {
    if (!toneCtx || toneCtx.state === 'closed') {
      toneCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = toneCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    osc.connect(gain);

    if (type === 'success') {
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } else if (type === 'fail') {
      osc.type = 'sawtooth';
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.setValueAtTime(300, ctx.currentTime + 0.15);
      osc.frequency.setValueAtTime(200, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);
    } else if (type === 'start') {
      osc.type = 'square';
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.setValueAtTime(330, ctx.currentTime + 0.08);
      osc.frequency.setValueAtTime(440, ctx.currentTime + 0.16);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.32);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } else if (type === 'end') {
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      osc.frequency.setValueAtTime(784, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.2);
      osc.frequency.setValueAtTime(523, ctx.currentTime + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.7);
    } else if (type === 'click') {
      osc.type = 'square';
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.04);
    } else if (type === 'static') {
      const dur = 0.08;
      const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.1;
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const g = ctx.createGain();
      g.gain.setValueAtTime(1, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      src.connect(g);
      g.connect(ctx.destination);
      src.start(ctx.currentTime);
    } else if (type === 'alarm') {
      osc.type = 'square';
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      for (let i = 0; i < 4; i++) {
        const t = ctx.currentTime + i * 0.25;
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.setValueAtTime(600, t + 0.12);
      }
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.2);
    }
  } catch (_) {}
}

function enterGame() {
  stopAmbient();
  document.getElementById('nav-bar').style.display = 'none';
  document.getElementById('click-left').style.display = 'none';
  document.getElementById('click-right').style.display = 'none';
  game.phase = 'intro';
  game.q = 0;
  game.obtained = 0;
  game.leaked = 0;
  game.security = 100;
  playTone('static');
  startAmbient();
  renderGameIntro();
}

/* ========== TYPEWRITER ========== */
function typeText(element, text, speed, callback) {
  let i = 0;
  element.textContent = '';
  const interval = setInterval(() => {
    if (i < text.length) {
      element.textContent += text[i];
      i++;
    } else {
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed || 20);
}

function typeLines(lines, container, speed, callback) {
  let i = 0;
  function next() {
    if (i >= lines.length) {
      if (callback) callback();
      return;
    }
    const p = document.createElement('p');
    p.className = 'hacking-line';
    p.style.opacity = '1';
    container.appendChild(p);
    typeText(p, lines[i], speed || 15, () => {
      i++;
      setTimeout(next, 150);
    });
  }
  next();
}

/* ========== BERLIN DOSSIER INTRO ========== */
function renderGameIntro() {
  const container = document.getElementById('slides-container');
  container.innerHTML = '';
  container.innerHTML = `
    <div class="game-screen">
      <div class="game-intro-content">
        <div class="cia-logo">[ ARQUIVO CENTRAL DE BERLIM ] — <strong>DOSSIÊ</strong> — FROST SHADOW</div>
        <div class="operation-code">DOSSIÊ<br>FROST SHADOW</div>
        <p class="operation-date">>> BERLIM — 1962 — ACERVO HISTÓRICO</p>
        <p class="operation-threat">>> CLASSIFICAÇÃO ORIGINAL: VERTRAULICH — MATERIAL DESCLASSIFICADO</p>
        <div class="game-intro-divider"></div>
        <p class="game-intro-text">Você está examinando um <span class="highlight">dossiê histórico desclassificado</span> dos arquivos de Berlim.</p>
        <p class="game-intro-text">Seu objetivo: <span class="highlight">recuperar documentos de inteligência</span> do período da Guerra Fria.</p>
        <p class="game-intro-text">Cada documento recuperado revela um registro <span class="highlight">classificado</span> do acervo histórico.</p>
        <p class="game-intro-text">Erros comprometem a <span class="danger">integridade do arquivo</span> e registros são perdidos.</p>
        <div class="intro-objective">
          <p class="obj-label">>> OBJETIVO DA ANÁLISE</p>
          <p class="obj-text">Reunir documentos históricos de inteligência soviética preservados no arquivo central de Berlim. Registros perdidos reduzem a integridade do acervo.</p>
        </div>
        <button class="game-btn" onclick="playTone('click');initGameplay()">INICIAR ANÁLISE</button>
      </div>
    </div>
  `;
}

function initGameplay() {
  game.phase = 'playing';
  playTone('start');
  playTone('static');
  renderQuestion();
}

/* ========== QUESTION ========== */
function renderQuestion() {
  const q = gameQuestions[game.q];
  const container = document.getElementById('slides-container');
  playTone('static');
  const secColor = game.security >= 60 ? '#C9A227' : game.security >= 30 ? '#D6C3A5' : '#8B1E1E';
  const secClass = game.security >= 60 ? '' : game.security >= 30 ? 'warning' : 'critical';
  container.innerHTML = `
    <div class="game-screen">
      <div class="game-question-content">
        <div class="mission-header">
          <span class="mission-title">DOCUMENTO FS-${String(game.q + 1).padStart(2, '0')} DE ${String(gameQuestions.length).padStart(2, '0')}</span>
          <span class="mission-number">${game.q + 1} / ${gameQuestions.length}</span>
        </div>
        <div class="security-bar-container">
          <div class="security-bar-label">
            <span>INTEGRIDADE DO ACERVO</span>
            <span style="color:${secColor}">${game.security}%</span>
          </div>
          <div class="security-bar-track">
            <div class="security-bar-fill ${secClass}" style="width:${game.security}%"></div>
          </div>
        </div>
        <div class="game-stats">
          <div class="game-stat stat-obtained">
            <span class="stat-label">DOCUMENTOS RECUPERADOS</span>
            <span class="stat-value">${game.obtained}</span>
          </div>
          <div class="game-stat stat-leaked">
            <span class="stat-label">REGISTROS PERDIDOS</span>
            <span class="stat-value">${game.leaked}</span>
          </div>
        </div>
        <div class="mission-progress">
          <div class="mission-progress-fill" style="width:${(game.q / gameQuestions.length) * 100}%"></div>
        </div>
        <div class="game-context-box">
          <p class="game-context-label">RELATÓRIO HISTÓRICO</p>
          <p class="game-context-text" id="context-text"></p>
        </div>
        <div class="game-question-box">
          <p class="game-question-text" id="question-text">Analise as informações e responda:</p>
        </div>
        <div class="game-options">
          ${q.options.map((opt, i) => `
            <button class="game-option" onclick="playTone('click');selectAnswer(${i})">
              <span class="game-option-letter">${String.fromCharCode(65 + i)}</span>
              <span class="game-option-text">${opt}</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  const ctx = document.getElementById('context-text');
  if (ctx && q.context) typeText(ctx, q.context, 15);
  const qt = document.getElementById('question-text');
  if (qt) {
    setTimeout(() => typeText(qt, q.question, 12), q.context ? 500 : 0);
  }
}

function selectAnswer(idx) {
  const q = gameQuestions[game.q];
  const correct = idx === q.correct;

  document.querySelectorAll('.game-option').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    else if (i === idx && !correct) btn.classList.add('wrong');
  });

  setTimeout(() => {
    if (correct) {
      game.obtained++;
      playTone('success');
      showSuccessEffect();
    } else {
      game.leaked++;
      game.security = Math.max(0, game.security - 25);
      playTone('fail');
      playTone('alarm');
      showFailEffect();
    }
  }, 700);
}

function showSuccessEffect() {
  const flash = document.createElement('div');
  flash.className = 'flash-overlay';
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 700);
  showHackingSequence();
}

function showFailEffect() {
  const flash = document.createElement('div');
  flash.className = 'flash-overlay fail';
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 900);
  setTimeout(() => renderFail(), 500);
}

/* ========== ARCHIVE RETRIEVAL ========== */
function showHackingSequence() {
  const container = document.getElementById('slides-container');
  container.innerHTML = `
    <div class="game-screen">
      <div class="hacking-screen" id="hacking-screen"></div>
    </div>
  `;
  const hs = document.getElementById('hacking-screen');
  playTone('static');
  const lines = [
    'ARQUIVO CENTRAL DE BERLIM — ACESSANDO...',
    'Buscando documento: FS-' + String(game.q + 1).padStart(2, '0') + '...',
    'Documento localizado no acervo histórico.',
    'Transferência autorizada pelo arquivo central.',
    'Reconstituindo conteúdo do documento...',
    'Verificação de integridade: ████████████ 100%',
    'DOCUMENTO RECUPERADO COM SUCESSO.'
  ];
  typeLines(lines, hs, 18, () => {
    setTimeout(() => renderSuccess(), 400);
  });
}

/* ========== SUCCESS — DOCUMENT ========== */
function renderSuccess() {
  const q = gameQuestions[game.q];
  const f = q.file;
  const container = document.getElementById('slides-container');
  playTone('static');
  container.innerHTML = `
    <div class="game-screen">
      <div class="game-result-content">
        <div class="result-icon">>> DOCUMENTO RECUPERADO</div>
        <div class="result-title">ARQUIVO HISTÓRICO</div>
        <div class="result-divider"></div>
        <div class="result-file">
          <div class="stamp stamp-geheim" style="position:absolute;top:0.8rem;right:0.8rem;transform:rotate(6deg);">GEHEIM</div>
          <div class="result-file-header">ARQUIVO HISTÓRICO ${f.number}</div>
          <div class="result-file-meta">
            <span class="meta-label">Classificação:</span>
            <span class="meta-value">${f.classification}</span>
            <span class="meta-label">Origem:</span>
            <span class="meta-value">Berlim — Acervo Oriental</span>
            <span class="meta-label">Data:</span>
            <span class="meta-value">${f.date}</span>
          </div>
          <div class="result-file-title" id="doc-title"></div>
          <div class="result-file-content" id="doc-body"></div>
          ${f.footer ? `<div class="result-file-footer">${f.footer}</div>` : ''}
          <div class="result-file-classification">${f.classification}</div>
        </div>
        <button class="game-btn" onclick="playTone('click');nextQuestion()">CONTINUAR</button>
      </div>
    </div>
  `;
  const dt = document.getElementById('doc-title');
  const db = document.getElementById('doc-body');
  if (dt) typeText(dt, f.title, 15, () => {
    if (db) {
      const text = f.body.map(p => p).join('\n');
      typeText(db, text, 10);
    }
  });
}

/* ========== FAIL ========== */
function renderFail() {
  const q = gameQuestions[game.q];
  const f = q.fail;
  const container = document.getElementById('slides-container');
  container.innerHTML = `
    <div class="game-screen">
      <div class="game-result-content">
        <div class="result-icon" style="color:#8B1E1E">>> ALERTA — ACESSO NEGADO</div>
        <div class="result-title result-title-fail">REGISTRO CORROMPIDO</div>
        <div class="result-divider result-divider-fail"></div>
        <div class="result-fail-alert"><span>!! DADOS NÃO RECUPERADOS — ARQUIVO CORROMPIDO !!</span></div>
        <div class="result-file">
          <div class="stamp stamp-streng-geheim" style="position:absolute;top:0.8rem;right:0.8rem;transform:rotate(6deg);">STRENG GEHEIM</div>
          <div class="result-file-header" style="color:#8B1E1E">REGISTRO CORROMPIDO ${f.number}</div>
          <div class="result-file-meta result-file-meta-fail">
            <span class="meta-label">Classificação:</span>
            <span class="meta-value">${f.classification}</span>
            <span class="meta-label">Arquivo de origem:</span>
            <span class="meta-value">Berlim — Acervo Central</span>
            <span class="meta-label">Data do incidente:</span>
            <span class="meta-value">${f.date}</span>
          </div>
          <div class="result-file-title result-file-title-fail" id="fail-title"></div>
          <div class="result-file-content" id="fail-body"></div>
        </div>
        <p class="result-fail-text">Documento não pôde ser recuperado. Registro do arquivo corrompido ou removido.</p>
        <button class="game-btn" onclick="playTone('click');nextQuestion()">CONTINUAR</button>
      </div>
    </div>
  `;
  const ft = document.getElementById('fail-title');
  const fb = document.getElementById('fail-body');
  if (ft) typeText(ft, f.title, 15, () => {
    if (fb) {
      const text = f.body.map(p => p).join('\n');
      typeText(fb, text, 10);
    }
  });
}

function nextQuestion() {
  game.q++;
  if (game.q >= gameQuestions.length) {
    renderFinal();
  } else {
    renderQuestion();
  }
}

/* ========== FINAL ========== */
function renderFinal() {
  playTone('end');
  playTone('static');
  const total = gameQuestions.length;
  const rate = Math.round((game.obtained / total) * 100);
  const rank = gameRanks.find(r => game.obtained >= r.min) || gameRanks[gameRanks.length - 1];
  const rateClass = rate >= 80 ? '' : rate >= 40 ? 'medium' : 'low';

  const container = document.getElementById('slides-container');
  container.innerHTML = `
    <div class="game-screen">
      <div class="game-final-content">
        <div class="game-final-badge">ANÁLISE DE DOCUMENTO ENCERRADA</div>
        <div class="game-final-divider"></div>
        <div class="game-final-rank">
          <div class="game-final-rank-title" id="rank-title"></div>
          <div class="game-final-rank-desc" id="rank-desc"></div>
        </div>
        <div class="game-final-stats">
          <div class="game-final-stat">
            <span class="final-stat-label">DOCUMENTOS RECUPERADOS</span>
            <span class="final-stat-value">+${game.obtained}</span>
          </div>
          <div class="game-final-stat">
            <span class="final-stat-label">REGISTROS PERDIDOS</span>
            <span class="final-stat-value">-${game.leaked}</span>
          </div>
          <div class="game-final-stat">
            <span class="final-stat-label">INTEGRIDADE DO ACERVO</span>
            <span class="final-stat-value">${rate}%</span>
          </div>
        </div>
        <div class="success-rate-bar">
          <div class="success-rate-fill ${rateClass}" style="width:0%" id="rate-fill"></div>
        </div>
        <div class="closing-sequence" id="closing-sequence"></div>
        <div class="protocolo-separator"></div>
        <button class="protocolo-btn" onclick="playTone('click');showProtocoloFinal()">PROTOCOLO FINAL</button>
        <div class="game-final-actions">
          <button class="game-btn" onclick="playTone('click');enterGame()">NOVA ANÁLISE</button>
          <button class="game-btn game-btn-secondary" onclick="playTone('click');exitGame()">VOLTAR AOS ARQUIVOS</button>
        </div>
      </div>
    </div>
  `;

  const rt = document.getElementById('rank-title');
  const rd = document.getElementById('rank-desc');
  if (rt) typeText(rt, rank.title, 30, () => {
    if (rd) typeText(rd, rank.desc, 15, () => {
      setTimeout(showClosingSequence, 600);
    });
  });
  setTimeout(() => {
    const rf = document.getElementById('rate-fill');
    if (rf) rf.style.width = rate + '%';
  }, 300);
}

function showClosingSequence() {
  const container = document.getElementById('closing-sequence');
  if (!container) return;
  const lines = [
    { text: 'O Muro de Berlim caiu em 9 de novembro de 1989.', cls: '' },
    { text: 'Por 28 anos, a cidade dividida foi o símbolo mais concreto da Guerra Fria.', cls: '' },
    { text: 'ARQUIVOS DESCLASSIFICADOS PELO TEMPO.', cls: 'highlight' },
    { text: 'ACESSO AUTORIZADO MEDIANTE DECRETO HISTÓRICO.', cls: '' },
    { text: '>> FIM DO DOSSIÊ FROST SHADOW <<', cls: 'end' }
  ];
  let i = 0;
  function nextLine() {
    if (i >= lines.length) return;
    const p = document.createElement('p');
    p.className = 'closing-line' + (lines[i].cls ? ' ' + lines[i].cls : '');
    container.appendChild(p);
    typeText(p, lines[i].text, 20);
    setTimeout(() => { p.style.opacity = '1'; }, 50);
    i++;
    setTimeout(nextLine, 700);
  }
  setTimeout(nextLine, 400);
}

function exitGame() {
  game.phase = 'inactive';
  stopAmbient();
  try { toneCtx?.close(); } catch (_) {}
  toneCtx = null;
  document.getElementById('nav-bar').style.display = '';
  document.getElementById('click-left').style.display = '';
  document.getElementById('click-right').style.display = '';
  currentIndex = 0;
  document.getElementById('slides-container').innerHTML = '';
  renderSlide(0);
}
