import '@/styles/globals.css';
import Layout from "@/components/Layout";
import { Toaster } from 'react-hot-toast';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Layout>
                <Component {...pageProps} />
                <Toaster />
            </Layout>
        </>
    );
}