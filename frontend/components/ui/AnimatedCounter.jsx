import React, { useState, useEffect, useRef } from 'react';
import { Text, Animated } from 'react-native';

export default function AnimatedCounter({ value, style }) {
  const [displayValue, setDisplayValue] = useState('0');
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Parse the numeric part of the value (e.g., "10M+" -> 10, "99.9%" -> 99.9)
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    const suffix = value.replace(/[0-9.]/g, '');

    Animated.timing(animatedValue, {
      toValue: numericValue,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    const listenerId = animatedValue.addListener((state) => {
      // Format the value based on whether it has a decimal
      const formatted = numericValue % 1 === 0 
        ? Math.floor(state.value).toString() 
        : state.value.toFixed(1);
      setDisplayValue(formatted + suffix);
    });

    return () => animatedValue.removeListener(listenerId);
  }, [value]);

  return <Text style={style}>{displayValue}</Text>;
}
