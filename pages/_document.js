import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import React from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
          {/*<link href="/fonts/SpartanMB/style.css" rel="stylesheet"/>*/}
          <link rel="icon" href="/favicon.ico"/>
          <!-- Google tag (gtag.js) -->
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-SB0XJLQX6J"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());

            gtag('config', 'G-SB0XJLQX6J');
          </script>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
  );
  }
  }

  export default MyDocument;
