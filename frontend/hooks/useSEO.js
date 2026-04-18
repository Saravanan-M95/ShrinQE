import { useEffect } from 'react';
import { Platform } from 'react-native';

/**
 * Custom hook to set page-specific SEO metadata on web.
 * Updates document.title and meta description for each page.
 */
export function usePageMeta(title, description) {
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    
    // Set page title
    if (title) {
      document.title = title;
    }
    
    // Set meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      } else {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        metaDesc.content = description;
        document.head.appendChild(metaDesc);
      }
    }
  }, [title, description]);
}

/**
 * Custom hook to load AdSense script ONLY on content-rich pages.
 * This ensures Google does not see ads on empty/behavioral pages.
 * 
 * ONLY use this on pages with substantial publisher content:
 * - Homepage (/), Tools hub (/tools), Individual tool pages (/tools/*)
 * - About, Contact, Privacy, Terms pages
 * 
 * DO NOT use on: /login, /signup, /dashboard, /links, /settings, /[code]
 */
export function useAdSense() {
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    
    // Check if script already loaded
    const existing = document.querySelector(
      'script[src*="pagead2.googlesyndication.com"]'
    );
    if (existing) return;
    
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4000404993258529';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
    
    // No cleanup — once loaded, AdSense stays for the session
  }, []);
}
