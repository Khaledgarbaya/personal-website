import { unstable_withUniformGetServerSideProps } from "@uniformdev/canvas-next/route";

import { Layout } from "@/components/Layout";
import Head from "next/head";
import { UniformComposition, UniformSlot } from "@uniformdev/canvas-react";
import {
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
  CanvasClient,
  RootComponentInstance,
} from "@uniformdev/canvas";
import { getCompositionsForNavigation } from "@/lib/uniform/canvasClient";
// import { ProjectMapClient } from "@uniformdev/project-map";
// import { GetStaticPropsContext } from "next";

export const getServerSideProps = unstable_withUniformGetServerSideProps({
  callback: async (context) => {
    const { preview = false } = context || {};
    const navLinks = await getCompositionsForNavigation(preview);
    console.log("navLinks", navLinks);
    return {
      props: { navLinks, preview },
    };
  },
});
// ===========================================================================
// Low- level implementation of getStaticProps without the canvas-next helpers
// ===========================================================================
// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const canvasClient = new CanvasClient({
//     apiKey: process.env.UNIFORM_API_KEY,
//     apiHost: process.env.UNIFORM_CLI_BASE_URL,
//     projectId: process.env.UNIFORM_PROJECT_ID,
//   });
//   let slug = context?.params?.slug ?? "";
//   if (Array.isArray(slug)) {
//     slug = slug[slug.length - 1];
//   }
//   // const pathString = `/${context?.params?.id ?? ""}`;
//   const { preview = false } = context;
//   const compList = await canvasClient.getCompositionList();
//   console.log("compList", compList.compositions);
//   const { composition } = await canvasClient.getCompositionBySlug({
//     slug: `/${slug}`,
//     state:
//       process.env.NODE_ENV === "development" || preview
//         ? CANVAS_DRAFT_STATE
//         : CANVAS_PUBLISHED_STATE,
//   });

//   const navLinks = await getCompositionsForNavigation(preview);

//   return {
//     props: {
//       navLinks,
//       data: composition,
//       preview: Boolean(preview),
//     },
//   };
// };

// ===========================================================================
// Low- level implementation of getStaticPaths without the canvas-next helpers
// ===========================================================================
// export const getStaticPaths = async () => {
//   const canvasClient = new ProjectMapClient({
//     apiKey: process.env.UNIFORM_API_KEY,
//     apiHost: process.env.UNIFORM_CLI_BASE_URL,
//     projectId: process.env.UNIFORM_PROJECT_ID,
//   });

//   const res = await canvasClient.getNodes({
//     state:
//       process.env.NODE_ENV === "development"
//         ? CANVAS_DRAFT_STATE
//         : CANVAS_PUBLISHED_STATE,
//   });

//   const paths = res.nodes?.map((node) => node.path);

//   return { paths, fallback: true };
// };
export default function Home(props: {
  data: RootComponentInstance;
  navLinks: { title: string; url: string }[];
}) {
  const title = (props.data?.parameters?.title?.value as string) || "Home";
  const description =
    (props.data?.parameters?.description?.value as string) ||
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
