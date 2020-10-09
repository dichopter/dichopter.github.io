import React, { useState, useRef, useEffect } from "react";
import { animated, interpolate, useSpring } from "react-spring";
import { useGesture } from "react-use-gesture";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

Math.bound = function (x, min, max) {
  return Math.max(Math.min(x, max), min);
};

const SVG = animated(styled.svg`
  cursor: pointer;

  ${(props) =>
    props.expanded &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
    `};
`);

const Background = styled.div`
${(props) =>
  props.expanded &&
  css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: black;
  `};
`;

const ExitButton = styled.button`
display: none;
${(props) =>
  props.expanded &&
  css`
    position: fixed;
    top: 0;
    right: 0;
    display: block;
  `};

`;
const DEFAULT_POSITION = {
  x: 75,
  y: 125,
};

const RDSPairRenderer = ({ background, foreground, expanded, setExpanded }) => {
  const ExitFullscreen = () => {
    setExpanded(false);
  };
  const SVGScale = {
    width: 1000,
    height: 400,
  };
  const [imageScale, setImageScale] = useState({
    // we start these off with dummy values and depend on the hook below
    // to properly update them
    width: 1,
    height: 1,
  });
  useEffect(() => {
    // create img object to calculate its real dimensions
    // on change of the foreground link, update it
    const img = document.createElement("img");
    img.src = foreground;
    img.decode().then(() => {
      setImageScale({ width: img.naturalWidth, height: img.naturalHeight });
    });
  }, [foreground]);
  const SVGContainer = useRef(null);

  const imageBounds = {
    left: -DEFAULT_POSITION.x,
    right: SVGScale.width / 2 - DEFAULT_POSITION.x - imageScale.width,
    top: -DEFAULT_POSITION.y,
    bottom: SVGScale.height - DEFAULT_POSITION.y - imageScale.height,
  };

  const [leftImagePosition, setLeftImagePosition] = useSpring(() => ({
    x: 0,
    y: 0,
  }));

  const bindLeft = useGesture(
    {
      onDrag: ({ offset }) =>
        setLeftImagePosition({ x: offset[0], y: offset[1] }),
    },
    {
      drag: {
        bounds: imageBounds,
      },
    }
  );

  const [rightImagePosition, setRightImagePosition] = useSpring(() => ({
    x: -10,
    y: 0,
  }));

  const bindRight = useGesture(
    {
      onDrag: ({ offset }) =>
        setRightImagePosition({ x: offset[0], y: offset[1] }),
    },
    {
      drag: {
        bounds: imageBounds,
      },
    }
  );

  return (
    <div>
      <Background expanded={expanded}/>
      <SVG
        viewBox={`0 0 ${SVGScale.width} ${SVGScale.height}`}
        ref={SVGContainer}
        expanded={expanded}
      >
        <image x="0" y="0" width="500" height="400" href={background} />
        <image x="500" y="0" width="500" height="400" href={background} />

        <g
          transform={`translate(${DEFAULT_POSITION.x}, ${DEFAULT_POSITION.y})`}
        >
          <animated.image
            x="0"
            y="0"
            width={imageScale.width}
            height={imageScale.height}
            href={foreground}
            style={{
              transform: interpolate(
                [leftImagePosition.x, leftImagePosition.y],
                (mx, my) => `translate(${mx}px, ${my}px)`
              ),
            }}
          />
        </g>
        <rect
          x="0"
          y="0"
          width={SVGScale.width / 2}
          height={SVGScale.height}
          fill="red"
          opacity="0.001"
          {...bindLeft()}
        />

        <g
          transform={`translate(${SVGScale.width / 2 + DEFAULT_POSITION.x}, ${
            DEFAULT_POSITION.y
          })`}
        >
          <animated.image
            x="0"
            y="0"
            width={imageScale.width}
            height={imageScale.height}
            href={foreground}
            style={{
              transform: interpolate(
                [rightImagePosition.x, rightImagePosition.y],
                (mx, my) => `translate(${mx}px, ${my}px)`
              ),
            }}
          />
        </g>
        <rect
          x={SVGScale.width / 2}
          y="0"
          width={SVGScale.width / 2}
          height={SVGScale.height}
          fill="red"
          opacity="0.001"
          {...bindRight()}
        />

        <line x1={SVGScale.width /2} y1="0" x2={SVGScale.width /2} y2={SVGScale.height} stroke="white" strokeWidth="2"/>
      </SVG>
      <ExitButton expanded={expanded} className="btn" onClick={ExitFullscreen}>Exit Fullscreen</ExitButton>
    </div>
  );
};

RDSPairRenderer.propTypes = {
  background: PropTypes.string,
  foreground: PropTypes.string,
};


export default RDSPairRenderer;
