import React, { useEffect, useState } from 'react';
import api from '../../api'; // assuming this is axios
import './gallery.scss';

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const frameTypes = ['square', 'rect-tall', 'rect-wide'];

  useEffect(() => {
    api.get('/get_gallery.php')
      .then((response) => {
        const fetchedPhotos = response.data.map(photo => ({
          ...photo,
          src: `http://localhost/the_coche-events/${photo.filename}`,
        }));
        setPhotos(fetchedPhotos);
      })
      .catch((error) => {
        console.error('Failed to load gallery:', error);
      });
  }, []);

  return (
    <div className="gallery-container">
      <p className='headings'>Get <span>inspired</span>.<br />Imagine yours.</p>
      <div className="gallery-columns">
        {photos.map((photo, index) => {
          const randomType = frameTypes[Math.floor(Math.random() * frameTypes.length)];
          return (
            <div key={photo.id || index} className={`picture-frame ${randomType}`}>
              <div className="image-wrapper">
                <img src={photo.src} alt={photo.caption || 'Gallery Image'} />
              </div>
              {photo.caption && <p className="caption">{photo.caption}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Gallery;