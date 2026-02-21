import React from 'react';
import { View, ViewProps } from 'react-native';
import { colors, spacing, typography } from '../../constants';

interface CardProps extends ViewProps {
  variant?: 'default' | 'elevated' | 'outlined';
  children: React.ReactNode;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  onPress,
  ...props
}) => {
  const getCardStyle = () => {
    const baseStyle = {
      backgroundColor: colors.background.primary,
      borderRadius: spacing.radius.md,
      padding: spacing.component.padding.md,
      margin: spacing.component.margin.sm,
      ...props.style,
    };

    const variantStyle = {
      default: {},
      elevated: {
        ...spacing.shadow.md,
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.neutral[200],
      },
    };

    return {
      ...baseStyle,
      ...variantStyle[variant],
    };
  };

  if (onPress) {
    return (
      <View style={getCardStyle()}>
        <TouchableOpacity onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  }

  return <View style={getCardStyle()}>{children}</View>;
};

export default Card;