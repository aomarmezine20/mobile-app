import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Text, View } from 'react-native';
import { colors, spacing, typography } from '../../constants';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  ...props
}) => {
  const getButtonStyle = () => {
    const baseStyle = {
      paddingHorizontal: spacing.component.padding[size],
      paddingVertical: spacing.component.padding[size] / 2,
      borderRadius: spacing.radius.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      minWidth: size === 'lg' ? 150 : 100,
    };

    const variantStyle = {
      primary: {
        backgroundColor: colors.primary[500],
        borderColor: colors.primary[500],
      },
      secondary: {
        backgroundColor: colors.secondary[500],
        borderColor: colors.secondary[500],
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: colors.primary[500],
        borderWidth: 1,
      },
      ghost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
    };

    return {
      ...baseStyle,
      ...variantStyle[variant],
    };
  };

  const getTextStyle = () => {
    const baseStyle = {
      ...typography.text.button,
      color: variant === 'outline' || variant === 'ghost' 
        ? colors.primary[500] 
        : colors.text.inverted,
    };

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      {...props}
      disabled={loading}
    >
      {loading ? (
        <View style={{
          width: 16,
          height: 16,
          borderWidth: 2,
          borderColor: '#FFFFFF',
          borderTopColor: 'transparent',
          borderRadius: 8,
          marginRight: 8,
        }}>
        </View>
      ) : null}
      <Text style={getTextStyle()}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;