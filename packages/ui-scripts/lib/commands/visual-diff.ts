/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import {
  readdirSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  copyFileSync,
  existsSync,
  statSync
} from 'node:fs'
import { join, basename } from 'node:path'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

type Status = 'unchanged' | 'changed' | 'added' | 'removed'

type Result = {
  name: string
  status: Status
  numDiff?: number
  sizeMismatch?: boolean
}

type Args = {
  actualDir: string
  baselineDir: string
  outputDir: string
  threshold: number
  failOnMissingBaseline: boolean
  prNumber?: string
  prUrl?: string
  meta?: string
  sourceBaseUrl?: string
}

type Meta = Record<string, string>

function sourceLinkFor(
  name: string,
  meta: Meta | null,
  sourceBaseUrl?: string
): string {
  if (!meta || !sourceBaseUrl) return ''
  const slug = name.replace(/\.png$/, '')
  const pagePath = meta[slug]
  if (!pagePath) return ''
  const url = sourceBaseUrl.replace(/\/$/, '') + pagePath + '/page.tsx'
  const display = pagePath.replace(/^\//, '') + '/page.tsx'
  return `<a class="source-link" href="${url}" target="_blank" rel="noopener">${display}</a>`
}

function walk(dir: string): string[] {
  if (!existsSync(dir)) return []
  const out: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) out.push(...walk(full))
    else if (entry.endsWith('.png')) out.push(full)
  }
  return out
}

function indexByName(files: string[]): Map<string, { path: string }> {
  const map = new Map<string, { path: string }>()
  for (const f of files) map.set(basename(f), { path: f })
  return map
}

function loadPng(path: string): PNG {
  return PNG.sync.read(readFileSync(path))
}

function diffPair(baseline: PNG, actual: PNG, threshold: number) {
  const { width: bw, height: bh } = baseline
  const { width: aw, height: ah } = actual
  const width = Math.max(bw, aw)
  const height = Math.max(bh, ah)

  const pad = (src: PNG, w: number, h: number): PNG => {
    if (src.width === w && src.height === h) return src
    const padded = new PNG({ width: w, height: h })
    PNG.bitblt(src, padded, 0, 0, src.width, src.height, 0, 0)
    return padded
  }

  const b = pad(baseline, width, height)
  const a = pad(actual, width, height)
  const diff = new PNG({ width, height })
  const numDiff = pixelmatch(b.data, a.data, diff.data, width, height, {
    threshold,
    includeAA: false
  })
  return { diff, numDiff, sizeMismatch: bw !== aw || bh !== ah }
}

function copyInto(src: string, destDir: string, name: string) {
  mkdirSync(destDir, { recursive: true })
  copyFileSync(src, join(destDir, name))
}

function badgeFor(s: Status): string {
  return {
    unchanged: '<span class="pill pass">ok</span>',
    changed: '<span class="pill fail">changed</span>',
    added: '<span class="pill new">new</span>',
    removed: '<span class="pill gone">removed</span>'
  }[s]
}

function thumb(mode: string, name: string): string {
  return `<img loading="lazy" src="${mode}/${name}" data-name="${name}" data-mode="${mode}" class="thumb" />`
}

function row(r: Result, meta: Meta | null, sourceBaseUrl?: string): string {
  const b = r.status === 'added' ? '' : thumb('baseline', r.name)
  const a = r.status === 'removed' ? '' : thumb('actual', r.name)
  const d = r.status === 'changed' ? thumb('diff', r.name) : ''
  const pixelMeta =
    r.status === 'changed'
      ? `<div class="meta">${r.numDiff} pixels differ${r.sizeMismatch ? ' · size mismatch' : ''}</div>`
      : ''
  const source = sourceLinkFor(r.name, meta, sourceBaseUrl)
  const hasBoth = r.status === 'changed' || r.status === 'unchanged'
  return `
    <section class="row" data-status="${r.status}" data-name="${r.name}" data-has-both="${hasBoth}">
      <header><h2>${r.name}</h2>${badgeFor(r.status)}${pixelMeta}${source}</header>
      <div class="grid"><figure><figcaption>Baseline</figcaption>${b}</figure><figure><figcaption>Actual</figcaption>${a}</figure><figure><figcaption>Diff</figcaption>${d}</figure></div>
    </section>`
}

