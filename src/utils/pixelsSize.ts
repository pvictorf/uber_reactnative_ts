import { Platform, PixelRatio } from 'react-native';

export function getPixelSize(pixels: number) {
  return Platform.select({
    ios: pixels,
    android: PixelRatio.getPixelSizeForLayoutSize(pixels)
  })
}