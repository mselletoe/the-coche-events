import React from 'react';
import './gallery.scss';


function Gallery() {
  const frameTypes = ['square', 'rect-tall', 'rect-wide'];
  const frames = new Array(20).fill(null);


  return (
    <div className="gallery-page">
      <h2>Gallery</h2>
      <div className="gallery-columns">
        {frames.map((_, index) => {
          const randomType = frameTypes[Math.floor(Math.random() * frameTypes.length)];
          return (
            <div key={index} className={`picture-frame ${randomType}`}>
              <div className="empty-frame"></div>
              <p className="caption">Caption of the Picture</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}


export default Gallery;