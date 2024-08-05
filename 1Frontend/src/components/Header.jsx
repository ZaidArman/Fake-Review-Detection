import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate  } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Fake Review Analyzer", href: "/fakereviewanalyzer" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token is in localStorage
    const token = localStorage.getItem("token");
    console.log("Token in localStorage:", token); 
    setIsLoggedIn(!!token); // Set true if token exists, false otherwise
  }, []);

  const handleLogout = () => {
    // Redirect to the logout route
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Update state and redirect to login page
    setIsLoggedIn(false);
    navigate("/login");
  };

  console.log(isLoggedIn, 'Login State')

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="" alt="" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `text-sm font-semibold leading-6  ${
                    isActive ? "text-indigo-600" : "text-gray-900"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          ) : (
            <p className="p-1 text-sm font-semibold leading-6 text-gray-900">
              Welcome back!
            </p>
          )}
          <br />
          {isLoggedIn && (
            <button style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}
            onClick={handleLogout}>
              Logout
            </button>
          )}
           </div>
        </nav>
        <Dialog
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        `-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                          isActive ? "text-indigo-600" : "text-gray-900"
                        } text-gray-900 hover:bg-gray-50`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
};

export default Header;
