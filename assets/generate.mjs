// Generates every animated SVG used by the profile README.
// Edit the content below, then run:  node assets/generate.mjs
//
// Design tokens: dark "control room" panels, one signal colour (mint),
// amber for emphasis, cyan for data flow. System fonts only, because
// GitHub renders these through <img>, which can't load web fonts.
// Every animation is disabled under prefers-reduced-motion.

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = dirname(fileURLToPath(import.meta.url));

const T = {
  bg: '#0A0D12', surface: '#10151D', border: '#1E2733', line: '#2A3543',
  text: '#E6EDF3', soft: '#B5C0CE', muted: '#8B98A9',
  mint: '#3DFFA8', amber: '#FFB547', cyan: '#5CC8FF', red: '#FF6B6B',
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const delay = (s) => ` style="animation-delay:${s}s"`;

const style = (extra = '') => `<style>
.sans{font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif}
.mono{font-family:ui-monospace,'SF Mono','Cascadia Code',Consolas,Menlo,monospace}
.rise{animation:rise .9s cubic-bezier(.2,.7,.2,1) backwards}
@keyframes rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.blink{animation:blink 1.1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.ping{transform-box:fill-box;transform-origin:center;animation:ping 2.2s cubic-bezier(0,0,.2,1) infinite}
@keyframes ping{0%{transform:scale(1);opacity:.7}80%,100%{transform:scale(2.8);opacity:0}}
.draw{stroke-dasharray:1;animation:draw 1.4s ease backwards}
@keyframes draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
.sweep{animation:sweep 3.6s linear infinite}
@keyframes sweep{from{transform:translateX(-160px)}to{transform:translateX(1260px)}}
.row{animation:row 5s ease infinite}
@keyframes row{0%,8%{opacity:0;transform:translateX(-6px)}18%,86%{opacity:1;transform:none}100%{opacity:0}}
.grow{transform-box:fill-box;transform-origin:left center;animation:grow 6s cubic-bezier(.4,0,.2,1) infinite}
@keyframes grow{0%{transform:scaleX(.04)}70%,100%{transform:scaleX(1)}}
${extra}
@media (prefers-reduced-motion:reduce){*{animation:none!important}.motion{display:none}}
</style>`;

// A dot that travels along `path` forever. Hidden until its first lap starts.
const packet = (path, { dur = 2.4, begin = 0, color = T.mint, r = 3.5 } = {}) => `
<g class="motion" opacity="0">
  <set attributeName="opacity" to="1" begin="${begin}s"/>
  <circle r="${r + 4}" fill="${color}" opacity=".18"/>
  <circle r="${r}" fill="${color}"/>
  <animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${path}"/>
</g>`;

const wire = (d, wait = 0) =>
  `<path d="${d}" pathLength="1" class="draw"${delay(wait)} fill="none" stroke="${T.line}" stroke-width="1.5"/>`;

// Small labelled box used inside project cards.
const nodeS = (x, y, w, title, sub, stroke = T.border) => `
<g>
  <rect x="${x}" y="${y}" width="${w}" height="36" rx="8" fill="${T.surface}" stroke="${stroke}"/>
  <text x="${x + 11}" y="${y + 15}" class="mono" font-size="11.5" fill="${T.text}">${esc(title)}</text>
  <text x="${x + 11}" y="${y + 29}" class="mono" font-size="9.5" fill="${T.muted}">${esc(sub)}</text>
</g>`;

const write = (rel, svg) => {
  const file = join(OUT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, svg.trim() + '\n');
  console.log('wrote', rel);
};

/* ───────────────────────────── HERO ───────────────────────────── */

function hero() {
  const W = 1200, H = 420;
  const node = (x, y, w, title, sub, stroke = T.border) => `
  <g>
    <rect x="${x}" y="${y}" width="${w}" height="52" rx="10" fill="${T.surface}" stroke="${stroke}"/>
    <text x="${x + 14}" y="${y + 22}" class="mono" font-size="13" fill="${T.text}">${title}</text>
    <text x="${x + 14}" y="${y + 39}" class="mono" font-size="10.5" fill="${T.muted}">${esc(sub)}</text>
  </g>`;

  const wires = [
    'M810 212 H850',
    'M960 212 C990 212 990 122 1020 122',
    'M960 212 H1020',
    'M960 212 C990 212 990 302 1020 302',
    'M1090 148 V186',
    'M1090 238 V276',
  ];

  const bars = Array.from({ length: 38 }, (_, i) => {
    const h = 8 + Math.round(18 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)));
    const color = i === 23 ? T.amber : T.mint;
    return `<rect class="beat" x="${700 + i * 12}" y="${372 - h}" width="7" height="${h}" rx="2" fill="${color}"${delay((i * 0.06).toFixed(2))}/>`;
  }).join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t d">
