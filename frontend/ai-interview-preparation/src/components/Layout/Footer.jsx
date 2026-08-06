import { Link } from "react-router-dom";
import { LuGithub, LuLinkedin, LuMail } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="bg-[#FFFCEF] border-t border-amber-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div>
            <h2 className="text-xl font-bold text-black">
              Interview Prep AI
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Practice smarter. Learn faster. Crack your dream interview.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link
              to="/"
              className="text-gray-700 hover:text-amber-600 transition"
            >
              Home
            </Link>

            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-amber-600 transition"
            >
              Dashboard
            </Link>

            <button
              className="text-gray-700 hover:text-amber-600 transition cursor-pointer"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            >
              Back to Top
            </button>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-amber-300 flex items-center justify-center hover:bg-black hover:text-white transition"
            >
              <LuGithub size={18} />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-amber-300 flex items-center justify-center hover:bg-black hover:text-white transition"
            >
              <LuLinkedin size={18} />
            </a>

            <a
              href="mailto:example@gmail.com"
              className="w-10 h-10 rounded-full border border-amber-300 flex items-center justify-center hover:bg-black hover:text-white transition"
            >
              <LuMail size={18} />
            </a>
          </div>
        </div>

        <div className="border-t border-amber-200 mt-8 pt-5 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Interview Prep AI • Built with ❤️ by
          <span className="font-semibold text-black">
            {" "}
            Milan Gauswami
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;