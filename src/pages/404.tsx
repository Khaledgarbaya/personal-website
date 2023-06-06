import { Layout } from "@/components/Layout";
import Image from "next/image";

import Link from "next/link";

export default function Custom404() {
  return (
    <Layout navLinks={[]}>
      <section className="bg-gray-50">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <Image
              className="w-full h-auto mx-auto"
              src="/logo.svg"
              alt="logo"
              width={255}
              height={255}
            />
            <h1 className="my-4 text-teal-600 text-2xl tracking-tight font-extrabold text-primary-600 dark:text-primary-500">
              404 Not Found
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
              Something's missing.
            </p>
            <p className="mb-4 text-lg font-light">
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.{" "}
            </p>
            <Link href="/" className="inline-flex">
              Back to Homepage
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
