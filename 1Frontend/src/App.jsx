import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FakeReviewAnalyzer from "./pages/FakeReviewAnalyzer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import PrivateRoute from "./components/PrivateRoute"; 
import Logout from "./pages/Logout"; // Import the Logout component

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/fakereviewanalyzer"
            element={<PrivateRoute element={FakeReviewAnalyzer} />}
          />
          {/* <Route path="/fakereviewanalyzer" element={<FakeReviewAnalyzer />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
