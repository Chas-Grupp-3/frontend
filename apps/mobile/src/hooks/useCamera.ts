import { useRef, useState, useCallback, useEffect } from "react";

const CAMERA_ERROR_MESSAGES = {
  NotAllowedError:
    "Camera permission denied. Please allow camera access and try again.",
  NotFoundError: "No camera found on this device.",
  NotSupportedError: "Camera not supported on this device.",
  NotReadableError: "Camera is already in use by another application.",
  AbortError: "Camera initialization was cancelled.",
} as const;

const CAMERA_CONSTRAINTS = [
  {
    facingMode: "environment",
    width: { ideal: 1280 },
    height: { ideal: 720 },
  },
  { facingMode: "user" },
];

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const abortControllerRef = useRef<AbortController | null>(null);

  const getMediaStream = async (signal: AbortSignal) => {
    for (const video of CAMERA_CONSTRAINTS) {
      if (signal.aborted) return null;

      try {
        return await navigator.mediaDevices.getUserMedia({ video });
      } catch {
        continue;
      }
    }
    throw new Error("No camera available");
  };

  const setupVideo = async (stream: MediaStream, signal: AbortSignal) => {
    if (!videoRef.current) throw new Error("Video ref not available");

    videoRef.current.srcObject = stream;

    return new Promise<void>((resolve, reject) => {
      if (signal.aborted) {
        reject(new Error("Aborted"));
        return;
      }

      const video = videoRef.current!;
      video.onloadedmetadata = () => {
        if (signal.aborted) {
          reject(new Error("Aborted"));
          return;
        }
        setCameraStarted(true);
        resolve();
      };
      video.onerror = () => reject(new Error("Video loading error"));
      video.play().catch(reject);
    });
  };

  const handleError = (error: unknown, signal: AbortSignal) => {
    if (signal.aborted) return;

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorName = error instanceof Error ? error.name : "";

    const message =
      CAMERA_ERROR_MESSAGES[errorName as keyof typeof CAMERA_ERROR_MESSAGES] ||
      (errorMessage.includes("not supported")
        ? "Camera API not supported. Please use HTTPS or try a different browser."
        : `Camera error: ${errorMessage}`);

    setError(message);
  };

  const cleanupStream = (stream: MediaStream | null) => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const startCamera = useCallback(async (): Promise<boolean> => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Camera API not supported in this browser");
      return false;
    }

    setError("");
    setCameraStarted(false);
    setIsLoading(true);

    try {
      if (signal.aborted) return false;

      const stream = await getMediaStream(signal);

      if (signal.aborted) {
        cleanupStream(stream);
        return false;
      }

      if (!stream) {
        setError("No camera available");
        return false;
      }

      await setupVideo(stream, signal);
      return true;
    } catch (error: unknown) {
      handleError(error, signal);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    const video = videoRef.current;
    if (video?.srcObject) {
      const stream = video.srcObject as MediaStream;
      cleanupStream(stream);
      video.srcObject = null;
      video.pause();
    }
    setCameraStarted(false);
    setError("");
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return { videoRef, cameraStarted, isLoading, error, startCamera, stopCamera };
};
