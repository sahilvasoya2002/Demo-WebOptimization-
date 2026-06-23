import { useCallback, useRef } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SIMPLE_HEADER_HEIGHT } from '../theme/layout';

/**
 * Custom hook to calculate header translation based on scroll direction.
 * Hides the header when scrolling down, and reveals it when scrolling up.
 */
export function useHideHeaderOnScroll(baseHeaderHeight = SIMPLE_HEADER_HEIGHT) {
  const insets = useSafeAreaInsets();
  const headerHeight = baseHeaderHeight + insets.top;
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentY = event.nativeEvent.contentOffset.y;
      const diff = currentY - lastScrollY.current;

      if (diff > 5 && currentY > headerHeight) {
        Animated.timing(translateY, {
          toValue: -headerHeight,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else if (diff < -5) {
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }

      lastScrollY.current = currentY;
    },
    [translateY, headerHeight],
  );

  return { translateY, onScroll, headerHeight };
}

