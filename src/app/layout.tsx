// 'use client';
import './reactCOIServiceWorker';
import { Box, Container } from '@mui/material';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import Script from 'next/script';
import { GOOGLE_ANALYTICS, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from 'src/constants';
import { imagePath } from 'src/constants/imagePath';
import AppProviders from 'src/contexts/AppProviders';

const inter = Open_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    keywords: ['orchai', 'OCH', 'airdrop', 'gifs', 'orai', 'kava', 'osmo', 'inj'],
    publisher: 'Orchai',
    robots: {
        follow: true,
        index: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        url: SITE_URL,
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        siteName: SITE_TITLE,
        countryName: 'Vietnam',
        images: {
            url: SITE_URL + imagePath.THUMBNAIL.src,
            secureUrl: imagePath.THUMBNAIL.src,
            type: 'image/png',
            width: imagePath.THUMBNAIL.width,
            height: imagePath.THUMBNAIL.height,
        },
    },
    twitter: {
        card: 'summary_large_image',
        site: '@site',
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: {
            url: SITE_URL + imagePath.THUMBNAIL.src,
            secureUrl: imagePath.THUMBNAIL.src,
            type: 'image/png',
            width: imagePath.THUMBNAIL.width,
            height: imagePath.THUMBNAIL.height,
        },
    },
    appleWebApp: {
        capable: true,
        title: 'Airdrop OCH',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS}`} />

                <Script
                    id="google-analytics"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GOOGLE_ANALYTICS}', {
                        page_path: window.location.pathname,
                    });
                    `,
                    }}
                />
            </head>
            <body className={inter.className}>
                <AppProviders>
                    <Container>{children}</Container>
                </AppProviders>
            </body>
        </html>
    );
}
