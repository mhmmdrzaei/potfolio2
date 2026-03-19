import { sanityClient, hasSanityConfig } from './sanity.client';
import {
  musicVideosQuery,
  projectsQuery,
  siteSettingsQuery
} from './sanity.queries';

function withIds(items = []) {
  return items.map((item, idx) => ({
    id: item.id ?? idx + 1,
    ...item
  }));
}

export async function getSiteData() {
  if (!hasSanityConfig || !sanityClient) {
    throw new Error(
      'Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.'
    );
  }

  const [settings, portfolio, musicVideos] = await Promise.all([
    sanityClient.fetch(siteSettingsQuery),
    sanityClient.fetch(projectsQuery),
    sanityClient.fetch(musicVideosQuery)
  ]);

  if (!settings) {
    throw new Error('No siteSettings document found in Sanity.');
  }

  return {
    site_header: settings.site_header,
    about_text: settings.about_text,
    works_header: settings.works_header,
    email_address: settings.email_address,
    seo: settings.seo || {},
    contact: withIds(settings.contact || []),
    portfolio: withIds(portfolio || []),
    music_videos: withIds(musicVideos || [])
  };
}
