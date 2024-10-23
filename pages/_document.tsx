// pages/_document.tsx

import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
  } from 'next/document';
  
  class MyDocument extends Document {
    // Optional: If you need to customize initial props
    // static async getInitialProps(ctx: DocumentContext) {
    //   const initialProps = await Document.getInitialProps(ctx);
    //   return { ...initialProps };
    // }
  
    render() {
      return (
        <Html>
          <Head>
            {/* AdSense Code Snippet */}
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9522038132652045"
              crossOrigin="anonymous"
            ></script>
            {/* Add any other head elements here */}
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      );
    }
  }
  
  export default MyDocument;
  