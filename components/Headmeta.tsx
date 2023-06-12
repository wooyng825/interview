import Head from "next/head";

interface Headmeta {
    title: string,
    url: string,
    imageUrl: string,
};


export default function Headmeta({ title, url, imageUrl }: Headmeta) {
    return (
        <Head>
            <title>{`${title} | For-Interview`}</title>

            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="keywords" content="interview, practice, preparation, project, challenge" />
            <meta data-rh="true" property="fb:app_id" content="203308908933094" />
            <meta data-rh="true" name="description" content="면접이나 인터뷰를 준비하는 사람들을 위한 페이지입니다." />

            <meta property="og:title" content={`${title} | For-Interview`} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url || "https://interview.blucoder.dev"} />
            <meta property="og:image" content={imageUrl.length !== 0 ? imageUrl : "/images/interview.jpg"} />
            <meta property="og:article:author" content="blue-coder" />
            <meta property="og:description" content="면접이나 인터뷰를 준비하는 사람들을 위한 페이지" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${title} | For-Interview`} data-rh="true" />
            <meta name="twitter:description" content="면접이나 인터뷰를 준비하는 사람들을 위한 페이지" />
            <meta name="twitter:site" content={url || "https://interview.bluecoder.dev"} />
            <meta name="twitter:image" content={imageUrl.length !== 0 ? imageUrl : "/images/interview.jpg"} />
        </Head>
    );
}