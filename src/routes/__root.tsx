import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Monk's Three Coffee Kuşadası | Nitelikli kahve ve kafe" },
      {
        name: "description",
        content:
          "Kuşadası cafe arayanlar için Monk's Three Coffee: nitelikli kahve, kahvaltı, soğuk içecekler ve sahil molası. Menü, adres ve Google Haritalar.",
      },
      { name: "theme-color", content: "#3E2723" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Playfair+Display:wght@500;600&display=swap",
      },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          id="portfolio-storage-shim"
          dangerouslySetInnerHTML={{
            __html:
              '(function(){function mem(){var m={};return{getItem:function(k){return Object.prototype.hasOwnProperty.call(m,k)?m[k]:null},setItem:function(k,v){m[k]=String(v)},removeItem:function(k){delete m[k]},clear:function(){m={}},key:function(i){return Object.keys(m)[i]||null},get length(){return Object.keys(m).length}}}["localStorage","sessionStorage"].forEach(function(name){var ok=false;try{window[name].getItem("__p");ok=true}catch(e){}if(!ok){var fake=mem();try{Object.defineProperty(window,name,{configurable:true,get:function(){return fake}})}catch(e){}}});})();',
          }}
        />
        <HeadContent />
      </head>
      <body>
        <style>{`html,body{overflow-x:hidden}body{padding-top:46px}header.sticky,header.fixed,nav.fixed{top:46px!important}`}</style>
        <div
          role="note"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 80,
            background: "#140e09",
            color: "#f4e7cf",
            textAlign: "center",
            font: "600 12px/1.35 ui-sans-serif, system-ui, sans-serif",
            letterSpacing: "0.02em",
            padding: "8px 12px",
            borderBottom: "1px solid #c9a86e",
            whiteSpace: "normal",
            overflowWrap: "anywhere",
          }}
        >
          Demodur. Portföy amaçlı yapılmıştır.
        </div>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
