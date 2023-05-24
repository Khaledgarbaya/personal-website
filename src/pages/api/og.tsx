/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};
const image = fetch(new URL("./logo.png", import.meta.url)).then((res) =>
  res.arrayBuffer()
);
// Make sure the font exists in the specified path:
const font = fetch(
  new URL("../../../assets/LibreBaskerville-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
export default async function handler(request: NextRequest) {
  const imageData = await image;
  const fontData = await font;

  try {
    const { searchParams } = new URL(request.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Khaled Garbaya";
    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full items-center justify-center bg-white  pl-6 pr-12 bg-gray-100">
          <div tw="flex w-full items-center">
            <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8 items-center">
              <div tw="mt-8 flex flex-col items-center md:mt-0 w-1/3">
                <img
                  width="256"
                  alt="Khaled Garbaya"
                  /* 
                // @ts-ignore */
                  src={imageData}
                  style={{
                    borderRadius: 128,
                  }}
                />
                <span tw="text-xl text-gray-900 mt-5">khaledgarbaya.net</span>
              </div>
              <h2 tw="flex flex-col text-3xl font-bold tracking-tight text-gray-900 text-left w-2/3">
                <span>{title}</span>
                <span tw="text-xl text-gray-500 mt-5">By Khaled Garbaya</span>
              </h2>
            </div>
          </div>
          <div tw="flex w-full mt-6 justify-between"></div>
        </div>
      ),
      {
        width: 1200,
        height: 600,
        fonts: [
          {
            name: "Libre Baskerville",
            data: fontData,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
