import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="w-full px-6">
      <header className="w-full bg-gray-800 text-white p-4">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/">
                <p className="hover:underline">Home</p>
              </Link>
            </li>
            <li>
              <Link href="/generation">
                <p className="hover:underline">Generation</p>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="flex">
        <main className="w-full px-6 bg-white shadow-md">
          {children}
        </main>
      </div>

      <footer className="w-full bg-gray-200 p-4 mt-6">
        <p>footer here</p>
      </footer>
    </div>
  );
}
