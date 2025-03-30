import React, { useRef, useEffect, useState } from 'react';

interface CameraProps {
  onPhotoTaken?: (photo: string) => void;
}

const Camera: React.FC<CameraProps> = ({ onPhotoTaken }) => {
  const videoRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [upload, setUpload] = useState(""); //take photo
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const [output, outputFunc] = useState("");
  
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener('loadedmetadata', () => {
            videoRef.current.play();
          });
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const getSigma = () => {
    const video = videoRef.current;
    if (video && !photo) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Image = canvas.toDataURL('image/png');
      setPhoto(base64Image);
      setUpload(""); //submit
      setIsPhotoTaken(true);
      
    } else {
      outputFunc("generating..");
      if (onPhotoTaken) {
        onPhotoTaken(photo); // Pass the image to the parent component
      }
      //upload to server
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-2">
      {photo && <img src={photo} className="aspect-auto rounded-md" />}
      {!photo && <video ref={videoRef} autoPlay className="aspect-auto rounded-md" />}
      {output && (
        <div className="flex flex-col flex-grow justify-center items-center">
          <div className="whitespace-pre-line pt-2">{output}</div>
        </div>
      )}
      <div
        className="flex bottom-0 w-24 items-center justify-center rounded cursor-pointer mt-1 border-black border-3"
        onClick={getSigma}
      >
        {upload}
        {isPhotoTaken ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="green"
            className="size-12 border-2 border-secondary rounded-full m-2 p-1 mt-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-12 border-2 border-black rounded-full m-2 p-1 mt-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Camera;
