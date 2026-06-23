import React, { useEffect, useState } from 'react';
import FastImage, { FastImageProps } from '@d11/react-native-fast-image';

const PLACEHOLDER = require('../assets/placeholder.jpg');

interface RemoteImageProps extends Omit<FastImageProps, 'source' | 'onError'> {
  uri?: string;
}

export function RemoteImage({
  uri,
  resizeMode = FastImage.resizeMode.cover,
  ...rest
}: RemoteImageProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [uri]);

  return (
    <FastImage
      {...rest}
      resizeMode={resizeMode}
      source={uri && !failed ? { uri } : PLACEHOLDER}
      onError={() => setFailed(true)}
    />
  );
}
