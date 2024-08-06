import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Import the effect

const Image = ({ src, alt }) => (
  <div style={{ height: '70%', width: '100%' }} id='imagediv' > {/* Parent div to control dimensions */}
    <LazyLoadImage
      src={src}
      alt={alt || 'Image'}
      effect="blur"
      wrapperClassName="lazy-load-image-wrapper" // Add class to the wrapper
      style={{ objectFit: 'contain', height: '100%', width: '100%' }} 
    />
  </div>
);

export default Image;

