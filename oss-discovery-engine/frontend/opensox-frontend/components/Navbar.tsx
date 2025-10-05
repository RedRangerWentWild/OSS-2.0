import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          OpenSox
        </Link>
        <div className="space-x-4">
          <Link href="/search" className="text-gray-300 hover:text-white">
            Search
          </Link>
          <Link href="/good-first-issue" className="text-gray-300 hover:text-white">
            Good First Issues
          </Link>
          <Link href="/difficulty" className="text-gray-300 hover:text-white">
            Difficulty
          </Link>
          <Link href="/contributors-sort" className="text-gray-300 hover:text-white">
            Contributors Sort
          </Link>
          <Link href="/prs-sort" className="text-gray-300 hover:text-white">
            PRs Sort
          </Link>
          <Link href="/camp-org" className="text-gray-300 hover:text-white">
            Camp Organizations
          </Link>
          <Link href="/cartography" className="text-gray-300 hover:text-white">
            Cartography
          </Link>
          <Link href="/gamify" className="text-gray-300 hover:text-white">
            Gamify
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;