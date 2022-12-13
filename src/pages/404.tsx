import Layout from '../layouts/main';
import ContentBlock from '../components/contentBlock';
import Heading1 from '../components/h1';
import Paragraph from '../components/p';
import ExportedImage from 'next-image-export-optimizer';

const Page = () => (
  <Layout title="Page non-trouvée">
    <ContentBlock>
      <Heading1>Ooops!</Heading1>
      <p>
        <ExportedImage
          src={'/images/404.png'}
          alt={`404.png`}
          width={96}
          height={304}
        />
        <Paragraph>La page que vous recherchez n’existe pas ou plus.</Paragraph>
      </p>
    </ContentBlock>
    <style jsx>{`
      :global(img) {
        border-radius: 15px;
      }
      p {
        text-align: center;
        line-height: 100px;
      }
    `}</style>
  </Layout>
);

export default Page;
