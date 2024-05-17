import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="h-screen bg-gray-900 ">
      <div className="flex items-center h-full max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
        <div className="max-w-screen-sm mx-auto text-center">
          <h1 className="mb-4 font-extrabold tracking-tight text-7xl lg:text-9xl text-primary-600 text-primary-500">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-400">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{" "}
          </p>
          <Link
            to="/"
            className="inline-flex text-white bg-indigo-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-primary-900 my-4"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
