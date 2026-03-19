import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import config from '../../sanity.config';

const Studio = dynamic(() => import('sanity').then((mod) => mod.Studio), {
  ssr: false
});

export default function StudioPage() {
  useEffect(() => {
    document.body.classList.add('sanity-studio-page');

    return () => {
      document.body.classList.remove('sanity-studio-page');
    };
  }, []);

  return (
    <div className="sanityStudioShell">
      <Studio config={config} />
    </div>
  );
}
