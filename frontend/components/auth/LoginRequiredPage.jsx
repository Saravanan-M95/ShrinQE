import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Colors, Spacing, FontSizes, BorderRadius } from '../../constants/theme';

/**
 * Full-page content shown to unauthenticated users on protected routes.
 * This ensures Google's crawler never sees a blank page with no content,
 * which is critical for AdSense policy compliance.
 */
export default function LoginRequiredPage({ feature = 'Dashboard' }) {
  const router = useRouter();

  const features = [
    {
      icon: 'link-outline',
      title: 'URL Shortener',
      desc: 'Create short, memorable links that are easy to share and track.',
      color: Colors.primary,
    },
    {
      icon: 'analytics-outline',
      title: 'Link Analytics',
      desc: 'Track clicks, devices, browsers, and geographic data in real-time.',
      color: Colors.accent,
    },
    {
      icon: 'qr-code-outline',
      title: 'QR Code Generator',
      desc: 'Generate beautiful QR codes for every shortened link instantly.',
      color: '#EC4899',
    },
    {
      icon: 'images-outline',
      title: '13+ Image Tools',
      desc: 'Compress, resize, crop, convert, and edit images — all free in your browser.',
      color: Colors.success,
    },
  ];

  return (
    <View style={styles.wrapper}>
      <Header />
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Auth CTA */}
          <Card variant="glass" style={styles.authCard}>
            <LinearGradient
              colors={Colors.gradientPrimary}
              style={styles.iconCircle}
            >
              <Ionicons name="lock-closed-outline" size={32} color="#fff" />
            </LinearGradient>
            <Text style={styles.title}>Sign in to access {feature}</Text>
            <Text style={styles.subtitle}>
              Create a free account to start shortening URLs, tracking analytics, and using all of ShrinQE's powerful tools.
            </Text>
            <View style={styles.btnRow}>
              <Button
                title="Log In"
                onPress={() => router.push('/login')}
                variant="primary"
                size="md"
                icon={<Ionicons name="log-in-outline" size={18} color="#fff" />}
              />
              <Button
                title="Sign Up Free"
                onPress={() => router.push('/signup')}
                variant="outline"
                size="md"
                icon={<Ionicons name="person-add-outline" size={18} color={Colors.primary} />}
              />
            </View>
          </Card>

          {/* Feature highlights — gives the page substantial content */}
          <Text style={styles.sectionTitle}>What you get with ShrinQE</Text>
          <View style={styles.featuresGrid}>
            {features.map((f, i) => (
              <Card key={i} variant="glass" style={styles.featureCard}>
                <View style={[styles.featureIcon, { backgroundColor: f.color + '15' }]}>
                  <Ionicons name={f.icon} size={24} color={f.color} />
                </View>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </Card>
            ))}
          </View>

          {/* Additional informational content */}
          <Card variant="glass" style={styles.infoCard}>
            <Text style={styles.infoTitle}>Why choose ShrinQE?</Text>
            <View style={styles.infoItem}>
              <Ionicons name="shield-checkmark" size={18} color={Colors.success} />
              <Text style={styles.infoText}>
                <Text style={styles.infoBold}>Privacy first: </Text>
                Most image tools process files entirely in your browser — your data never leaves your device.
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="flash" size={18} color={Colors.warning} />
              <Text style={styles.infoText}>
                <Text style={styles.infoBold}>Lightning fast: </Text>
                Instant URL redirects powered by a global CDN. Your links never slow down.
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="globe" size={18} color={Colors.accent} />
              <Text style={styles.infoText}>
                <Text style={styles.infoBold}>100% free: </Text>
                All 13+ image tools and URL shortening with analytics — completely free, no credit card required.
              </Text>
            </View>
          </Card>
        </View>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: Colors.bgPrimary },
  container: { 
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.xxl,
  },
  content: { maxWidth: 800, width: '100%', alignItems: 'center' },
  
  authCard: {
    width: '100%', alignItems: 'center', padding: Spacing.xxl,
    marginBottom: Spacing.xxl,
  },
  iconCircle: {
    width: 72, height: 72, borderRadius: 36,
    alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xxl, fontWeight: '800', color: Colors.textPrimary,
    textAlign: 'center', marginBottom: Spacing.sm, letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FontSizes.md, color: Colors.textSecondary,
    textAlign: 'center', lineHeight: 24, maxWidth: 500,
    marginBottom: Spacing.xl,
  },
  btnRow: { flexDirection: 'row', gap: Spacing.md, flexWrap: 'wrap', justifyContent: 'center' },
  
  sectionTitle: {
    fontSize: FontSizes.xl, fontWeight: '700', color: Colors.textPrimary,
    marginBottom: Spacing.lg, textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md,
    justifyContent: 'center', width: '100%', marginBottom: Spacing.xl,
  },
  featureCard: {
    width: 180, minHeight: 140, padding: Spacing.lg, alignItems: 'flex-start',
  },
  featureIcon: {
    width: 44, height: 44, borderRadius: BorderRadius.md,
    alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm,
  },
  featureTitle: {
    fontSize: FontSizes.md, fontWeight: '700', color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  featureDesc: {
    fontSize: FontSizes.xs, color: Colors.textMuted, lineHeight: 18,
  },

  infoCard: { width: '100%', padding: Spacing.xl, gap: Spacing.md },
  infoTitle: {
    fontSize: FontSizes.lg, fontWeight: '700', color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  infoItem: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  infoText: { flex: 1, fontSize: FontSizes.sm, color: Colors.textSecondary, lineHeight: 22 },
  infoBold: { fontWeight: '700', color: Colors.textPrimary },
});
