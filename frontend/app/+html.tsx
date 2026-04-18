import { ScrollViewStyleReset } from 'expo-router/html';
import React from 'react';

/**
 * Root HTML template for the Expo Router web application.
 * This is the ONLY reliable way to put static tags in the <head>.
 * 
 * NOTE: AdSense script is NOT loaded globally. It is only injected
 * on content-rich pages via the useAdSense hook to comply with
 * Google's policy against ads on screens without publisher content.
 */
export default function RootHTML({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* SEO Meta Tags */}
        <title>ShrinQE — Free URL Shortener & Image Tools</title>
        <meta name="description" content="ShrinQE is a free URL shortener with analytics, QR codes, and 13+ browser-based image tools including background removal, compression, resize, crop, and more." />
        <meta name="keywords" content="url shortener, link shortener, image tools, background removal, image compress, image resize, free tools" />
        <meta name="author" content="ShrinQE" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ShrinQE — Free URL Shortener & Image Tools" />
        <meta property="og:description" content="Shrink links with analytics and use 13+ free image tools. All in one place." />
        <meta property="og:url" content="https://shrinqe.com" />
        <meta property="og:site_name" content="ShrinQE" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="ShrinQE — Free URL Shortener & Image Tools" />
        <meta name="twitter:description" content="Shrink links with analytics and use 13+ free image tools. All in one place." />

        {/* Canonical URL */}
        <link rel="canonical" href="https://shrinqe.com" />

        {/* 🎨 Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

        {/* Reset styles for the web */}
        <ScrollViewStyleReset />

        {/* Global CSS Reset */}
        <style dangerouslySetInnerHTML={{ __html: `
          body { background-color: #0F0D15; margin: 0; padding: 0; overflow-x: hidden; }
          #root { display: flex; flex: 1; flex-direction: column; min-height: 100vh; }
        ` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
