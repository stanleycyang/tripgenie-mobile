import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, borderRadius, shadows, typography } from '../../constants/theme';

const { width } = Dimensions.get('window');

interface DestinationCardProps {
  image: string;
  name: string;
  country: string;
  description?: string;
  tags?: string[];
  onPress?: () => void;
  size?: 'small' | 'medium' | 'large';
}

export function DestinationCard({
  image,
  name,
  country,
  description,
  tags,
  onPress,
  size = 'medium',
}: DestinationCardProps) {
  const cardSizes = {
    small: { width: 160, height: 200 },
    medium: { width: width * 0.7, height: 280 },
    large: { width: width - 32, height: 380 },
  };

  const dimensions = cardSizes[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.cardContainer, dimensions, shadows.lg]}
    >
      <Image source={{ uri: image }} style={styles.cardImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardCountry}>{country}</Text>
        <Text style={styles.cardName}>{name}</Text>
        {description && size !== 'small' && (
          <Text style={styles.cardDescription} numberOfLines={2}>
            {description}
          </Text>
        )}
        {tags && tags.length > 0 && size === 'large' && (
          <View style={styles.tagsContainer}>
            {tags.slice(0, 4).map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

interface TripCardProps {
  destination: string;
  country: string;
  dates: string;
  image: string;
  status: 'draft' | 'planned' | 'active' | 'completed';
  daysCount: number;
  onPress?: () => void;
}

export function TripCard({
  destination,
  country,
  dates,
  image,
  status,
  daysCount,
  onPress,
}: TripCardProps) {
  const statusColors = {
    draft: colors.neutral[400],
    planned: colors.primary[500],
    active: colors.success,
    completed: colors.neutral[600],
  };

  const statusLabels = {
    draft: 'Draft',
    planned: 'Upcoming',
    active: 'In Progress',
    completed: 'Completed',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.tripCard, shadows.md]}
    >
      <Image source={{ uri: image }} style={styles.tripImage} />
      <View style={styles.tripContent}>
        <View style={styles.tripHeader}>
          <View>
            <Text style={styles.tripDestination}>{destination}</Text>
            <Text style={styles.tripCountry}>{country}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusColors[status] }]}>
            <Text style={styles.statusText}>{statusLabels[status]}</Text>
          </View>
        </View>
        <View style={styles.tripFooter}>
          <Text style={styles.tripDates}>📅 {dates}</Text>
          <Text style={styles.tripDays}>{daysCount} days</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    backgroundColor: colors.neutral[900],
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  cardCountry: {
    color: colors.primary[300],
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  cardName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardDescription: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  tripCard: {
    backgroundColor: '#fff',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: 16,
  },
  tripImage: {
    width: '100%',
    height: 160,
  },
  tripContent: {
    padding: 16,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tripDestination: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral[900],
  },
  tripCountry: {
    fontSize: 14,
    color: colors.neutral[500],
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  tripFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripDates: {
    fontSize: 14,
    color: colors.neutral[600],
  },
  tripDays: {
    fontSize: 14,
    color: colors.primary[600],
    fontWeight: '600',
  },
});
