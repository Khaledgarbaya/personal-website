import type { LoaderFunctionArgs } from "@remix-run/node";
import path from "path";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  console.log();
  const jsonData = {
    workspace: {
      root: path.resolve(),
      uuid: "2f1daf32-146c-45a3-bb8f-0f25ffd87fd9",
    },
  };
  return Response.json(jsonData);
};
