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
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}