// Caderneta: guarda o app no aparelho para abrir mesmo sem internet.
const VERSAO = "caderneta-v9";
const APP = ["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png"];
const LIBS = [
  "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js",
  "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",
  "https://cdn.jsdelivr.net/npm/jspdf-autotable@3.8.2/dist/jspdf.plugin.autotable.min.js",
  "https://cdn.jsdelivr.net/npm/@zxing/library@0.21.3/umd/index.min.js"
];

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSAO);
    await c.addAll(APP.map(u => new Request(u, { cache: "reload" })));   // ignora o cache do navegador
    await Promise.all(LIBS.map(u => c.add(u).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSAO) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.hostname === "api.anthropic.com") return;           // leitura das notas: sempre online
  if (url.origin === location.origin) {                        // o app: busca a versão nova, usa a guardada se offline
    e.respondWith((async () => {
      try {
        const r = await fetch(req.url, { cache: "no-cache" });                // sempre confere a versão nova
        if (r.ok) (await caches.open(VERSAO)).put(req, r.clone());
        return r;
      } catch (_) {
        return (await caches.match(req)) || (await caches.match("./index.html"));
      }
    })());
    return;
  }
  const LIB_HOSTS = ["cdn.jsdelivr.net", "fonts.googleapis.com", "fonts.gstatic.com"];
  if (!LIB_HOSTS.includes(url.hostname)) return;              // outros serviços (CNPJ etc.): direto pela internet
  e.respondWith((async () => {                                 // bibliotecas e fontes: guardadas depois do 1º uso
    const hit = await caches.match(req);
    if (hit) return hit;
    try {
      const r = await fetch(req);
      if (r.ok || r.type === "opaque") (await caches.open(VERSAO)).put(req, r.clone());
      return r;
    } catch (_) { return Response.error(); }
  })());
});