<title id="t">Nandu Panakanti, Software Engineer</title>
<desc id="d">Software engineer at BTG focused on backend, distributed systems and AI agents. Based in Dallas, TX. An animated diagram shows requests flowing from a client through a gateway to a queue, an AI agent and Postgres.</desc>
<defs>
  <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="${T.border}"/></pattern>
  <radialGradient id="glow" cx="78%" cy="50%" r="50%"><stop offset="0" stop-color="${T.mint}" stop-opacity=".09"/><stop offset="1" stop-color="${T.mint}" stop-opacity="0"/></radialGradient>
  <linearGradient id="sw" x1="0" x2="1"><stop offset="0" stop-color="${T.mint}" stop-opacity="0"/><stop offset=".85" stop-color="${T.mint}"/><stop offset="1" stop-color="${T.mint}" stop-opacity="0"/></linearGradient>
  <clipPath id="card"><rect width="${W}" height="${H}" rx="20"/></clipPath>
  ${style(`
.beat{opacity:.22;animation:beat 2.4s ease-in-out infinite}
@keyframes beat{0%,100%{opacity:.22}12%{opacity:1}}
.halo{transform-box:fill-box;transform-origin:center;animation:halo 2.4s ease-out infinite}
@keyframes halo{0%{opacity:.6;transform:scale(1)}100%{opacity:0;transform:scale(1.22)}}`)}
</defs>
<g clip-path="url(#card)">
  <rect width="${W}" height="${H}" fill="${T.bg}"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect class="sweep motion" y="0" width="160" height="2" fill="url(#sw)"/>
</g>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="19.5" fill="none" stroke="${T.border}"/>

<!-- identity -->
<g class="rise"${delay(0.05)}>
  <text x="64" y="84" class="mono" font-size="14" fill="${T.muted}">nandu@systems:~$ <tspan fill="${T.mint}">whoami </tspan><tspan class="blink" fill="${T.mint}">█</tspan></text>
</g>
<text class="sans rise"${delay(0.2)} x="62" y="160" font-size="64" font-weight="700" fill="${T.text}" letter-spacing="-1.5">Nandu Panakanti</text>
<text class="sans rise"${delay(0.35)} x="64" y="202" font-size="22" fill="${T.soft}">Software Engineer</text>
<text class="mono rise"${delay(0.45)} x="64" y="234" font-size="12.5" fill="${T.cyan}" letter-spacing="2">BACKEND  /  DISTRIBUTED SYSTEMS  /  AI AGENTS</text>
<g class="rise"${delay(0.6)}>
  <rect x="64" y="264" width="438" height="34" rx="17" fill="${T.mint}" fill-opacity=".07" stroke="${T.mint}" stroke-opacity=".35"/>
  <circle cx="86" cy="281" r="4" fill="${T.mint}"/>
  <circle class="ping" cx="86" cy="281" r="4" fill="${T.mint}"/>
  <text x="100" y="285.5" class="mono" font-size="12.5" fill="${T.text}">Now: Software Engineer at BTG · Stripe billing systems</text>
</g>
<text class="mono rise"${delay(0.75)} x="64" y="340" font-size="12.5" fill="${T.muted}" xml:space="preserve">Dallas, TX   ·   M.S. CS 2026   ·   Open to relocate</text>

<!-- live topology -->
<g class="rise"${delay(0.4)}>
  <circle cx="704" cy="66" r="3.5" fill="${T.mint}"/>
  <circle class="ping" cx="704" cy="66" r="3.5" fill="${T.mint}"/>
  <text x="716" y="70" class="mono" font-size="10.5" fill="${T.muted}" letter-spacing="1.5">LIVE REQUEST PATH</text>
  <text x="1160" y="70" text-anchor="end" class="mono" font-size="10.5" fill="${T.muted}" letter-spacing="1.5">BUILD 2026.11</text>
</g>
${wires.map((d, i) => wire(d, 0.5 + i * 0.12)).join('\n')}
${packet('M755 212 H960 C990 212 990 122 1020 122 H1090 V212', { dur: 3.4, begin: 1.6, color: T.mint })}
${packet('M755 212 H1090 V302', { dur: 2.8, begin: 2.4, color: T.cyan })}
${packet('M755 212 H960 C990 212 990 302 1020 302 H1090', { dur: 3.9, begin: 3.1, color: T.amber })}
<g class="rise"${delay(0.5)}>
  ${node(700, 186, 110, 'client', 'web · mobile')}
  ${node(850, 186, 110, 'gateway', 'jwt · rate limit')}
  ${node(1020, 96, 140, 'queue', 'bullmq · kafka')}
  <rect class="halo" x="1020" y="186" width="140" height="52" rx="10" fill="none" stroke="${T.mint}"/>
  ${node(1020, 186, 140, 'agent', 'langgraph · claude', T.mint)}
  ${node(1020, 276, 140, 'postgres', 'ledger · rls')}
