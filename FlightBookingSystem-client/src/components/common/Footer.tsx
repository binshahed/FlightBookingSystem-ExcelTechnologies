import { Link } from "react-router-dom";
import logo from "../../assets/travel-logo-light.png";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and About Section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            <img src={logo} alt="" />
          </h3>
          <p className="text-sm">
            Your one-stop destination for booking flights to anywhere in the
            world. We help make your travel seamless, affordable, and memorable.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-blue-400">
                Home
              </a>
            </li>
            <li>
              <a href="/search" className="hover:text-blue-400">
                Search Flights
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-400">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="/help" className="hover:text-blue-400">
                Help Center
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-blue-400">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-blue-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-blue-400">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                <a href="tel:+1234567890" className="hover:text-blue-400">
                  +1 234 567 890
                </a>
              </p>
            </li>
            <li>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href="mailto:support@flyaway.com"
                  className="hover:text-blue-400"
                >
                  support@flyaway.com
                </a>
              </p>
            </li>
            <li>
              <p>
                <span className="font-semibold">Address:</span> 123 Sky Avenue,
                Cloud City
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} FlyAway. All Rights Reserved.</p>
        <p>
          Built with ❤️ for travel enthusiasts.{" "}
          <Link to="/" className="hover:text-blue-400">
            Meet the Team
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
