import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../../constants';
import { Badge } from '../ui/atoms/Badge';
import { Button } from '../ui/atoms/Button';
import { Image } from '../ui/atoms/Image';

interface AddressesScreenProps {
  navigation: any;
}

const AddressesScreen: React.FC<AddressesScreenProps> = ({ navigation }) => {
  const [addresses, setAddresses] = React.useState<any[]>([
    {
      id: '1',
      type: 'home',
      fullName: 'John Doe',
      phone: '+1 555 123 4567',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      isDefault: true,
    },
    {
      id: '2',
      type: 'work',
      fullName: 'John Doe',
      phone: '+1 555 123 4567',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      isDefault: false,
    },
    {
      id: '3',
      type: 'other',
      fullName: 'John Doe',
      phone: '+1 555 123 4567',
      street: '789 Other St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      isDefault: false,
    },
  ]);

  const [selectedAddress, setSelectedAddress] = React.useState<any | null>(null);

  const handleAddressPress = (address: any) => {
    setSelectedAddress(address);
  };

  const handleAddAddress = () => {
    navigation.navigate('AddAddress');
  };

  const handleEditAddress = (addressId: string) => {
    navigation.navigate('EditAddress', { addressId });
  };

  const handleRemoveAddress = (addressId: string) => {
    setAddresses(prevAddresses =>
      prevAddresses.filter(address => address.id !== addressId)
    );
  };

  const handleSetDefault = (addressId: string) => {
    setAddresses(prevAddresses =>
      prevAddresses.map(address =>
        address.id === addressId
          ? { ...address, isDefault: true }
          : { ...address, isDefault: false }
      )
    );
  };

  const getAddressTypeLabel = (type: string) => {
    const labels = {
      home: 'Home',
      work: 'Work',
      other: 'Other',
    };
    return labels[type] || type;
  };

  const renderAddress = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.addressCard,
        selectedAddress?.id === item.id && styles.selectedAddressCard,
      ]}
      onPress={() => handleAddressPress(item)}\n    >
      <View style={styles.addressHeader}>
        <Text style={styles.addressType}>
          {getAddressTypeLabel(item.type)}
        </Text>
        {item.isDefault && (
          <Badge variant="primary">Default</Badge>
        )}
      </View>
      
      <Text style={styles.addressName}>{item.fullName}</Text>
      <Text style={styles.addressPhone}>{item.phone}</Text>
      <Text style={styles.addressStreet}>{item.street}</Text>
      <Text style={styles.addressCityStateZip}>
        {item.city}, {item.state} {item.zipCode}
      </Text>
      <Text style={styles.addressCountry}>{item.country}</Text>
      
      <View style={styles.addressActions}>
        <TouchableOpacity
          onPress={() => handleSetDefault(item.id)}
          style={styles.actionButton}
        >
          <Text style={styles.actionButtonText}>
            {item.isDefault ? 'Default' : 'Set as Default'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleEditAddress(item.id)}
          style={styles.actionButton}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRemoveAddress(item.id)}
          style={styles.actionButton}
        >
          <Text style={styles.actionButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>��</Text>
      <Text style={styles.emptyTitle}>No addresses yet</Text>
      <Text style={styles.emptySubtitle}>
        Add your shipping addresses to make checkout faster
      </Text>
      <Button
        variant="primary"
        onPress={handleAddAddress}
        style={styles.addAddressButton}
      >
        Add Address
      </Button>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Addresses</Text>
        <Text style={styles.subtitle}>
          Manage your shipping addresses
        </Text>
      </View>
      
      {addresses.length > 0 ? (
        <View style={styles.addressesList}>
          <FlatList
            data={addresses}
            renderItem={renderAddress}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.addressesContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        renderEmptyState()
      )}
      
      <View style={styles.addButton}>
        <Button
          variant="primary"
          onPress={handleAddAddress}
          style={styles.addAddressButton}
        >
          + Add New Address
        </Button>
      </View>
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
    marginBottom: spacing.component.margin.xs,
  },
  subtitle: {
    ...typography.caption,
    color: colors.text.muted,
  },
  addressesList: {
    flex: 1,
  },
  addressesContainer: {
    paddingHorizontal: spacing.component.padding.md,
  },
  addressCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.radius.md,
    padding: spacing.component.padding.md,
    marginBottom: spacing.component.margin.sm,
    ...spacing.shadow.sm,
  },
  selectedAddressCard: {
    backgroundColor: colors.primary[50],
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.component.margin.sm,
  },
  addressType: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: 'bold',
    marginRight: spacing.component.margin.sm,
  },
  addressName: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  addressPhone: {
    ...typography.caption,
    color: colors.text.muted,
    marginBottom: spacing.component.margin.sm,
  },
  addressStreet: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  addressCityStateZip: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  addressCountry: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.md,
  },
  addressActions: {
    flexDirection: 'row',
    gap: spacing.component.margin.sm,
  },
  actionButton: {
    paddingHorizontal: spacing.component.padding.sm,
    paddingVertical: spacing.component.padding.xs,
    borderRadius: spacing.radius.sm,
    backgroundColor: colors.neutral[50],
  },
  actionButtonText: {
    ...typography.caption,
    color: colors.text.primary,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.component.padding.md,
    marginTop: spacing.component.margin.md,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.component.margin.md,
  },
  emptyTitle: {
    ...typography.h5,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.text.muted,
    textAlign: 'center',
    marginBottom: spacing.component.margin.md,
  },
  addAddressButton: {
    width: '100%',
  },
  addButton: {
    padding: spacing.component.padding.md,
  },
});

export default AddressesScreen;