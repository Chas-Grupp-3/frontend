import { useRef, useState, useCallback, useEffect } from "react";
import decodeQR from "qr/decode.js";

export const useQRScanner = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
  scanTimeoutMs: number = 30000
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scanTimersRef = useRef<{
    scanningInterval: NodeJS.Timeout | null;
    overallTimeout: NodeJS.Timeout | null;
    adaptiveSlowdown: NodeJS.Timeout | null;
  }>({ scanningInterval: null, overallTimeout: null, adaptiveSlowdown: null });
  const duplicatePreventionRef = useRef<{
    lastQRCode: string;
    detectedAt: number;
  } | null>(null);

  const [qrCodeResult, setQRCodeResult] = useState<string>("");
  const [isActivelyScanning, setIsActivelyScanning] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [currentScanFrequency, setCurrentScanFrequency] = useState(200);

  const clearAllScanTimers = useCallback(() => {
    Object.values(scanTimersRef.current).forEach((timer) => {
      if (timer) clearInterval(timer);
    });
    scanTimersRef.current = {
      scanningInterval: null,
      overallTimeout: null,
      adaptiveSlowdown: null,
    };
  }, []);

  const stopQRScanning = useCallback(() => {
    clearAllScanTimers();
    setIsActivelyScanning(false);
  }, [clearAllScanTimers]);

  const captureAndDecodeFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA)
      return;

    const canvasContext = canvas.getContext("2d", { willReadFrequently: true });
    if (!canvasContext) return;

    // Resize canvas to match video dimensions if needed
    if (
      canvas.width !== video.videoWidth ||
      canvas.height !== video.videoHeight
    ) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    // Capture current video frame to canvas
    canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
    const frameImageData = canvasContext.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

    try {
      const decodedQRCode = decodeQR({
        width: frameImageData.width,
        height: frameImageData.height,
        data: frameImageData.data,
      });

      if (decodedQRCode) {
        const currentTime = Date.now();
        const previousDetection = duplicatePreventionRef.current;

        // Prevent same QR code from being processed within 1 second
        if (
          previousDetection?.lastQRCode === decodedQRCode &&
          currentTime - previousDetection.detectedAt < 1000
        ) {
          return;
        }

        duplicatePreventionRef.current = {
          lastQRCode: decodedQRCode,
          detectedAt: currentTime,
        };
        setQRCodeResult(decodedQRCode);
        stopQRScanning();
      }
    } catch {
      // Continue scanning if QR decode fails
    }
  }, [stopQRScanning, videoRef]);

  const beginQRScanning = useCallback(() => {
    if (isActivelyScanning) return;

    // Reset all states
    setIsActivelyScanning(true);
    setQRCodeResult("");
    setHasTimedOut(false);
    setCurrentScanFrequency(200);

    // Start fast scanning (every 200ms)
    scanTimersRef.current.scanningInterval = setInterval(
      captureAndDecodeFrame,
      200
    );

    // After 5 seconds, slow down to save battery (every 500ms)
    scanTimersRef.current.adaptiveSlowdown = setTimeout(() => {
      if (scanTimersRef.current.scanningInterval) {
        clearInterval(scanTimersRef.current.scanningInterval);
        setCurrentScanFrequency(500);
        scanTimersRef.current.scanningInterval = setInterval(
          captureAndDecodeFrame,
          500
        );
      }
    }, 5000);

    // Stop scanning after overall timeout
    scanTimersRef.current.overallTimeout = setTimeout(() => {
      setHasTimedOut(true);
      stopQRScanning();
    }, scanTimeoutMs);
  }, [
    isActivelyScanning,
    captureAndDecodeFrame,
    scanTimeoutMs,
    stopQRScanning,
  ]);

  const resetQRScannerState = useCallback(() => {
    setQRCodeResult("");
    setHasTimedOut(false);
    duplicatePreventionRef.current = null;
  }, []);

  // Cleanup timers on component unmount
  useEffect(() => clearAllScanTimers, [clearAllScanTimers]);

  return {
    canvasRef,
    qrCodeResult,
    isActivelyScanning,
    hasTimedOut,
    beginQRScanning,
    stopQRScanning,
    resetQRScannerState,
    currentScanFrequency,
  };
};
