import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { authAPI } from '../../services/api';
import { Colors, Spacing, FontSizes, BorderRadius } from '../../constants/theme';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import AlertToast from '../../components/tools/AlertToast';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({ visible: false, message: '', type: 'error', onConfirm: null });

  const handleRequestOtp = async () => {
    if (!email) {
      setModal({ visible: true, message: 'Please enter your email address.', type: 'error' });
      return;
    }

    setIsLoading(true);
    try {
      const res = await authAPI.forgotPassword(email.trim());
      if (res.success) {
        setModal({ 
          visible: true, 
          message: res.message, 
          type: 'success', 
          onConfirm: () => {
            setModal({ visible: false });
            router.push({
              pathname: '/auth/verify-otp',
              params: { email: email.trim() },
            });
          }
        });
      }
    } catch (err) {
      console.log('Forgot password error:', err);
      const status = err?.status;
      const message = err?.message || 'Failed to request reset code.';

      if (status === 404) {
        setModal({
          visible: true,
          title: 'Account Not Found',
          message: message,
          type: 'confirm',
          confirmText: 'Sign Up',
          onConfirm: () => {
            setModal({ visible: false });
            router.push('/signup');
          },
          onCancel: () => setModal({ visible: false })
        });
      } else {
        setModal({ visible: true, message, type: 'error' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity 
        style={styles.backBtn} 
        onPress={() => router.replace('/login')}
      >
        <Ionicons name="arrow-back" size={24} color={Colors.textSecondary} />
      </TouchableOpacity>

      <Card variant="glass" style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons name="mail-unread-outline" size={48} color={Colors.primary} />
        </View>
        
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter your email address and we'll send you a 6-digit code to reset your password.
        </Text>

        <Input
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="e.g. yourname@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          icon={<Ionicons name="mail-outline" size={20} color={Colors.textMuted} />}
        />

        <Button
          title="Send Code"
          onPress={handleRequestOtp}
          loading={isLoading}
          style={styles.submitBtn}
        />
      </Card>

      <AlertToast 
        visible={modal.visible}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        confirmText={modal.confirmText}
        onDismiss={modal.onConfirm || (() => setModal({ ...modal, visible: false }))}
        onCancel={modal.onCancel}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPrimary },
  content: { padding: Spacing.xl, paddingTop: 60, alignItems: 'center' },
  backBtn: { alignSelf: 'flex-start', marginBottom: Spacing.xl },
  card: { width: '100%', maxWidth: 450, padding: Spacing.xl, alignItems: 'center' },
  iconContainer: {
    width: 80, height: 80, borderRadius: 40, 
    backgroundColor: 'rgba(124, 58, 237, 0.1)', 
    alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.lg
  },
  title: { fontSize: FontSizes.xxl, fontWeight: '800', color: Colors.textPrimary, marginBottom: Spacing.sm },
  subtitle: { fontSize: FontSizes.md, color: Colors.textMuted, textAlign: 'center', marginBottom: Spacing.xl, lineHeight: 22 },
  submitBtn: { width: '100%', marginTop: Spacing.md },
});
