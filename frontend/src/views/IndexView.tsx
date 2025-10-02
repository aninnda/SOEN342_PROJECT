import { CircularProgress, Link } from "@mui/material";
import { useGetIndexExampleDetailed } from "../queries/exampleQueries";
import clsx from "clsx";

/**
 *
 * TODO: Remove this temporary index page, and route based on login state.
 * @returns A temporary index page.
 */
export default function IndexView() {
  const elaborateQuery = useGetIndexExampleDetailed();

  return (
    <div>
      <h1>Index Page</h1>

      <div>
        <div className="flex gap-2 justify-center">
          Getting a response from the backend:
          <div className={clsx({ "text-red-300": elaborateQuery.isError })}>
            {elaborateQuery.isLoading && <CircularProgress size={"1rem"} />}
            {elaborateQuery.isError && `Error: ${elaborateQuery.error.message}`}
            {elaborateQuery.isSuccess && elaborateQuery.data}
          </div>
        </div>
      </div>
    </div>
  );
}
