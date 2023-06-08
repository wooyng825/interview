import '@/styles/globals.css';
import Layout from "@/components/Layout";
import { Toaster } from 'react-hot-toast';
import { AppProps } from 'next/app';
import { AuthProvider } from '@/components/AuthProvider';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    useEffect(() => {
        const body = document.querySelector('body');
        if (body !== null) {
            body.setAttribute('data-page', router.pathname);
        }
    });

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