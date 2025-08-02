import './ui/globals.css';

export const metadata = {
    title: 'Patrick Traffic Checker',
    description: 'Yomali - Coding Exercise',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            <script src="/traffic-checker.js"></script>
        </head>
        <body className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
        <header className="bg-gray-800 text-white py-4">
            <div className="header-content">
                <h1 className="text-xl font-bold">Yomali Patrick</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <a href="/" className="hover:text-gray-300">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-gray-300">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-gray-300">
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        <main className="flex-1">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {children}
            </div>
        </main>

        <footer className="bg-gray-800 text-white py-4">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p>
                    &copy; 2025 Patrick Victor Cruz.
                </p>
            </div>
        </footer>
        </body>
        </html>
    );
}