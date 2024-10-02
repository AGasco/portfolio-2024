import { quotes, skills } from '@/data';
import { useEffect, useState } from 'react';
import './LoadingScreen.scss';

const preloadImage = (src: string) => {
  return fetch(src)
    .then((res) => {
      if (!res.ok) throw new Error('Failed to load image: ' + src);
      return res.blob();
    })
    .catch((err) => console.error(err));
};

const LoadingScreen = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const assetsToLoad: Promise<void | Blob>[] = [];

    const quoteImageUrls = quotes.map((quote) => quote.image);
    quoteImageUrls.forEach((url) => assetsToLoad.push(preloadImage(url)));

    const techLogoUrls = skills.map((skill) => skill.logo);
    techLogoUrls.forEach((url) => assetsToLoad.push(preloadImage(url)));

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
