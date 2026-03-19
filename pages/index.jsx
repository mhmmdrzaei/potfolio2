import About from '../src/components/about/about.component';
import Footer from '../src/components/footer/footer.component';
import HeaderInfo from '../src/components/headerInfo/headerInfo.component';
import MoreInfo from '../src/components/moreInfo/moreInfo.component';
import Seo from '../src/components/seo/seo.component';
import SingleProject from '../src/components/singleProject/singleProject.component';
import WorksHeader from '../src/components/worksHeader/worksHeader.component';
import useProjectBackground from '../src/hooks/useProjectBackground';
import { getSiteData } from '../lib/siteData';

export default function Home({ data }) {
  useProjectBackground();

  return (
    <>
      <Seo seo={data.seo} path="/" />
      <main>
        <HeaderInfo siteHeader={data.site_header} />
        <About about={data.about_text} />
        <WorksHeader works={data.works_header} />
        {data.portfolio.filter((_, idx) => idx < 6).map((single) => (
          <SingleProject key={single.id || single._id} data={single} />
        ))}
      </main>
      <MoreInfo />
      <Footer emailAddress={data.email_address} contact={data.contact} />
    </>
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
