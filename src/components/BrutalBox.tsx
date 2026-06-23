import React, { ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../theme/colors';
import { brutal } from '../theme/brutal';

interface BrutalBoxProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  activeOpacity?: number;
}

// Custom neobrutalist card container with a solid black border and offset drop shadow.
// Becomes a clickable button if an onPress handler is provided.
export function BrutalBox({
  children,
  style,
  contentStyle,
  onPress,
  activeOpacity = 0.9,
}: BrutalBoxProps) {
  const inner = (
    <View style={[styles.content, contentStyle]}>{children}</View>
  );

  return (
    <View style={[styles.wrap, style]}>
      <View style={styles.shadow} />
      {onPress ? (
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={onPress}
          style={styles.touchable}>
          {inner}
        </TouchableOpacity>
      ) : (
        inner
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
  },
  touchable: {
    width: '100%',
  },
  shadow: {
    position: 'absolute',
    top: brutal.shadowOffset,
    left: brutal.shadowOffset,
    right: -brutal.shadowOffset,
    bottom: -brutal.shadowOffset,
    borderRadius: brutal.radius,
    backgroundColor: brutal.borderColor,
  },
  content: {
    backgroundColor: colors.card,
    borderRadius: brutal.radius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    overflow: 'hidden',
    width: '100%',
  },
});
