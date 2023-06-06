import {
  withUniformGetStaticPaths,
  unstable_withUniformGetStaticProps,
} from "@uniformdev/canvas-next/route";
import { useRouter } from "next/router";

import { Layout } from "@/components/Layout";
import Head from "next/head";
import { UniformComposition, UniformSlot } from "@uniformdev/canvas-react";
import { RootComponentInstance } from "@uniformdev/canvas";
import { getCompositionsForNavigation } from "@/lib/uniform/canvasClient";
import getConfig from "next/config";
const {
  serverRuntimeConfig: { projectMapId },
} = getConfig();
export const getStaticProps = unstable_withUniformGetStaticProps({
  silent: process.env.NODE_ENV === "production",
  modifyPath(path, context) {
    const { preview = false } = context || {};
    let slug = context?.params?.slug ?? "/";
    if (Array.isArray(slug)) {
      slug = `/${slug.join("/")}`;
    }
    return preview ? `/api/${projectMapId}${path}` : `${slug}`;
  },
  handleComposition: async (routeResponse, context) => {
    const { preview = false } = context || {};
    console.log("routeResponse", routeResponse.compositionApiResponse);
    if (
      routeResponse.compositionApiResponse.errors?.some(
        (e) => e.type === "data"
      ) ||
      routeResponse.compositionApiResponse.warnings?.some(
        (e) => e.type === "binding"
      )
    ) {
      return {
        notFound: true,
      };
    }
    const navLinks = await getCompositionsForNavigation(preview);
    return {
      props: {
        navLinks,
        preview,
        data: routeResponse.compositionApiResponse.composition,
      },
    };
  },
});
export const getStaticPaths = withUniformGetStaticPaths();

export default function Main(props: {
  data: RootComponentInstance;
  navLinks: { title: string; url: string }[];
}) {
  const title = (props.data?.parameters?.title?.value as string) ?? "Home";
  const description =
    (props.data?.parameters?.description?.value as string) ??
    "Khaled Garbaya's Website";
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{`Khaled Garbaya | ${title}`}</title>

        <meta
          property="twitter:image"
          content={`https://khaledgarbaya.net/api/og?title=${title}`}
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="og:title" content={title}></meta>
        <meta
          property="og:image"
          content={`https://khaledgarbaya.net/api/og?title=${title}`}
        />
        <meta property="og:description" content={description} />
        <meta
          property="og:url"
          content={`https://khaledgarbaya.net${router.asPath}`}
        />

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
