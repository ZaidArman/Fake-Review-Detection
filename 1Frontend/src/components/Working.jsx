import { StarIcon } from "@heroicons/react/20/solid";

const features = [
  {
    name: "Enter a Product Keyword.",
    description:
      "Type in the keyword for the product you’re interested in. Our system takes it from there.",
    icon: StarIcon,
  },
  {
    name: "Scrape Top Products.",
    description:
      "Our AI scrapes the top 10 products from Daraz based on your keyword input, gathering essential data for analysis.",
    icon: StarIcon,
  },
  {
    name: "Analyze Reviews.",
    description:
      "Using advanced algorithms, we evaluate each product's reviews to identify genuine feedback accurately.",
    icon: StarIcon,
  },
  {
    name: "Rank Products.",
    description:
      "Products are ranked based on the highest percentage of real reviews, ensuring you get the most reliable recommendations.",
    icon: StarIcon,
  },
];

const Working = () => {
  return (
    <div className="overflow-hidden bg-white ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                How it works
              </h2>

              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src="https://img.freepik.com/free-vector/online-shop-managers-asking-clients-feedback-screen-rate-people-with-megaphone-cartoon-illustration_74855-14468.jpg?w=996&t=st=1719166006~exp=1719166606~hmac=61148388c9679ae8f1988899b198a213a56ded1dfe0d8b32ef93f9786c9bd46f"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  );
};

export default Working;
