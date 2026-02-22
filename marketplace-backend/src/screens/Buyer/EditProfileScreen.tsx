import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { colors, spacing, typography } from '../../constants';
import { Button } from '../ui/atoms/Button';
import { Badge } from '../ui/atoms/Badge';

interface EditProfileScreenProps {
  navigation: any;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ navigation }) => {
  const [profile, setProfile] = React.useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 555 123 4567',
    bio: 'Passionate about technology and innovation.',
    profileImage: 'https://example.com/profile.jpg',
  });

  const [isSaving, setIsSaving] = React.useState(false);

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      navigation.goBack();
    }, 1500);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderProfileImage = () => (
    <View style={styles.profileImageContainer}>
      <Image
        source={{ uri: profile.profileImage }}
        variant="rounded"
        size="lg"
        style={styles.profileImage}
      />
      <TouchableOpacity style={styles.changePhotoButton}>
        <Text style={styles.changePhotoText}>Change Photo</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPersonalInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Personal Information</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={profile.firstName}
          onChangeText={(value) => handleInputChange('firstName', value)}
          placeholder="Enter first name"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={profile.lastName}
          onChangeText={(value) => handleInputChange('lastName', value)}
          placeholder="Enter last name"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={profile.email}
          onChangeText={(value) => handleInputChange('email', value)}
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={profile.phone}
          onChangeText={(value) => handleInputChange('phone', value)}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );

  const renderBioSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Bio</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>About Me</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={profile.bio}
          onChangeText={(value) => handleInputChange('bio', value)}
          placeholder="Tell us about yourself..."
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>
    </View>
  );

  const renderAccountSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Account Settings</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Email Notifications</Text>
        <Badge variant="success" style={styles.settingBadge}>
          Enabled
        </Badge>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Push Notifications</Text>
        <Badge variant="success" style={styles.settingBadge}>
          Enabled
        </Badge>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Two-Factor Authentication</Text>
        <Badge variant="warning" style={styles.settingBadge}>
          Disabled
        </Badge>
      </View>
    </View>
  );

  const renderActions = () => (
    <View style={styles.actions}>
      <Button
        variant="outline"
        onPress={handleCancel}
        style={styles.cancelButton}
      >
        Cancel
      </Button>
      <Button
        isLoading={isSaving}
        onPress={handleSaveProfile}
        style={styles.saveButton}
      >
        Save Changes
      </Button>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Profile</Text>
      </View>
      
      {renderProfileImage()}
      {renderPersonalInfo()}
      {renderBioSection()}
      {renderAccountSettings()}
      {renderActions()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    padding: spacing.component.padding.md,
    borderBottomWidth: 1,
    borderColor: colors.neutral[200],
  },
  title: {
    ...typography.h5,
    color: colors.text.primary,
  },
  profileImageContainer: {
    alignItems: 'center',
    padding: spacing.component.padding.md,
    marginBottom: spacing.component.margin.md,
  },
  profileImage: {
    width: 100,
    height: 100,
    marginBottom: spacing.component.margin.md,
  },
  changePhotoButton: {
    paddingHorizontal: spacing.component.padding.md,
    paddingVertical: spacing.component.padding.sm,
    backgroundColor: colors.primary[500],
    borderRadius: spacing.radius.sm,
  },
  changePhotoText: {
    ...typography.caption,
    color: colors.text.inverted,
    fontWeight: '600',
  },
  section: {
    padding: spacing.component.padding.md,
    marginBottom: spacing.component.margin.md,
  },
  sectionTitle: {
    ...typography.h6,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.md,
  },
  formGroup: {
    marginBottom: spacing.component.margin.md,
  },
  label: {
    ...typography.body,
    color: colors.text.muted,
    marginBottom: spacing.component.margin.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: spacing.radius.sm,
    padding: spacing.component.padding.sm,
    backgroundColor: colors.background.secondary,
    ...typography.body,
    color: colors.text.primary,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.component.padding.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  settingLabel: {
    ...typography.body,
    color: colors.text.primary,
  },
  settingBadge: {
    paddingHorizontal: spacing.component.padding.xs,
    paddingVertical: spacing.component.padding.xs / 2,
    borderRadius: spacing.radius.sm,
  },
  actions: {
    padding: spacing.component.padding.md,
    flexDirection: 'row',
    gap: spacing.component.margin.md,
  },
  cancelButton: {
    flex: 1,
  },
  saveButton: {
    flex: 1,
  },
});

export default EditProfileScreen;