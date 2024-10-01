import { quotes } from '@/data';
import { useEffect, useState } from 'react';
import './LoadingScreen.scss';

const videoUrls: string[] = [
  '/videos/rotating-shape-black-60mb.mp4'
  // '/videos/rotating-shape-white.mp4'
];

const preloadImages = (src: string) => {
  return fetch(src)
    .then((res) => {
      if (!res.ok) throw new Error('Failed to load image: ' + src);
      return res.blob();
    })
    .catch((err) => console.error(err));
};

const preloadVideo = (src: string) => {
  return fetch(src)
    .then((res) => {
      if (!res.ok) throw new Error('Failed to load video: ' + src);
      return res.blob(); // Fetched and cached
    })
    .catch((err) => console.error(err));
};

const LoadingScreen = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const assetsToLoad: Promise<void | Blob>[] = [];

    const imageUrls = quotes.map((quote) => quote.image);
    imageUrls.forEach((url) => assetsToLoad.push(preloadImages(url)));

    videoUrls.forEach((url) => {
      assetsToLoad.push(preloadVideo(url));
    });

    Promise.all(assetsToLoad)
      .then(() => setLoading(false))
      .catch((err) => {
        console.error('Error loading assets: ' + err);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading content, please wait...</p>
      </div>
    );
  }

  return null;
};

export default LoadingScreen;
