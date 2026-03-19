import { useEffect } from 'react';
import { DEFAULT_PROJECT_BACKGROUND } from '../../lib/projects';

export default function useProjectBackground() {
  useEffect(() => {
    let frameId = 0;

    const updateBackground = () => {
      frameId = 0;

      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      const projectNodes = [...document.querySelectorAll('.singleProjectContainer[data-project-background]')];

      let activeColor = DEFAULT_PROJECT_BACKGROUND;
      let closestDistance = Number.POSITIVE_INFINITY;

      projectNodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const intersectsViewport = rect.bottom > 0 && rect.top < viewportHeight;

        if (!intersectsViewport) {
          return;
        }

        const projectCenter = rect.top + (rect.height / 2);
        const distanceToCenter = Math.abs(projectCenter - viewportCenter);

        if (distanceToCenter < closestDistance) {
          closestDistance = distanceToCenter;
          activeColor = node.dataset.projectBackground || DEFAULT_PROJECT_BACKGROUND;
        }
      });

      document.body.style.backgroundColor = activeColor;
    };

    const requestUpdate = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateBackground);
      }
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      document.body.style.backgroundColor = DEFAULT_PROJECT_BACKGROUND;
    };
  }, []);
}