function renderHtml(
  results: Result[],
  summary: Record<string, number>,
  prNumber?: string,
  prUrl?: string,
  meta?: Meta | null,
  sourceBaseUrl?: string
): string {
  const prBadge =
    prNumber && prUrl
      ? `<a href="${prUrl}" style="font-weight:600;color:#0969da;text-decoration:none;">PR #${prNumber}</a>`
      : prNumber
        ? `<span style="font-weight:600;">PR #${prNumber}</span>`
        : ''
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>Visual regression report</title>
<style>
  body { font: 14px system-ui, sans-serif; margin: 0; background: #fafafa; color: #222; }
  header.top { position: sticky; top: 0; background: #fff; border-bottom: 1px solid #e5e5e5; padding: 16px 24px; z-index: 2; }
  .counts { display: flex; gap: 16px; margin-top: 8px; }
  .counts span { font-weight: 600; }
  main { padding: 24px; }
  .row { background: #fff; border: 1px solid #e5e5e5; border-radius: 8px; margin-bottom: 16px; overflow: hidden; }
  .row header { padding: 12px 16px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid #f0f0f0; }
  .row h2 { margin: 0; font-size: 14px; font-weight: 600; flex: 1; }
  .grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: #f0f0f0; }
  figure { margin: 0; background: #fff; padding: 12px; }
  figcaption { font-size: 12px; color: #666; margin-bottom: 8px; }
  img { max-width: 100%; display: block; border: 1px solid #eee; }
  .pill { padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
  .pass { background: #e7f6ec; color: #1a7f37; }
  .fail { background: #ffebe9; color: #cf222e; }
  .new { background: #ddf4ff; color: #0969da; }
  .gone { background: #fff1e5; color: #9a6700; }
  .meta { font-size: 12px; color: #666; }
  .filter { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-top: 8px; }
  .filter button { font-size: 12px; padding: 4px 10px; border: 1px solid #ddd; background: #fff; border-radius: 4px; cursor: pointer; }
  .filter button.active { background: #0969da; color: #fff; border-color: #0969da; }
  .filter input[type=search] { flex: 1; min-width: 180px; max-width: 320px; margin-left: auto; padding: 4px 10px; border: 1px solid #ddd; border-radius: 4px; font: inherit; }
  .source-link { font-size: 12px; color: #0969da; text-decoration: none; margin-left: auto; }
  .source-link:hover { text-decoration: underline; }
  [data-hidden] { display: none; }
  .thumb { cursor: zoom-in; }

  .lightbox { position: fixed; inset: 0; background: rgba(10,10,10,0.92); z-index: 100; display: none; flex-direction: column; }
  .lightbox.open { display: flex; }
  .lightbox .bar { display: flex; align-items: center; gap: 12px; padding: 12px 16px; color: #eee; background: rgba(0,0,0,0.5); border-bottom: 1px solid #333; }
  .lightbox .bar h3 { margin: 0; font-size: 14px; font-weight: 600; flex: 1; }
  .lightbox .bar button { background: transparent; color: #eee; border: 1px solid #555; padding: 4px 10px; border-radius: 4px; cursor: pointer; font: inherit; }
  .lightbox .bar button.active { background: #fff; color: #111; border-color: #fff; }
  .lightbox .viewer { flex: 1; overflow: auto; display: flex; align-items: center; justify-content: center; padding: 16px; }
  .lightbox .viewer.actual-size { align-items: flex-start; }
  .lightbox .viewer > img { display: block; background: #fff; max-width: 100%; max-height: 100%; object-fit: contain; }
  .lightbox .viewer.actual-size > img { max-width: none; max-height: none; image-rendering: pixelated; }
  .lightbox .slider { position: relative; user-select: none; background: #fff; flex-shrink: 0; }
  .lightbox .slider img { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
  .lightbox .slider .top { clip-path: inset(0 0 0 var(--split, 50%)); }
  .lightbox .slider .handle { position: absolute; top: 0; bottom: 0; left: var(--split, 50%); width: 2px; background: #ff0080; cursor: ew-resize; transform: translateX(-1px); }
  .lightbox .slider .handle::after { content: ''; position: absolute; top: 50%; left: 50%; width: 28px; height: 28px; margin: -14px 0 0 -14px; background: #ff0080; border-radius: 50%; box-shadow: 0 0 0 3px rgba(255,255,255,0.4); }
</style></head>
<body>
  <header class="top">
    <div style="display:flex;align-items:baseline;gap:12px;">
      <h1 style="margin:0;font-size:18px;">Visual regression report</h1>
      ${prBadge}
    </div>
    <div class="counts">
      <span>Total: ${summary.total}</span>
      <span style="color:#1a7f37;">OK: ${summary.unchanged}</span>
      <span style="color:#cf222e;">Changed: ${summary.changed}</span>
      <span style="color:#0969da;">New: ${summary.added}</span>
      <span style="color:#9a6700;">Removed: ${summary.removed}</span>
    </div>
    <div class="filter">
      <button data-filter="all" class="active">All</button>
      <button data-filter="changed">Changed</button>
      <button data-filter="added">New</button>
      <button data-filter="removed">Removed</button>
      <button data-filter="unchanged">Unchanged</button>
      <input id="search" type="search" placeholder="Filter by name…" autocomplete="off" />
    </div>
  </header>
  <main>${results.map(r => row(r, meta ?? null, sourceBaseUrl)).join('')}</main>

  <div class="lightbox" id="lb" aria-hidden="true">
    <div class="bar">
      <h3 id="lb-title"></h3>
      <div id="lb-modes">
        <button data-mode="baseline">Baseline</button>
        <button data-mode="actual">Actual</button>
        <button data-mode="diff">Diff</button>
        <button data-mode="slider" id="lb-slider-btn">Slider</button>
      </div>
      <button id="lb-zoom">1:1</button>
      <button id="lb-prev" aria-label="Previous">‹</button>
      <button id="lb-next" aria-label="Next">›</button>
      <button id="lb-close" aria-label="Close">✕</button>
    </div>
    <div class="viewer" id="lb-viewer"></div>
  </div>

  <script>
    (function () {
      const listState = { filter: 'all', query: '' }

      function applyFilters() {
        const q = listState.query.toLowerCase()
        document.querySelectorAll('.row').forEach(r => {
          const matchesFilter = listState.filter === 'all' || r.dataset.status === listState.filter
          const matchesQuery = !q || r.dataset.name.toLowerCase().includes(q)
          if (matchesFilter && matchesQuery) r.removeAttribute('data-hidden')
          else r.setAttribute('data-hidden', '')
        })
      }

      document.querySelectorAll('.filter button').forEach(btn => {
        btn.addEventListener('click', () => {
          listState.filter = btn.dataset.filter
          document.querySelectorAll('.filter button').forEach(b => b.classList.toggle('active', b === btn))
          applyFilters()
        })
      })

      let searchTimer
      document.getElementById('search').addEventListener('input', (e) => {
        clearTimeout(searchTimer)
        searchTimer = setTimeout(() => {
          listState.query = e.target.value.trim()
          applyFilters()
        }, 150)
      })

      const lb = document.getElementById('lb')
      const lbTitle = document.getElementById('lb-title')
      const lbViewer = document.getElementById('lb-viewer')
      const lbSliderBtn = document.getElementById('lb-slider-btn')
      const lbZoomBtn = document.getElementById('lb-zoom')
      const state = { rows: [], idx: 0, mode: 'diff', zoom: false }

      function applyZoom() {
        lbViewer.classList.toggle('actual-size', state.zoom)
        lbZoomBtn.classList.toggle('active', state.zoom)
        lbZoomBtn.textContent = state.zoom ? 'Fit' : '1:1'
      }

      function refreshRows() {
        state.rows = Array.from(document.querySelectorAll('.row')).filter(r => !r.hasAttribute('data-hidden'))
      }

      function render() {
        const row = state.rows[state.idx]
        if (!row) return
        const name = row.dataset.name
        const status = row.dataset.status
        const hasBoth = row.dataset.hasBoth === 'true'
        lbTitle.textContent = name + '  (' + (state.idx + 1) + '/' + state.rows.length + ') · ' + status
        lbSliderBtn.style.display = hasBoth ? '' : 'none'

        document.querySelectorAll('#lb-modes button').forEach(b => {
          b.classList.toggle('active', b.dataset.mode === state.mode)
        })

        const availableModes = {
          baseline: status !== 'added',
          actual: status !== 'removed',
          diff: status === 'changed',
          slider: hasBoth
        }
        if (!availableModes[state.mode]) state.mode = availableModes.diff ? 'diff' : (availableModes.actual ? 'actual' : 'baseline')

        if (state.mode === 'slider') {
          lbViewer.innerHTML = ''
          const wrap = document.createElement('div')
          wrap.className = 'slider'
          const bot = document.createElement('img')
          bot.src = 'baseline/' + name
          const top = document.createElement('img')
          top.src = 'actual/' + name
          top.className = 'top'
          const handle = document.createElement('div')
          handle.className = 'handle'
          wrap.appendChild(bot)
          wrap.appendChild(top)
          wrap.appendChild(handle)
          lbViewer.appendChild(wrap)

          const sizeWrap = () => {
            const nw = bot.naturalWidth, nh = bot.naturalHeight
            if (!nw || !nh) return
            if (state.zoom) {
              wrap.style.width = nw + 'px'
              wrap.style.height = nh + 'px'
            } else {
              const pad = 32
              const vw = lbViewer.clientWidth - pad
              const vh = lbViewer.clientHeight - pad
              const scale = Math.min(vw / nw, vh / nh, 1)
              wrap.style.width = Math.floor(nw * scale) + 'px'
              wrap.style.height = Math.floor(nh * scale) + 'px'
            }
          }
          if (bot.complete) sizeWrap()
          else bot.onload = sizeWrap
          window.addEventListener('resize', sizeWrap)

          const onMove = (e) => {
            const rect = wrap.getBoundingClientRect()
            const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left
            const pct = Math.max(0, Math.min(100, (x / rect.width) * 100))
            wrap.style.setProperty('--split', pct + '%')
          }
          let dragging = false
          wrap.addEventListener('mousedown', (e) => { dragging = true; onMove(e); e.preventDefault() })
          window.addEventListener('mousemove', (e) => { if (dragging) onMove(e) })
          window.addEventListener('mouseup', () => { dragging = false })
          wrap.addEventListener('touchstart', (e) => { onMove(e); e.preventDefault() }, { passive: false })
          wrap.addEventListener('touchmove', (e) => { onMove(e); e.preventDefault() }, { passive: false })
        } else {
          lbViewer.innerHTML = '<img src="' + state.mode + '/' + name + '" alt="' + name + '" />'
        }
        applyZoom()
      }

      function open(name) {
        refreshRows()
        const i = state.rows.findIndex(r => r.dataset.name === name)
        state.idx = i >= 0 ? i : 0
        state.mode = 'diff'
        lb.classList.add('open')
        lb.setAttribute('aria-hidden', 'false')
        render()
      }

      function close() {
        lb.classList.remove('open')
        lb.setAttribute('aria-hidden', 'true')
        lbViewer.innerHTML = ''
      }

      document.querySelectorAll('.thumb').forEach(img => {
        img.addEventListener('click', () => open(img.dataset.name))
      })
      document.getElementById('lb-close').addEventListener('click', close)
      document.getElementById('lb-prev').addEventListener('click', () => {
        if (!state.rows.length) return
        state.idx = (state.idx - 1 + state.rows.length) % state.rows.length
        render()
      })
      document.getElementById('lb-next').addEventListener('click', () => {
        if (!state.rows.length) return
        state.idx = (state.idx + 1) % state.rows.length
        render()
      })
      document.querySelectorAll('#lb-modes button').forEach(b => {
        b.addEventListener('click', () => { state.mode = b.dataset.mode; render() })
      })
      lbZoomBtn.addEventListener('click', () => { state.zoom = !state.zoom; render() })
    })()
  </script>
</body></html>`
}

function run(args: Args): number {
  const { actualDir, baselineDir, outputDir, threshold, failOnMissingBaseline } = args

  mkdirSync(outputDir, { recursive: true })
  const actuals = indexByName(walk(actualDir))
  const baselines = indexByName(walk(baselineDir))

  const results: Result[] = []
  const allNames = new Set([...actuals.keys(), ...baselines.keys()])

  for (const name of [...allNames].sort()) {
    const a = actuals.get(name)
    const b = baselines.get(name)

    if (a && !b) {
      copyInto(a.path, join(outputDir, 'actual'), name)
      results.push({ name, status: 'added' })
      continue
    }
    if (!a && b) {
      copyInto(b.path, join(outputDir, 'baseline'), name)
      results.push({ name, status: 'removed' })
      continue
    }
    if (!a || !b) continue

    copyInto(a.path, join(outputDir, 'actual'), name)
    copyInto(b.path, join(outputDir, 'baseline'), name)

    const baseline = loadPng(b.path)
    const actual = loadPng(a.path)
    const { diff, numDiff, sizeMismatch } = diffPair(baseline, actual, threshold)
    mkdirSync(join(outputDir, 'diff'), { recursive: true })
    writeFileSync(join(outputDir, 'diff', name), PNG.sync.write(diff))

    const status: Status = numDiff === 0 && !sizeMismatch ? 'unchanged' : 'changed'
    results.push({ name, status, numDiff, sizeMismatch })
  }

  const summary = {
    total: results.length,
    unchanged: results.filter(r => r.status === 'unchanged').length,
    changed: results.filter(r => r.status === 'changed').length,
    added: results.filter(r => r.status === 'added').length,
    removed: results.filter(r => r.status === 'removed').length
  }

  writeFileSync(
    join(outputDir, 'summary.json'),
    JSON.stringify({ summary, results }, null, 2)
  )
  let meta: Meta | null = null
  if (args.meta && existsSync(args.meta)) {
    try {
      meta = JSON.parse(readFileSync(args.meta, 'utf8'))
    } catch {
      meta = null
    }
  }

  writeFileSync(
    join(outputDir, 'index.html'),
    renderHtml(results, summary, args.prNumber, args.prUrl, meta, args.sourceBaseUrl)
  )

  console.log(
    `Total: ${summary.total} | OK: ${summary.unchanged} | Changed: ${summary.changed} | New: ${summary.added} | Removed: ${summary.removed}`
  )

  const missingBaseline = summary.added > 0 && failOnMissingBaseline
  const hasRegressions = summary.changed > 0 || summary.removed > 0
  return hasRegressions || missingBaseline ? 1 : 0
}

export default {
  command: 'visual-diff',
  desc: 'Diff visual regression screenshots and generate an HTML report',
  builder: {
    'actual-dir': {
      type: 'string',
      describe: 'Directory containing the newly captured screenshots',
      default: 'cypress/screenshots'
    },
    'baseline-dir': {
      type: 'string',
      describe: 'Directory containing the baseline screenshots to diff against',
      default: '.baselines'
    },
    'output-dir': {
      type: 'string',
      describe: 'Directory to write the HTML report, diff PNGs, and summary.json',
      default: 'visual-report'
    },
    threshold: {
      type: 'number',
      describe: 'pixelmatch color threshold (0-1)',
      default: 0.1
    },
    'fail-on-missing-baseline': {
      type: 'boolean',
      describe: 'Exit non-zero if actual screenshots have no matching baseline',
      default: true
    },
    'pr-number': {
      type: 'string',
      describe: 'Pull request number to display in the report header'
    },
    'pr-url': {
      type: 'string',
      describe: 'Pull request URL to link from the report header'
    },
    meta: {
      type: 'string',
      describe: 'Path to a JSON file mapping screenshot slug to the visited URL path'
    },
    'source-base-url': {
      type: 'string',
      describe: 'Base URL for source-file links in the report (e.g. GitHub blob URL of the app root)'
    }
  },
  handler: (argv: Args) => {
    process.exit(run(argv))
  }
}
