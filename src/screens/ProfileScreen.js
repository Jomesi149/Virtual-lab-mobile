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
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axios';

export default function ProfileScreen({ navigation }) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { user, logout, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get('/api/user/profile');
      setProfile(response.data.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi Keluar',
      'Apakah Anda yakin ingin keluar dari akun ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Keluar',
          style: 'destructive',
          onPress: () => logout(),
        },
      ]
    );
  };

  const getProgressStats = () => {
    if (!profile?.progress) return { completed: 0, total: 0, percentage: 0 };
    
    let progressObj = profile.progress;
    if (progressObj instanceof Map) {
      progressObj = Object.fromEntries(progressObj);
    }
    
    const completed = Object.values(progressObj).filter(Boolean).length;
    const total = 20; // Total UX Laws
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    
    return { completed, total, percentage };
  };

  const stats = getProgressStats();

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Profile Header */}
          <View style={[styles.profileCard, { backgroundColor: colors.surface }]}>
            <View style={[styles.avatarContainer, { backgroundColor: colors.accent }]}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </Text>
            </View>
            <Text style={[styles.userName, { color: colors.textPrimary }]}>
              {user?.name || 'Pengguna'}
            </Text>
            <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
              {user?.email || 'email@example.com'}
            </Text>
          </View>

          {/* Progress Stats */}
          <View style={[styles.statsCard, { backgroundColor: colors.surface }]}>
            <Text style={[styles.statsTitle, { color: colors.textPrimary }]}>
              Statistik Belajar
            </Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.accent }]}>
                  {stats.completed}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                  Selesai
                </Text>
              </View>
              
              <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
              
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.accent }]}>
                  {stats.total}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                  Total Laws
                </Text>
              </View>
              
              <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
              
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.accent }]}>
                  {stats.percentage.toFixed(0)}%
                </Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                  Progres
                </Text>
              </View>
            </View>

            <View style={[styles.progressBarBg, { backgroundColor: colors.accentSubtle }]}>
              <View
                style={[
                  styles.progressBarFill,
                  { backgroundColor: colors.accent, width: `${stats.percentage}%` },
                ]}
              />
            </View>
          </View>

          {/* Settings */}
          <View style={[styles.settingsCard, { backgroundColor: colors.surface }]}>
            <Text style={[styles.settingsTitle, { color: colors.textPrimary }]}>
              Pengaturan
            </Text>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons
                  name={isDark ? 'moon' : 'sunny'}
                  size={24}
                  color={colors.accent}
                />
                <Text style={[styles.settingText, { color: colors.textPrimary }]}>
                  Mode Gelap
                </Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.border, true: colors.accent }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={[styles.settingDivider, { backgroundColor: colors.border }]} />

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="notifications-outline" size={24} color={colors.accent} />
                <Text style={[styles.settingText, { color: colors.textPrimary }]}>
                  Notifikasi
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            <View style={[styles.settingDivider, { backgroundColor: colors.border }]} />

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="help-circle-outline" size={24} color={colors.accent} />
                <Text style={[styles.settingText, { color: colors.textPrimary }]}>
                  Bantuan
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            <View style={[styles.settingDivider, { backgroundColor: colors.border }]} />

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="information-circle-outline" size={24} color={colors.accent} />
                <Text style={[styles.settingText, { color: colors.textPrimary }]}>
                  Tentang Aplikasi
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: colors.error }]}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
            <Text style={styles.logoutButtonText}>Keluar</Text>
          </TouchableOpacity>

          {/* App Version */}
          <Text style={[styles.versionText, { color: colors.textSecondary }]}>
            UX Lab Mobile v1.0.0
          </Text>
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
  profileCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
  },
  statsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: '100%',
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
  settingsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
  },
  settingDivider: {
    height: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 24,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 20,
  },
});
