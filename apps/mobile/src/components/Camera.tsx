import React from "react";
import styled from "styled-components";
import { colors, radius } from "@chas/ui";

interface CameraProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  cameraStarted: boolean;
}

const Camera: React.FC<CameraProps> = ({
  videoRef,
  canvasRef,
  cameraStarted,
}) => {
  return (
    <CameraContainer>
      <VideoContainer>
        <StyledVideo ref={videoRef} autoPlay playsInline muted />
        {!cameraStarted && <BlankScreen />}
        <CornerTopLeft />
        <CornerTopRight />
        <CornerBottomLeft />
        <CornerBottomRight />
      </VideoContainer>

      <StyledCanvas ref={canvasRef} />
    </CameraContainer>
  );
};

export default Camera;

const GAP = 20; // 20px gap around video
const BORDER_SIZE = 92; // Border width and height
const BORDER_THICKNESS = 3; // Border thickness
const BORDER_RADIUS = radius.lines; // Rounded corner radius

const CameraContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const VideoContainer = styled.div`
  width: 333px;
  height: 333px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BlankScreen = styled.div`
  position: absolute;
  top: ${GAP}px;
  left: ${GAP}px;
  width: ${333 - GAP * 2}px;
  height: ${333 - GAP * 2}px;

  background: linear-gradient(180deg, ${colors.cardText}, ${colors.pauseHover});
  z-index: 1;
`;

const CornerTopLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${BORDER_SIZE}px;
  height: ${BORDER_SIZE}px;
  border-left: ${BORDER_THICKNESS}px solid ${colors.secondary};
  border-top: ${BORDER_THICKNESS}px solid ${colors.secondary};
  border-top-left-radius: ${BORDER_RADIUS};
`;

const CornerTopRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: ${BORDER_SIZE}px;
  height: ${BORDER_SIZE}px;
  border-right: ${BORDER_THICKNESS}px solid ${colors.secondary};
  border-top: ${BORDER_THICKNESS}px solid ${colors.secondary};
  border-top-right-radius: ${BORDER_RADIUS};
`;

const CornerBottomLeft = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${BORDER_SIZE}px;
  height: ${BORDER_SIZE}px;
  border-left: ${BORDER_THICKNESS}px solid ${colors.secondary};
  border-bottom: ${BORDER_THICKNESS}px solid ${colors.secondary};
  border-bottom-left-radius: ${BORDER_RADIUS};
`;

const CornerBottomRight = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: ${BORDER_SIZE}px;
  height: ${BORDER_SIZE}px;
  border-right: ${BORDER_THICKNESS}px solid ${colors.secondary};
  border-bottom: ${BORDER_THICKNESS}px solid ${colors.secondary};
  border-bottom-right-radius: ${BORDER_RADIUS};
`;

const StyledVideo = styled.video`
  width: ${333 - GAP * 2}px; /* 293px */
  height: ${333 - GAP * 2}px; /* 293px */
  object-fit: cover;
`;

const StyledCanvas = styled.canvas`
  width: ${333 - GAP * 2}px; /* 293px to match video */
  height: ${333 - GAP * 2}px; /* 293px to match video */
  display: none;
`;
