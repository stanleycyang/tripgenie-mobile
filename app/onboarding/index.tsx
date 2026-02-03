import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../components/ui';
import { colors } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

const SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Plan Less,\nExperience More',
    subtitle:
      'Let our AI craft the perfect itinerary tailored to your travel style and interests.',
    image:
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
  },
  {
    id: '2',
    title: 'Discover\nHidden Gems',
    subtitle:
      'Uncover local favorites and off-the-beaten-path experiences that guidebooks miss.',
    image:
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
  },
  {
    id: '3',
    title: 'Book Everything\nin One Tap',
    subtitle:
      'From flights to experiences, book your entire trip without leaving the app.',
    image:
      'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push('/onboarding/preferences');
    }
  };

  const handleSkip = () => {
    router.push('/onboarding/preferences');
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.image }} style={styles.slideImage} />
      <LinearGradient
        colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.8)']}
        style={styles.slideGradient}
      />
      <View style={styles.slideContent}>
        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  const renderDot = (index: number) => {
    const isActive = currentIndex === index;
    return (
      <View
        key={index}
        style={[styles.dot, isActive && styles.dotActive]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        scrollEventThrottle={16}
      />

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        {/* Pagination */}
        <View style={styles.pagination}>
          {SLIDES.map((_, index) => renderDot(index))}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            title={currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
            onPress={handleNext}
            size="lg"
            fullWidth
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    width,
    height,
  },
  slideImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  slideGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  slideContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 32,
    paddingBottom: 240,
  },
  slideTitle: {
    fontSize: 40,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 16,
    lineHeight: 48,
  },
  slideSubtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 26,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  dotActive: {
    width: 24,
    backgroundColor: '#fff',
  },
  actions: {
    gap: 12,
  },
  skipButtonText: {
    color: 'rgba(255,255,255,0.7)',
  },
});
