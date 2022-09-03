import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script id="theme-script" strategy="beforeInteractive">
          {`const item = localStorage.getItem('theme') || 'light';
          localStorage.setItem('theme', item);
          document.getElementsByTagName('html')[0].dataset.theme = item;`}
        </Script>
        <Script id="data-buried">
          {`(function(win, export_obj) {
              win['LogAnalyticsObject'] = export_obj;
              if (!win[export_obj]) {
                  function _collect() {
                      _collect.q.push(arguments);
                  }
                  _collect.q = _collect.q || [];
                  win[export_obj] = _collect;                
              }
              win[export_obj].l = +new Date();
          })(window, 'collectEvent');`}
        </Script>
        <Script
          async
          src="{{domain}}/collect-privity-v5.1.2.js"
          strategy="beforeInteractive"
        ></Script>
        <Script id="init">
          {`window.collectEvent('init', {
              app_id: {{APPID}}, 
              channel: 'cn', 
              log: true, 
              autotrack: false 
          });
          window.collectEvent('start');`}
        </Script>
      </body>
    </Html>
  );
}
