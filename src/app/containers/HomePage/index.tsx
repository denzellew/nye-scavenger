import { Layout, Typography } from 'antd';
import ScavengerQuestion from 'app/components/ScavengerQuestion';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

const { Header, Content } = Layout;
const { Title } = Typography;
export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Layout>
        <Header>
          <Title style={{ color: '#FFF' }}>Scavenger Hunt</Title>
        </Header>
        <Content>
          <ScavengerQuestion />
        </Content>
      </Layout>
    </>
  );
}
