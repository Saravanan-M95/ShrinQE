import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius, Shadows } from '../../constants/theme';
import Button from '../ui/Button';

/**
 * Standardized Premium Modal — replaces native alerts and confirmations.
 */
export default function AlertToast({ 
  visible, 
  message, 
  title,
  type = 'error', 
  onDismiss, 
  onCancel,
  confirmText = 'Okay',
  cancelText = 'Cancel',
  duration = 0 
}) {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // Track if we're rendering to prevent unmount glitching
  const [render, setRender] = React.useState(visible);
  
  // High-fidelity state persistence for dismissal animation
  const lastState = useRef({ 
    message, 
    title, 
    type,
    isConfirmation: !!onCancel,
    confirmText,
    cancelText,
    accentColor: Colors.primary
  });

  useEffect(() => {
    if (visible) {
      // Determine accent color now and store it
      let accent = Colors.error;
      if (type === 'success') accent = Colors.success;
      else if (type === 'warning') accent = Colors.warning;
      else if (type === 'confirm' || type === 'primary') accent = Colors.primary;

      lastState.current = {
        message,
        title,
        type,
        isConfirmation: !!onCancel,
        confirmText,
        cancelText,
        accentColor: accent
      };
      
      setRender(true);
      Animated.parallel([
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 80, friction: 10 }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
      ]).start();
      
      if (duration > 0 && !onCancel && type !== 'error') {
        const timer = setTimeout(() => onDismiss?.(), duration);
        return () => clearTimeout(timer);
      }
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, { toValue: 0.95, duration: 200, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start(({ finished }) => {
        if (finished) setRender(false);
      });
    }
  }, [visible]);

  if (!render) return null;

  // Use persistent state during dismissal to prevent flickering back to red/defaults
  const display = visible ? {
    message,
    title,
    type,
    isConfirmation: !!onCancel,
    confirmText,
    cancelText,
  } : lastState.current;
  
  const accentColor = visible ? (
    type === 'success' ? Colors.success :
    type === 'warning' ? Colors.warning :
    (type === 'confirm' || type === 'primary') ? Colors.primary : Colors.error
  ) : lastState.current.accentColor;

  // Icons mapping
  let iconName = 'alert-circle';
  let defaultTitle = 'Error';

  switch (display.type) {
    case 'success':
      iconName = 'checkmark-circle';
      defaultTitle = 'Success';
      break;
    case 'warning':
      iconName = 'warning';
      defaultTitle = 'Warning';
      break;
    case 'confirm':
      iconName = 'help-circle';
      defaultTitle = 'Confirm';
      break;
    case 'error':
    default:
      iconName = 'alert-circle';
      defaultTitle = 'Error';
      break;
  }

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
        <View style={[styles.iconWrapper]}>
          <View style={[styles.iconGlow, { backgroundColor: accentColor, opacity: 0.15 }]} />
          <Ionicons name={iconName} size={48} color={accentColor} />
        </View>
        <Text style={styles.title}>{display.title || defaultTitle}</Text>
        <Text style={styles.message}>{display.message}</Text>
        
        <View style={[styles.actionRow, display.isConfirmation && styles.actionRowHorizontal]}>
          {display.isConfirmation && (
            <Button 
              title={display.cancelText} 
              onPress={onCancel} 
              variant="outline"
              style={[styles.button, { marginRight: Spacing.sm }]}
              textStyle={{ color: Colors.textSecondary }}
            />
          )}
          <Button 
            title={display.confirmText} 
            onPress={onDismiss} 
            variant="primary"
            style={styles.button}
            // IMPORTANT: Removed explicit backgroundColor override to fix the "2 colours" issue 
            // and use the premium brand gradient instead.
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
    maxWidth: 400,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.lg,
  },
  iconWrapper: {
    marginBottom: Spacing.md,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
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
  },
  actionRowHorizontal: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
  }
});
