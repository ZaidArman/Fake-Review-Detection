import { Link } from "react-router-dom";

const About = () => {
  const team = [
    {
      avatar:
        "https://images.unsplash.com/photo-1579017331263-ef82f0bbc748?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80",
      name: "Daud Arsalan",
      title: "Full Stack Developer",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1623605931891-d5b95ee98459?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=80",
      name: "Danish Ali",
      title: "Backend Developer",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      name: "Hashim Ali",
      title: "Machine Learning Expert",
    },
  ];

  return (
    <section className="mx-auto max-w-screen-xl pb-4 px-4 sm:px-8 py-32 sm:py-40">
      <div className="text-center space-y-4">
        <h1 className="text-gray-800 font-bold text-4xl md:text-5xl">
          Welcome to
          <span className="text-indigo-600"> Shop Smart AI</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
          At Shop Smart AI, we are dedicated to transforming your online
          shopping experience. Our innovative AI-powered tool meticulously
          analyzes product reviews from Daraz, helping you find the most
          reliable products. By identifying and ranking products based on
          authentic reviews, we ensure that you can shop with confidence and
          make informed purchasing decisions. Our mission is to bring
          transparency and trust to the world of e-commerce.
        </p>
      </div>
      <div className="mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
        <Link
          to="/fakereviewanalyzer"
          className="px-10 py-3.5 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center rounded-md shadow-md block sm:w-auto"
        >
          Try it out
        </Link>
      </div>

      <section className="mt-32">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="max-w-xl mx-auto sm:text-center">
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Meet Our Team
            </h3>
            <p className="text-gray-600 mt-3">The Minds Behind Shop Smart AI</p>
          </div>
          <div className="mt-12">
            <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {team.map((item, idx) => (
                <li key={idx}>
                  <div className="w-full h-60 sm:h-52 md:h-56">
                    <img
                      src={item.avatar}
                      className="w-full h-full object-cover object-center shadow-md rounded-xl"
                      alt=""
                    />
                  </div>
                  <div className="mt-4">
                    <h4 className="text-lg text-gray-700 font-semibold">
                      {item.name}
                    </h4>
                    <p className="text-indigo-600">{item.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;
