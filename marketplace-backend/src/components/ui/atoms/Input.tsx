import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../constants';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  variant?: 'default' | 'outlined';
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  variant = 'default',
  style,
  ...props
}) => {
  const getContainerStyle = () => {
    const baseStyle = {
      marginBottom: spacing.component.margin.md,
    };

    const variantStyle = {
      default: {},
      outlined: {
        backgroundColor: colors.background.secondary,
        borderRadius: spacing.radius.md,
        padding: spacing.component.padding.sm,
        borderWidth: 1,
        borderColor: error ? colors.error[500] : colors.neutral[300],
      },
    };

    return {
      ...baseStyle,
      ...variantStyle[variant],
    };
  };

  const getLabelStyle = () => {
    return {
      ...typography.text.body2,
      color: colors.text.primary,
      marginBottom: spacing.component.margin.xs,
    };
  };

  const getInputStyle = () => {
    const baseStyle = {
      ...typography.text.body,
      color: colors.text.primary,
      padding: 0,
      height: 40,
    };

    const variantStyle = {
      default: {},
      outlined: {
        backgroundColor: 'transparent',
        padding: 0,
      },
    };

    return {
      ...baseStyle,
      ...variantStyle[variant],
      ...style,
    };
  };

  const getErrorStyle = () => {
    return {
      ...typography.text.caption,
      color: colors.error[500],
      marginTop: spacing.component.margin.xs,
    };
  };

  return (
    <View style={getContainerStyle()}>
      {label && (
        <Text style={getLabelStyle()}>
          {label}
        </Text>
      )}
      <TextInput
        style={getInputStyle()}
        placeholderTextColor={colors.text.muted}
        {...props}
      />
      {error && (
        <Text style={getErrorStyle()}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;