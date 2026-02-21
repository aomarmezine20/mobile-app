import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../../constants';
import { Badge } from '../ui/atoms/Badge';
import { Button } from '../ui/atoms/Button';
import { Image } from '../ui/atoms/Image';

interface AddAddressScreenProps {
  navigation: any;
}

const AddAddressScreen: React.FC<AddAddressScreenProps> = ({ navigation }) => {
  const [address, setAddress] = React.useState({
    type: 'home' as 'home' | 'work' | 'other',
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const handleSaveAddress = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.goBack();
    }, 1000);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const renderAddressTypeSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Address Type</Text>
      <View style={styles.addressTypeContainer}>
        {['home', 'work', 'other'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.addressTypeButton,
              address.type === type && styles.addressTypeButtonSelected,
            ]}
            onPress={() => setAddress({ ...address, type })}
          >
            <Text style={[
              styles.addressTypeButtonText,
              address.type === type && styles.addressTypeButtonTextSelected,
            ]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderAddressFields = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Address Details</Text>
      <View style={styles.inputGroup}>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={address.fullName}
            onChangeText={(text) => setAddress({ ...address, fullName: text })}
            placeholder="John Doe"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Phone</Text>
          <TextInput
            style={styles.input}
            value={address.phone}
            onChangeText={(text) => setAddress({ ...address, phone: text })}
            placeholder="+1 555 123 4567"
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Street Address</Text>
          <TextInput
            style={styles.input}
            value={address.street}
            onChangeText={(text) => setAddress({ ...address, street: text })}
            placeholder="123 Main St"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>City</Text>
          <TextInput
            style={styles.input}
            value={address.city}
            onChangeText={(text) => setAddress({ ...address, city: text })}
            placeholder="New York"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>State</Text>
          <TextInput
            style={styles.input}
            value={address.state}
            onChangeText={(text) => setAddress({ ...address, state: text })}
            placeholder="NY"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>ZIP Code</Text>
          <TextInput
            style={styles.input}
            value={address.zipCode}
            onChangeText={(text) => setAddress({ ...address, zipCode: text })}
            placeholder="10001"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Country</Text>
          <TextInput
            style={styles.input}
            value={address.country}
            onChangeText={(text) => setAddress({ ...address, country: text })}
            placeholder="United States"
          />
        </View>
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
        variant="primary"
        onPress={handleSaveAddress}
        loading={isLoading}
        style={styles.saveButton}
      >
        Save Address
      </Button>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add New Address</Text>
      </View>
      
      {renderAddressTypeSelector()}
      {renderAddressFields()}
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
  section: {
    padding: spacing.component.padding.md,
    marginBottom: spacing.component.margin.md,
  },
  sectionTitle: {
    ...typography.h6,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.md,
  },
  addressTypeContainer: {
    flexDirection: 'row',
    gap: spacing.component.margin.sm,
  },
  addressTypeButton: {
    flex: 1,
    padding: spacing.component.padding.sm,
    borderRadius: spacing.radius.sm,
    backgroundColor: colors.neutral[50],
    alignItems: 'center',
  },
  addressTypeButtonSelected: {
    backgroundColor: colors.primary[50],
  },
  addressTypeButtonText: {
    ...typography.caption,
    color: colors.text.primary,
  },
  addressTypeButtonTextSelected: {
    color: colors.primary[500],
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: spacing.component.margin.md,
  },
  inputItem: {
    marginBottom: spacing.component.margin.md,
  },
  inputLabel: {
    ...typography.caption,
    color: colors.text.muted,
    marginBottom: spacing.component.margin.xs,
  },
  input: {
    ...typography.body,
    height: 48,
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.radius.md,
    paddingHorizontal: spacing.component.padding.sm,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.component.margin.sm,
    padding: spacing.component.padding.md,
  },
  cancelButton: {
    flex: 1,
  },
  saveButton: {
    flex: 1,
  },
});

export default AddAddressScreen;