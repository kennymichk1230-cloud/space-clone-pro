import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setSupported(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const onInstall = useCallback(async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      setSupported(false);
    } else {
      alert(
        "If you don't see an install prompt: On iPhone, tap Share → Add to Home Screen. On Android, open browser menu → Install app."
      );
    }
  }, [deferredPrompt]);

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Install Space Clone Pro</h1>
        <p className="mt-2 opacity-80">
          Add this app to your home screen for a full-screen, offline-capable experience.
        </p>
      </header>

      <section className="space-y-4">
        <Button size="lg" onClick={onInstall}>
          {supported ? "Install App" : "Show Install Instructions"}
        </Button>
        <article className="text-sm opacity-80 space-y-2">
          <p>
            iPhone/iPad: Open in Safari → Share → Add to Home Screen.
          </p>
          <p>
            Android: Open menu ⋮ → Install app (or Add to Home screen).
          </p>
        </article>
      </section>
    </main>
  );
};

export default Install;
