import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';
import { Colors, Spacing, FontSizes } from '../constants/theme';

export default function TermsOfService() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Terms of Service</Text>
          <Text style={styles.lastUpdated}>Last Updated: April 11, 2026</Text>

          <Card variant="glass" style={styles.card}>
            <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
            <Text style={styles.text}>
              By accessing or using ShrinQE, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services.
            </Text>

            <Text style={styles.sectionTitle}>2. Use of Services</Text>
            <Text style={styles.text}>
              - You must be 13 years or older to use this service.{'\n'}
              - You are responsible for all activity that occurs under your account.{'\n'}
              - You may not use ShrinQE for any illegal or unauthorized purpose, including the distribution of malware or phishing links.
            </Text>

            <Text style={styles.sectionTitle}>3. User Content</Text>
            <Text style={styles.text}>
              We do not claim ownership of the links you shorten or the images you process. However, by using our services, you grant us a license to host and serve this content as necessary to provide our digital asset management features.
            </Text>

            <Text style={styles.sectionTitle}>4. Limitation of Liability</Text>
            <Text style={styles.text}>
              ShrinQE is provided "as is" without any warranties. We shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our services.
            </Text>

            <Text style={styles.sectionTitle}>5. Modifications</Text>
            <Text style={styles.text}>
              We reserve the right to modify or terminate ShrinQE or these terms at any time without notice. It is your responsibility to review these terms periodically for changes.
            </Text>

            <Text style={styles.sectionTitle}>6. Governing Law</Text>
            <Text style={styles.text}>
              These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the operator of ShrinQE resides.
            </Text>

            <Text style={styles.sectionTitle}>7. Contacting Us</Text>
            <Text style={styles.text}>
              If you have any questions about these Terms, please contact us at saraspace006@gmail.com.
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
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
    padding: Spacing.lg,
    paddingTop: Spacing.xxl * 1.5,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  lastUpdated: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    marginBottom: Spacing.xl,
  },
  card: { padding: Spacing.xl },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primaryLight,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  text: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
});
