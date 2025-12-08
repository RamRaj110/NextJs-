export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">MyCompany</h2>
          <p className="text-gray-400">
            Building modern web experiences with speed, style, and precision.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li className="hover:text-blue-400 transition">Home</li>
            <li className="hover:text-blue-400 transition">About</li>
            <li className="hover:text-blue-400 transition">Services</li>
            <li className="hover:text-blue-400 transition">Contact</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2">
            <li className="hover:text-blue-400 transition">Blog</li>
            <li className="hover:text-blue-400 transition">Docs</li>
            <li className="hover:text-blue-400 transition">Support</li>
            <li className="hover:text-blue-400 transition">Privacy Policy</li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-5 text-2xl">
            <a className="hover:text-blue-400 transition" href="#">🐦</a>
            <a className="hover:text-blue-400 transition" href="#">📘</a>
            <a className="hover:text-blue-400 transition" href="#">📸</a>
            <a className="hover:text-blue-400 transition" href="#">💼</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
        © {new Date().getFullYear()} MyCompany — All Rights Reserved.
      </div>
    </footer>
  );
}
