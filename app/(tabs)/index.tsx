import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SearchInput, DestinationCard, Button } from '../../components/ui';
import { popularDestinations } from '../../constants/destinations';
import { colors, borderRadius, shadows } from '../../constants/theme';

const { width } = Dimensions.get('window');

export default function ExploreScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleDestinationPress = (destinationId: string) => {
    const destination = popularDestinations.find((d) => d.id === destinationId);
    if (destination) {
      router.push({
        pathname: '/create',
        params: { destination: destination.name, country: destination.country },
      });
    }
  };

  const handleCreateTrip = () => {
    router.push('/create');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good afternoon! 👋</Text>
            <Text style={styles.headerTitle}>Where to next?</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={colors.neutral[700]} />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchSection}>
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search destinations..."
          />
        </View>

        {/* Quick Action Card */}
        <TouchableOpacity onPress={handleCreateTrip} activeOpacity={0.9}>
          <LinearGradient
            colors={[colors.primary[500], colors.primary[600]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.quickActionCard}
          >
            <View style={styles.quickActionContent}>
              <View style={styles.quickActionIcon}>
                <Ionicons name="sparkles" size={28} color="#fff" />
              </View>
              <View style={styles.quickActionText}>
                <Text style={styles.quickActionTitle}>Plan with AI</Text>
                <Text style={styles.quickActionSubtitle}>
                  Let our AI craft your perfect itinerary
                </Text>
              </View>
              <Ionicons name="arrow-forward" size={24} color="#fff" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Popular Destinations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Destinations</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
            decelerationRate="fast"
            snapToInterval={width * 0.7 + 16}
          >
            {popularDestinations.slice(0, 5).map((destination) => (
              <View key={destination.id} style={styles.destinationCardWrapper}>
                <DestinationCard
                  image={destination.image}
                  name={destination.name}
                  country={destination.country}
                  description={destination.description}
                  onPress={() => handleDestinationPress(destination.id)}
                  size="medium"
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Trending Now */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Now 🔥</Text>
          </View>
          <View style={styles.trendingGrid}>
            {popularDestinations.slice(5, 8).map((destination) => (
              <TouchableOpacity
                key={destination.id}
                style={styles.trendingItem}
                onPress={() => handleDestinationPress(destination.id)}
                activeOpacity={0.8}
              >
                <DestinationCard
                  image={destination.image}
                  name={destination.name}
                  country={destination.country}
                  onPress={() => handleDestinationPress(destination.id)}
                  size="small"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Inspiration */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Travel Inspiration</Text>
          </View>
          <View style={styles.inspirationCards}>
            {[
              { icon: '🏖️', title: 'Beach Getaways', subtitle: '12 destinations' },
              { icon: '🏔️', title: 'Mountain Retreats', subtitle: '8 destinations' },
              { icon: '🏛️', title: 'City Breaks', subtitle: '15 destinations' },
              { icon: '🌿', title: 'Eco Tourism', subtitle: '6 destinations' },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.inspirationCard}>
                <Text style={styles.inspirationIcon}>{item.icon}</Text>
                <Text style={styles.inspirationTitle}>{item.title}</Text>
                <Text style={styles.inspirationSubtitle}>{item.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleCreateTrip}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={[colors.primary[500], colors.primary[600]]}
          style={styles.fabGradient}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 14,
    color: colors.neutral[500],
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.neutral[900],
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  quickActionCard: {
    marginHorizontal: 24,
    borderRadius: borderRadius.xl,
    padding: 20,
    marginBottom: 32,
    ...shadows.lg,
  },
  quickActionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  quickActionText: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.neutral[900],
  },
  seeAllButton: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary[500],
  },
  horizontalScroll: {
    paddingLeft: 24,
    paddingRight: 8,
  },
  destinationCardWrapper: {
    marginRight: 16,
  },
  trendingGrid: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
  },
  trendingItem: {
    flex: 1,
  },
  inspirationCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 12,
  },
  inspirationCard: {
    width: (width - 48 - 12) / 2,
    backgroundColor: colors.neutral[50],
    borderRadius: borderRadius.lg,
    padding: 16,
    ...shadows.sm,
  },
  inspirationIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  inspirationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[900],
    marginBottom: 4,
  },
  inspirationSubtitle: {
    fontSize: 12,
    color: colors.neutral[500],
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 24,
    ...shadows.lg,
  },
  fabGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
