import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import axiosInstance from '../utils/axios';
import { getIndonesianLaw, categoryTranslations } from '../data/uxLawsIndo';

export default function DashboardScreen({ navigation }) {
  const { colors, isDark } = useTheme();
  const [laws, setLaws] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      const [lawsRes, profileRes] = await Promise.all([
        axiosInstance.get('/api/ux-laws'),
        axiosInstance.get('/api/user/profile'),
      ]);

      const translatedLaws = lawsRes.data.data.map((law) =>
        getIndonesianLaw(law.id, law)
      );

      setLaws(translatedLaws);

      let progressObj = profileRes.data.data.progress || {};

      if (progressObj instanceof Map) {
        progressObj = Object.fromEntries(progressObj);
      } else if (typeof progressObj === 'object' && !Array.isArray(progressObj)) {
        progressObj = { ...progressObj };
      }

      setUserProgress(progressObj);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const getCategoryColor = (category) => {
    const categoryColors = {
      cognitive: isDark ? { bg: '#581C87', text: '#E9D5FF' } : { bg: '#F3E8FF', text: '#7C3AED' },
      perception: isDark ? { bg: '#1E3A8A', text: '#BFDBFE' } : { bg: '#DBEAFE', text: '#2563EB' },
      interaction: isDark ? { bg: '#14532D', text: '#BBF7D0' } : { bg: '#DCFCE7', text: '#16A34A' },
      behavior: isDark ? { bg: '#7C2D12', text: '#FED7AA' } : { bg: '#FFEDD5', text: '#EA580C' },
    };
    return categoryColors[category] || { bg: colors.accentSubtle, text: colors.textSecondary };
  };

  const completedCount = Object.values(userProgress).filter(Boolean).length;
  const totalCount = laws.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} />
        }
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              Dashboard UX Laws
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Jelajahi dan pelajari prinsip-prinsip dasar desain pengalaman pengguna
            </Text>
          </View>

          {/* Progress Card */}
          <View style={[styles.progressCard, { backgroundColor: colors.surface }]}>
            <View style={styles.progressHeader}>
              <Text style={[styles.progressTitle, { color: colors.textPrimary }]}>
                Progres Anda
              </Text>
              <Text style={[styles.progressCount, { color: colors.accent }]}>
                {completedCount} / {totalCount}
              </Text>
            </View>
            <View style={[styles.progressBarBg, { backgroundColor: colors.accentSubtle }]}>
              <View
                style={[
                  styles.progressBarFill,
                  { backgroundColor: colors.accent, width: `${progressPercentage}%` },
                ]}
              />
            </View>
            <Text style={[styles.progressPercentage, { color: colors.textSecondary }]}>
              {progressPercentage.toFixed(0)}% Selesai
            </Text>
          </View>

          {/* Laws Grid */}
          <View style={styles.lawsContainer}>
            {laws.map((law) => {
              const categoryColor = getCategoryColor(law.category);
              const isCompleted = userProgress[law.id];

              return (
                <TouchableOpacity
                  key={law.id}
                  style={[styles.lawCard, { backgroundColor: colors.surface }]}
                  onPress={() => navigation.navigate('LawDetail', { lawId: law.id })}
                  activeOpacity={0.7}
                >
                  <View style={styles.lawCardHeader}>
                    <View
                      style={[styles.categoryBadge, { backgroundColor: categoryColor.bg }]}
                    >
                      <Text style={[styles.categoryText, { color: categoryColor.text }]}>
                        {categoryTranslations[law.category] || law.category}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.statusIcon,
                        {
                          backgroundColor: isCompleted ? '#22C55E' : colors.accentSubtle,
                          borderColor: isCompleted ? '#22C55E' : colors.border,
                        },
                      ]}
                    >
                      {isCompleted ? (
                        <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                      ) : (
                        <View style={styles.emptyCircle} />
                      )}
                    </View>
                  </View>

                  <View style={styles.lawCardContent}>
                    <Ionicons
                      name="book-outline"
                      size={24}
                      color={colors.accent}
                      style={styles.lawIcon}
                    />
                    <View style={styles.lawTextContainer}>
                      <Text style={[styles.lawTitle, { color: colors.textPrimary }]}>
                        {law.title}
                      </Text>
                      <Text
                        style={[styles.lawDescription, { color: colors.textSecondary }]}
                        numberOfLines={3}
                      >
                        {law.description}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.lawCardFooter, { borderTopColor: colors.border }]}>
                    <Text style={[styles.learnMore, { color: colors.accent }]}>
                      Pelajari lebih lanjut →
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {laws.length === 0 && (
            <View style={[styles.emptyState, { backgroundColor: colors.surface }]}>
              <Ionicons name="book-outline" size={64} color={colors.textSecondary} />
              <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
                Tidak Ada UX Laws Tersedia
              </Text>
              <Text style={[styles.emptyDescription, { color: colors.textSecondary }]}>
                Database UX laws belum diinisialisasi. Silakan hubungi administrator.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  progressCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  progressCount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 14,
    marginTop: 8,
  },
  lawsContainer: {
    gap: 16,
  },
  lawCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lawCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statusIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  emptyCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  lawCardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  lawIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  lawTextContainer: {
    flex: 1,
  },
  lawTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  lawDescription: {
    fontSize: 14,
    lineHeight: 22,
  },
  lawCardFooter: {
    borderTopWidth: 1,
    marginTop: 16,
    paddingTop: 12,
  },
  learnMore: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
});
