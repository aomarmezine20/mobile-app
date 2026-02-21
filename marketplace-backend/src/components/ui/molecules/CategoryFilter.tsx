import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../constants';
import { Badge } from '../atoms/Badge';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.selectedButton,
          ]}
          onPress={() => onCategorySelect(category)}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === category && styles.selectedText,
            ]}>
            {category}
          </Text>
          {selectedCategory === category && (
            <Badge variant="primary">
              {category.charAt(0).toUpperCase()}
            </Badge>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: spacing.component.margin.sm,
    marginBottom: spacing.component.margin.md,
  },
  categoryButton: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.component.padding.sm,
    paddingVertical: spacing.component.padding.xs,
    borderRadius: spacing.radius.sm,
    marginRight: spacing.component.margin.xs,
    marginBottom: spacing.component.margin.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: colors.primary[50],
    borderWidth: 1,
    borderColor: colors.primary[500],
  },
  categoryText: {
    ...typography.text.caption,
    color: colors.text.primary,
  },
  selectedText: {
    color: colors.primary[500],
    fontWeight: '600',
  },
});

export default CategoryFilter;