import Layout from '../layouts/main';
import ContentBlock from '../components/contentBlock';
import Heading1 from '../components/h1';
import Paragraph from '../components/p';
import styles from './404.module.scss';

const Page = () => (
  <Layout title="Page non-trouvée">
    <ContentBlock>
      <Heading1>Ooops!</Heading1>
      <p className={styles.p} >
        <img className={styles.img} src={'/images/404.png'} alt={`404.png`} />
        <Paragraph>La page que vous recherchez n’existe pas ou plus.</Paragraph>
      </p>
    </ContentBlock>
  </Layout>
);

export default Page;
