import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../constants';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  children,
}) => {
  const getBadgeStyle = () => {
    const baseStyle = {
      paddingHorizontal: spacing.component.padding.xs,
      paddingVertical: spacing.component.padding.xs / 2,
      borderRadius: spacing.radius.sm,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    const variantStyle = {
      primary: {
        backgroundColor: colors.primary[500],
      },
      secondary: {
        backgroundColor: colors.secondary[500],
      },
      success: {
        backgroundColor: colors.success[500],
      },
      error: {
        backgroundColor: colors.error[500],
      },
      warning: {
        backgroundColor: colors.warning[500],
      },
    };

    return {
      ...baseStyle,
      ...variantStyle[variant],
    };
  };

  const getTextStyle = () => {
    return {
      ...typography.text.caption,
      color: colors.text.inverted,
      fontWeight: '600',
    };
  };

  return (
    <View style={getBadgeStyle()}>
      <Text style={getTextStyle()}>
        {children}
      </Text>
    </View>
  );
};

export default Badge;