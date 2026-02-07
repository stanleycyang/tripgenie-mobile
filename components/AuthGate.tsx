import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Image,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, borderRadius, shadows } from '../constants/theme';

const { height } = Dimensions.get('window');

type AuthGateTrigger = 'save' | 'book' | 'share' | 'access' | 'general';

interface AuthGateProps {
  visible: boolean;
  trigger?: AuthGateTrigger;
  tripPreview?: {
    destination: string;
    coverImage: string;
  };
  onAuthenticated?: () => void;
  onDismiss?: () => void;
  onClose: () => void;
}

const triggerContent: Record<AuthGateTrigger, { title: string; subtitle: string }> = {
  save: {
    title: 'Save Your Trip',
    subtitle: 'Create a free account to save this amazing itinerary',
  },
  book: {
    title: 'Ready to Book?',
    subtitle: 'Sign in to complete your reservation',
  },
  share: {
    title: 'Share with Friends',
    subtitle: 'Create an account to share your trip and plan together',
  },
  access: {
    title: 'Welcome Back!',
    subtitle: 'Sign in to access your saved trips',
  },
  general: {
    title: 'Join TripGenie',
    subtitle: 'Create a free account to unlock all features',
  },
};

const benefits = [
  { icon: 'cloud-upload-outline', text: 'Save trips & access anywhere' },
  { icon: 'notifications-outline', text: 'Get price drop alerts' },
  { icon: 'star-outline', text: 'Build your travel wishlist' },
  { icon: 'people-outline', text: 'Share & plan with companions' },
];

export function AuthGate({
  visible,
  trigger = 'general',
  tripPreview,
  onAuthenticated,
  onDismiss,
  onClose,
}: AuthGateProps) {
  const router = useRouter();
  const content = triggerContent[trigger];

  const handleAuthOption = (method: 'apple' | 'google' | 'email') => {
    onClose();
    router.push(`/auth/login?method=${method}`);
  };

  const handleMaybeLater = () => {
    onDismiss?.();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        {/* Blurred background with trip preview */}
        {tripPreview && (
          <View style={styles.previewContainer}>
            <Image
              source={{ uri: tripPreview.coverImage }}
              style={styles.previewImage}
              blurRadius={3}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.previewGradient}
            />
          </View>
        )}

        {/* Bottom Sheet */}
        <View style={styles.bottomSheet}>
          {/* Handle */}
          <View style={styles.handle} />

          {/* Content */}
          <View style={styles.content}>
            {/* Emoji/Icon */}
            <View style={styles.iconContainer}>
              <Text style={styles.emoji}>✨</Text>
            </View>

            {/* Title & Subtitle */}
            <Text style={styles.title}>{content.title}</Text>
            <Text style={styles.subtitle}>{content.subtitle}</Text>

            {/* Benefits */}
            <View style={styles.benefits}>
              {benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitRow}>
                  <Ionicons
                    name={benefit.icon as any}
                    size={20}
                    color={colors.primary[500]}
                  />
                  <Text style={styles.benefitText}>{benefit.text}</Text>
                </View>
              ))}
            </View>

            {/* Auth Buttons */}
            <View style={styles.authButtons}>
              <TouchableOpacity
                style={styles.appleButton}
                onPress={() => handleAuthOption('apple')}
                activeOpacity={0.9}
              >
                <Ionicons name="logo-apple" size={20} color="#fff" />
                <Text style={styles.appleButtonText}>Continue with Apple</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.googleButton}
                onPress={() => handleAuthOption('google')}
                activeOpacity={0.9}
              >
                <Ionicons name="logo-google" size={18} color={colors.neutral[700]} />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.emailButton}
                onPress={() => handleAuthOption('email')}
                activeOpacity={0.9}
              >
                <Ionicons name="mail-outline" size={18} color={colors.neutral[700]} />
                <Text style={styles.emailButtonText}>Continue with Email</Text>
              </TouchableOpacity>
            </View>

            {/* Maybe Later */}
            <TouchableOpacity
              style={styles.maybeLaterButton}
              onPress={handleMaybeLater}
            >
              <Text style={styles.maybeLaterText}>Maybe Later</Text>
            </TouchableOpacity>

            {/* Terms */}
            <Text style={styles.terms}>
              By continuing, you agree to our{' '}
              <Text style={styles.termsLink}>Terms</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  previewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  previewGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingBottom: 40,
    ...shadows.xl,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.neutral[300],
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  content: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emoji: {
    fontSize: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.neutral[900],
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.neutral[500],
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  benefits: {
    width: '100%',
    backgroundColor: colors.neutral[50],
    borderRadius: borderRadius.lg,
    padding: 16,
    marginBottom: 24,
    gap: 12,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    fontSize: 15,
    color: colors.neutral[700],
    fontWeight: '500',
  },
  authButtons: {
    width: '100%',
    gap: 12,
    marginBottom: 16,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: borderRadius.lg,
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[700],
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.neutral[100],
    paddingVertical: 16,
    borderRadius: borderRadius.lg,
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[700],
  },
  maybeLaterButton: {
    paddingVertical: 12,
    marginBottom: 16,
  },
  maybeLaterText: {
    fontSize: 15,
    color: colors.neutral[400],
    fontWeight: '600',
  },
  terms: {
    fontSize: 12,
    color: colors.neutral[400],
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: colors.primary[500],
    fontWeight: '600',
  },
});
