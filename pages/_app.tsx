import '@/styles/globals.css';
import Layout from "@/components/Layout";
import { Toaster } from 'react-hot-toast';
import { AppProps } from 'next/app';
import { AuthProvider } from '@/components/AuthProvider';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MailBox from '@/components/MailBox';
import Footer from '@/components/Footer';
import Ads from '@/components/Ads';

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [showSelect, setShowSelect] = useState(false);

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
                <Ads adUnit='DAN-tPiNaH1ycZ2qjLS1' adWidth={728} adHeight={90} />
                <Footer setShowSelect={setShowSelect} />
                <MailBox showSelect={showSelect} setShowSelect={setShowSelect} />
            </AuthProvider>
        </>
    );
}