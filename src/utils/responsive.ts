import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const isTablet = Math.min(width, height) >= 600;
const tabletScaleFactor = isTablet ? 0.85 : 1;

const scaleWidth = (width / guidelineBaseWidth) * tabletScaleFactor;
const scaleHeight = (height / guidelineBaseHeight) * tabletScaleFactor;

export const SW = (size: number): number => {
  return Math.round(PixelRatio.roundToNearestPixel(size * scaleWidth));
};

export const SH = (size: number): number => {
  return Math.round(PixelRatio.roundToNearestPixel(size * scaleHeight));
};

export const MS = (size: number, factor = 0.5): number => {
  const scaledSize = size + (SW(size) - size) * factor;
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
};

export const SF = (size: number): number => {
  const newSize = size * Math.min(scaleWidth, scaleHeight);
  const minSize = size * 0.9;
  const maxSize = size * 1.15;
  const clampedSize = Math.max(minSize, Math.min(newSize, maxSize));
  return Math.round(PixelRatio.roundToNearestPixel(clampedSize));
};

export const scale = SW;
export const verticalScale = SH;
export const moderateScale = MS;
export const fontScale = SF;

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const IS_TABLET = isTablet;
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
