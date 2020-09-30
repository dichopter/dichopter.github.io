import React from 'react'
import PropTypes from 'prop-types'

const RDSPairRenderer = ({background, foreground}) => {
    console.log(foreground);
    const updateCoords = (e) => {
        console.log(e.clientX);
    }

    return (
        <div>
            <svg viewBox="0 0 500 400" onMouseMove={updateCoords}>
                {/* <rect x="0" y="0" width="400" height="200" fill="blue"></rect> */}
                {/* <text x="50" y="50" fill="white">{background}</text> */}
                <image x="0" y="0" width="500" height="400" href={background} />
                <image x="50" y="100" width="172" height="212" href={foreground} />
                <image x="300" y="100" width="172" height="212" href={foreground} />
            </svg>
            {/* <img src={background} alt="poop"/> */}
        </div>
    )
}

RDSPairRenderer.propTypes = {
    background: PropTypes.string,
    foreground: PropTypes.string
}

export default RDSPairRenderer
