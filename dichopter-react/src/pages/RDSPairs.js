import React, { useState } from "react";
import styled from "styled-components";
import RDSPairRenderer from "./RDSImages/RDSPairRenderer";

const shapes = {
  backgrounds: [
    {
      name: "Aqua",
      path: "AquaBackground.png",
    },
    {
      name: "Azul",
      path: "AzulBackground.png",
    },
    {
      name: "Bark",
      path: "BarkBackground.png",
    },
    {
      name: "Evergreen",
      path: "EvergreenBackground.png",
    },
    {
      name: "Marble",
      path: "MarbleBackground.png",
    },
  ],
  shapes: [
    {
      name: "LITE",
    },
    {
      name: "Butterfly",
    },
    {
      name: "Bird",
    },
    {
      name: "Clover",
    },

    {
      name: "Puzzle",
    },
    {
      name: "Rabbit",
    },
  ],
};

const ListoHolder = styled.li`
  p {
    border-radius: 20px;
    background: #eee;
    padding: 3px;
  }
  img {
    border-radius: 20px;
  }
  label {
    cursor: pointer;
  }
`;

const RDSPairs = () => {
  const [currentBackground, setCurrentBackground] = useState(0);
  const [currentForeground, setCurrentForeground] = useState(0);

  const backgroundClicked = (e) => {
    setCurrentBackground(parseInt(e.currentTarget.value, 10));
  };

  const foregroundClicked = (e) => {
    setCurrentForeground(parseInt(e.currentTarget.value, 10));
  };

  const currentBackgroundPath = require("./RDSImages/backgrounds/" +
    shapes.backgrounds[currentBackground].path);
  const currentForegroundPath = require("./RDSImages/foregrounds/" +
    shapes.shapes[currentForeground].name +
    shapes.backgrounds[currentBackground].name +
    ".png");

  // const styles = ["Aqua", "Azul", "Bark", "Evergreen", "Marble", "Noise"];
  const [expanded, setExpanded] = useState(false);
  const makeFullscreen = () => {
    setExpanded(true);
  }
  return (
    <div className="container">
      <h1>RDS (Random Dot Stereogram) Pairs</h1>
      <p>
        A Random Dot Stereogram is a special type of 3D image that can only be
        properly viewed and seen in 3D. The images themeselves seems to consist
        of mostly-random dots execpt one (or both!) of them have had some part
        of them cut out and shifted. Because both sides are the same, this
        difference becomes apparent in 3D.
      </p>
      <h2>
        <b>To get started, choose a background and a foreground.</b>
      </h2>

      <form>
        <h3>Background</h3>
        <ul className="row">
          {shapes.backgrounds.map((background, idx) => {
            return (
              <ListoHolder key={background.path} className="col s10 m4 lg4">
                <p>
                  <label>
                    <input
                      name="background"
                      type="radio"
                      value={idx}
                      checked={idx === currentBackground}
                      onChange={backgroundClicked}
                    />
                    <span className="black-text">{background.name}</span>
                    <img
                      style={{ width: "100%" }}
                      src={require("./RDSImages/backgrounds/" +
                        background.path)}
                      alt={background.name}
                    />
                  </label>
                </p>
              </ListoHolder>
            );
          })}
        </ul>
        <h3>Foreground</h3>
        <ul className="row">
          {shapes.shapes.map((shape, idx) => {
            return (
              <ListoHolder key={shape.name} className="col s10 m4 lg4">
                <p>
                  <label>
                    <input
                      name="foreground"
                      type="radio"
                      value={idx}
                      checked={idx === currentForeground}
                      onChange={foregroundClicked}
                    />
                    <span className="black-text">{shape.name}</span>
                    <img
                      style={{ width: "100%" }}
                      src={require("./RDSImages/foregrounds/" +
                        shape.name +
                        shapes.backgrounds[currentBackground].name +
                        ".png")}
                      alt={shape.name}
                    />
                  </label>
                </p>
              </ListoHolder>
            );
          })}
        </ul>
      </form>
      <h3>Result</h3>
      <div className="right-align" style={{marginBottom: '20px'}}>
        <button className="btn" href="" onClick={makeFullscreen}>
          <i className="material-icons right">zoom_out_map</i>Make Fullscreen
        </button>
      </div>
      <RDSPairRenderer
        background={currentBackgroundPath}
        foreground={currentForegroundPath}
        expanded={expanded}
        setExpanded={setExpanded}
      />
      <br />
      <br />
      <br />
    </div>
  );
};

RDSPairs.propTypes = {};

export default RDSPairs;
