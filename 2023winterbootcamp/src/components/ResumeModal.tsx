import React from "react";
import styled, { keyframes } from "styled-components";

/**
 * Keyframes
 */
const cubeAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateZ(100px);
  }
  40%, 60% {
    opacity: 1;
    transform: translateZ(10px);
  }
  100% {
    opacity: 0;
    transform: translateZ(-100px);
  }
`;

const cubesAnimation = keyframes`
  // ... Define cubes animation keyframes
`;

/**
 * Styled Components
 */
const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 160px;
  height: 160px;
  margin-top: -80px;
  margin-left: -80px;
  perspective: 1000px;
  transform-style: preserve-3d;
`;

const CubesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateX(60deg) rotateZ(-135deg);
  animation: ${cubesAnimation} 8s cubic-bezier(0, 0, 1, 1) infinite;
`;

const Cube = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  opacity: 0;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  animation: ${cubeAnimation} 2s cubic-bezier(0.64, 0.21, 0.42, 0.85) infinite;
`;

const Side = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  backface-visibility: hidden;
`;

/**
 * ResumeModal Component
 */
const ResumeModal: React.FC = () => {
  return (
    <LoaderContainer>
      <CubesContainer>
        {/* Render 64 cubes */}
        {Array.from({ length: 64 }, (_, index) => (
          <Cube key={index}>
            {/* Render cube sides */}
            {Array.from({ length: 6 }, (_, sideIndex) => (
              <Side key={sideIndex}>{/* Apply styles for each side */}</Side>
            ))}
          </Cube>
        ))}
      </CubesContainer>
    </LoaderContainer>
  );
};

export default ResumeModal;
