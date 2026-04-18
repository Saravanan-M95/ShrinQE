import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';
import { Colors, Spacing, FontSizes } from '../constants/theme';
import { usePageMeta, useAdSense } from '../hooks/useSEO';

export default function TermsOfService() {
  usePageMeta(
    'Terms of Service | ShrinQE',
    'Read the ShrinQE terms of service. Understand the rules, responsibilities, and guidelines for using our URL shortener and image tools.'
  );
  useAdSense();

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Terms of Service</Text>
          <Text style={styles.lastUpdated}>Last Updated: April 18, 2026</Text>

          <Card variant="glass" style={styles.card}>
            <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
            <Text style={styles.text}>
              By accessing or using ShrinQE (the "Service"), available at shrinqe.com, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all of these Terms, you must immediately stop using the Service. These Terms constitute a legally binding agreement between you and ShrinQE.
            </Text>

            <Text style={styles.sectionTitle}>2. Description of Service</Text>
            <Text style={styles.text}>
              ShrinQE provides the following services:{'\n'}
              • URL shortening with custom short codes and analytics tracking{'\n'}
              • QR code generation for shortened links{'\n'}
              • Browser-based image processing tools (compress, resize, crop, rotate, convert, meme generator, photo editor, watermark, blur face){'\n'}
              • AI-powered image tools (background removal, image enhancement, upscaling){'\n\n'}
              We reserve the right to modify, suspend, or discontinue any part of the Service at any time without prior notice.
            </Text>

            <Text style={styles.sectionTitle}>3. Account Registration</Text>
            <Text style={styles.text}>
              To access certain features of the Service (such as URL shortening and analytics), you must create an account. When registering, you agree to:{'\n'}
              • Provide accurate, current, and complete information{'\n'}
              • Maintain the security of your account credentials{'\n'}
              • Accept responsibility for all activities that occur under your account{'\n'}
              • Notify us immediately of any unauthorized use of your account{'\n\n'}
              You must be at least 13 years of age to create an account and use our services. By creating an account, you represent that you meet this age requirement.
            </Text>

            <Text style={styles.sectionTitle}>4. Acceptable Use</Text>
            <Text style={styles.text}>
              You agree not to use the Service to:{'\n'}
              • Shorten URLs that link to malware, phishing sites, or any malicious content{'\n'}
              • Distribute spam or unsolicited communications via shortened links{'\n'}
              • Create links to content that violates any applicable law or regulation{'\n'}
              • Infringe upon the intellectual property rights of others{'\n'}
              • Distribute content that is defamatory, obscene, threatening, or harassing{'\n'}
              • Attempt to gain unauthorized access to other users' accounts or our systems{'\n'}
              • Use automated tools to create links in bulk without our prior written consent{'\n'}
              • Circumvent any security measures or access restrictions{'\n'}
              • Process images that contain illegal content{'\n\n'}
              We reserve the right to disable any shortened URL or terminate any account that violates these guidelines, without prior notice.
            </Text>

            <Text style={styles.sectionTitle}>5. User Content</Text>
            <Text style={styles.text}>
              "User Content" refers to URLs you shorten, images you process, and any other content you submit through the Service.{'\n\n'}
              You retain ownership of your User Content. By using the Service, you grant ShrinQE a limited, non-exclusive license to host, process, and serve your content solely as necessary to provide the Service.{'\n\n'}
              For browser-based image tools, your images never leave your device, so no license grant is necessary. For AI-powered tools, you grant us a temporary license to process the image, which expires immediately upon completion of the processing operation.
            </Text>

            <Text style={styles.sectionTitle}>6. Intellectual Property</Text>
            <Text style={styles.text}>
              The Service, including its original content (excluding User Content), features, functionality, design, and branding, is owned by ShrinQE and is protected by copyright, trademark, and other intellectual property laws.{'\n\n'}
              The ShrinQE name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of ShrinQE. You must not use such marks without our prior written permission.
            </Text>

            <Text style={styles.sectionTitle}>7. Link Availability and Expiration</Text>
            <Text style={styles.text}>
              Shortened links created through ShrinQE are intended to remain active indefinitely, as long as:{'\n'}
              • Your account remains active and in good standing{'\n'}
              • The link complies with our Acceptable Use policy{'\n'}
              • The link has not been reported and confirmed as abusive{'\n\n'}
              We reserve the right to disable or delete any link at any time if we determine it violates our Terms or poses a risk to our users or systems.
            </Text>

            <Text style={styles.sectionTitle}>8. Privacy</Text>
            <Text style={styles.text}>
              Your use of the Service is also governed by our Privacy Policy, available at https://shrinqe.com/privacy. By using the Service, you consent to the collection and use of information as described in our Privacy Policy.
            </Text>

            <Text style={styles.sectionTitle}>9. Third-Party Services and Advertising</Text>
            <Text style={styles.text}>
              The Service may contain links to third-party websites, advertisements served by Google AdSense, and integrations with third-party services. We are not responsible for the content, privacy policies, or practices of any third-party websites or services.{'\n\n'}
              We use Google AdSense to display advertisements on certain pages of our Site. These advertisements help us keep the Service free for all users. By using the Service, you acknowledge that advertisements may be displayed alongside your content and interactions.
            </Text>

            <Text style={styles.sectionTitle}>10. Disclaimer of Warranties</Text>
            <Text style={styles.text}>
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND FREEDOM FROM COMPUTER VIRUS OR OTHER HARMFUL COMPONENTS.{'\n\n'}
              We do not warrant that:{'\n'}
              • The Service will be uninterrupted, timely, secure, or error-free{'\n'}
              • The results from using the Service will be accurate or reliable{'\n'}
              • Any errors in the Service will be corrected{'\n'}
              • The quality of any products, services, information, or other material obtained through the Service will meet your expectations
            </Text>

            <Text style={styles.sectionTitle}>11. Limitation of Liability</Text>
            <Text style={styles.text}>
              IN NO EVENT SHALL SHRINQE, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:{'\n'}
              • Your access to or use of (or inability to access or use) the Service{'\n'}
              • Any conduct or content of any third party on the Service{'\n'}
              • Any content obtained from the Service{'\n'}
              • Unauthorized access, use, or alteration of your transmissions or content
            </Text>

            <Text style={styles.sectionTitle}>12. Indemnification</Text>
            <Text style={styles.text}>
              You agree to defend, indemnify, and hold harmless ShrinQE and its officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Service.
            </Text>

            <Text style={styles.sectionTitle}>13. Termination</Text>
            <Text style={styles.text}>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.{'\n\n'}
              Upon termination, your right to use the Service will immediately cease. All shortened URLs associated with your account may be disabled. If you wish to terminate your account, you may do so through the Settings page or by contacting us.
            </Text>

            <Text style={styles.sectionTitle}>14. Changes to Terms</Text>
            <Text style={styles.text}>
              We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect by posting the updated Terms on this page. What constitutes a material change will be determined at our sole discretion.{'\n\n'}
              By continuing to access or use the Service after any revisions become effective, you agree to be bound by the revised Terms.
            </Text>

            <Text style={styles.sectionTitle}>15. Governing Law</Text>
            <Text style={styles.text}>
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from or relating to these Terms or the Service shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India.
            </Text>

            <Text style={styles.sectionTitle}>16. Severability</Text>
            <Text style={styles.text}>
              If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law, and the remaining provisions will continue in full force and effect.
            </Text>

            <Text style={styles.sectionTitle}>17. Contact Us</Text>
            <Text style={styles.text}>
              If you have any questions about these Terms of Service, please contact us:{'\n\n'}
              Email: saraspace006@gmail.com{'\n'}
              Website: https://shrinqe.com/contact{'\n'}
              Location: New Delhi, India
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
});
