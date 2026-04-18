import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants/theme';
import { usePageMeta, useAdSense } from '../hooks/useSEO';

export default function AboutPage() {
  const router = useRouter();

  usePageMeta(
    'About ShrinQE — Our Mission & Story',
    'Learn about ShrinQE, the free URL shortener and image toolkit. Our mission is to simplify digital asset management with privacy-first, browser-based tools.'
  );
  useAdSense();

  const values = [
    {
      icon: 'shield-checkmark',
      title: 'Privacy First',
      desc: 'Most of our image tools run entirely in your browser. Your files are processed locally and never uploaded to any server. For AI-powered tools that require server processing, we use transient pipelines that delete your data immediately after processing.',
      color: Colors.success,
    },
    {
      icon: 'flash',
      title: 'Speed & Simplicity',
      desc: 'We believe tools should be fast, intuitive, and accessible. Every feature in ShrinQE is designed to get you from A to B in the fewest steps possible — no bloated interfaces, no unnecessary sign-up walls for basic tools.',
      color: Colors.warning,
    },
    {
      icon: 'globe',
      title: 'Free & Accessible',
      desc: 'We are committed to keeping our core tools free. URL shortening with analytics, 13+ image editing tools, and QR code generation — all available without a subscription. We sustain the platform through non-intrusive advertising.',
      color: Colors.accent,
    },
    {
      icon: 'code-slash',
      title: 'Transparency',
      desc: 'We are transparent about what data we collect and how we use it. Our privacy policy is written in plain language, and we give you full control over your data — including the ability to delete your account and all associated data at any time.',
      color: Colors.primary,
    },
  ];

  const toolCategories = [
    {
      title: 'URL Shortener & Analytics',
      desc: 'Transform long URLs into short, trackable links. Every link comes with real-time analytics showing click counts, geographic breakdown, device types, and browser statistics. Generate QR codes for any link instantly.',
      icon: 'link',
      color: Colors.primary,
    },
    {
      title: 'Image Transform Tools',
      desc: 'Compress images to reduce file size without visible quality loss. Resize to custom dimensions. Crop with precision. Rotate and flip images. All processing happens locally in your browser for maximum privacy and speed.',
      icon: 'images',
      color: '#EC4899',
    },
    {
      title: 'Image Conversion',
      desc: 'Convert between popular image formats including JPG, PNG, and WebP. Our HTML-to-Image tool lets you turn any HTML or code snippet into a shareable image — perfect for developers and content creators.',
      icon: 'swap-horizontal',
      color: Colors.accent,
    },
    {
      title: 'AI-Powered Enhancement',
      desc: 'Remove backgrounds with high-fidelity AI subject isolation. Upscale low-resolution images by 2×, 3×, or 4×. Enhance blurry, dark, or noisy photos automatically. Add custom text watermarks to protect your work.',
      icon: 'sparkles',
      color: Colors.success,
    },
    {
      title: 'Creative Tools',
      desc: 'Generate memes with classic Impact text formatting. Blur faces or sensitive areas for privacy. Edit photos with brightness, contrast, saturation, and filter controls — all without leaving your browser.',
      icon: 'color-palette',
      color: Colors.warning,
    },
  ];

  return (
    <View style={styles.wrapper}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient colors={Colors.gradientHero} style={styles.heroSection}>
          <View style={[styles.orb, styles.orbPurple]} />
          <View style={[styles.orb, styles.orbBlue]} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              About <Text style={styles.heroAccent}>ShrinQE</Text>
            </Text>
            <Text style={styles.heroSubtitle}>
              We build free, privacy-respecting tools that help you manage your digital assets — 
              from shortening URLs with analytics to processing images entirely in your browser.
            </Text>
          </View>
        </LinearGradient>

        {/* Mission */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Card variant="glass" style={styles.missionCard}>
            <Text style={styles.missionText}>
              ShrinQE was born from a simple idea: digital tools should be free, fast, and respectful of your privacy. 
              Too many online tools require expensive subscriptions, upload your files to unknown servers, or bury useful 
              features behind paywalls.
            </Text>
            <Text style={styles.missionText}>
              We set out to build an all-in-one platform that combines powerful URL management with a comprehensive 
              image toolkit — all accessible from your browser, on any device. Whether you need to shorten a link for 
              social media, compress an image for your website, or remove a background for a presentation, ShrinQE 
              has you covered.
            </Text>
            <Text style={styles.missionText}>
              Our platform is built with modern web technologies that allow most image processing to happen directly 
              on your device. This means faster results, better privacy, and no file size limits imposed by server uploads.
            </Text>
          </Card>
        </View>

        {/* Values */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What We Stand For</Text>
          <View style={styles.valuesGrid}>
            {values.map((v, i) => (
              <Card key={i} variant="glass" style={styles.valueCard}>
                <View style={[styles.valueIcon, { backgroundColor: v.color + '15' }]}>
                  <Ionicons name={v.icon} size={28} color={v.color} />
                </View>
                <Text style={styles.valueTitle}>{v.title}</Text>
                <Text style={styles.valueDesc}>{v.desc}</Text>
              </Card>
            ))}
          </View>
        </View>

        {/* Product Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What We Offer</Text>
          <Text style={styles.sectionSubtitle}>
            A unified workspace for link management and image processing
          </Text>
          <View style={styles.toolsList}>
            {toolCategories.map((tool, i) => (
              <Card key={i} variant="glass" style={styles.toolOverviewCard}>
                <View style={styles.toolOverviewHeader}>
                  <View style={[styles.toolOverviewIcon, { backgroundColor: tool.color + '15' }]}>
                    <Ionicons name={tool.icon} size={24} color={tool.color} />
                  </View>
                  <Text style={styles.toolOverviewTitle}>{tool.title}</Text>
                </View>
                <Text style={styles.toolOverviewDesc}>{tool.desc}</Text>
              </Card>
            ))}
          </View>
        </View>

        {/* Technology */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Technology</Text>
          <Card variant="glass" style={styles.missionCard}>
            <Text style={styles.missionText}>
              ShrinQE is built using modern web technologies optimized for performance and privacy:
            </Text>
            <View style={styles.techList}>
              <View style={styles.techItem}>
                <Text style={styles.techBullet}>•</Text>
                <Text style={styles.techText}>
                  <Text style={styles.techBold}>Browser-based processing:</Text> Canvas API and WebAssembly for client-side image manipulation with zero server round-trips.
                </Text>
              </View>
              <View style={styles.techItem}>
                <Text style={styles.techBullet}>•</Text>
                <Text style={styles.techText}>
                  <Text style={styles.techBold}>AI models:</Text> State-of-the-art neural networks for background removal, image upscaling, and photo enhancement.
                </Text>
              </View>
              <View style={styles.techItem}>
                <Text style={styles.techBullet}>•</Text>
                <Text style={styles.techText}>
                  <Text style={styles.techBold}>Global CDN:</Text> URL redirects served from edge locations worldwide for sub-50ms response times.
                </Text>
              </View>
              <View style={styles.techItem}>
                <Text style={styles.techBullet}>•</Text>
                <Text style={styles.techText}>
                  <Text style={styles.techBold}>Secure infrastructure:</Text> HTTPS everywhere, encrypted data at rest, and automatic malicious URL detection.
                </Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Contact CTA */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Have Questions?</Text>
          <Text style={styles.ctaSubtitle}>
            We'd love to hear from you. Reach out with feedback, feature requests, or partnership inquiries.
          </Text>
          <Button
            title="Contact Us"
            onPress={() => router.push('/contact')}
            size="lg"
            icon={<Ionicons name="mail-outline" size={20} color="#fff" />}
          />
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: Colors.bgPrimary },
  scrollContent: { flexGrow: 1 },

  heroSection: {
    paddingTop: Spacing.xxxl + 20, paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.lg, position: 'relative', overflow: 'hidden',
  },
  orb: { position: 'absolute', borderRadius: 9999, opacity: 0.12 },
  orbPurple: { width: 350, height: 350, backgroundColor: Colors.primary, top: -80, right: -80 },
  orbBlue: { width: 250, height: 250, backgroundColor: Colors.accent, bottom: -50, left: -50 },
  heroContent: { maxWidth: 700, alignSelf: 'center', alignItems: 'center', width: '100%' },
  heroTitle: {
    fontSize: 42, fontWeight: '900', color: Colors.textPrimary,
    textAlign: 'center', letterSpacing: -1.5, marginBottom: Spacing.lg,
  },
  heroAccent: { color: Colors.primaryLight },
  heroSubtitle: {
    fontSize: FontSizes.lg, color: Colors.textSecondary, textAlign: 'center',
    lineHeight: 28, maxWidth: 600,
  },

  section: {
    maxWidth: 900, width: '100%', alignSelf: 'center',
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.xxl,
  },
  sectionTitle: {
    fontSize: FontSizes.xxl, fontWeight: '800', color: Colors.textPrimary,
    textAlign: 'center', marginBottom: Spacing.sm, letterSpacing: -0.5,
  },
  sectionSubtitle: {
    fontSize: FontSizes.md, color: Colors.textSecondary,
    textAlign: 'center', marginBottom: Spacing.xl,
  },

  missionCard: { padding: Spacing.xl, gap: Spacing.md },
  missionText: { fontSize: FontSizes.md, color: Colors.textSecondary, lineHeight: 26 },

  valuesGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md,
    justifyContent: 'center', marginTop: Spacing.lg,
  },
  valueCard: { width: 400, minWidth: 280, flex: 1, padding: Spacing.xl },
  valueIcon: {
    width: 56, height: 56, borderRadius: BorderRadius.md,
    alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md,
  },
  valueTitle: {
    fontSize: FontSizes.lg, fontWeight: '700', color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  valueDesc: { fontSize: FontSizes.sm, color: Colors.textSecondary, lineHeight: 22 },

  toolsList: { gap: Spacing.md, marginTop: Spacing.md },
  toolOverviewCard: { padding: Spacing.xl },
  toolOverviewHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.md },
  toolOverviewIcon: {
    width: 48, height: 48, borderRadius: BorderRadius.md,
    alignItems: 'center', justifyContent: 'center',
  },
  toolOverviewTitle: { fontSize: FontSizes.lg, fontWeight: '700', color: Colors.textPrimary },
  toolOverviewDesc: { fontSize: FontSizes.md, color: Colors.textSecondary, lineHeight: 24 },

  techList: { gap: Spacing.sm, marginTop: Spacing.sm },
  techItem: { flexDirection: 'row', gap: Spacing.sm },
  techBullet: { color: Colors.primaryLight, fontSize: FontSizes.md, fontWeight: '700' },
  techText: { flex: 1, fontSize: FontSizes.sm, color: Colors.textSecondary, lineHeight: 22 },
  techBold: { fontWeight: '700', color: Colors.textPrimary },

  ctaSection: {
    alignItems: 'center', paddingVertical: Spacing.xxxl, paddingHorizontal: Spacing.lg,
  },
  ctaTitle: {
    fontSize: FontSizes.xxl, fontWeight: '800', color: Colors.textPrimary,
    marginBottom: Spacing.sm, textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: FontSizes.md, color: Colors.textSecondary, textAlign: 'center',
    marginBottom: Spacing.xl, maxWidth: 500,
  },
});
