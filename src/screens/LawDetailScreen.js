import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import axiosInstance from '../utils/axios';
import { getIndonesianLaw } from '../data/uxLawsIndo';
import SimulationComponent from '../components/SimulationComponent';

export default function LawDetailScreen({ route, navigation }) {
  const { lawId } = route.params;
  const { colors, isDark } = useTheme();
  const [law, setLaw] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSimulation, setShowSimulation] = useState(false);

  useEffect(() => {
    fetchLaw();
  }, [lawId]);

  useEffect(() => {
    if (law) {
      navigation.setOptions({ title: law.title });
    }
  }, [law, navigation]);

  const fetchLaw = async () => {
    try {
      const [lawRes, profileRes] = await Promise.all([
        axiosInstance.get(`/api/ux-laws/${lawId}`),
        axiosInstance.get('/api/user/profile'),
      ]);

      const lawData = getIndonesianLaw(lawId, lawRes.data.data);
      setLaw(lawData);

      let progress = profileRes.data.data.progress || {};
      
      // Handle jika progress adalah Map
      if (progress instanceof Map) {
        progress = Object.fromEntries(progress);
      }
      
      setIsCompleted(progress[lawId] || false);
    } catch (error) {
      console.error('Error fetching law:', error);
      Alert.alert('Error', 'Gagal memuat data. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async () => {
    try {
      await axiosInstance.put(`/api/user/progress/${lawId}`, {
        completed: true,
      });
      setIsCompleted(true);
      setShowSimulation(false);
      Alert.alert('Berhasil!', 'UX Law ini telah ditandai sebagai selesai.');
    } catch (error) {
      console.error('Error marking complete:', error);
      Alert.alert('Error', 'Gagal menandai selesai. Silakan coba lagi.');
    }
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (!law) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
        <View style={[styles.errorCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.errorTitle, { color: colors.textPrimary }]}>
            Hukum Tidak Ditemukan
          </Text>
          <Text style={[styles.errorDescription, { color: colors.textSecondary }]}>
            Hukum UX yang diminta tidak dapat ditemukan.
          </Text>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.accent }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Kembali ke Dashboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header Section */}
          <View style={[styles.headerCard, { backgroundColor: colors.surface }]}>
            <View style={styles.headerTop}>
              <View style={styles.headerText}>
                <View
                  style={[styles.categoryBadge, { backgroundColor: colors.accentSubtle }]}
                >
                  <Text style={[styles.categoryText, { color: colors.accent }]}>
                    {law.category}
                  </Text>
                </View>
                <Text style={[styles.lawTitle, { color: colors.textPrimary }]}>
                  {law.title}
                </Text>
                <Text style={[styles.lawDescription, { color: colors.textSecondary }]}>
                  {law.description}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: isCompleted ? '#22C55E' : colors.accentSubtle,
                  },
                ]}
              >
                {isCompleted ? (
                  <Ionicons name="checkmark" size={24} color="#FFFFFF" />
                ) : (
                  <Ionicons name="ellipse-outline" size={24} color={colors.textSecondary} />
                )}
              </View>
            </View>

            {/* Action Section */}
            {!isCompleted && !showSimulation && (
              <View style={[styles.actionCard, { borderColor: colors.accent }]}>
                <View style={styles.actionContent}>
                  <Ionicons name="game-controller-outline" size={32} color={colors.accent} />
                  <View style={styles.actionText}>
                    <Text style={[styles.actionTitle, { color: colors.textPrimary }]}>
                      Coba Simulasi Interaktif
                    </Text>
                    <Text style={[styles.actionDescription, { color: colors.textSecondary }]}>
                      Pahami {law.title} melalui simulasi interaktif. Setelah menyelesaikan simulasi, hukum ini akan ditandai sebagai selesai.
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.simulationButton, { backgroundColor: colors.accent }]}
                  onPress={() => setShowSimulation(true)}
                >
                  <Ionicons name="play" size={20} color="#FFFFFF" />
                  <Text style={styles.simulationButtonText}>Mulai Simulasi</Text>
                </TouchableOpacity>
              </View>
            )}

            {isCompleted && !showSimulation && (
              <View style={[styles.completedCard, { backgroundColor: 'rgba(34, 197, 94, 0.1)', borderColor: '#22C55E' }]}>
                <Ionicons name="trophy" size={32} color="#22C55E" />
                <View style={styles.completedText}>
                  <Text style={[styles.completedTitle, { color: '#22C55E' }]}>
                    Selesai! 🎉
                  </Text>
                  <Text style={[styles.completedDescription, { color: colors.textSecondary }]}>
                    Anda telah berhasil menyelesaikan simulasi untuk hukum UX ini.
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.retryButton, { borderColor: '#22C55E' }]}
                  onPress={() => setShowSimulation(true)}
                >
                  <Text style={[styles.retryButtonText, { color: '#22C55E' }]}>
                    Ulangi
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {showSimulation && (
              <View style={[styles.simulationContainer, { borderColor: colors.accent, backgroundColor: colors.surface }]}>
                <SimulationComponent
                  lawId={lawId}
                  lawTitle={law.title}
                  colors={colors}
                  onComplete={handleMarkComplete}
                />
                <TouchableOpacity
                  style={[styles.cancelButton, { borderColor: colors.accent, marginHorizontal: 16, marginBottom: 16 }]}
                  onPress={() => setShowSimulation(false)}
                >
                  <Text style={[styles.cancelButtonText, { color: colors.accent }]}>
                    Kembali
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Overview Section */}
          <View style={[styles.sectionCard, { backgroundColor: colors.surface }]}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              Gambaran Umum
            </Text>
            <Text style={[styles.sectionContent, { color: colors.textSecondary }]}>
              {law.fullContent}
            </Text>
          </View>

          {/* Principles Section */}
          {law.principles && law.principles.length > 0 && (
            <View style={[styles.sectionCard, { backgroundColor: colors.surface }]}>
              <View style={styles.sectionHeader}>
                <Ionicons name="list" size={24} color={colors.accent} />
                <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                  Prinsip Utama
                </Text>
              </View>
              {law.principles.map((principle, index) => (
                <View key={index} style={styles.principleItem}>
                  <View
                    style={[styles.principleNumber, { backgroundColor: colors.accent }]}
                  >
                    <Text style={styles.principleNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={[styles.principleText, { color: colors.textSecondary }]}>
                    {principle}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Examples Section */}
          {law.examples && law.examples.length > 0 && (
            <View style={[styles.sectionCard, { backgroundColor: colors.surface }]}>
              <View style={styles.sectionHeader}>
                <Ionicons name="bulb-outline" size={24} color={colors.accent} />
                <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                  Contoh Dunia Nyata
                </Text>
              </View>
              {law.examples.map((example, index) => (
                <View
                  key={index}
                  style={[styles.exampleCard, { backgroundColor: colors.background }]}
                >
                  <Text style={[styles.exampleTitle, { color: colors.textPrimary }]}>
                    {example.title}
                  </Text>
                  <Text style={[styles.exampleDescription, { color: colors.textSecondary }]}>
                    {example.description}
                  </Text>
                </View>
              ))}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  errorCard: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  errorDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  headerCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    flex: 1,
    marginRight: 16,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  lawTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  lawDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  statusBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionCard: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  actionText: {
    flex: 1,
    marginLeft: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    lineHeight: 22,
  },
  simulationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  simulationButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  completedCard: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  completedText: {
    flex: 1,
  },
  completedTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  completedDescription: {
    fontSize: 14,
  },
  retryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
  },
  retryButtonText: {
    fontWeight: '600',
  },
  simulationContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  simulationTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  simulationInfo: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  simulationButtons: {
    gap: 12,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButton: {
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  sectionCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 26,
  },
  principleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  principleNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  principleNumberText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  principleText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 24,
  },
  exampleCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  exampleDescription: {
    fontSize: 14,
    lineHeight: 22,
  },
});
