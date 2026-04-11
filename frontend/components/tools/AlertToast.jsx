import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius, Shadows } from '../../constants/theme';
import Button from '../ui/Button';

/**
 * Themed error/success modal alert — replaces browser's default alert() and old top toast
 */
export default function AlertToast({ visible, message, type = 'error', onDismiss, duration = 0 }) {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // Track if we're rendering to prevent unmount glitching
  const [render, setRender] = React.useState(visible);

  useEffect(() => {
    if (visible) {
      setRender(true);
      Animated.parallel([
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 80, friction: 10 }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
      
      if (duration > 0 && type !== 'error') {
        const timer = setTimeout(() => onDismiss?.(), duration);
        return () => clearTimeout(timer);
      }
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, { toValue: 0.9, duration: 200, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start(({ finished }) => {
        if (finished) setRender(false);
      });
    }
  }, [visible]);

  if (!render) return null;

  const isError = type === 'error';
  const iconName = isError ? 'alert-circle' : 'checkmark-circle';
  const accentColor = isError ? Colors.error : Colors.success;

  return (
    <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
      <Animated.View
        style={[
          styles.modalCard,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={[styles.iconContainer, { backgroundColor: isError ? Colors.errorBg : Colors.successBg }]}>
          <Ionicons name={iconName} size={48} color={accentColor} />
        </View>
        <Text style={styles.title}>{isError ? 'Error' : 'Success'}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.actionRow}>
          <Button 
            title="Okay" 
            onPress={onDismiss} 
            fullWidth 
            variant="primary"
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 99999,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    backdropFilter: 'blur(5px)',
  },
  modalCard: {
    backgroundColor: Colors.bgCardHover,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.lg,
  },
  iconContainer: {
    marginBottom: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.full,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  message: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 22,
  },
  actionRow: {
    width: '100%',
  }
});
