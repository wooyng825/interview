import '@/styles/globals.css';
import Layout from "@/components/Layout";
import { Toaster } from 'react-hot-toast';
import { AppProps } from 'next/app';
import { AuthProvider } from '@/components/AuthProvider';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <AuthProvider>
                <Toaster />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthProvider>
        </>
    );
}