</g>
<g class="rise"${delay(0.9)}>${bars}</g>
<text class="mono rise"${delay(1)} x="700" y="396" font-size="10.5" fill="${T.muted}" letter-spacing="1">HEARTBEAT · idempotent · observable · replay-safe</text>
</svg>`;
}

/* ─────────────────────────── PROJECT CARDS ─────────────────────────── */

function card({ accent, tag, status, name, hook, chips, visual, alt }) {
  const W = 600, H = 320;
  let cx = 32;
  const chipSvg = chips.map((c, i) => {
    const w = Math.round(c.length * 6.7 + 20);
    const s = `<g class="rise"${delay((0.55 + i * 0.06).toFixed(2))}><rect x="${cx}" y="272" width="${w}" height="24" rx="12" fill="${T.surface}" stroke="${T.border}"/><text x="${cx + w / 2}" y="288" text-anchor="middle" class="mono" font-size="11" fill="${T.soft}">${esc(c)}</text></g>`;
    cx += w + 8;
    return s;
  }).join('');
  if (cx > 580) console.warn(`  ! chips overflow on "${name}" (${cx}px)`);

  const label = status === 'live' ? 'LIVE' : 'SOURCE';
  const dotColor = status === 'live' ? T.mint : T.muted;
  const dotX = 568 - Math.round(label.length * 8.1) - 12;

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t d">
<title id="t">${esc(name)}</title>
<desc id="d">${esc(alt)}</desc>
<defs>
  <radialGradient id="glow" cx="100%" cy="0%" r="70%"><stop offset="0" stop-color="${accent}" stop-opacity=".12"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient>
  <linearGradient id="sw" x1="0" x2="1"><stop offset="0" stop-color="${accent}" stop-opacity="0"/><stop offset=".85" stop-color="${accent}"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></linearGradient>
  <clipPath id="card"><rect width="${W}" height="${H}" rx="16"/></clipPath>
  ${style(`.sweep{animation-duration:3.2s}
@keyframes sweep{from{transform:translateX(-160px)}to{transform:translateX(760px)}}`)}
</defs>
<g clip-path="url(#card)">
  <rect width="${W}" height="${H}" fill="${T.bg}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="2" fill="${accent}" opacity=".3"/>
  <rect class="sweep motion" width="160" height="2" fill="url(#sw)"/>
</g>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="15.5" fill="none" stroke="${T.border}"/>

<text class="mono rise" x="32" y="44" font-size="11" fill="${accent}" letter-spacing="1.5">${esc(tag)}</text>
<g class="rise">
  <circle cx="${dotX}" cy="40" r="3.5" fill="${dotColor}"/>
  ${status === 'live' ? `<circle class="ping" cx="${dotX}" cy="40" r="3.5" fill="${dotColor}"/>` : ''}
  <text x="568" y="44" text-anchor="end" class="mono" font-size="11" fill="${T.soft}" letter-spacing="1.5">${label}</text>
</g>
<text class="sans rise"${delay(0.1)} x="32" y="92" font-size="30" font-weight="700" fill="${T.text}" letter-spacing="-.5">${esc(name)}</text>
<text class="sans rise"${delay(0.2)} x="32" y="124" font-size="15" fill="${T.soft}">${esc(hook[0])}</text>
<text class="sans rise"${delay(0.25)} x="32" y="146" font-size="15" fill="${T.soft}">${esc(hook[1])}</text>
<g class="rise"${delay(0.35)}>${visual(accent)}</g>
${chipSvg}
</svg>`;
}

