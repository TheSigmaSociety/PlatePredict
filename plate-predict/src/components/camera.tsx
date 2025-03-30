import React, { useRef, useEffect, useState } from "react";

interface CameraProps {
  onPhotoTaken: (photo: string) => void;
}

export default function Camera({ onPhotoTaken }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    // Start camera when component mounts
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });
        
        setStream(mediaStream);
        
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }

    startCamera();

    // Cleanup function to stop camera when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, []);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext("2d");
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw current video frame to canvas
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL("image/png");
      
      // Pass the photo data URL to parent
      onPhotoTaken(dataUrl);
      
      // Stop all tracks in the stream to release camera
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 rounded-lg shadow-xl border border-gray-800">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        className="rounded-lg mb-6 max-w-2xl w-full h-auto"
      />
      <canvas ref={canvasRef} className="hidden" />
      <button 
        onClick={takePhoto}
        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all shadow-lg"
      >
        Take Photo
      </button>
    </div>
  );
}
