import React, { useState, useEffect } from 'react';
import './PhotoGrid.css';

const PhotoGrid = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPhotos = async () => {
    try {
        const newPhotos = await Promise.all(
          Array.from({ length: 9 }).map(() =>
            fetch('https://picsum.photos/200').then((res) => res.url)
          )
        );
        setPhotos(newPhotos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

  useEffect(() => {
    fetchPhotos(); // Initial fetch
    const interval = setInterval(fetchPhotos, 10000); // Update every 10 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className='photo-grid'>
      {loading ? (
        <div className='loader'>Loading Grid Photos...</div> // Display loader while loading
      ) : (
        photos.map((photo, index) => (
          <img key={index} src={photo} alt={`Random ${index}`} className='photo-item' />
        ))
      )}
    </div>
  );
};

export default PhotoGrid;
