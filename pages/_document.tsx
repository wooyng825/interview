import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";

export default class MyDocument extends Document {
    static async getInitialProps(context: DocumentContext): Promise<DocumentInitialProps> {
        const originalRenderPage = context.renderPage;

        context.renderPage = () => originalRenderPage({
            enhanceApp: (App) => App,
            enhanceComponent: (Component) => Component,
        });

        const initialProps = await Document.getInitialProps(context);

        return initialProps;
    }

    render() {
        return (
            <Html lang="ko">
                <Head>
                    <link rel="icon" href="/icons/favicon.ico" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script type="text/javascript" src="//t1.daumcdn.net/kas/static/ba.min.js" async></script>
                </body>
            </Html>
        );
    }
}