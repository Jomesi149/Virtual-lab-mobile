import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen({ navigation }) {
  const { colors, isDark } = useTheme();

  const features = [
    {
      icon: 'book-outline',
      title: 'Konten Komprehensif',
      description: 'Pelajari prinsip UX yang telah diteliti dengan baik termasuk Fitts\'s Law, Hick\'s Law, Miller\'s Law, dan lainnya.',
    },
    {
      icon: 'trending-up-outline',
      title: 'Lacak Progres Anda',
      description: 'Pantau perjalanan belajar Anda dan lihat UX laws mana yang telah Anda kuasai.',
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Aman & Privat',
      description: 'Data belajar Anda dilindungi dengan autentikasi dan keamanan standar industri.',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={[styles.heroSection, { backgroundColor: colors.accent }]}>
          <Text style={styles.heroTitle}>Master the Laws of UX</Text>
          <Text style={styles.heroSubtitle}>
            Pelajari dan terapkan prinsip-prinsip dasar desain pengalaman pengguna melalui pelajaran interaktif dan contoh dunia nyata.
          </Text>
          <TouchableOpacity
            style={[styles.ctaButton, { backgroundColor: colors.surface }]}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={[styles.ctaButtonText, { color: colors.accent }]}>
              Mulai Sekarang
            </Text>
            <Ionicons name="arrow-forward" size={20} color={colors.accent} />
          </TouchableOpacity>
        </View>

        {/* Features Section */}
        <View style={[styles.featuresSection, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Mengapa Belajar UX Laws?
          </Text>

          {features.map((feature, index) => (
            <View
              key={index}
              style={[styles.featureCard, { backgroundColor: colors.accentSubtle }]}
            >
              <View style={[styles.featureIconContainer, { backgroundColor: colors.accent }]}>
                <Ionicons name={feature.icon} size={28} color="#FFFFFF" />
              </View>
              <Text style={[styles.featureTitle, { color: colors.textPrimary }]}>
                {feature.title}
              </Text>
              <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                {feature.description}
              </Text>
            </View>
          ))}
        </View>

        {/* CTA Section */}
        <View style={[styles.ctaSection, { backgroundColor: colors.background }]}>
          <Text style={[styles.ctaTitle, { color: colors.textPrimary }]}>
            Siap Mulai Belajar?
          </Text>
          <Text style={[styles.ctaDescription, { color: colors.textSecondary }]}>
            Bergabunglah dengan platform kami dan kuasai hukum-hukum dasar desain pengalaman pengguna.
          </Text>

          <View style={styles.ctaButtonsContainer}>
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: colors.accent }]}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.primaryButtonText}>Buat Akun Gratis</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.secondaryButton, { borderColor: colors.accent }]}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={[styles.secondaryButtonText, { color: colors.accent }]}>
                Sudah Punya Akun
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  featuresSection: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  featureCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  ctaSection: {
    padding: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  ctaDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  ctaButtonsContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
