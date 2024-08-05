/* eslint-disable react/prop-types */
import darazLogo from "../assets/darazz.png";

const Brands = () => {
  return (
    <div className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-xl font-semibold leading-8 text-gray-900">
          Fakespot provides secure shopping on:
        </h2>
        <div className="flex justify-center mx-auto max-w-lg items-center sm:max-w-xl lg:mx-0 lg:max-w-none ">
          <img
            className="object-contain"
            src={darazLogo}
            alt="Daraz"
            width={158}
          />
        </div>
      </div>
    </div>
  );
};

export default Brands;
