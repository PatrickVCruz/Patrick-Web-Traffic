import Document, { Html, Head, Main, NextScript } from "next/document";

import React from "react";



export default class MyDocument extends Document {
    render() {
        return (
        <Html lang="en">
        <Head>
            <script src="/js/traffic-checker.js"></script>
        </Head>

        <Main />
        <NextScript />
        </Html>   );
    };
}