// Each card gets a small diagram of what the system actually does.
const visuals = {
  factoryflow: (a) => {
    const up = 'M74 211 H186 C206 211 206 186 226 186 H376 C404 186 404 211 500 211';
    const lo = 'M74 211 H186 C206 211 206 236 226 236 H376 C404 236 404 211 500 211';
    return `
    ${wire(up, 0.4)}${wire(lo, 0.6)}
    ${packet(up, { dur: 1.9, begin: 0.8, color: T.mint })}
    ${packet(lo, { dur: 3.4, begin: 1.6, color: T.cyan })}
    ${nodeS(32, 193, 84, 'alarm', 'machine m-07')}
    <rect x="160" y="201" width="20" height="20" rx="3" transform="rotate(45 170 211)" fill="${T.surface}" stroke="${a}"/>
    <text x="170" y="250" text-anchor="middle" class="mono" font-size="9.5" fill="${T.muted}">conf?</text>
    ${nodeS(226, 168, 150, 'fast path', 'validated prior fix', T.mint)}
    ${nodeS(226, 218, 150, 'retrieve → search', 'incidents · tavily')}
    ${nodeS(432, 193, 136, 'diagnosis', 'streamed via SSE', a)}`;
  },

  sentinel: (a) => {
    const gates = [['schema', 150], ['authz', 262], ['pii', 374], ['failover', 486]];
    return `
    <line x1="32" y1="211" x2="568" y2="211" stroke="${T.line}" stroke-width="1.5" stroke-dasharray="2 5"/>
    <text x="32" y="196" class="mono" font-size="10" fill="${T.muted}">mcp call</text>
    <text x="568" y="196" text-anchor="end" class="mono" font-size="10" fill="${T.muted}">upstream</text>
    ${gates.map(([g, x]) => `
      <rect x="${x - 11}" y="184" width="22" height="54" rx="6" fill="${a}" opacity=".08"/>
      <rect x="${x - 3}" y="184" width="6" height="54" rx="3" fill="${a}" opacity=".9"/>
      <text x="${x}" y="254" text-anchor="middle" class="mono" font-size="10" fill="${T.muted}">${g}</text>`).join('')}
    ${packet('M32 211 H568', { dur: 3.6, begin: 0.6, color: T.mint })}
    <g class="motion" opacity="0">
      <circle r="7.5" fill="${T.red}" opacity=".2"/><circle r="3.5" fill="${T.red}"/>
      <animateMotion dur="3.6s" begin="2.4s" repeatCount="indefinite" path="M32 211 H252" keyPoints="0;1;1" keyTimes="0;.5;1" calcMode="linear"/>
      <animate attributeName="opacity" dur="3.6s" begin="2.4s" repeatCount="indefinite" values="0;1;1;0" keyTimes="0;.05;.85;1"/>
    </g>
    <text class="motion mono" x="262" y="176" text-anchor="middle" font-size="10.5" fill="${T.red}" opacity="0">403 denied
      <animate attributeName="opacity" dur="3.6s" begin="2.4s" repeatCount="indefinite" values="0;0;1;1;0" keyTimes="0;.45;.5;.85;1"/>
    </text>
    <text x="374" y="176" text-anchor="middle" class="mono" font-size="10.5" fill="${T.cyan}">[redacted]</text>`;
  },

  devarena: (a) => `
    <text x="32" y="186" class="mono" font-size="11" fill="${T.text}">you</text>
    <text x="232" y="186" text-anchor="end" class="mono" font-size="10" fill="${T.muted}">q 07/10</text>
    <rect x="32" y="196" width="200" height="8" rx="4" fill="${T.surface}" stroke="${T.border}"/>
    <rect class="grow" x="32" y="196" width="172" height="8" rx="4" fill="${a}"/>
    <text x="368" y="186" class="mono" font-size="11" fill="${T.text}">peer</text>
    <text x="568" y="186" text-anchor="end" class="mono" font-size="10" fill="${T.muted}">q 06/10</text>
    <rect x="368" y="196" width="200" height="8" rx="4" fill="${T.surface}" stroke="${T.border}"/>
    <rect class="grow" x="368" y="196" width="140" height="8" rx="4" fill="${T.amber}" style="animation-duration:6.6s"/>
    <circle cx="300" cy="211" r="28" fill="${T.surface}" stroke="${T.border}" stroke-width="4"/>
    <circle class="countdown" cx="300" cy="211" r="28" fill="none" stroke="${a}" stroke-width="4" stroke-linecap="round" pathLength="1" stroke-dasharray="1" transform="rotate(-90 300 211)"/>
    <style>.countdown{animation:countdown 6s linear infinite}@keyframes countdown{from{stroke-dashoffset:0}to{stroke-dashoffset:1}}</style>
    <text x="300" y="216" text-anchor="middle" class="sans" font-size="14" font-weight="700" fill="${T.text}">VS</text>
    <text x="32" y="228" class="mono" font-size="10" fill="${T.muted}">scored server-side</text>
    <text x="568" y="228" text-anchor="end" class="mono" font-size="10" fill="${T.muted}">websocket · per-battle lock</text>`,

  propmind: (a) => `
    ${wire('M142 211 H322', 0.4)}
    ${packet('M90 211 H330', { dur: 2.2, begin: 0.8, color: a })}
    ${packet('M90 211 H330', { dur: 2.2, begin: 1.9, color: a })}
    ${nodeS(32, 193, 110, 'stripe', 'webhook event')}
    ${nodeS(172, 193, 120, 'verify sig', 'idempotency key', a)}
    <rect x="322" y="168" width="246" height="86" rx="8" fill="${T.surface}" stroke="${T.border}"/>
    <text x="336" y="186" class="mono" font-size="9.5" fill="${T.muted}" letter-spacing="1">LEDGER · DOUBLE-ENTRY</text>
    <text class="row mono" x="336" y="206" font-size="10.5" fill="${T.soft}" xml:space="preserve">DR  tenant:receivable  1,450.00</text>
    <text class="row mono"${delay(0.5)} x="336" y="224" font-size="10.5" fill="${T.soft}" xml:space="preserve">CR  revenue:rent       1,450.00</text>
    <text class="row mono"${delay(1)} x="336" y="242" font-size="10.5" fill="${a}" xml:space="preserve">inv_0412  →  PAID  ✓</text>`,

  raki: (a) => `
    <path d="M32 168 H88 L102 182 V254 H32 Z" fill="${T.surface}" stroke="${T.border}"/>
    <path d="M88 168 V182 H102" fill="none" stroke="${T.border}"/>
    <text x="42" y="186" class="mono" font-size="9" fill="${T.muted}">INV</text>
    ${[46, 38, 50, 32, 44].map((w, i) => `<rect x="42" y="${196 + i * 11}" width="${w}" height="4" rx="2" fill="${T.line}"/>`).join('')}
    <rect class="scan motion" x="34" y="172" width="66" height="2" fill="${a}"/>
    <style>.scan{animation:scan 3s ease-in-out infinite}@keyframes scan{0%,100%{transform:translateY(0)}50%{transform:translateY(78px)}}</style>
    ${wire('M102 211 H140', 0.4)}${wire('M252 211 H290', 0.5)}
    ${packet('M102 211 H290', { dur: 2.4, begin: 0.9, color: a })}
    ${nodeS(140, 193, 112, 'claude api', 'field extraction', a)}
    <rect x="290" y="168" width="278" height="86" rx="8" fill="${T.surface}" stroke="${T.border}"/>
    <text x="304" y="186" class="mono" font-size="9.5" fill="${T.muted}" letter-spacing="1">EXTRACTED · GSTR-3B</text>
    <text class="row mono" x="304" y="206" font-size="10.5" fill="${T.soft}" xml:space="preserve">gstin    27AAPFU0939F1ZV</text>
    <text class="row mono"${delay(0.5)} x="304" y="224" font-size="10.5" fill="${T.soft}" xml:space="preserve">amount   INR 48,260.00</text>
    <text class="row mono"${delay(1)} x="304" y="242" font-size="10.5" fill="${a}" xml:space="preserve">due      20 Nov · filing queued</text>`,

  copilot: (a) => {
    let seed = 7;
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    const cells = [];
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 16; c++) {
        const v = rnd();
        let fill = '#16202B', op = 1;
        if (v > 0.62) { fill = a; op = 0.35; }
        if (v > 0.84) { fill = a; op = 1; }
        if (v > 0.95) { fill = T.amber; op = 1; }
        if ((r === 1 && c === 11) || (r === 3 && c === 4)) { fill = T.red; op = 1; }
        const tw = v > 0.88 ? ` class="tw"${delay((v * 4).toFixed(2))}` : '';
        cells.push(`<rect${tw} x="${32 + c * 16}" y="${170 + r * 16}" width="12" height="12" rx="3" fill="${fill}" opacity="${op}"/>`);
      }
    }
    const bar = (y, label, frac, color, d) => `
      <text x="316" y="${y}" class="mono" font-size="10" fill="${T.muted}">${label}</text>
      <rect x="316" y="${y + 6}" width="252" height="6" rx="3" fill="${T.surface}" stroke="${T.border}"/>
      <rect class="grow" x="316" y="${y + 6}" width="${Math.round(252 * frac)}" height="6" rx="3" fill="${color}"${delay(d)}/>`;
    return `
    <style>.tw{animation:tw 3.2s ease-in-out infinite}@keyframes tw{0%,100%{opacity:1}50%{opacity:.25}}</style>
    ${cells.join('')}
    ${bar(180, 'dormant repos', 0.62, a, 0)}
    ${bar(208, 'public + stale', 0.34, T.amber, 0.4)}
    ${bar(236, 'idle ci minutes', 0.48, a, 0.8)}`;
  },
};

