import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import AlertToast from '../components/tools/AlertToast';
import { usePageMeta, useAdSense } from '../hooks/useSEO';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  usePageMeta(
    'Contact Us | ShrinQE',
    'Get in touch with the ShrinQE team. Send us feedback, report issues, or ask questions about our URL shortener and image tools.'
  );
  useAdSense();

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      return;
    }

    setIsSubmitting(true);
    setStatus(null);
    
    try {
      // Open mailto: as a reliable contact method
      const subject = encodeURIComponent(`ShrinQE Contact: Message from ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
      const mailtoUrl = `mailto:saraspace006@gmail.com?subject=${subject}&body=${body}`;
      
      if (typeof window !== 'undefined') {
        window.open(mailtoUrl, '_blank');
      }
      
      setIsSubmitting(false);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setIsSubmitting(false);
      setStatus('error');
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <AlertToast 
            visible={!!status} 
            message={status === 'success' ? 'Your message has been sent! We will get back to you shortly.' : 'Please fill in all the required fields.'} 
            type={status === 'success' ? 'success' : 'error'} 
            onDismiss={() => setStatus(null)} 
          />

          <View style={styles.headerSection}>
            <Text style={styles.title}>Contact Us</Text>
            <Text style={styles.subtitle}>
              We'd love to hear from you. Please fill out this form or shoot us an email.
            </Text>
          </View>

          <View style={styles.grid}>
            {/* Contact Info Side */}
            <View style={styles.infoCol}>
              <Card variant="glass" style={styles.infoCard}>
                <View style={styles.infoRow}>
                  <View style={styles.iconBox}>
                    <Ionicons name="mail" size={24} color={Colors.primary} />
                  </View>
                  <View>
                    <Text style={styles.infoLabel}>Email Us</Text>
                    <Text style={styles.infoValue}>saraspace006@gmail.com</Text>
                  </View>
                </View>
                
                <View style={styles.infoRow}>
                  <View style={styles.iconBox}>
                    <Ionicons name="location" size={24} color={Colors.primary} />
                  </View>
                  <View>
                    <Text style={styles.infoLabel}>Our Location</Text>
                    <Text style={styles.infoValue}>New Delhi, India</Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <View style={styles.iconBox}>
                    <Ionicons name="time" size={24} color={Colors.primary} />
                  </View>
                  <View>
                    <Text style={styles.infoLabel}>Working Hours</Text>
                    <Text style={styles.infoValue}>Mon - Fri: 9am - 6pm IST</Text>
                  </View>
                </View>
              </Card>
            </View>

            {/* Contact Form Side */}
            <View style={styles.formCol}>
              <Card variant="glass" style={styles.formCard}>
                <Text style={styles.formTitle}>Send a Message</Text>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Your Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="John Doe"
                    placeholderTextColor={Colors.textMuted}
                    value={form.name}
                    onChangeText={(v) => setForm({ ...form, name: v })}
                    editable={!isSubmitting}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email Address</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="john@example.com"
                    placeholderTextColor={Colors.textMuted}
                    value={form.email}
                    onChangeText={(v) => setForm({ ...form, email: v })}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!isSubmitting}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Message</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="How can we help you?"
                    placeholderTextColor={Colors.textMuted}
                    value={form.message}
                    onChangeText={(v) => setForm({ ...form, message: v })}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    editable={!isSubmitting}
                  />
                </View>

                <TouchableOpacity 
                  style={[styles.submitBtn, isSubmitting && styles.submitBtnDisabled]}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  <Text style={styles.submitText}>{isSubmitting ? 'Sending...' : 'Send Message'}</Text>
                </TouchableOpacity>
              </Card>
            </View>
          </View>
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
    maxWidth: 1000,
    width: '100%',
    alignSelf: 'center',
    padding: Spacing.lg,
    paddingTop: Spacing.xxl * 1.5,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 600,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xl,
  },
  infoCol: {
    flex: 1,
    minWidth: 300,
  },
  formCol: {
    flex: 2,
    minWidth: 320,
  },
  infoCard: {
    padding: Spacing.xl,
    gap: Spacing.xl,
    height: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.bgTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  formCard: {
    padding: Spacing.xl,
  },
  formTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  input: {
    backgroundColor: Colors.bgTertiary,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    color: Colors.textPrimary,
    fontSize: FontSizes.md,
    outlineStyle: 'none',
  },
  textArea: {
    minHeight: 120,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  submitBtnDisabled: {
    opacity: 0.7,
  },
  submitText: {
    color: '#fff',
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
});
