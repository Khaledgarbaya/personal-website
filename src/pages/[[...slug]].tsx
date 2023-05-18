import { withUniformGetServerSideProps } from "@uniformdev/canvas-next/slug";

import { Layout } from "@/components/Layout";
import Head from "next/head";
import { UniformComposition, UniformSlot } from "@uniformdev/canvas-react";
import { RootComponentInstance } from "@uniformdev/canvas";
import { getCompositionsForNavigation } from "@/lib/uniform/canvasClient";

export const getServerSideProps = withUniformGetServerSideProps({
  callback: async (context) => {
    const { preview = false } = context || {};
    const navLinks = await getCompositionsForNavigation(preview);
    return {
      props: { navLinks, preview },
    };
  },
});

export default function Home(props: {
  data: RootComponentInstance;
  navLinks: { title: string; url: string }[];
}) {
  console.log(props.navLinks);
  return (
    <>
      <Head>
        <title>Khaled Garbaya | Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout navLinks={props.navLinks}>
        {/* Renders the components of your Uniform Composition resolved by getServerSideProps */}
        <UniformComposition data={props.data}>
          <UniformSlot name="content" />
        </UniformComposition>
      </Layout>
    </>
  );
}
