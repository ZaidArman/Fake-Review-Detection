/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect } from "react";
import axios from "axios";

const FakeReviewAnalyzer = () => {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    // Load products from local storage when the component mounts
    useEffect(() => {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    }, []);
  
    // Save products to local storage whenever they are updated
    useEffect(() => {
      if (products.length > 0) {
        localStorage.setItem("products", JSON.stringify(products));
      }
    }, [products]);



  const handleAnalyze = async () => {
    setLoading(true);
    setError("");

    // Create a FormData object
    const formData = new FormData();
    formData.append("keyword", keyword);

    try {
      console.log("Sending keyword:", keyword); // Log the keyword
      const response = await fetch("http://127.0.0.1:8000/analyze/", {
        method: "POST",
        body: formData, // Send the FormData object
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An error occurred while fetching data.");
      }

      const data = await response.json();
      console.log("Response:", data); // Log the response
      setProducts(data.top_ten);

    } catch (err) {
      console.error("Error:", err.message); // Log the error message
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative max-w-screen-xl mx-auto px-4 md:px-8 py-32 sm:py-40">
        <div className="relative z-10 gap-5 items-center">
          <div className="flex-1 flex justify-center items-center flex-col max-w-2xl py-5 sm:mx-auto text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Discover the Best Products on Daraz
            </h2>
            <p className="text-gray-500 leading-relaxed mt-3">
              Find the most reliable products based on authentic reviews. Enter
              the product keyword you're interested in, and our AI-powered
              review analyzer will fetch and rank the top 10 products for you.
            </p>
            <div className="w-full mt-10 border-2">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-3/4 sm:w-4/5 py-2 px-3 sm:py-4 sm:px-5 outline-none"
                placeholder="Enter a product keyword you're interested in"
              />
              <button
                onClick={handleAnalyze}
                className="bg-indigo-600 hover:bg-indigo-700 text-lg sm:text-xl font-semibold text-white w-1/4 sm:w-1/5 py-2 px-2 sm:py-4 sm:px-5"
                disabled={loading}
              >
                Analyze
              </button>
            </div>
          </div>

          <div className="mt-20">
            <h3 className="text-lg font-bold tracking-tight text-gray-900 sm:text-2xl">
              Best 10 Products Based on Authentic Reviews
            </h3>
            <div className="border-t border-gray-300 my-4"></div>

            {error && <p className="text-red-500">{error}</p>}

            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <ul className="flex flex-col space-y-20 pt-20">
                {products.map((product, index) => {
                  return (
                    <a key={index} href={product.product_link} target="_blank">
                      <li className="relative flex flex-col sm:flex-row items-start gap-8">
                        <div className="text-2xl font-semibold">{index+1}.</div>
                        <img src={product.product_image} className="w-80 sm:w-40" alt="" />
                        <div className="flex flex-col justify-center space-y-2">
                          <h3 className="mb-1 text-slate-900 text-lg font-semibold">
                            {product.product_name}
                          </h3>
                          <p className="text-lg font-bold">Rs. {product.product_price}</p>
                          <p className="text-green-700 italic text-xl">
                          {`${(product.confidence * 100).toFixed(2)}%`}  reviews of the product are geniune
                          </p>
                        </div>
                      </li>
                    </a>
                  );
                })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default FakeReviewAnalyzer;