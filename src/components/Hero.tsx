import { registerUniformComponent } from "@uniformdev/canvas-react";

type HeroPropType = {
  titleA: string;
  titleB?: string;
  highlightedText?: string;
  subtext: string;
};
export function Hero({
  titleA,
  highlightedText,
  titleB,
  subtext,
}: HeroPropType) {
  return (
    <div className="overflow-y-hidden bg-gray-100 pb-12 lg:min-h-[700px]">
      <>
        <div className="bg-gray-100">
          <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
            <div className="mb-5 w-11/12 flex-col items-center justify-center sm:mb-10  sm:w-2/3 lg:flex">
              <h1 className="text-center text-2xl font-black leading-7 text-gray-800 sm:text-3xl md:text-4xl md:leading-10 lg:text-5xl xl:text-6xl">
                {titleA}
                <span className="text-[#082491]"> {highlightedText} </span>
                {titleB}
              </h1>
              <p className="mt-5 text-center text-sm font-normal text-gray-400 sm:mt-10 sm:text-lg lg:w-10/12">
                {subtext}
              </p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
registerUniformComponent({ type: "hero", component: Hero });
