import Layout from "../layouts/main";
import ContentBlock from "../components/contentBlock";
import Heading1 from "../components/h1";
import Paragraph from "../components/p";

const Page = () => (
  <Layout title="Page non-trouvée">
    <ContentBlock>
      <Heading1>Ooops!</Heading1>
      <Paragraph>La page que vous recherchez n’existe pas ou plus.</Paragraph>
    </ContentBlock>
  </Layout>
);

export default Page;