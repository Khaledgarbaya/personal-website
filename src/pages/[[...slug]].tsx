import { withUniformGetServerSideProps } from "@uniformdev/canvas-next/slug";

import { Layout } from "@/components/Layout";
import Head from "next/head";
import { UniformComposition, UniformSlot } from "@uniformdev/canvas-react";
import { RootComponentInstance } from "@uniformdev/canvas";
import { getCompositionsForNavigation } from "@/lib/uniform/canvasClient";

export const getServerSideProps = withUniformGetServerSideProps({
  modifySlug: (slug) => {
    return slug;
  },
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
  const title = (props.data.parameters?.title?.value as string) || "Home";
  const description =
    (props.data.parameters?.description?.value as string) ||
    "Khaled Garbaya's Website";
  return (
    <>
      <Head>
        <title>Khaled Garbaya | {title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout navLinks={props.navLinks}>
        <UniformComposition data={props.data}>
          <UniformSlot name="content" />
        </UniformComposition>
      </Layout>
    </>
  );
}
