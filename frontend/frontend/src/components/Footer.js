const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10 w-full">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div>
          <h3 className="text-lg font-semibold mb-2">READIFY STORE</h3>
          <p className="text-gray-400">
            Your favorite online book shop.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Links</h4>
          <ul className="space-y-2">
            <li><a className="no-underline text-gray-400 hover:text-white" href="/">Home</a></li>
            <li><a className="no-underline text-gray-400 hover:text-white" href="/">Books</a></li>
            <li><a className="no-underline text-gray-400 hover:text-white" href="/">About</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <p className="text-gray-400">Facebook · Twitter · Instagram</p>
        </div>

      </div>

      <div className="text-center text-gray-500 mt-6">
        © 2026 All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
