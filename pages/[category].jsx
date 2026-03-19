import Layout from '../src/components/layout/layout.component';
import Seo from '../src/components/seo/seo.component';
import SingleProject from '../src/components/singleProject/singleProject.component';
import WorksHeader from '../src/components/worksHeader/worksHeader.component';
import useProjectBackground from '../src/hooks/useProjectBackground';
import {
  filterProjectsByCategory,
  getAllProjectCategorySlugs,
  getCategoryLabel
} from '../lib/projects';
import { getSiteData } from '../lib/siteData';

export default function CategoryPage({ data, category, categoryLabel }) {
  useProjectBackground();

  return (
    <Layout emailAddress={data.email_address} contact={data.contact}>
      <Seo
        seo={data.seo}
        pageTitle={`${categoryLabel} | ${data.seo?.siteName || 'Mohammad Rezaei'}`}
        path={`/${category}`}
      />
      <div className="spacer" />
      {/* <WorksHeader works={`Filtered by ${categoryLabel}.`} /> */}
      <div className="categoryPageTitle">
        <h3>{categoryLabel}</h3>
      </div>
      {data.portfolio.map((single) => (
        <SingleProject key={single.id || single._id} data={single} />
      ))}
    </Layout>
  );
}

export async function getStaticPaths() {
  const data = await getSiteData();
  const categories = getAllProjectCategorySlugs(data.portfolio);

  return {
    paths: categories.map((category) => ({ params: { category } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const data = await getSiteData();
  const category = params?.category || '';
  const filteredProjects = filterProjectsByCategory(data.portfolio, category);

  if (!filteredProjects.length) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      category,
      categoryLabel: getCategoryLabel(data.portfolio, category),
      data: {
        ...data,
        portfolio: filteredProjects
      }
    },
    revalidate: 1
  };
}
