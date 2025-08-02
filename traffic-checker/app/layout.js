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
        <header>
            <div className="header-content">
                <h1>Website Tracker</h1>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
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
            <div className="max-w-7xl mx-auto text-center">
                <p>&copy; 2025 Patrick Victor Cruz.</p>
            </div>
        </footer>
        </body>
        </html>
    );
}