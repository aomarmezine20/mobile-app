import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../constants';
import { Image } from '../atoms/Image';

interface ProfileCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;
  };
  onEdit?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  onEdit,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: user.avatar }}
          variant="circle"
          size="lg"
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text variant="h5" style={styles.name}>
            {user.name}
          </Text>
          <Text variant="caption" style={styles.email}>
            {user.email}
          </Text>
          <Text variant="overline" style={styles.role}>
            {user.role}
          </Text>
        </View>
        {onEdit && (
          <TouchableOpacity onPress={onEdit} style={styles.editButton}>
            <Text variant="caption" style={styles.editText}>
              Edit
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text variant="h6" style={styles.statNumber}>
            15
          </Text>
          <Text variant="caption" style={styles.statLabel}>
            Orders
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text variant="h6" style={styles.statNumber}>
            4.5
          </Text>
          <Text variant="caption" style={styles.statLabel}>
            Rating
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text variant="h6" style={styles.statNumber}>
            3
          </Text>
          <Text variant="caption" style={styles.statLabel}>
            Products
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    borderRadius: spacing.radius.md,
    padding: spacing.component.padding.md,
    margin: spacing.component.margin.sm,
    ...spacing.shadow.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.component.margin.md,
  },
  avatar: {
    width: 80,
    height: 80,
    marginRight: spacing.component.margin.md,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    marginBottom: spacing.component.margin.xs,
  },
  email: {
    color: colors.text.muted,
    marginBottom: spacing.component.margin.xs,
  },
  role: {
    color: colors.primary[500],
  },
  editButton: {
    padding: spacing.component.padding.xs,
  },
  editText: {
    color: colors.primary[500],
    fontWeight: '600',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: colors.neutral[200],
    paddingTop: spacing.component.padding.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: colors.primary[500],
    fontWeight: 'bold',
    marginBottom: spacing.component.margin.xs,
  },
  statLabel: {
    color: colors.text.muted,
  },
});

export default ProfileCard;