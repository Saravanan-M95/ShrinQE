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
import ImagePreviewCompare from '../../components/tools/ImagePreviewCompare';
import DownloadButton from '../../components/tools/DownloadButton';
import AlertToast from '../../components/tools/AlertToast';
import Card from '../../components/ui/Card';
import { Colors, Spacing, FontSizes, BorderRadius } from '../../constants/theme';
import { enhancePhoto, getImageInfo } from '../../services/imageProcessor';

const PRESETS = [
  { id: 'auto', label: '✨ Auto Fix', desc: 'Balanced enhancement for most photos', icon: 'sparkles', color: '#8B5CF6' },
  { id: 'sharpen', label: '🔍 Sharpen', desc: 'Fix blurry or out-of-focus shots', icon: 'eye-outline', color: '#3B82F6' },
  { id: 'denoise', label: '🧹 Denoise', desc: 'Remove grain from noisy photos', icon: 'brush-outline', color: '#14B8A6' },
  { id: 'hdr', label: '🌈 HDR Effect', desc: 'Dramatic contrast and vivid colors', icon: 'sunny-outline', color: '#F59E0B' },
  { id: 'portrait', label: '🧑 Portrait', desc: 'Optimized for faces and selfies', icon: 'person-outline', color: '#EC4899' },
  { id: 'lowlight', label: '🌙 Low Light', desc: 'Rescue extremely dark photos', icon: 'moon-outline', color: '#6366F1' },
];

export default function EnhanceTool() {
  const [file, setFile] = useState(null);
  const [imgInfo, setImgInfo] = useState(null);
  const [preset, setPreset] = useState('auto');
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const handleImageSelect = useCallback(async (selectedFile) => {
    setFile(selectedFile);
    setResult(null);
    if (selectedFile) {
      const info = await getImageInfo(selectedFile);
      setImgInfo(info);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setImgInfo(null);
      setPreviewUrl(null);
    }
  }, []);

  const handleEnhance = async () => {
    if (!file) return;
    setProcessing(true);
    setError('');
    try {
      const enhanced = await enhancePhoto(file, preset);
      setResult(enhanced);
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const activePreset = PRESETS.find(p => p.id === preset);

  return (
    <ToolPageLayout
      title="AI Photo Enhancer"
      description="Transform blurry, dark, or noisy photos into crystal-clear images. Powered by advanced image processing algorithms running on our servers."
      icon="sparkles-outline"
      iconColor="#8B5CF6"
    >
      <AlertToast visible={!!error} message={error} type="error" onDismiss={() => setError('')} />
      <ImageDropZone onImageSelect={handleImageSelect} />

      {file && imgInfo && (
        <Card variant="glass" style={styles.controls}>
          <Text style={styles.controlsTitle}>Enhancement Mode</Text>

          <View style={styles.aiBadge}>
            <Ionicons name="server-outline" size={14} color={Colors.primary} />
            <Text style={styles.aiBadgeText}>
              Processed on ShrinQE servers using advanced Sharp algorithms — 100% free, no API costs.
            </Text>
          </View>

          {/* Preset Grid */}
          <View style={[styles.presetGrid, isMobile && styles.presetGridMobile]}>
            {PRESETS.map((p) => (
              <TouchableOpacity
                key={p.id}
                onPress={() => setPreset(p.id)}
                style={[
                  styles.presetCard,
                  isMobile && styles.presetCardMobile,
                  preset === p.id && styles.presetCardActive,
                  preset === p.id && { borderColor: p.color },
                ]}
              >
                <View style={[styles.presetIconBg, { backgroundColor: p.color + '20' }]}>
                  <Ionicons name={p.icon} size={20} color={p.color} />
                </View>
                <Text style={[
                  styles.presetLabel,
                  preset === p.id && { color: p.color },
                ]}>{p.label}</Text>
                <Text style={styles.presetDesc}>{p.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Info bar */}
          <View style={styles.infoBar}>
            <Ionicons name="image-outline" size={16} color={Colors.textMuted} />
            <Text style={styles.infoText}>
              {imgInfo.width} × {imgInfo.height}px • {(imgInfo.size / 1024).toFixed(0)}KB • Mode: {activePreset?.label || 'Auto Fix'}
            </Text>
          </View>

          <View style={styles.actionRow}>
            <button
              onClick={handleEnhance}
              disabled={processing}
              style={{
                background: processing ? Colors.bgTertiary : `linear-gradient(135deg, ${activePreset?.color || '#8B5CF6'}, #7C3AED)`,
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '14px 32px',
                fontSize: 15,
                fontWeight: 700,
                fontFamily: 'Inter, sans-serif',
                cursor: processing ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {processing ? '⏳ Enhancing...' : `✨ Enhance Photo`}
            </button>
          </View>
        </Card>
      )}

      {result && (
        <View style={styles.resultSection}>
          <ImagePreviewCompare
            originalUrl={previewUrl}
            processedUrl={result.url}
            originalDimensions={imgInfo ? { width: imgInfo.width, height: imgInfo.height } : null}
            processedDimensions={{ width: result.width, height: result.height }}
          />
          <View style={styles.downloadRow}>
            <DownloadButton
              blob={result.blob}
              fileName={`shrinqe-enhanced-${preset}.jpg`}
              size={result.blob.size}
              label="Download Enhanced Photo"
            />
          </View>
        </View>
      )}
    </ToolPageLayout>
  );
}

const styles = StyleSheet.create({
  controls: { marginTop: Spacing.xl, padding: Spacing.xl, gap: Spacing.lg },
  controlsTitle: { fontSize: FontSizes.lg, fontWeight: '700', color: Colors.textPrimary },
  aiBadge: {
    flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm,
    backgroundColor: 'rgba(124, 58, 237, 0.08)', padding: Spacing.md, borderRadius: BorderRadius.sm,
    borderWidth: 1, borderColor: 'rgba(124, 58, 237, 0.15)',
  },
  aiBadgeText: { fontSize: FontSizes.sm, color: Colors.primaryLight, flex: 1, lineHeight: 20 },
  presetGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md,
  },
  presetGridMobile: { gap: Spacing.sm },
  presetCard: {
    width: '30%', minWidth: 150,
    backgroundColor: Colors.bgTertiary, borderRadius: BorderRadius.md,
    padding: Spacing.md, borderWidth: 1.5, borderColor: Colors.borderLight,
    gap: Spacing.xs,
  },
  presetCardMobile: { width: '47%', minWidth: 0 },
  presetCardActive: { backgroundColor: 'rgba(124, 58, 237, 0.06)' },
  presetIconBg: {
    width: 36, height: 36, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  presetLabel: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.textPrimary },
  presetDesc: { fontSize: FontSizes.xs, color: Colors.textMuted, lineHeight: 16 },
  infoBar: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.bgSecondary, padding: Spacing.md, borderRadius: BorderRadius.sm,
  },
  infoText: { fontSize: FontSizes.sm, color: Colors.textSecondary, fontWeight: '500' },
  actionRow: { alignItems: 'flex-start', marginTop: Spacing.sm },
  resultSection: { marginTop: Spacing.xl, gap: Spacing.xl },
  downloadRow: { alignItems: 'center' },
});
