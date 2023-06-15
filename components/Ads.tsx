export const Media = {
    PC: 'PC',
    Mobile: 'Mobile',
} as const;
type Media = typeof Media[keyof typeof Media];

interface Info {
    adUnit: string,
    adWidth: number,
    adHeight: number,
};

export default function Ads({ adUnit, adWidth, adHeight }: Info) {
    return (
        <>
            <div className="kakao-ads mx-auto my-auto" style={{ width: `${adWidth}px`, height: `${adHeight}px` }}>
                <ins className="kakao_ad_area" style={{ display: "none" }}
                    data-ad-unit={adUnit}
                    data-ad-width = {`${adWidth}`}
                    data-ad-height = {`${adHeight}`}></ins>
            </div>
        </>
    );
}