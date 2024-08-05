import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "AI-Powered Review Analysis",
    description:
      "Our advanced AI technology accurately identifies and filters out fake reviews, ensuring you only see genuine feedback.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Top Product Scraping",
    description:
      "We scrape the top 10 products from Daraz based on your keyword, providing a comprehensive analysis of their reviews.",
    icon: ArrowPathIcon,
  },
  {
    name: "Rankings Based on Authenticity",
    description:
      "Products are ranked by the highest percentage of real reviews, helping you make the best purchasing decisions.",
    icon: FingerPrintIcon,
  },
  {
    name: "Easy-to-Use Interface",
    description:
      "Our user-friendly platform makes it simple to input keywords and get detailed, reliable results.",
    icon: SparklesIcon,
  },
];

const Features = () => {
  return (
    <div className="bg-white py-5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Discover How We Enhance Your Shopping Confidence
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
