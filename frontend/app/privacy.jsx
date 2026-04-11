import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';
import { Colors, Spacing, FontSizes } from '../constants/theme';

export default function PrivacyPolicy() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Privacy Policy</Text>
          <Text style={styles.lastUpdated}>Last Updated: April 11, 2026</Text>

          <Card variant="glass" style={styles.card}>
            <Text style={styles.sectionTitle}>1. Introduction</Text>
            <Text style={styles.text}>
              Welcome to ShrinQE. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </Text>

            <Text style={styles.sectionTitle}>2. Data We Collect</Text>
            <Text style={styles.text}>
              - **Account Information**: If you create an account, we collect your name, email address, and authentication providers (e.g., Google).{'\n'}
              - **Usage Data**: We collect information about how you use our website, including shortened URLs, click counts, and basic analytics (IP address, browser type, device type).{'\n'}
              - **Image Data**: Most image processing happens directly in your browser. For AI-powered tools, images may be processed on our secure servers but are deleted immediately after processing is complete.
            </Text>

            <Text style={styles.sectionTitle}>3. How We Use Your Data</Text>
            <Text style={styles.text}>
              We use your data to provide our services, maintain your account, generate analytics for your links, and improve our platform's performance and security.
            </Text>

            <Text style={styles.sectionTitle}>4. Data Security</Text>
            <Text style={styles.text}>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed.
            </Text>

            <Text style={styles.sectionTitle}>5. Your Rights</Text>
            <Text style={styles.text}>
              You have the right to access, correct, or delete your personal data at any time through your account settings or by contacting us at saraspace006@gmail.com.
            </Text>

            <Text style={styles.sectionTitle}>6. Contact Us</Text>
            <Text style={styles.text}>
              If you have any questions about this privacy policy or our privacy practices, please contact us at saraspace006@gmail.com.
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
