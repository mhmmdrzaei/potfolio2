import Layout from '../src/components/layout/layout.component';
import MusicVideo from '../src/components/musicVideo/musicVideo.component';
import Seo from '../src/components/seo/seo.component';
import { getSiteData } from '../lib/siteData';

export default function Videos({ data }) {
  return (
    <Layout emailAddress={data.email_address} contact={data.contact}>
      <Seo
        seo={data.seo}
        pageTitle={`Music Videos | ${data.seo?.siteName || 'Mohammad Rezaei'}`}
        path="/videos"
      />
      <div className="musicVideoInfo">
        <h2>Music Videos</h2>
        <img src="/sources/videos.svg" alt="videos line" />

        <div className="musicVideoText">
          <p>
            Here is a selection of music videos I&rsquo;ve made. This started as a hobby, but has
            turned into a side project I&apos;m really proud of.
          </p>
        </div>
      </div>

      <div className="musicVideoContainer">
        {data.music_videos.map((video) => (
          <MusicVideo key={video.id || video._id} data={video} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await getSiteData();

  return {
    props: {
      data
    },
    revalidate: 1
  };
}
