import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ToolPageLayout from '../../components/tools/ToolPageLayout';
import ImageDropZone from '../../components/tools/ImageDropZone';
import DownloadButton from '../../components/tools/DownloadButton';
import AlertToast from '../../components/tools/AlertToast';
import Card from '../../components/ui/Card';
import { Colors, Spacing, FontSizes, BorderRadius } from '../../constants/theme';
import { useRouter } from 'expo-router';
import { API_URL } from '../../constants/config';
import { removeBackground } from '../../services/imageProcessor';
import { useAuth } from '../../contexts/AuthContext';

export default function RemoveBackgroundTool() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const router = useRouter();
  const { token, isAuthenticated } = useAuth();

  const handleImageSelect = useCallback((selectedFile) => {
    setFile(selectedFile);
    setResult(null);
  }, []);

  const handleRemove = async () => {
    if (!file) return;
    setProcessing(true);
    setError('');
    try {
      const processed = await removeBackground(file);
      setResult(processed); // contains imageId and watermarked url
    } catch (err) {
      if (err.message === 'AUTH_REQUIRED') {
        setError('Please login to use this premium tool.');
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setError('Background removal failed: ' + err.message);
      }
    } finally {
      setProcessing(false);
    }
  };

  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true);
      if (!token) {
        router.push('/login');
        return;
      }
      
      const response = await fetch(`${API_URL}/api/payments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          orderAmount: 10,
          itemType: 'bg-removal',
          itemId: result.imageId,
          platform: 'mobile' // Force backend to return a hosted payment link
        })
      });

      const data = await response.json();
      if (data.success && data.paymentLink) {
        // Redirect to Cashfree checkout
        window.location.href = data.paymentLink;
      } else {
        setError(data.message || 'Payment intialization failed.');
      }
    } catch (err) {
      setError('Checkout failed: ' + err.message);
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <ToolPageLayout
      title="Remove Background"
      description="Instantly detach the main subject from any background. Driven entirely by on-device AI algorithms."
      icon="cut-outline"
      iconColor="#8B5CF6"
      badge="✨ Neural Network • 100% Client-Side"
    >
      <AlertToast visible={!!error} message={error} type="error" onDismiss={() => setError('')} />
      <ImageDropZone onImageSelect={handleImageSelect} />

      {file && (
        <Card variant="glass" style={styles.controls}>
          <Text style={styles.controlsTitle}>Background Removal Settings</Text>

          <View style={styles.betaBadge}>
            <Ionicons name="sparkles" size={14} color={Colors.warning} />
            <Text style={styles.betaText}>
              Powered by Pro AI. Background removal requires a premium processing fee of ₹10 after preview.
            </Text>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={handleRemove}
              disabled={processing}
              style={{
                backgroundColor: processing ? Colors.bgTertiary : Colors.primary,
                borderRadius: 12,
                paddingVertical: 14,
                paddingHorizontal: 32,
                opacity: processing ? 0.7 : 1,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700', fontFamily: 'Inter' }}>
                {processing ? '⏳ Removing...' : '✂️ Remove Background'}
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      )}

      {result && (
        <View style={styles.resultSection}>
          <Card variant="glass" style={styles.resultCard}>
            <Text style={styles.resultTitle}>✅ Preview Generated</Text>
            {/* Checkerboard pattern to show transparency */}
            <div
              style={{
                background: 'repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50%/20px 20px',
                borderRadius: 12,
                padding: 8,
                display: 'inline-block',
              }}
            >
              <img
                src={result.url}
                alt="No background"
                style={{ maxWidth: '100%', maxHeight: 350, borderRadius: 8, objectFit: 'contain', display: 'block' }}
              />
            </div>
          </Card>
          <View style={styles.downloadRow}>
            <TouchableOpacity
               onPress={handleCheckout}
               disabled={checkoutLoading}
               style={{
                 backgroundColor: checkoutLoading ? Colors.bgTertiary : Colors.primary,
                 borderRadius: 12,
                 paddingVertical: 14,
                 paddingHorizontal: 32,
                 opacity: checkoutLoading ? 0.7 : 1,
                 shadowColor: Colors.primary,
                 shadowOffset: { width: 0, height: 4 },
                 shadowOpacity: 0.3,
                 shadowRadius: 12,
               }}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800', fontFamily: 'Inter' }}>
                {checkoutLoading ? 'Redirecting...' : '💳 Pay ₹10 & Download (No Watermark)'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ToolPageLayout>
  );
}

const styles = StyleSheet.create({
  controls: { marginTop: Spacing.xl, padding: Spacing.xl, gap: Spacing.lg },
  controlsTitle: { fontSize: FontSizes.lg, fontWeight: '700', color: Colors.textPrimary },
  betaBadge: {
    flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm,
    backgroundColor: Colors.warningBg, padding: Spacing.md, borderRadius: BorderRadius.sm,
    borderWidth: 1, borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  betaText: { fontSize: FontSizes.sm, color: Colors.warning, flex: 1, lineHeight: 20 },
  sliderGroup: { gap: Spacing.sm },
  sliderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sliderLabel: { fontSize: FontSizes.sm, fontWeight: '600', color: Colors.textSecondary },
  sliderValue: { fontSize: FontSizes.md, fontWeight: '800', color: Colors.primaryLight },
  sliderHints: { flexDirection: 'row', justifyContent: 'space-between' },
  hintText: { fontSize: FontSizes.xs, color: Colors.textMuted },
  inputGroup: { gap: Spacing.sm },
  inputLabel: { fontSize: FontSizes.sm, fontWeight: '600', color: Colors.textSecondary },
  hint: { fontSize: FontSizes.xs, color: Colors.textMuted },
  colorRow: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'center', flexWrap: 'wrap' },
  colorChip: {
    width: 36, height: 36, borderRadius: 8, borderWidth: 2, borderColor: Colors.borderLight,
    alignItems: 'center', justifyContent: 'center',
  },
  autoChip: { backgroundColor: Colors.bgTertiary },
  colorChipActive: { borderColor: Colors.primary, borderWidth: 2.5 },
  autoText: { fontSize: FontSizes.xs, color: Colors.textMuted, fontWeight: '700' },
  actionRow: { alignItems: 'flex-start', marginTop: Spacing.sm },
  resultSection: { marginTop: Spacing.xl, gap: Spacing.lg, alignItems: 'center' },
  resultCard: { padding: Spacing.xl, gap: Spacing.md, alignItems: 'center' },
  resultTitle: { fontSize: FontSizes.lg, fontWeight: '700', color: Colors.success },
  downloadRow: { alignItems: 'center' },
});
