import React from 'react';
import { Animated, type StyleProp, type ViewStyle } from 'react-native';
import { useSkeletonPulse } from '../../hooks/useSkeletonPulse';

interface SkeletonPulseProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function SkeletonPulse({ children, style }: SkeletonPulseProps) {
  const opacity = useSkeletonPulse();

  return <Animated.View style={[style, { opacity }]}>{children}</Animated.View>;
}
