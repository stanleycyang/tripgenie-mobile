import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, VibeSelector } from '../../components/ui';
import { useUserStore } from '../../stores/userStore';
import { colors, borderRadius } from '../../constants/theme';

export default function PreferencesScreen() {
  const router = useRouter();
  const { setOnboardingComplete, setUser, updatePreferences } = useUserStore();
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>('');

  const budgetOptions = [
    { id: 'budget', label: 'Budget', emoji: '💰', description: 'Best value deals' },
    { id: 'moderate', label: 'Moderate', emoji: '💵', description: 'Balance of comfort & cost' },
    { id: 'luxury', label: 'Luxury', emoji: '✨', description: 'Premium experiences' },
  ];

  const handleComplete = () => {
    // Set demo user
    setUser({
      id: 'demo-user',
      name: 'Stanley',
      email: 'stanley@example.com',
      preferences: {
        vibes: selectedVibes,
        budget: selectedBudget,
      },
    });
    setOnboardingComplete(true);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.neutral[700]} />
        </TouchableOpacity>
        <View style={styles.progress}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '66%' }]} />
          </View>
        </View>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Personalize your experience</Text>
          <Text style={styles.subtitle}>
            Tell us about your travel preferences so we can create better
            recommendations for you.
          </Text>
        </View>

        {/* Vibes Selection */}
        <View style={styles.section}>
          <VibeSelector
            selected={selectedVibes}
            onSelect={setSelectedVibes}
            maxSelections={5}
          />
        </View>

        {/* Budget Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's your typical budget?</Text>
          <View style={styles.budgetOptions}>
            {budgetOptions.map((option) => {
              const isSelected = selectedBudget === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.budgetOption,
                    isSelected && styles.budgetOptionSelected,
                  ]}
                  onPress={() => setSelectedBudget(option.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.budgetEmoji}>{option.emoji}</Text>
                  <Text
                    style={[
                      styles.budgetLabel,
                      isSelected && styles.budgetLabelSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                  <Text style={styles.budgetDescription}>
                    {option.description}
                  </Text>
                  {isSelected && (
                    <View style={styles.checkmark}>
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color={colors.primary[500]}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <Button
          title="Continue"
          onPress={handleComplete}
          size="lg"
          fullWidth
          disabled={selectedVibes.length === 0}
        />
        <TouchableOpacity onPress={handleComplete}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    flex: 1,
    paddingHorizontal: 24,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.neutral[200],
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary[500],
    borderRadius: 2,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  titleSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.neutral[900],
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.neutral[500],
    lineHeight: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral[900],
    marginBottom: 16,
  },
  budgetOptions: {
    gap: 12,
  },
  budgetOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[50],
    padding: 16,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  budgetOptionSelected: {
    backgroundColor: colors.primary[50],
    borderColor: colors.primary[500],
  },
  budgetEmoji: {
    fontSize: 28,
    marginRight: 16,
  },
  budgetLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[900],
    marginRight: 8,
  },
  budgetLabelSelected: {
    color: colors.primary[700],
  },
  budgetDescription: {
    flex: 1,
    fontSize: 13,
    color: colors.neutral[500],
  },
  checkmark: {
    marginLeft: 8,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
    alignItems: 'center',
    gap: 16,
  },
  skipText: {
    fontSize: 14,
    color: colors.neutral[500],
    fontWeight: '600',
  },
});
