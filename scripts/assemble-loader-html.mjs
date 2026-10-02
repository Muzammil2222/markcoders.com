import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const loaderSrc = fs.readFileSync(path.join(process.env.TEMP, 'mc-loader-index.html'), 'utf8')

const floatMatch = loaderSrc.match(/<div class="mc-float">[\s\S]*?<\/div>\s*<div class="mc-rail">/)
if (!floatMatch) {
  console.error('mc-float block missing from loader source')
  process.exit(1)
}
const floatInner = floatMatch[0].replace(/\s*<div class="mc-rail">$/, '')

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="%BASE_URL%fav-Logo-1.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="MarkCoders - We work with startups, scaleups, and established brands to launch digital products that stand out and convert." />
    <meta name="theme-color" content="#030712" />
    <title>Markcoders</title>
    <!-- LCP: hero card image, fetched before any JS runs -->
    <link rel="preload" as="image" href="%BASE_URL%hero/vantage.webp" fetchpriority="high" />
    <!-- Switzer variable font (self-hosted); preload + @font-face use BASE_URL for GH Pages -->
    <link rel="preload" as="font" type="font/woff2" href="%BASE_URL%fonts/Switzer-Variable.woff2" crossorigin />
    <style>
      @font-face {
        font-family: 'Switzer';
        src: url('%BASE_URL%fonts/Switzer-Variable.woff2') format('woff2');
        font-weight: 100 900;
        font-style: normal;
        font-display: swap;
      }
      /* Avoid CLS when mc-lock removes overflow:hidden and the scrollbar appears */
      html{ scrollbar-gutter: stable; }
      #lcp-shell{
        position:fixed; inset:0; z-index:0; pointer-events:none;
        display:flex; flex-direction:column; justify-content:flex-end;
        padding:7rem 1.5rem 3rem; box-sizing:border-box;
        background:#030712; color:#fff;
        font-family:Switzer,system-ui,-apple-system,sans-serif;
      }
      #lcp-shell h1{
        margin:0; font-weight:600; letter-spacing:-0.04em; line-height:0.9;
        font-size:min(80vw, 220px); max-width:100%; white-space:nowrap;
      }
      #lcp-shell p{
        margin:1.5rem 0 0; max-width:36rem; font-weight:500; letter-spacing:-1px;
        font-size:clamp(18px,2.5vw,35px); line-height:1.25; color:rgba(255,255,255,.9);
      }
      #lcp-shell .lcp-card{
        margin-top:2rem; width:162px; height:197px; border-radius:15px; overflow:hidden;
        flex-shrink:0; background:#00060B;
      }
      #lcp-shell .lcp-card img{
        display:block; width:162px; height:197px; object-fit:cover; border-radius:15px;
      }
      #root{ position:relative; z-index:1; min-height:100vh; background:#030712; }

      /* ===== MARKCODERS PRELOADER (compositor-friendly) ===== */
      :root{
        --mc-light:#25A8DF;
        --mc-dark:#1B75BB;
        --mc-bg:radial-gradient(130% 100% at 50% 42%,#0E2135 0%,#071320 70%);
        --mc-track:rgba(37,168,223,.22);
        --mc-size:min(190px,42vw);
        --mc-sp:1;
      }
      html.mc-lock{overflow:hidden}
      html.mc-skip .mc-pre{display:none}

      .mc-pre{
        position:fixed; inset:0; z-index:2147483000;
        display:flex; align-items:center; justify-content:center;
        background:var(--mc-bg);
        contain:strict;
        will-change:opacity;
        transition:opacity .35s cubic-bezier(.4,0,.2,1), visibility 0s .35s;
      }
      .mc-pre.is-done{opacity:0; visibility:hidden; pointer-events:none}

      .mc-stage{display:flex; flex-direction:column; align-items:center; gap:26px;
        transition:transform .35s cubic-bezier(.4,0,.2,1), opacity .35s}
      .mc-pre.is-done .mc-stage{transform:scale(1.04); opacity:0}

      .mc-float{position:relative; width:var(--mc-size); height:var(--mc-size); overflow:hidden;
        will-change:transform}
      .mc-mark,.mc-sheen{position:absolute; inset:0; width:100%; height:100%; display:block}
      .mc-defs{position:absolute; width:0; height:0; overflow:hidden}
      .mc-mark .lite{fill:var(--mc-light)}
      .mc-mark .dark{fill:var(--mc-dark)}

      .mc-face{transform-box:fill-box}
      .mc-face.tl{transform-origin:100% 50%}
      .mc-face.tr{transform-origin:0% 50%}
      .mc-face.bl{transform-origin:100% 50%}
      .mc-face.br{transform-origin:0% 50%}

      @keyframes mcUnfold{
        from{opacity:0; transform:scaleX(.02)}
        30% {opacity:1}
        to  {opacity:1; transform:scaleX(1)}
      }
      .mc-face{animation-name:mcUnfold; animation-duration:calc(620ms*var(--mc-sp));
        animation-timing-function:cubic-bezier(.16,1,.3,1); animation-fill-mode:both}
      .mc-face.tl{animation-delay:0ms}
      .mc-face.tr{animation-delay:calc(90ms*var(--mc-sp))}
      .mc-face.bl{animation-delay:calc(210ms*var(--mc-sp)); animation-duration:calc(560ms*var(--mc-sp))}
      .mc-face.br{animation-delay:calc(300ms*var(--mc-sp)); animation-duration:calc(560ms*var(--mc-sp))}

      /* Original SVG sheen used mask-position (main-thread paint). Hide it;
         use a transform-only gradient sweep instead. */
      .mc-sheen{ display:none }
      .mc-sheen-sweep{
        position:absolute; inset:0;
        background:linear-gradient(108deg,
          transparent 40%,
          rgba(255,255,255,.55) 50%,
          transparent 60%);
        background-size:220% 100%;
        transform:translateX(60%);
        will-change:transform;
        mix-blend-mode:soft-light;
        pointer-events:none;
        animation:mcSheenSweep calc(2000ms*var(--mc-sp)) cubic-bezier(.42,0,.58,1) calc(950ms*var(--mc-sp)) infinite;
      }
      @keyframes mcSheenSweep{
        0%  {transform:translateX(55%)}
        58%,100%{transform:translateX(-55%)}
      }

      @keyframes mcFloat{0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)}}
      .mc-float{animation:mcFloat 3.6s ease-in-out calc(1200ms*var(--mc-sp)) infinite}

      .mc-rail{position:relative; width:78px; height:2px; border-radius:2px; overflow:hidden;
        background:var(--mc-track);
        animation:mcFadeIn calc(400ms*var(--mc-sp)) ease calc(700ms*var(--mc-sp)) both}
      .mc-rail i{position:absolute; top:0; bottom:0; left:0; width:42%; border-radius:2px;
        background:var(--mc-light); will-change:transform;
        animation:mcRail calc(1350ms*var(--mc-sp)) cubic-bezier(.65,0,.35,1) calc(900ms*var(--mc-sp)) infinite}
      @keyframes mcRail{from{transform:translateX(-115%)} to{transform:translateX(255%)}}
      @keyframes mcFadeIn{from{opacity:0} to{opacity:1}}

      @media (prefers-reduced-motion:reduce){
        .mc-face,.mc-sheen-sweep,.mc-float,.mc-rail i{animation:none}
        .mc-sheen-sweep{display:none}
        .mc-rail i{width:100%}
        .mc-stage{animation:mcFadeIn .35s ease both}
      }
    </style>
    <script>
      // true = show loader every visit; false = once per tab session (does not affect Lighthouse).
      window.__MC_LOADER_EVERY_VISIT__ = true;
      (function(){
        try {
          if (!window.__MC_LOADER_EVERY_VISIT__ && sessionStorage.getItem('mcSeen')) {
            document.documentElement.classList.add('mc-skip');
            return;
          }
        } catch (e) {}
        document.documentElement.classList.add('mc-lock');
      })();
    </script>
  </head>
  <body>
    <!-- Brand loader — sits above #lcp-shell; shell still paints for early LCP -->
    <div class="mc-pre" id="mcPre" role="status" aria-live="polite" aria-label="Loading Markcoders">
      <div class="mc-stage">
        ${floatInner}
        <div class="mc-rail"><i></i></div>
      </div>
    </div>
    <!-- Static above-the-fold shell: paints before React (CSR LCP win). Stays behind #root. -->
    <div id="lcp-shell" aria-hidden="true">
      <h1>MarkCoders</h1>
      <p>Custom Software, Web &amp; Mobile App Development That Moves Businesses Forward</p>
      <div class="lcp-card">
        <img
          id="lcp-hero-img"
          src="%BASE_URL%hero/vantage.webp"
          width="162"
          height="197"
          alt=""
          fetchpriority="high"
          decoding="sync"
        />
      </div>
    </div>
    <script>
    (function(){
      var pre  = document.getElementById('mcPre');
      var root = document.documentElement;
      if (!pre || root.classList.contains('mc-skip')) {
        try { sessionStorage.setItem('mcSeen', '1'); } catch (e) {}
        return;
      }

      var start = Date.now();
      var MIN_SHOW = 500;
      var HARD_CAP = 1200;
      var fired = false;
      var heroReady = false;
      var reactReady = false;

      function tryHide(){
        if (fired) return;
        var elapsed = Date.now() - start;
        var contentOk = heroReady || reactReady || elapsed >= HARD_CAP;
        if (!contentOk) return;
        if (elapsed < MIN_SHOW) {
          setTimeout(tryHide, MIN_SHOW - elapsed);
          return;
        }

        fired = true;
        pre.classList.add('is-done');
        root.classList.remove('mc-lock');
        try { sessionStorage.setItem('mcSeen', '1'); } catch (e) {}
        setTimeout(function(){ if (pre.parentNode) pre.remove(); }, 350);
      }

      window.hideMarkcodersLoader = function(){
        reactReady = true;
        tryHide();
      };

      var img = document.getElementById('lcp-hero-img');
      function markHero(){ heroReady = true; tryHide(); }
      if (img) {
        if (img.complete && img.naturalWidth) markHero();
        else if (img.decode) {
          img.decode().then(markHero).catch(markHero);
        } else {
          img.addEventListener('load', markHero, { once: true });
          img.addEventListener('error', markHero, { once: true });
        }
      } else {
        heroReady = true;
      }

      setTimeout(tryHide, HARD_CAP);
    })();
    </script>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`

// Inject transform sheen sweep into the sheen SVG wrapper from the original float block
let out = html.replace(
  /(<svg class="mc-sheen"[^>]*>)([\s\S]*?)(<\/svg>)/,
  '$1$2<div class="sheen-placeholder-remove"></div>$3'
)

// Original sheen is an SVG — add a sibling sweep div after the sheen SVG inside mc-float
out = out.replace(
  /(<svg class="mc-sheen"[\s\S]*?<\/svg>)/,
  '$1\n          <div class="mc-sheen-sweep" aria-hidden="true"></div>'
)
// Clean accidental placeholder if any
out = out.replace(/<div class="sheen-placeholder-remove"><\/div>/g, '')

fs.writeFileSync(path.join(root, 'index.html'), out)
console.log('Wrote index.html', out.length, 'bytes')