const cards = [
  {
    file: 'factoryflow', accent: T.amber, tag: 'BUILDATHON DALLAS · 2026', status: 'live',
    name: 'FactoryFlow AI',
    hook: ['Manufacturing copilot. A LangGraph agent routes machine', 'alarms by confidence, then streams the diagnosis live.'],
    chips: ['Spring Boot', 'FastAPI', 'LangGraph', 'PostgreSQL', 'SSE', 'AWS'],
    alt: 'Diagram: an alarm goes to a confidence check. High confidence takes the fast path using a validated prior fix; low confidence retrieves incidents and searches before diagnosis.',
  },
  {
    file: 'sentinel', accent: T.mint, tag: 'LLM INFRA · SEP 2026', status: 'live',
    name: 'MCPSentinel',
    hook: ['Four guardrail services for MCP and LLM traffic: schema,', 'tool authz, streaming PII redaction and upstream failover.'],
    chips: ['Python', 'MCP', 'RBAC', 'PII redaction', 'Failover', 'TypeScript'],
    alt: 'Diagram: requests pass through four gates (schema, authz, pii, failover). An unauthorized request is stopped at authz with a 403.',
  },
  {
    file: 'devarena', accent: T.cyan, tag: 'REALTIME · OCT 2026', status: 'source',
    name: 'DevArena',
    hook: ['Multiplayer interview prep: live quiz battles, peer', 'mock interviews, and a 90-day mission planner.'],
    chips: ['Java 21', 'Spring Boot', 'WebSocket', 'React 19', 'PostgreSQL', 'Playwright'],
    alt: 'Illustration of a live quiz battle between you and a peer with a countdown timer. Scoring is server-side over WebSocket.',
  },
  {
    file: 'propmind', accent: T.mint, tag: 'AI SAAS · MAY 2026', status: 'live',
    name: 'PropMind',
    hook: ['Property management with AI tenant scoring and', 'replay-safe Stripe billing on a double-entry ledger.'],
    chips: ['Node.js', 'Stripe', 'BullMQ', 'Redis', 'MongoDB', 'OpenAI'],
    alt: 'Diagram: a Stripe webhook is signature-verified with an idempotency key, then written as debit and credit ledger entries and the invoice is marked paid.',
  },
  {
    file: 'raki', accent: T.amber, tag: 'AI SAAS · JUL 2026', status: 'live',
    name: 'Raki',
    hook: ['Practice management for CA firms. Claude extracts', 'invoice fields, so GST, ITR and TDS deadlines track themselves.'],
    chips: ['Spring Security', 'OAuth2', 'Redis', 'Claude API', 'Docker', 'React'],
    alt: 'Diagram: an invoice document is scanned, sent to the Claude API for field extraction, and the GSTIN, amount and due date are filled in.',
  },
  {
    file: 'copilot', accent: T.cyan, tag: 'DEV TOOLS · JUN 2026', status: 'live',
    name: 'SaaS Ops Copilot',
    hook: ['GitHub org intelligence: dormant repos, security exposure', 'and CI/CD waste, plus AI-written remediation plans.'],
    chips: ['FastAPI', 'SQLAlchemy', 'PostgreSQL', 'GitHub OAuth', 'React', 'LLM'],
    alt: 'Illustration: a heatmap of repositories with risky ones highlighted, and bars for dormant repos, public stale repos and idle CI minutes.',
  },
];

