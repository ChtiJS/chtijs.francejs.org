import ContentBlock from '../components/contentBlock';
import Heading1 from '../components/h1';
import Paragraph from '../components/p';
import styles from './not-found.module.scss';
import buildMetadata from '../utils/metadata';

export async function generateMetadata() {
  return buildMetadata({
    pathname: '/404',
    title: 'Page non-trouvée',
    description: 'La page que vous recherchez semble inexistante.',
  });
}

const Page = () => (
  <ContentBlock>
    <Heading1>Ooops!</Heading1>
    <p className={styles.p}>
      <img className={styles.img} src={'/images/404.png'} alt={`404.png`} />
      <Paragraph>La page que vous recherchez n’existe pas ou plus.</Paragraph>
    </p>
  </ContentBlock>
);

export default Page;
