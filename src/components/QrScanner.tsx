import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { ArrowLeft, Camera } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface QrScannerProps {
  onScan: (data: string) => void;
  disabled?: boolean;
}

let scannerCounter = 0;

export function QrScanner({ onScan, disabled }: QrScannerProps) {
  const [open, setOpen] = useState(false);

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const lastScannedRef = useRef<string | null>(null);
  const onScanRef = useRef(onScan);
  const [scannerId] = useState(() => `qr-reader-${++scannerCounter}`);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Camera zoom state held in refs so touch handlers stay stable
  const zoomSupportedRef = useRef(false);
  const zoomRangeRef = useRef<{ min: number; max: number }>({ min: 1, max: 1 });
  const currentZoomRef = useRef(1);
  const pinchStartDistanceRef = useRef(0);
  const pinchStartZoomRef = useRef(1);
  const pendingZoomRef = useRef<number | null>(null);
  const zoomRafRef = useRef<number | null>(null);

  useEffect(() => {
    onScanRef.current = onScan;
  }, [onScan]);

  const closeScanner = useCallback(async () => {
    const scanner = scannerRef.current;
    scannerRef.current = null;
    lastScannedRef.current = null;
    zoomSupportedRef.current = false;
    currentZoomRef.current = 1;

    if (scanner) {
      try {
        const state = scanner.getState();
        if (state === 2 || state === 3) {
          await scanner.stop();
        }
      } catch {
        // ignore stop errors
      }
      try {
        scanner.clear();
      } catch {
        // ignore clear errors
      }
    }
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleScanSuccess = useCallback((decodedText: string) => {
    if (lastScannedRef.current === decodedText) return;
    lastScannedRef.current = decodedText;
    setTimeout(() => {
      lastScannedRef.current = null;
    }, 3000);

    setOpen(false);
    onScanRef.current(decodedText);
  }, []);

  const initZoomCapability = useCallback(() => {
    const scanner = scannerRef.current;
    if (!scanner) return;
    try {
      const zoom = scanner.getRunningTrackCameraCapabilities().zoomFeature();
      if (zoom.isSupported()) {
        zoomRangeRef.current = { min: zoom.min(), max: zoom.max() };
        currentZoomRef.current = zoom.value() ?? zoom.min();
        zoomSupportedRef.current = true;
      } else {
        zoomSupportedRef.current = false;
      }
    } catch {
      zoomSupportedRef.current = false;
    }
  }, []);

  const flushZoom = useCallback(() => {
    zoomRafRef.current = null;
    const target = pendingZoomRef.current;
    pendingZoomRef.current = null;
    if (target == null) return;
    const scanner = scannerRef.current;
    if (!scanner) return;
    try {
      void scanner
        .getRunningTrackCameraCapabilities()
        .zoomFeature()
        .apply(target);
      currentZoomRef.current = target;
    } catch {
      // ignore
    }
  }, []);

  const requestZoom = useCallback(
    (value: number) => {
      const { min, max } = zoomRangeRef.current;
      const clamped = Math.min(max, Math.max(min, value));
      pendingZoomRef.current = clamped;
      if (zoomRafRef.current == null) {
        zoomRafRef.current = requestAnimationFrame(flushZoom);
      }
    },
    [flushZoom]
  );

  const startScanner = useCallback(async () => {
    const container = document.getElementById(scannerId);
    if (!container) return;
    container.innerHTML = "";

    try {
      const scanner = new Html5Qrcode(scannerId, {
        verbose: false,
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true,
        },
      });
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: { ideal: "environment" } } as MediaTrackConstraints,
        {
          fps: 25,
          qrbox: (vw, vh) => {
            const m = Math.floor(Math.min(vw, vh) * 0.8);
            return { width: m, height: m };
          },
          disableFlip: true,
          videoConstraints: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 30 },
            ...({ focusMode: "continuous" } as object),
          } as MediaTrackConstraints,
        },
        handleScanSuccess,
        undefined
      );

      initZoomCapability();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(`Erro ao iniciar câmera: ${msg}`);
      scannerRef.current = null;
      setOpen(false);
    }
  }, [scannerId, handleScanSuccess, initZoomCapability]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;

    (async () => {
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      if (cancelled) return;
      await startScanner();
    })();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const getDistance = (a: Touch, b: Touch) => {
      const dx = a.clientX - b.clientX;
      const dy = a.clientY - b.clientY;
      return Math.hypot(dx, dy);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2 && zoomSupportedRef.current) {
        e.preventDefault();
        pinchStartDistanceRef.current = getDistance(e.touches[0], e.touches[1]);
        pinchStartZoomRef.current = currentZoomRef.current;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (
        e.touches.length === 2 &&
        zoomSupportedRef.current &&
        pinchStartDistanceRef.current > 0
      ) {
        e.preventDefault();
        const distance = getDistance(e.touches[0], e.touches[1]);
        const scale = distance / pinchStartDistanceRef.current;
        requestZoom(pinchStartZoomRef.current * scale);
      }
    };

    const handleTouchEnd = () => {
      pinchStartDistanceRef.current = 0;
    };

    const overlay = overlayRef.current;
    if (overlay) {
      overlay.addEventListener("touchstart", handleTouchStart, { passive: false });
      overlay.addEventListener("touchmove", handleTouchMove, { passive: false });
      overlay.addEventListener("touchend", handleTouchEnd);
      overlay.addEventListener("touchcancel", handleTouchEnd);
    }

    return () => {
      cancelled = true;
      document.body.style.overflow = prevOverflow;
      if (overlay) {
        overlay.removeEventListener("touchstart", handleTouchStart);
        overlay.removeEventListener("touchmove", handleTouchMove);
        overlay.removeEventListener("touchend", handleTouchEnd);
        overlay.removeEventListener("touchcancel", handleTouchEnd);
      }
      if (zoomRafRef.current != null) {
        cancelAnimationFrame(zoomRafRef.current);
        zoomRafRef.current = null;
      }
      pendingZoomRef.current = null;
      pinchStartDistanceRef.current = 0;
      void closeScanner();
    };
  }, [open, startScanner, closeScanner, requestZoom]);

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center justify-center py-10 gap-3 text-muted-foreground border-2 border-dashed border-muted-foreground/30 rounded-xl bg-black/5 dark:bg-white/5 w-full max-w-[350px]">
          <Camera className="w-12 h-12 opacity-40" />
          <p className="text-sm">Scanner pronto</p>
        </div>

        <Button
          onClick={() => setOpen(true)}
          disabled={disabled}
          variant="default"
          className="gap-2 cursor-pointer"
          size="lg"
        >
          <Camera className="w-4 h-4" />
          Abrir Scanner
        </Button>
      </div>

      {open &&
        createPortal(
          <div ref={overlayRef} className="fixed inset-0 z-50 bg-black touch-none">
            <div
              id={scannerId}
              className="absolute inset-0 qr-fullscreen-container"
            />

            <div className="absolute top-0 left-0 p-4 pt-[max(1rem,env(safe-area-inset-top))] pl-[max(1rem,env(safe-area-inset-left))] z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 hover:text-white cursor-pointer"
                aria-label="Voltar"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
