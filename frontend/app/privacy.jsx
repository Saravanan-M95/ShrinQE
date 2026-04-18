import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';
import { Colors, Spacing, FontSizes } from '../constants/theme';
import { usePageMeta, useAdSense } from '../hooks/useSEO';

export default function PrivacyPolicy() {
  usePageMeta(
    'Privacy Policy | ShrinQE',
    'Read the ShrinQE privacy policy. Learn how we collect, use, and protect your personal data when you use our URL shortener and image tools.'
  );
  useAdSense();

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Privacy Policy</Text>
          <Text style={styles.lastUpdated}>Last Updated: April 18, 2026</Text>

          <Card variant="glass" style={styles.card}>
            <Text style={styles.sectionTitle}>1. Introduction</Text>
            <Text style={styles.text}>
              Welcome to ShrinQE ("we", "our", or "us"). We are committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at shrinqe.com (the "Site") and use our services, including URL shortening, link analytics, and image processing tools. ShrinQE is the legal entity responsible for your data.
            </Text>
            <Text style={styles.text}>
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Site or use our services.
            </Text>

            <Text style={styles.sectionTitle}>2. Information We Collect</Text>
            <Text style={styles.subTitle}>2.1 Personal Information</Text>
            <Text style={styles.text}>
              When you create an account, we collect:{'\n'}
              • Your name and email address{'\n'}
              • Authentication provider details (e.g., Google OAuth){'\n'}
              • Profile display name{'\n'}
              We do not collect payment information directly — all payments are processed through our third-party payment processor, Cashfree, which has its own privacy policy.
            </Text>

            <Text style={styles.subTitle}>2.2 Usage Data</Text>
            <Text style={styles.text}>
              We automatically collect certain information when you use our services:{'\n'}
              • URLs you shorten (to provide the shortening service){'\n'}
              • Click analytics data: IP address, approximate geographic location, browser type, device type, operating system, and referrer URL{'\n'}
              • Pages visited on our Site and time spent on each page{'\n'}
              • Error logs and performance data
            </Text>

            <Text style={styles.subTitle}>2.3 Image Data</Text>
            <Text style={styles.text}>
              For browser-based tools (Compress, Resize, Crop, Rotate, Convert, Meme Generator, Photo Editor, Watermark, Blur Face): Your images are processed entirely within your web browser using client-side JavaScript. No image data is sent to our servers.{'\n\n'}
              For AI-powered tools (Background Removal, AI Enhance, Upscale): Images are temporarily uploaded to our secure processing servers. These images are processed in transient memory and are permanently deleted immediately upon completion. We do not store, copy, or retain your images beyond the processing duration (typically under 30 seconds).
            </Text>

            <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
            <Text style={styles.text}>
              We use the information we collect to:{'\n'}
              • Provide, maintain, and improve our services{'\n'}
              • Create and manage your account{'\n'}
              • Generate analytics reports for your shortened URLs{'\n'}
              • Process your image editing requests{'\n'}
              • Send service-related communications (e.g., password reset emails, account verification){'\n'}
              • Detect and prevent fraud, abuse, and security threats{'\n'}
              • Monitor and analyze usage trends and preferences{'\n'}
              • Comply with legal obligations
            </Text>

            <Text style={styles.sectionTitle}>4. Cookies and Tracking Technologies</Text>
            <Text style={styles.text}>
              We use cookies and similar tracking technologies to track activity on our Site and hold certain information.
            </Text>
            <Text style={styles.subTitle}>4.1 Essential Cookies</Text>
            <Text style={styles.text}>
              These are necessary for the Site to function properly, including authentication tokens and session management. You cannot opt out of essential cookies.
            </Text>
            <Text style={styles.subTitle}>4.2 Analytics Cookies</Text>
            <Text style={styles.text}>
              We use analytics cookies to understand how visitors interact with our Site. This helps us improve our services and user experience.
            </Text>
            <Text style={styles.subTitle}>4.3 Advertising Cookies</Text>
            <Text style={styles.text}>
              We use Google AdSense to display advertisements on our Site. Google AdSense uses cookies to serve ads based on your prior visits to our Site and other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our Site and/or other sites on the Internet. You may opt out of personalized advertising by visiting Google's Ads Settings at https://www.google.com/settings/ads.
            </Text>

            <Text style={styles.sectionTitle}>5. Third-Party Services</Text>
            <Text style={styles.text}>
              We use the following third-party services that may collect information about you:{'\n\n'}
              • <Text style={styles.bold}>Google AdSense:</Text> Displays advertisements on our Site. Google may use cookies to personalize ads. See Google's Privacy Policy at https://policies.google.com/privacy{'\n\n'}
              • <Text style={styles.bold}>Google OAuth:</Text> Used for account authentication. We receive your name, email, and profile picture from Google when you sign in.{'\n\n'}
              • <Text style={styles.bold}>Cashfree:</Text> Processes payments for premium features. We do not store your payment card details.{'\n\n'}
              • <Text style={styles.bold}>Cloudinary:</Text> Processes AI image operations. Images are processed and immediately deleted.{'\n\n'}
              Each of these services has its own privacy policy governing its use of your data.
            </Text>

            <Text style={styles.sectionTitle}>6. Data Retention</Text>
            <Text style={styles.text}>
              • <Text style={styles.bold}>Account data:</Text> Retained as long as your account is active. When you delete your account, all personal data is permanently removed within 30 days.{'\n'}
              • <Text style={styles.bold}>Shortened URLs:</Text> Retained as long as your account is active. Deleted URLs are removed permanently.{'\n'}
              • <Text style={styles.bold}>Click analytics:</Text> Retained for the lifetime of the associated shortened URL.{'\n'}
              • <Text style={styles.bold}>Image data (AI tools):</Text> Deleted immediately after processing, typically within 30 seconds. No copies are retained.{'\n'}
              • <Text style={styles.bold}>Image data (browser tools):</Text> Never leaves your device. No data to retain.{'\n'}
              • <Text style={styles.bold}>Server logs:</Text> Retained for up to 90 days for security and debugging purposes, then automatically purged.
            </Text>

            <Text style={styles.sectionTitle}>7. Data Security</Text>
            <Text style={styles.text}>
              We implement appropriate technical and organizational security measures to protect your personal data, including:{'\n'}
              • HTTPS/TLS encryption for all data in transit{'\n'}
              • Encrypted storage for sensitive data at rest{'\n'}
              • Regular security audits and vulnerability assessments{'\n'}
              • Access controls limiting employee access to personal data{'\n'}
              • Automatic malicious URL detection and blocking{'\n\n'}
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal data, we cannot guarantee its absolute security.
            </Text>

            <Text style={styles.sectionTitle}>8. Your Rights</Text>
            <Text style={styles.text}>
              Depending on your jurisdiction, you may have the following rights regarding your personal data:{'\n'}
              • <Text style={styles.bold}>Access:</Text> Request a copy of the personal data we hold about you.{'\n'}
              • <Text style={styles.bold}>Correction:</Text> Request correction of inaccurate or incomplete data.{'\n'}
              • <Text style={styles.bold}>Deletion:</Text> Request deletion of your personal data (available via account settings or by contacting us).{'\n'}
              • <Text style={styles.bold}>Portability:</Text> Request your data in a portable, machine-readable format.{'\n'}
              • <Text style={styles.bold}>Objection:</Text> Object to processing of your data for certain purposes.{'\n'}
              • <Text style={styles.bold}>Withdraw consent:</Text> Where processing is based on consent, you may withdraw it at any time.{'\n\n'}
              To exercise any of these rights, please contact us at saraspace006@gmail.com. We will respond to your request within 30 days.
            </Text>

            <Text style={styles.sectionTitle}>9. Children's Privacy</Text>
            <Text style={styles.text}>
              Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we discover that a child under 13 has provided us with personal information, we will delete it promptly. If you are a parent or guardian and believe your child has provided us with personal data, please contact us at saraspace006@gmail.com.
            </Text>

            <Text style={styles.sectionTitle}>10. International Data Transfers</Text>
            <Text style={styles.text}>
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country. By using our services, you consent to the transfer of your information to these countries. We take steps to ensure that your data receives an adequate level of protection in the jurisdictions in which we process it.
            </Text>

            <Text style={styles.sectionTitle}>11. Changes to This Policy</Text>
            <Text style={styles.text}>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date above. You are advised to review this Privacy Policy periodically for any changes. Changes are effective when they are posted on this page.
            </Text>

            <Text style={styles.sectionTitle}>12. Contact Us</Text>
            <Text style={styles.text}>
              If you have any questions about this Privacy Policy, your data, or our privacy practices, please contact us:{'\n\n'}
              Email: saraspace006@gmail.com{'\n'}
              Website: https://shrinqe.com/contact{'\n'}
              Location: Coimbatore, Tamil Nadu, India
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
  subTitle: {
    fontSize: FontSizes.md, fontWeight: '600', color: Colors.textPrimary,
    marginTop: Spacing.md, marginBottom: Spacing.xs,
  },
  text: {
    fontSize: FontSizes.md, color: Colors.textSecondary, lineHeight: 26,
  },
  bold: { fontWeight: '700', color: Colors.textPrimary },
});
