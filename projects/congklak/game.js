const HOUSE_COUNT = 7;
const TOTAL_SLOTS = 16;
const STARTING_SEEDS = 7;
const state = { mode: 'solo', difficulty: 'easy', active: 0, board: [], busy: false, over: false, rotated: false };

document.body.innerHTML = `
  <main class="app-shell">
    <header class="brand-bar"><div class="brand-mark"><span class="brand-seal">e</span><span>endprojects</span></div><p id="status" class="status"></p></header>
    <section class="hero"><p class="eyebrow">Permainan tradisional Nusantara</p><h1>Congklak</h1><p class="hero-copy">Satu papan, dua lumbung, dan langkah yang mengalir searah jarum jam.</p></section>
    <section class="control-panel"><div class="control-group"><span class="control-label">Mode</span><div class="segmented"><button class="choice is-selected" data-mode="solo">Solo</button><button class="choice" data-mode="duel">Duel</button></div></div><div class="control-group" id="difficulty-control"><label class="control-label" for="difficulty">Kesulitan</label><select id="difficulty"><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option><option value="sepuh">Sepuh</option></select></div><button class="primary-button" id="new-game">Mulai permainan</button></section>
    <section class="game-info"><div class="player-card is-active" id="card-0"><span class="player-dot dot-one"></span><span>Pemain 1</span><strong id="score-0">0</strong></div><div id="turn" class="turn-label">Siap bermain</div><div class="player-card" id="card-1"><span class="player-dot dot-two"></span><span id="player-two">Komputer</span><strong id="score-1">0</strong></div></section>
    <section class="board-wrap"><div class="board" id="board"><div class="store store-left"><span id="store-0">0</span><small>Lumbung 1</small></div><div id="top-row" class="houses"></div><div class="board-plaque"><span class="direction-arrow">↻</span> searah jarum jam</div><div id="bottom-row" class="houses"></div><div class="store store-right"><span id="store-1">0</span><small>Lumbung 2</small></div></div></section>
    <div class="board-actions"><button class="secondary-button" id="rotate-board" hidden>Putar untuk Pemain 2</button><p class="direction-note">Lumbung pemain selalu berada di kiri dari perspektifnya.</p></div>
    <section class="rules-card"><h2>Cara bermain</h2><p>Pilih salah satu lubangmu. Biji berjalan satu per satu searah jarum jam. Jika biji terakhir masuk ke lumbungmu, kamu mendapat giliran lagi.</p></section><footer>offline · vanilla web · <span>endprojects</span></footer>
  </main>`;

const $ = (selector) => document.querySelector(selector);
const el = { status: $('#status'), turn: $('#turn'), top: $('#top-row'), bottom: $('#bottom-row'), store0: $('#store-0'), store1: $('#store-1'), score0: $('#score-0'), score1: $('#score-1'), card0: $('#card-0'), card1: $('#card-1'), playerTwo: $('#player-two'), difficulty: $('#difficulty'), difficultyControl: $('#difficulty-control'), board: $('#board'), rotate: $('#rotate-board') };

const ownerOf = (slot) => (slot >= 1 && slot <= 7 ? 0 : slot >= 9 && slot <= 15 ? 1 : null);
const house = (slot) => ownerOf(slot) !== null;
const opposite = (slot) => 16 - slot;
const nameOf = (player) => player === 0 ? 'Pemain 1' : state.mode === 'solo' ? 'Komputer' : 'Pemain 2';
const legalMoves = (player) => { const start = player ? 9 : 1; return Array.from({ length: HOUSE_COUNT }, (_, i) => start + i).filter((slot) => state.board[slot] > 0); };

