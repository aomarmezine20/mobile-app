import React from 'react';
import { Image, ImageProps } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../../constants';

interface ImageProps extends ImageProps {
  variant?: 'default' | 'rounded' | 'circle';
  size?: 'sm' | 'md' | 'lg';
}

const Image: React.FC<ImageProps> = ({
  variant = 'default',
  size = 'md',
  style,
  ...props
}) => {
  const getSize = () => {
    const sizeMap = {
      sm: 40,
      md: 60,
      lg: 80,
    };
    return sizeMap[size];
  };

  const getBorderRadius = () => {
    const borderRadiusMap = {
      default: spacing.radius.sm,
      rounded: spacing.radius.md,
      circle: spacing.radius.circle,
    };
    return borderRadiusMap[variant];
  };

  const getImageStyle = () => {
    return [
      {
        width: getSize(),
        height: getSize(),
        borderRadius: getBorderRadius(),
      },
      style,
    ];
  };

  return (
    <View style={{
      borderRadius: getBorderRadius(),
      overflow: 'hidden',
    }}>
      <Image
        style={getImageStyle()}
        resizeMode="cover"
        {...props}
      />
    </View>
  );
};

export default Image;