/* ─────────────────────── FLAGSHIP (full width) ─────────────────────── */

function sheout() {
  const W = 1200, H = 340, a = T.amber;
  const chips = ['Java 21', 'Spring Boot 3', 'React PWAs', 'PostgreSQL', 'Redis geo', 'Razorpay'];
  let cx = 40;
  const chipSvg = chips.map((c, i) => {
    const w = Math.round(c.length * 6.7 + 20);
    const s = `<g class="rise"${delay((0.55 + i * 0.06).toFixed(2))}><rect x="${cx}" y="284" width="${w}" height="24" rx="12" fill="${T.surface}" stroke="${T.border}"/><text x="${cx + w / 2}" y="300" text-anchor="middle" class="mono" font-size="11" fill="${T.soft}">${c}</text></g>`;
    cx += w + 8;
    return s;
  }).join('');
  if (cx > 610) console.warn(`  ! chips overflow on SheOut (${cx}px)`);

  // Map panel on the right: streets, a route, and a partner riding it.
  const px = 650, py = 72, pw = 510, ph = 240;
  const route = 'M700 268 C780 268 790 196 870 200 S1010 236 1050 170 S1090 112 1112 112';
  const streets = [
    `M${px} 140 H${px + pw}`, `M${px} 230 H${px + pw}`, `M${px} 290 H${px + pw}`,
    'M720 72 V312', 'M840 72 V312', 'M960 72 V312', 'M1080 72 V312',
    'M650 300 L860 72', 'M900 312 L1160 120',
  ];
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t d">
<title id="t">SheOut: women-only bike taxi, parcel delivery and marketplace</title>
<desc id="d">Launched product in Hyderabad. A map shows a verified woman partner riding the route from pickup to drop, with a pickup code, live trip sharing and an SOS button.</desc>
<defs>
  <radialGradient id="glow" cx="100%" cy="0%" r="60%"><stop offset="0" stop-color="${a}" stop-opacity=".12"/><stop offset="1" stop-color="${a}" stop-opacity="0"/></radialGradient>
  <linearGradient id="sw" x1="0" x2="1"><stop offset="0" stop-color="${a}" stop-opacity="0"/><stop offset=".85" stop-color="${a}"/><stop offset="1" stop-color="${a}" stop-opacity="0"/></linearGradient>
  <clipPath id="card"><rect width="${W}" height="${H}" rx="18"/></clipPath>
  <clipPath id="map"><rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="12"/></clipPath>
  ${style(`.sweep{animation-duration:4.4s}
.dash{stroke-dasharray:6 6;animation:dash 1.2s linear infinite}
@keyframes dash{to{stroke-dashoffset:-12}}`)}
</defs>
<g clip-path="url(#card)">
  <rect width="${W}" height="${H}" fill="${T.bg}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="2" fill="${a}" opacity=".3"/>
  <rect class="sweep motion" width="160" height="2" fill="url(#sw)"/>
</g>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="17.5" fill="none" stroke="${T.border}"/>

<text class="mono rise" x="40" y="52" font-size="11" fill="${a}" letter-spacing="1.5">FLAGSHIP · LAUNCHED IN HYDERABAD · 2026</text>
<text class="sans rise"${delay(0.1)} x="38" y="112" font-size="44" font-weight="700" fill="${T.text}" letter-spacing="-1">SheOut</text>
<text class="sans rise"${delay(0.2)} x="40" y="148" font-size="16" fill="${T.soft}">Women-only bike taxi, parcel delivery and marketplace.</text>
<text class="sans rise"${delay(0.25)} x="40" y="172" font-size="16" fill="${T.soft}">Verified partners, pickup codes, live trip sharing and SOS on</text>
<text class="sans rise"${delay(0.3)} x="40" y="196" font-size="16" fill="${T.soft}">every ride, in English, Hindi and Telugu.</text>
<text class="mono rise"${delay(0.4)} x="40" y="246" font-size="11" fill="${T.muted}" letter-spacing=".5">modular monolith · domain events · geo dispatch · two-person approvals</text>
${chipSvg}

<!-- map -->
<g class="rise"${delay(0.3)}>
  <rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="12" fill="${T.surface}" stroke="${T.border}"/>
  <g clip-path="url(#map)">
    ${streets.map((d) => `<path d="${d}" stroke="#18212C" stroke-width="6" fill="none"/>`).join('')}
    <path d="${route}" fill="none" stroke="${a}" stroke-opacity=".25" stroke-width="8" stroke-linecap="round"/>
    <path class="dash" d="${route}" fill="none" stroke="${a}" stroke-width="2.5" stroke-linecap="round"/>
    ${packet(route, { dur: 6, begin: 0.6, color: T.text, r: 5 })}
  </g>
  <circle cx="700" cy="268" r="7" fill="${T.mint}"/><circle class="ping" cx="700" cy="268" r="7" fill="${T.mint}"/>
  <text x="714" y="290" class="mono" font-size="10" fill="${T.soft}">pickup</text>
  <path d="M1112 112 m0 -18 a9 9 0 0 1 9 9 c0 7 -9 15 -9 15 s-9 -8 -9 -15 a9 9 0 0 1 9 -9z" fill="${a}"/>
  <text x="1126" y="116" class="mono" font-size="10" fill="${T.soft}">drop</text>

  <rect x="${px + 14}" y="${py + 14}" width="196" height="30" rx="8" fill="${T.bg}" stroke="${T.border}"/>
  <text x="${px + 26}" y="${py + 33}" class="mono" font-size="10.5" fill="${T.muted}" xml:space="preserve">PICKUP CODE  <tspan fill="${T.text}" font-weight="700">4  8  2  7</tspan></text>

  <rect x="${px + 14}" y="${py + 52}" width="150" height="26" rx="8" fill="${T.bg}" stroke="${T.border}"/>
  <circle cx="${px + 28}" cy="${py + 65}" r="3.5" fill="${T.mint}"/>
  <text x="${px + 38}" y="${py + 69}" class="mono" font-size="10.5" fill="${T.soft}">partner verified</text>

  <rect x="${px + pw - 150}" y="${py + ph - 42}" width="76" height="28" rx="14" fill="${T.bg}" stroke="${T.border}"/>
  <circle cx="${px + pw - 136}" cy="${py + ph - 28}" r="3.5" fill="${T.cyan}"/><circle class="ping" cx="${px + pw - 136}" cy="${py + ph - 28}" r="3.5" fill="${T.cyan}"/>
  <text x="${px + pw - 126}" y="${py + ph - 24}" class="mono" font-size="10.5" fill="${T.soft}">live</text>
  <rect x="${px + pw - 66}" y="${py + ph - 42}" width="52" height="28" rx="14" fill="${T.red}"/>
  <text x="${px + pw - 40}" y="${py + ph - 23.5}" text-anchor="middle" class="sans" font-size="12" font-weight="700" fill="${T.bg}">SOS</text>
</g>
</svg>`;
}

/* ──────────────────────────── STATS STRIP ──────────────────────────── */

function stats() {
  const W = 1200, H = 150;
  const items = [
    ['25%', 'LATENCY CUT IN PROD'],
    ['10+', 'SYSTEMS SHIPPED'],
    ['200+', 'LEETCODE SOLVED'],
    ['7', 'CERTIFICATIONS'],
  ];
  const cells = items.map(([v, l], i) => {
    const x = 56 + i * 284;
    return `
    ${i ? `<line x1="${x - 28}" y1="36" x2="${x - 28}" y2="114" stroke="${T.border}"/>` : ''}
    <g class="rise"${delay(0.1 + i * 0.12)}>
      <text x="${x}" y="78" class="sans" font-size="46" font-weight="700" fill="${i === 0 ? T.amber : T.mint}" letter-spacing="-1">${v}</text>
      <text x="${x}" y="104" class="mono" font-size="11.5" fill="${T.muted}" letter-spacing="1.5">${l}</text>
    </g>
    <line x1="${x}" y1="120" x2="${x + 200}" y2="120" stroke="${T.border}" stroke-width="2"/>
    <line x1="${x}" y1="120" x2="${x + 200}" y2="120" pathLength="1" class="draw"${delay(0.5 + i * 0.15)} stroke="${i === 0 ? T.amber : T.mint}" stroke-width="2"/>`;
  }).join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t">
<title id="t">25% latency cut in production, 10+ systems shipped, 200+ LeetCode problems solved, 7 certifications</title>
<defs><clipPath id="card"><rect width="${W}" height="${H}" rx="16"/></clipPath>${style()}</defs>
<g clip-path="url(#card)"><rect width="${W}" height="${H}" fill="${T.bg}"/></g>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="15.5" fill="none" stroke="${T.border}"/>
${cells}
</svg>`;
}

