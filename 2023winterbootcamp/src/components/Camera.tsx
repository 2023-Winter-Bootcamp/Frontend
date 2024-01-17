import React, { ReactNode, useEffect, useRef } from "react";
//import Timer from "./Timer";

interface CameraProps {
  children: ReactNode;
  elapsedTime?: number;
}

const Camera = ({ children, elapsedTime }: CameraProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let currentVideoRef = videoRef.current; // 현재 videoRef 값을 변수에 복사

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (currentVideoRef) {
          currentVideoRef.srcObject = stream; // 변수를 사용하여 접근
        }
      })
      .catch((error) => {
        console.error("Error accessing webcam:", error);
      });

    return () => {
      const stream = currentVideoRef?.srcObject as MediaStream;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
    };
  }, [videoRef]); // videoRef를 의존성 배열에 추가

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <video
        ref={videoRef}
        width="2000px"
        height="500px"
        autoPlay
        style={{ marginLeft: "5px" }}
      />
      {/* <Timer elapsedTime={elapsedTime} /> */}
      {children}
    </div>
  );
};

export default Camera;