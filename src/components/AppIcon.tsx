import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MS } from '../utils/responsive';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface AppIconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export function AppIcon({ name, size = MS(22), color }: AppIconProps) {
  return <Ionicons name={name} size={size} color={color} />;
}
