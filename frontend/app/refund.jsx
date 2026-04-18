import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';
import { Colors, Spacing, FontSizes } from '../constants/theme';
import { usePageMeta, useAdSense } from '../hooks/useSEO';

export default function RefundPolicy() {
  usePageMeta(
    'Refund & Cancellation Policy | ShrinQE',
    'Understand the refund and cancellation policy for ShrinQE services and premium image tools.'
  );
  useAdSense();

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Refund & Cancellation Policy</Text>
          <Text style={styles.lastUpdated}>Last Updated: April 18, 2026</Text>

          <Card variant="glass" style={styles.card}>
            <Text style={styles.sectionTitle}>1. Introduction</Text>
            <Text style={styles.text}>
              At ShrinQE, we strive to ensure our users are fully satisfied with our digital tools and services. This Refund & Cancellation Policy outlines the conditions under which refunds are provided and how cancellations are handled for our premium services, including the AI Background Image Remover.
            </Text>

            <Text style={styles.sectionTitle}>2. Cancellation Policy</Text>
            <Text style={styles.text}>
              Since ShrinQE provides digital services and tools, you can stop using our free tools at any time. For any pay-per-use or subscription-based services:
              {'\n'}• You may cancel your request for any service before the processing begins.
              {'\n'}• Once an AI process (like background removal) has been initiated and completed, the service is considered delivered.
            </Text>

            <Text style={styles.sectionTitle}>3. Refund Eligibility</Text>
            <Text style={styles.text}>
              We offer a <Text style={styles.bold}>7-day refund policy</Text> for our services under the following conditions:
              {'\n'}• If you have been charged for a service that was not delivered due to a technical error on our platform.
              {'\n'}• If the output of the automated AI tool is significantly different from the promised quality or description.
              {'\n'}• Refund requests must be made within 7 days of the transaction date.
            </Text>

            <Text style={styles.sectionTitle}>4. Non-Refundated Scenarios</Text>
            <Text style={styles.text}>
              Refunds will not be issued in the following cases:
              {'\n'}• Change of mind after the digital service has been fully rendered and the user has downloaded the results.
              {'\n'}• Dissatisfaction with results due to poor quality of the input/original image provided by the user.
              {'\n'}• Requests made after the 7-day eligibility period.
            </Text>

            <Text style={styles.sectionTitle}>5. How to Request a Refund</Text>
            <Text style={styles.text}>
              To request a refund, please contact us at <Text style={styles.bold}>saraspace006@gmail.com</Text> with your transaction ID and the reason for the request. Our team will review your request and process eligible refunds within 5-7 business days.
            </Text>

            <Text style={styles.sectionTitle}>6. Contact Information</Text>
            <Text style={styles.text}>
              If you have any questions regarding this policy, please reach out to us:
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
