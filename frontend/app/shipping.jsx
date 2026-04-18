import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';
import { Colors, Spacing, FontSizes } from '../constants/theme';
import { usePageMeta, useAdSense } from '../hooks/useSEO';

export default function ShippingPolicy() {
  usePageMeta(
    'Shipping & Delivery Policy | ShrinQE',
    'Read about how ShrinQE delivers its digital services and automated image tools.'
  );
  useAdSense();

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Shipping & Delivery Policy</Text>
          <Text style={styles.lastUpdated}>Last Updated: April 18, 2026</Text>

          <Card variant="glass" style={styles.card}>
            <Text style={styles.sectionTitle}>1. Digital Delivery</Text>
            <Text style={styles.text}>
              All services provided by ShrinQE, including URL shortening, analytics reporting, and AI-powered image tools, are <Text style={styles.bold}>digital-only services</Text>. We do not ship any physical goods.
            </Text>

            <Text style={styles.sectionTitle}>2. Delivery Timeline</Text>
            <Text style={styles.text}>
              Delivery of our services is <Text style={styles.bold}>immediate</Text>:
              {'\n'}• <Text style={styles.bold}>URL Shortening:</Text> Links are generated and active immediately upon submission.
              {'\n'}• <Text style={styles.bold}>Image Tools:</Text> Results are produced in real-time within your browser or on our AI servers (usually under 30 seconds) and are available for download immediately after processing.
              {'\n'}• <Text style={styles.bold}>Analytics:</Text> Data is updated and viewable in your dashboard in real-time.
            </Text>

            <Text style={styles.sectionTitle}>3. Confirmation of Delivery</Text>
            <Text style={styles.text}>
              A service is considered "delivered" when:
              {'\n'}• The shortened URL is displayed and accessible.
              {'\n'}• The processed image is presented to the user for download.
              {'\n'}• Analytics data becomes visible in the user's account.
            </Text>

            <Text style={styles.sectionTitle}>4. Failed Delivery</Text>
            <Text style={styles.text}>
              In the rare event that a service fails to deliver (e.g., a technical error during AI processing), the transaction will be eligible for a refund or a retry. If you face any issues, please contact us immediately.
            </Text>

            <Text style={styles.sectionTitle}>5. Contact Information</Text>
            <Text style={styles.text}>
              For any questions regarding the delivery of your digital assets, please contact us:
              {'\n\n'}
              <Text style={styles.bold}>Legal Entity:</Text> ShrinQE{'\n'}
              <Text style={styles.bold}>Email:</Text> saraspace006@gmail.com{'\n'}
              <Text style={styles.bold}>Address:</Text> Coimbatore, Tamil Nadu, India
            </Text>
          </Card>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPrimary },
  scrollContent: { flexGrow: 1 },
  content: {
    maxWidth: 800, width: '100%', alignSelf: 'center',
    padding: Spacing.lg, paddingTop: Spacing.xxl * 1.5,
  },
  title: {
    fontSize: FontSizes.xxl, fontWeight: '800',
    color: Colors.textPrimary, marginBottom: Spacing.xs,
  },
  lastUpdated: {
    fontSize: FontSizes.sm, color: Colors.textMuted, marginBottom: Spacing.xl,
  },
  card: { padding: Spacing.xl },
  sectionTitle: {
    fontSize: FontSizes.lg, fontWeight: '700', color: Colors.primaryLight,
    marginTop: Spacing.xl, marginBottom: Spacing.sm,
  },
  text: {
    fontSize: FontSizes.md, color: Colors.textSecondary, lineHeight: 26,
  },
  bold: { fontWeight: '700', color: Colors.textPrimary },
});
