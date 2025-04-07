import Link from 'next/link';
export default function Navbar() {
  return (
    <nav className="bg-[#015893] p-4 w-full">
      <div className="flex justify-between items-center px-4 sm:px-8">
        <Link href="/" className="text-white text-lg font-bold">
          TypeBattle
        </Link>
        <div className="flex space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white">
            About
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
