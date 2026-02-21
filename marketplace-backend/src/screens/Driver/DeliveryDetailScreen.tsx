import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../constants';
import { Badge } from '../ui/atoms/Badge';
import { Button } from '../ui/atoms/Button';
import { Image } from '../ui/atoms/Image';
import { Card } from '../ui/molecules/Card';

interface DeliveryDetailScreenProps {
  navigation: any;
  route: any;
}

const DeliveryDetailScreen: React.FC<DeliveryDetailScreenProps> = ({ navigation, route }) => {
  const deliveryId = route.params?.deliveryId;

  const [delivery, setDelivery] = React.useState({
    id: deliveryId || '1',
    orderId: 'ORD123456',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1 555 123 4567',
      address: '123 Main St, New York, NY 10001',
    },
    items: [
      {
        name: 'Wireless Headphones',
        price: 79.99,
        quantity: 1,
      },
      {
        name: 'Smart Watch',
        price: 199.99,
        quantity: 1,
      },
    ],
    total: 279.98,
    status: 'assigned',
    pickupTime: '2024-01-15T10:30:00Z',
    deliveryTime: '2024-01-15T11:00:00Z',
    distance: '2.5 miles',
    paymentMethod: 'Credit Card',
    trackingNumber: 'TRK123456789',
    notes: 'Please leave package at front door if no one is available',
    specialInstructions: 'Customer is allergic to peanuts',
  });

  const [deliveryStatus, setDeliveryStatus] = React.useState(delivery.status);

  const handleUpdateStatus = (newStatus: string) => {
    setDeliveryStatus(newStatus);
    // Update delivery status in backend
    console.log('Updating delivery status to:', newStatus);
  };

  const handleStartNavigation = () => {
    // Implement navigation functionality
    console.log('Starting navigation to:', delivery.customer.address);
  };

  const handleCompleteDelivery = () => {
    // Implement delivery completion
    console.log('Completing delivery:', delivery.id);
    handleUpdateStatus('delivered');
  };

  const getStatusColor = (status: string) => {
    const statusColors = {
      assigned: colors.warning[500],
      picked_up: colors.primary[500],
      in_transit: colors.accent[500],
      delivered: colors.success[500],
      cancelled: colors.error[500],
    };
    return statusColors[status] || colors.text.muted;
  };

  const getStatusText = (status: string) => {
    const statusText = {
      assigned: 'Assigned',
      picked_up: 'Picked Up',
      in_transit: 'In Transit',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    };
    return statusText[status] || status;
  };

  const renderStatusButton = ({ status, label }: { status: string; label: string }) => (
    <TouchableOpacity
      style={[
        styles.statusButton,
        deliveryStatus === status && styles.statusButtonActive,
      ]}
      onPress={() => handleUpdateStatus(status)}
    >
      <Text style={[
        styles.statusButtonText,
        deliveryStatus === status && styles.statusButtonTextActive,
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Delivery Details</Text>
          <Text style={styles.subtitle}>Delivery #{delivery.id}</Text>
        </View>
      </View>
      
      <View style={styles.statusContainer}>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {getStatusText(deliveryStatus)}
          </Text>
        </View>
        <View style={styles.statusActions}>
          {deliveryStatus === 'assigned' && (
            <>
              {renderStatusButton({ status: 'picked_up', label: 'Picked Up' })}
              {renderStatusButton({ status: 'cancelled', label: 'Cancel' })}
            </>
          )}
          {deliveryStatus === 'picked_up' && (
            <>
              {renderStatusButton({ status: 'in_transit', label: 'In Transit' })}
              {renderStatusButton({ status: 'cancelled', label: 'Cancel' })}
            </>
          )}
          {deliveryStatus === 'in_transit' && (
            <>
              {renderStatusButton({ status: 'delivered', label: 'Delivered' })}
              {renderStatusButton({ status: 'cancelled', label: 'Cancel' })}
            </>
          )}
        </View>
      </View>
      
      <Card style={styles.deliveryCard}>
        <View style={styles.deliveryHeader}>
          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryId}>Order #{delivery.orderId}</Text>
            <Text style={styles.deliveryStatus}>
              {getStatusText(deliveryStatus)}
            </Text>
          </View>
          <View style={styles.deliveryTime}>
            <Text style={styles.timeLabel}>Pickup:</Text>
            <Text style={styles.timeValue}>{delivery.pickupTime}</Text>
          </View>
        </View>
        
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{delivery.customer.name}</Text>
          <Text style={styles.customerContact}>
            {delivery.customer.email} • {delivery.customer.phone}
          </Text>
          <Text style={styles.customerAddress}>{delivery.customer.address}</Text>
        </View>
        
        <View style={styles.itemsList}>
          {delivery.items.map((orderItem: any, index: number) => (
            <View key={index} style={styles.item}>
              <Text style={styles.itemName}>{orderItem.name}</Text>
              <Text style={styles.itemDetails}>
                ${orderItem.price.toFixed(2)} x {orderItem.quantity}
              </Text>
            </View>
          ))}
        </View>
        
        <View style={styles.deliveryFooter}>
          <View style={styles.deliveryDetails}>
            <Text style={styles.detailLabel}>Total:</Text>
            <Text style={styles.detailValue}>${delivery.total.toFixed(2)}</Text>
            <Text style={styles.detailLabel}>Distance:</Text>
            <Text style={styles.detailValue}>{delivery.distance}</Text>
            <Text style={styles.detailLabel}>Payment:</Text>
            <Text style={styles.detailValue}>{delivery.paymentMethod}</Text>
          </View>
          <View style={styles.deliveryActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleStartNavigation}
            >
              <Text style={styles.actionButtonText}>Navigate</Text>
            </TouchableOpacity>
            {deliveryStatus === 'in_transit' && (
              <TouchableOpacity
                style={[styles.actionButton, styles.completeButton]}
                onPress={handleCompleteDelivery}
              >
                <Text style={styles.completeButtonText}>Complete</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Card>
      
      {delivery.notes && (
        <Card style={styles.notesCard}>
          <View style={styles.notesHeader}>
            <Text style={styles.notesTitle}>Delivery Notes</Text>
          </View>
          <Text style={styles.notesContent}>{delivery.notes}</Text>
        </Card>
      )}
      
      {delivery.specialInstructions && (
        <Card style={styles.instructionsCard}>
          <View style={styles.instructionsHeader}>
            <Text style={styles.instructionsTitle}>Special Instructions</Text>
          </View>
          <Text style={styles.instructionsContent}>{delivery.specialInstructions}</Text>
        </Card>
      )}
      
      <Card style={styles.trackingCard}>
        <View style={styles.trackingHeader}>
          <Text style={styles.trackingTitle}>Tracking Information</Text>
        </View>
        <View style={styles.trackingContent}>
          <Text style={styles.trackingNumber}>Tracking #: {delivery.trackingNumber}</Text>
          <Text style={styles.trackingStatus}>Status: {getStatusText(deliveryStatus)}</Text>
        </View>
      </Card>
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
  headerContent: {
    flex: 1,
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
  statusContainer: {
    padding: spacing.component.padding.md,
    backgroundColor: colors.background.secondary,
    borderBottomWidth: 1,
    borderColor: colors.neutral[200],
  },
  statusBadge: {
    paddingHorizontal: spacing.component.padding.md,
    paddingVertical: spacing.component.padding.sm,
    backgroundColor: getStatusColor(deliveryStatus),
    borderRadius: spacing.radius.md,
    marginBottom: spacing.component.margin.md,
  },
  statusText: {
    ...typography.h6,
    color: colors.text.inverted,
    fontWeight: '600',
    textAlign: 'center',
  },
  statusActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.component.margin.sm,
  },
  statusButton: {
    paddingHorizontal: spacing.component.padding.md,
    paddingVertical: spacing.component.padding.sm,
    backgroundColor: colors.neutral[200],
    borderRadius: spacing.radius.sm,
  },
  statusButtonActive: {
    backgroundColor: colors.primary[500],
  },
  statusButtonText: {
    ...typography.caption,
    color: colors.text.muted,
    fontWeight: '600',
  },
  statusButtonTextActive: {
    color: colors.text.inverted,
  },
  deliveryCard: {
    padding: spacing.component.padding.md,
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.component.margin.md,
  },
  deliveryInfo: {
    flex: 1,
  },
  deliveryId: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.component.margin.xs,
  },
  deliveryStatus: {
    ...typography.caption,
    color: getStatusColor(deliveryStatus),
    fontWeight: '600',
  },
  deliveryTime: {
    alignItems: 'flex-end',
  },
  timeLabel: {
    ...typography.caption,
    color: colors.text.muted,
  },
  timeValue: {
    ...typography.caption,
    color: colors.text.primary,
  },
  customerInfo: {
    marginBottom: spacing.component.margin.md,
  },
  customerName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.component.margin.xs,
  },
  customerContact: {
    ...typography.caption,
    color: colors.text.muted,
    marginBottom: spacing.component.margin.xs,
  },
  customerAddress: {
    ...typography.caption,
    color: colors.text.primary,
  },
  itemsList: {
    marginBottom: spacing.component.margin.md,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.component.padding.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  itemName: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
  },
  itemDetails: {
    ...typography.caption,
    color: colors.text.muted,
  },
  deliveryFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    paddingTop: spacing.component.margin.md,
  },
  deliveryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.component.margin.md,
  },
  detailLabel: {
    ...typography.caption,
    color: colors.text.muted,
  },
  detailValue: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  deliveryActions: {
    flexDirection: 'row',
    gap: spacing.component.margin.sm,
  },
  actionButton: {
    flex: 1,
    paddingVertical: spacing.component.padding.sm,
    backgroundColor: colors.primary[500],
    borderRadius: spacing.radius.sm,
    alignItems: 'center',
  },
  actionButtonText: {
    ...typography.caption,
    color: colors.text.inverted,
    fontWeight: '600',
  },
  completeButton: {
    backgroundColor: colors.success[500],
  },
  completeButtonText: {
    color: colors.text.inverted,
  },
  notesCard: {
    padding: spacing.component.padding.md,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  notesHeader: {
    marginBottom: spacing.component.margin.md,
  },
  notesTitle: {
    ...typography.h6,
    color: colors.text.primary,
    fontWeight: '600',
  },
  notesContent: {
    ...typography.body,
    color: colors.text.primary,
  },
  instructionsCard: {
    padding: spacing.component.padding.md,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  instructionsHeader: {
    marginBottom: spacing.component.margin.md,
  },
  instructionsTitle: {
    ...typography.h6,
    color: colors.text.primary,
    fontWeight: '600',
  },
  instructionsContent: {
    ...typography.body,
    color: colors.text.primary,
  },
  trackingCard: {
    padding: spacing.component.padding.md,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  trackingHeader: {
    marginBottom: spacing.component.margin.md,
  },
  trackingTitle: {
    ...typography.h6,
    color: colors.text.primary,
    fontWeight: '600',
  },
  trackingContent: {
    ...typography.body,
    color: colors.text.primary,
  },
  trackingNumber: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  trackingStatus: {
    ...typography.caption,
    color: colors.text.muted,
  },
});

export default DeliveryDetailScreen;