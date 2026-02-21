import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing } from '../../constants';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSearch?: () => void;
  onClear?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search products...',
  value,
  onChangeText,
  onSearch,
  onClear,
}) => {
  const handleClear = () => {
    onChangeText('');
    if (onClear) onClear();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={colors.text.muted}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.text.muted}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="never"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Ionicons
              name="close-circle"
              size={20}
              color={colors.text.muted}
            />
          </TouchableOpacity>
        )}
      </View>
      {onSearch && (
        <TouchableOpacity onPress={onSearch} style={styles.searchButton}>
          <Ionicons name="search" size={20} color={colors.primary[500]} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.radius.md,
    padding: spacing.component.padding.sm,
    marginHorizontal: spacing.component.margin.sm,
    marginVertical: spacing.component.margin.sm,
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    borderRadius: spacing.radius.md,
    paddingHorizontal: spacing.component.padding.sm,
  },
  icon: {
    marginRight: spacing.component.margin.xs,
  },
  input: {
    flex: 1,
    height: 40,
    color: colors.text.primary,
  },
  searchButton: {
    marginLeft: spacing.component.margin.sm,
    padding: spacing.component.padding.xs,
  },
});

export default SearchBar;