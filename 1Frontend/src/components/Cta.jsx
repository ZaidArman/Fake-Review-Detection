import { Link } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
const Cta = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="flex flex-col justify-center items-center mx-auto max-w-full text-center lg:mx-0 lg:flex-auto lg:pt-24 lg:pb-10 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Discover Genuine Products Today.
              <br />
              Take Control of Your Online Shopping.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Don't let fake reviews mislead you. Use our AI-powered tool to
              find the best products with real reviews.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Link
                to="/fakereviewanalyzer"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-indigo-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Try Fake Review Analyzer For Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
