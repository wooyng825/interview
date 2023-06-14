export const Media = {
    PC: 'PC',
    Mobile: 'Mobile',
} as const;
type Media = typeof Media[keyof typeof Media];

interface Info {
    media: Media, 
    adUnit: string,
    adWidth: number,
    adHeight: number,
};

export default function Ads({ media, adUnit, adWidth, adHeight }: Info) {
    return (
        <>
            <div data-media={media} className="kakao-ads mx-auto" style={{ width: `${adWidth}px`, height: `${adHeight}px` }}>
                <ins className="kakao_ad_area"
                    data-ad-unit={adUnit}
                    data-ad-width = {`${adWidth}`}
                    data-ad-height = {`${adHeight}`}></ins>
            </div>
        </>
    );
}