function resetBoard() { state.board = Array(TOTAL_SLOTS).fill(0); for (let i = 1; i <= 7; i += 1) state.board[i] = STARTING_SEEDS; for (let i = 9; i <= 15; i += 1) state.board[i] = STARTING_SEEDS; }
function canPlay(slot) { return !state.busy && !state.over && ownerOf(slot) === state.active && state.board[slot] > 0; }
function render() {
  el.top.replaceChildren(); el.bottom.replaceChildren();
  [15, 14, 13, 12, 11, 10, 9].forEach((slot) => addPit(slot, el.top)); [1, 2, 3, 4, 5, 6, 7].forEach((slot) => addPit(slot, el.bottom));
  el.store0.textContent = state.board[0]; el.store1.textContent = state.board[8]; el.score0.textContent = state.board[0]; el.score1.textContent = state.board[8];
  el.card0.classList.toggle('is-active', state.active === 0 && !state.over); el.card1.classList.toggle('is-active', state.active === 1 && !state.over); el.playerTwo.textContent = nameOf(1); el.difficultyControl.hidden = state.mode !== 'solo'; el.rotate.hidden = state.mode !== 'duel';
}
function addPit(slot, parent) { const button = document.createElement('button'); button.className = 'house'; button.type = 'button'; button.innerHTML = `<span class="seed-count">${state.board[slot]}</span><small>biji</small>`; button.disabled = !canPlay(slot); button.classList.toggle('can-play', canPlay(slot)); button.setAttribute('aria-label', `Lubang berisi ${state.board[slot]} biji`); button.addEventListener('click', () => play(slot)); parent.append(button); }
function nextSlot(slot, player) { let next = (slot - 1 + TOTAL_SLOTS) % TOTAL_SLOTS; if ((player === 0 && next === 8) || (player === 1 && next === 0)) next = (next - 1 + TOTAL_SLOTS) % TOTAL_SLOTS; return next; }
function sow(start, player) { let seeds = state.board[start]; state.board[start] = 0; let last = start; while (seeds > 0) { last = nextSlot(last, player); state.board[last] += 1; seeds -= 1; } return resolveLanding(last, player); }
function resolveLanding(last, player) { let captured = 0; if (house(last) && ownerOf(last) === player && state.board[last] === 1 && state.board[opposite(last)] > 0) { captured = state.board[opposite(last)] + 1; state.board[player ? 8 : 0] += captured; state.board[opposite(last)] = 0; state.board[last] = 0; } return { extra: last === (player ? 8 : 0), captured, last }; }
const wait = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));
async function sowAnimated(start, player) { let seeds = state.board[start]; state.board[start] = 0; let last = start; let dropped = 0; render(); while (seeds > 0) { await wait(260); last = nextSlot(last, player); state.board[last] += 1; seeds -= 1; dropped += 1; el.status.textContent = `${nameOf(player)} menaruh biji ke-${dropped}…`; render(); } await wait(360); const result = resolveLanding(last, player); render(); return result; }
function sideEmpty(player) { const start = player ? 9 : 1; return Array.from({ length: 7 }, (_, i) => state.board[start + i]).every((n) => n === 0); }
function finish() { if (!sideEmpty(0) && !sideEmpty(1)) return false; for (let i = 1; i <= 7; i += 1) { state.board[0] += state.board[i]; state.board[i] = 0; } for (let i = 9; i <= 15; i += 1) { state.board[8] += state.board[i]; state.board[i] = 0; } state.over = true; state.busy = false; render(); const result = state.board[0] === state.board[8] ? 'Seri!' : state.board[0] > state.board[8] ? 'Pemain 1 menang!' : `${nameOf(1)} menang!`; el.turn.textContent = result; el.status.textContent = `${result} Tekan Mulai permainan untuk mengulang.`; return true; }
async function play(slot) { if (!canPlay(slot)) return; const player = state.active; state.busy = true; render(); el.turn.textContent = `${nameOf(player)} sedang menyebarkan…`; const result = await sowAnimated(slot, player); if (finish()) return; state.active = result.extra ? player : 1 - player; state.busy = false; render(); el.turn.textContent = result.extra ? `${nameOf(player)} mendapat giliran lagi` : `Giliran ${nameOf(state.active)}`; el.status.textContent = result.captured ? `${nameOf(player)} mengambil ${result.captured} biji.` : 'Pilih lubang yang berisi biji.'; if (state.mode === 'solo' && state.active === 1) scheduleAi(); }
function simulateScore(slot, player = 1) { const snapshot = [...state.board]; const store = player ? 8 : 0; const before = state.board[store]; const result = sow(slot, player); const gain = state.board[store] - before; state.board = snapshot; return gain * 20 + (result.extra ? 12 : 0) + snapshot[slot]; }
function chooseAi() { const moves = legalMoves(1); if (!moves.length) return null; if (state.difficulty === 'easy') return moves[Math.floor(Math.random() * moves.length)]; const ranked = moves.map((slot) => ({ slot, score: simulateScore(slot, 1) })).sort((a, b) => b.score - a.score); if (state.difficulty !== 'sepuh') return ranked[0].slot; let best = ranked[0]; for (const candidate of ranked) { const snapshot = [...state.board]; sow(candidate.slot, 1); const reply = legalMoves(0).map((slot) => simulateScore(slot, 0)); state.board = snapshot; const score = candidate.score - (reply.length ? Math.max(...reply) * .35 : 0); if (score > best.score) best = { slot: candidate.slot, score }; } return best.slot; }
function scheduleAi() { state.busy = true; render(); el.turn.textContent = 'Komputer sedang berpikir…'; window.setTimeout(() => { state.busy = false; const slot = chooseAi(); if (slot !== null) play(slot); }, { easy: 450, medium: 650, hard: 800, sepuh: 950 }[state.difficulty]); }
function newGame() { state.active = 0; state.busy = false; state.over = false; state.rotated = false; el.board.classList.remove('rotated'); el.rotate.textContent = 'Putar untuk Pemain 2'; resetBoard(); render(); el.turn.textContent = 'Giliran Pemain 1'; el.status.textContent = 'Pilih lubang untuk menyebarkan biji.'; }

document.querySelectorAll('[data-mode]').forEach((button) => button.addEventListener('click', () => { state.mode = button.dataset.mode; document.body.classList.toggle('duel-active', state.mode === 'duel'); document.querySelectorAll('[data-mode]').forEach((item) => item.classList.toggle('is-selected', item === button)); newGame(); }));
el.difficulty.addEventListener('change', () => { state.difficulty = el.difficulty.value; newGame(); }); $('#new-game').addEventListener('click', newGame);
el.rotate.addEventListener('click', () => { state.rotated = !state.rotated; el.board.classList.toggle('rotated', state.rotated); el.rotate.textContent = state.rotated ? 'Kembalikan tampilan' : 'Putar untuk Pemain 2'; });
newGame();
