import Layout from "../layouts/main";
import ContentBlock from "../components/contentBlock";
import Heading1 from "../components/h1";
import Paragraph from "../components/p";

const Page = () => (
  <Layout title="Page non-trouvée">
    <ContentBlock>
      <Heading1>Ooops!</Heading1>
      <p><img src={'/images/404.png'} alt={`404.png`} />
        <Paragraph>La page que vous recherchez n’existe pas ou plus.</Paragraph></p>

    </ContentBlock>
    <style jsx>{`
        img {
          height: 19rem;
          width: 6rem;
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