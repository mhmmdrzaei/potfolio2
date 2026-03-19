import { useEffect } from 'react';
import Layout from '../src/components/layout/layout.component';
import Seo from '../src/components/seo/seo.component';
import SingleProject from '../src/components/singleProject/singleProject.component';
import WorksHeader from '../src/components/worksHeader/worksHeader.component';
import useProjectBackground from '../src/hooks/useProjectBackground';
import { getSiteData } from '../lib/siteData';

export default function Works({ data }) {
  useProjectBackground();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      return;
    }

    const target = document.querySelector(hash);
    if (!target) {
      return;
    }

    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  return (
    <Layout emailAddress={data.email_address} contact={data.contact}>
      <Seo seo={data.seo} pageTitle={`Works | ${data.seo?.siteName || 'Mohammad Rezaei'}`} path="/works" />
      <div className="spacer" />
      <WorksHeader works={data.works_header} />
      {data.portfolio.map((single, idx) => (
        <SingleProject
          key={single.id || single._id}
          data={single}
          anchorId={`work-item-${idx + 1}`}
        />
      ))}
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
