import '../styles/globals.css';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import Script from 'next/script';

export const metadata = {
  title: {
    template: '%s | Netlify',
    default: 'Netlify Starter'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body className="antialiased text-white bg-blue-900">

        {/* ✅ Додаємо зовнішній скрипт */}
        <Script
async src="https://widget.intelswift.com/script.js?tenantId=094f2d86-c31e-4a4c-b5b5-c890ee26399a&botId=6800cc2dcd5532449cdcb158&uuid=55aacbe6-d51d-410f-a97b-3851c50344d8&end=true"          
          strategy="afterInteractive"
        />

        {/* ✅ Додаємо inline-скрипт */}
        <Script
          id="intelswift-widget-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
           window.onload = (event) => {
    const propsInterval = setInterval(widgetTimer, 1000);

    function widgetTimer() {
      const tenantId = localStorage.getItem("wws-tenant-id")
      const botId = localStorage.getItem("wws-bot-id")
      const uuid = localStorage.getItem("wws-uuid")
      const host = window.location.hostname
      const language = navigator.language || navigator.userLanguage; 

      if(
        (uuid && uuid != "undefined") && 
        (tenantId && tenantId != "undefined") && 
        (botId && botId != "undefined") && 
        (host && host != "undefined")
      ){
        clearInterval(propsInterval);
        document.getElementById("iframeWidgetContainer").contentWindow.postMessage( 
        {
          tenantId: tenantId,
          botId: botId,
          uuid: uuid,
          host: host,
          contact_language: language
        },"*")
      }
    }
  };
            `
          }}
        />

        <div className="flex flex-col min-h-screen px-6 bg-noise sm:px-12">
          <div className="flex flex-col w-full max-w-5xl mx-auto grow">
            <Header />
            <main className="grow">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
