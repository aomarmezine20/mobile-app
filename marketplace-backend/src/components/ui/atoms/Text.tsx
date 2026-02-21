import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../constants';

interface TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body2' | 'caption' | 'overline';
  color?: 'primary' | 'secondary' | 'muted' | 'inverted' | 'success' | 'error' | 'warning';
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'primary',
  children,
}) => {
  const getTextStyle = () => {
    const baseStyle = {
      color: colors.text[color],
    };

    const variantStyle = {
      h1: typography.text.h1,
      h2: typography.text.h2,
      h3: typography.text.h3,
      h4: typography.text.h4,
      h5: typography.text.h5,
      h6: typography.text.h6,
      body: typography.text.body,
      body2: typography.text.body2,
      caption: typography.text.caption,
      overline: typography.text.overline,
    };

    return {
      ...baseStyle,
      ...variantStyle[variant],
    };
  };

  return (
    <Text style={getTextStyle()}>
      {children}
    </Text>
  );
};

export default Text;