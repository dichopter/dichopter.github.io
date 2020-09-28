import React from "react";
import styled from "styled-components";
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
  shapes: [{
      name: "butterfly",

  }]
};


const ListoHolder = styled.li`
    background: red;
    &:first-child {
        border-radius: 20px;
    }
    `;

const RDSPairs = () => {
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
      <h3>Background</h3>
      <ul className="row">
        {shapes.backgrounds.map((background) => {
          return (
            <ListoHolder className="col s10 m4 lg4">
              <img style={{"width":"100%"}} src={require('./RDSImages/backgrounds/' + background.path)} alt={background.name} />
            </ListoHolder>
          );
        })}

        <li></li>
      </ul>
    </div>
  );
};

RDSPairs.propTypes = {};

export default RDSPairs;