/* ──────────────────────────── DIVIDER ──────────────────────────── */

function divider() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="24" viewBox="0 0 1200 24" aria-hidden="true">
<defs>
  <linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="${T.mint}" stop-opacity="0"/><stop offset=".85" stop-color="${T.mint}"/><stop offset="1" stop-color="${T.mint}" stop-opacity="0"/></linearGradient>
  ${style(`.sweep{animation-duration:5s}
@keyframes sweep{from{transform:translateX(-240px)}to{transform:translateX(1200px)}}`)}
</defs>
<line x1="0" y1="12" x2="1200" y2="12" stroke="${T.muted}" stroke-opacity=".35"/>
<rect class="sweep motion" y="11" width="240" height="2" fill="url(#g)"/>
<rect x="594" y="6" width="12" height="12" rx="2" transform="rotate(45 600 12)" fill="none" stroke="${T.mint}"/>
</svg>`;
}

/* ──────────────────────────── FOOTER ──────────────────────────── */

function footer() {
  const W = 1200, H = 240, base = 204;
  const spike = 'l12 -8 l10 16 l12 -52 l12 68 l10 -24';
  const ekg = `M40 ${base} H330 ${spike} H630 ${spike} H930 ${spike} H1160`;
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t">
<title id="t">Let's build systems that don't page you at 2 AM. Reach out using the links below.</title>
<defs>
  <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="${T.border}"/></pattern>
  <clipPath id="card"><rect width="${W}" height="${H}" rx="20"/></clipPath>
  ${style(`.trace{stroke-dasharray:.18 .82;animation:trace 4s linear infinite}
