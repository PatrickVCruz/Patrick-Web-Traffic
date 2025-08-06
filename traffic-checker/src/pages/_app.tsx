import React from "react";
import Head from "next/head";
import {AppProps} from "next/app";
import '../ui/globals.css';

export const metadata = {
    title: 'Patrick Traffic Checker',
    description: 'Yomali - Coding Exercise',
};

function Page({ Component, pageProps }: AppProps) {

    return (
        <>
            <Head>
                <title>{metadata.title}</title>
            </Head>
    <header>
        <div className="header-content">
            <h1><a href="/">Website Tracker</a></h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/all">All Traffic Data</a></li>
                </ul>
            </nav>
        </div>
    </header>
            <body className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">

            <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
            <Component {...pageProps} />
        </div>
    </main>
            </body>

            <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto text-center">
            <p>&copy; 2025 Patrick Victor Cruz.</p>
        </div>
    </footer>
        </>
    );
}

export default Page;