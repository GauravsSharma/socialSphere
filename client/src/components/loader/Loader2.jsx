import React from 'react';

const Loader2 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width="200"
      height="200"
      style={{ shapeRendering: 'auto', display: 'block', background: '#260701' }}
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g>
        <path
          stroke="none"
          fill="#ffffff"
          d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 51"
            to="360 50 51"
            dur="1s"
            repeatCount="indefinite"
            keyTimes="0;1"
          />
        </path>
        <g />
      </g>
    </svg>
  );
};

export default Loader2;