@keyframes trace{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}`)}
</defs>
<g clip-path="url(#card)">
  <rect width="${W}" height="${H}" fill="${T.bg}"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
</g>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="19.5" fill="none" stroke="${T.border}"/>
<g class="rise">
  <text x="64" y="62" class="mono" font-size="13" fill="${T.muted}">nandu@systems:~$ <tspan fill="${T.mint}">./connect.sh </tspan><tspan class="blink" fill="${T.mint}">█</tspan></text>
</g>
<text class="sans rise"${delay(0.15)} x="62" y="112" font-size="34" font-weight="700" fill="${T.text}" letter-spacing="-.6">Let's build systems that don't page you at 2 AM.</text>
<text class="sans rise"${delay(0.3)} x="64" y="142" font-size="15" fill="${T.soft}">Backend · Distributed systems · AI agents. The links below are the fastest way to reach me.</text>
<path d="${ekg}" fill="none" stroke="${T.line}" stroke-width="1.5" stroke-linejoin="round"/>
<path class="trace motion" d="${ekg}" pathLength="1" fill="none" stroke="${T.mint}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
</svg>`;
}

/* ──────────────────────────── BUILD ──────────────────────────── */

write('hero.svg', hero());
write('stats.svg', stats());
write('cards/sheout.svg', sheout());
write('divider.svg', divider());
write('footer.svg', footer());
for (const c of cards) write(`cards/${c.file}.svg`, card({ ...c, visual: visuals[c.file] }));
