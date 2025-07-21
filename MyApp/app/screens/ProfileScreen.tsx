import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
  Modal,
  TextInput,
  Share,
  Linking,
  Platform
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

interface UserProfile {
  name: string;
  email: string;
  membershipType: string;
  totalContent: number;
  savedTemplates: number;
  daysActive: number;
}

interface UserPreferences {
  isDarkMode: boolean;
  notifications: boolean;
  autoSave: boolean;
}

const ProfileScreen = ({ navigation }: Props) => {
  // State management
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    email: '',
    membershipType: 'Pro Member',
    totalContent: 1,
    savedTemplates: 1,
    daysActive: 89
  });

  const [preferences, setPreferences] = useState<UserPreferences>({
    isDarkMode: false,
    notifications: true,
    autoSave: true
  });

  // Modal states
  const [isEditProfileModalVisible, setIsEditProfileModalVisible] = useState(false);
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);
  const [tempUserProfile, setTempUserProfile] = useState<UserProfile>(userProfile);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Load user data on component mount
  useEffect(() => {
    loadUserData();
  }, []);

  // Save preferences when they change
  useEffect(() => {
    saveUserPreferences();
  }, [preferences]);

  const loadUserData = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('userProfile');
      const savedPreferences = await AsyncStorage.getItem('userPreferences');

      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
        setTempUserProfile(JSON.parse(savedProfile));
      }
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const saveUserProfile = async (profile: UserProfile) => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };

  const saveUserPreferences = async () => {
    try {
      await AsyncStorage.setItem('userPreferences', JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving user preferences:', error);
    }
  };

  const profileStats = [
    {
      label: 'Total Content',
      value: userProfile.totalContent.toString(),
      icon: 'file-document-outline',
      color: '#FF6B6B'
    },
    {
      label: 'Saved Templates',
      value: userProfile.savedTemplates.toString(),
      icon: 'bookmark-outline',
      color: '#4ECDC4'
    },
    {
      label: 'Days Active',
      value: userProfile.daysActive.toString(),
      icon: 'calendar-check',
      color: '#45B7D1'
    },
  ];

  // Profile editing functionality
  const handleEditProfile = () => {
    setIsEditProfileModalVisible(true);
  };

  const saveProfileChanges = () => {
    setUserProfile(tempUserProfile);
    saveUserProfile(tempUserProfile);
    setIsEditProfileModalVisible(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  // Password change functionality
  const handleChangePassword = () => {
    setIsChangePasswordModalVisible(true);
  };

  const savePasswordChange = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      Alert.alert('Error', 'Please fill in all password fields');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    // Simulate password change
    setIsChangePasswordModalVisible(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    Alert.alert('Success', 'Password changed successfully!');
  };

  // Privacy settings
  const handlePrivacySettings = () => {
    Alert.alert(
      'Privacy Settings',
      'Choose your privacy preferences:',
      [
        {
          text: 'Data Sharing: OFF',
          onPress: () => Alert.alert('Privacy', 'Data sharing disabled')
        },
        {
          text: 'Profile Visibility: Friends Only',
          onPress: () => Alert.alert('Privacy', 'Profile set to friends only')
        },
        {
          text: 'Analytics: Enabled',
          onPress: () => Alert.alert('Privacy', 'Analytics tracking enabled')
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  // Content management
  const handleContentCategories = () => {
    const categories = ['Business', 'Creative Writing', 'Social Media', 'Technical', 'Educational'];
    Alert.alert(
      'Content Categories',
      `Available categories: ${categories.join(', ')}`,
      [
        { text: 'Manage Categories', onPress: () => console.log('Navigate to categories') },
        { text: 'OK' }
      ]
    );
  };

  const handleTemplateLibrary = () => {
    navigation.navigate('TemplateLibrary' as any);
  };

  // Export data functionality
  const handleExportData = async () => {
    try {
      const exportData = {
        profile: userProfile,
        preferences: preferences,
        exportDate: new Date().toISOString(),
        version: '2.1.0'
      };

      const jsonString = JSON.stringify(exportData, null, 2);
      const fileUri = FileSystem.documentDirectory + 'profile_export.json';

      await FileSystem.writeAsStringAsync(fileUri, jsonString);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert('Success', 'Data exported successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to export data');
      console.error('Export error:', error);
    }
  };

  // Support functions
  const handleHelpCenter = () => {
    const helpTopics = [
      'Getting Started',
      'Creating Content',
      'Managing Templates',
      'Account Settings',
      'Troubleshooting'
    ];

    Alert.alert(
      'Help Center',
      'Select a help topic:',
      [
        ...helpTopics.map(topic => ({
          text: topic,
          onPress: () => Alert.alert('Help', `Opening help for: ${topic}`)
        })),
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleContactSupport = async () => {
    const supportEmail = 'support@aicontentcreator.com';
    const subject = 'Support Request from Mobile App';
    const body = `User: ${userProfile.name}\nEmail: ${userProfile.email}\nApp Version: 2.1.0\n\nDescribe your issue here...`;

    const mailtoUrl = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    try {
      const canOpen = await Linking.canOpenURL(mailtoUrl);
      if (canOpen) {
        await Linking.openURL(mailtoUrl);
      } else {
        Alert.alert(
          'Contact Support',
          `Please contact us at: ${supportEmail}`,
          [
            { text: 'Copy Email', onPress: () => console.log('Copy to clipboard') },
            { text: 'OK' }
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to open email client');
    }
  };

  const handleRateApp = () => {
    const storeUrl = Platform.select({
      ios: 'https://apps.apple.com/app/ai-content-creator',
      android: 'https://play.google.com/store/apps/details?id=com.aicontentcreator'
    });

    if (storeUrl) {
      Linking.openURL(storeUrl).catch(() => {
        Alert.alert('Error', 'Unable to open app store');
      });
    }
  };

  // Quick action handlers
  const handleBackup = async () => {
    try {
      const backupData = {
        profile: userProfile,
        preferences: preferences,
        templates: await AsyncStorage.getItem('savedTemplates') || '[]',
        content: await AsyncStorage.getItem('userContent') || '[]',
        backupDate: new Date().toISOString()
      };

      await AsyncStorage.setItem('backup', JSON.stringify(backupData));
      Alert.alert('Success', 'Data backed up successfully!');
    } catch (error) {
      Alert.alert('Error', 'Backup failed');
    }
  };

  const handleShareApp = async () => {
    try {
      await Share.share({
        message: 'Check out AI Content Creator - the best app for creating amazing content! Download it now and boost your productivity.',
        title: 'AI Content Creator'
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const handleAchievements = () => {
    const achievements = [
      { name: 'First Content', description: 'Created your first piece of content', earned: true },
      { name: 'Template Master', description: 'Used 10 different templates', earned: true },
      { name: 'Consistent Creator', description: 'Created content for 30 days straight', earned: false },
      { name: 'Social Butterfly', description: 'Shared content 50 times', earned: false },
    ];

    const achievementText = achievements
      .map(a => `${a.earned ? '🏆' : '🔒'} ${a.name}`)
      .join('\n');

    Alert.alert('Achievements', achievementText);
  };

  // Preference handlers
  const toggleDarkMode = (value: boolean) => {
    setPreferences(prev => ({ ...prev, isDarkMode: value }));
    // Apply theme changes here
    Alert.alert('Theme', value ? 'Dark mode enabled' : 'Light mode enabled');
  };

  const toggleNotifications = (value: boolean) => {
    setPreferences(prev => ({ ...prev, notifications: value }));
    // Configure push notifications here
  };

  const toggleAutoSave = (value: boolean) => {
    setPreferences(prev => ({ ...prev, autoSave: value }));
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userToken');
              await AsyncStorage.removeItem('userSession');
              navigation.navigate('Login' as any);
            } catch (error) {
              console.error('Logout error:', error);
            }
          }
        }
      ]
    );
  };

  const settingsOptions = [
    {
      title: 'Account Settings',
      items: [
        {
          title: 'Edit Profile',
          icon: 'account-edit',
          onPress: handleEditProfile
        },
        {
          title: 'Change Password',
          icon: 'lock-outline',
          onPress: handleChangePassword
        },
        {
          title: 'Privacy Settings',
          icon: 'shield-account',
          onPress: handlePrivacySettings
        },
      ]
    },
    {
      title: 'Content Preferences',
      items: [
        {
          title: 'Content Categories',
          icon: 'tag-outline',
          onPress: handleContentCategories
        },
        {
          title: 'Template Library',
          icon: 'library-outline',
          onPress: handleTemplateLibrary
        },
        {
          title: 'Export Data',
          icon: 'download-outline',
          onPress: handleExportData
        },
      ]
    },
    {
      title: 'Support',
      items: [
        {
          title: 'Help Center',
          icon: 'help-circle-outline',
          onPress: handleHelpCenter
        },
        {
          title: 'Contact Support',
          icon: 'email-outline',
          onPress: handleContactSupport
        },
        {
          title: 'Rate App',
          icon: 'star-outline',
          onPress: handleRateApp
        },
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#1E293B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <MaterialCommunityIcons name="pencil" size={20} color="#6366F1" />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileAvatar}>
            <MaterialCommunityIcons name="account" size={40} color="#FFF" />
          </View>
          <Text style={styles.profileName}>{userProfile.name}</Text>
          <Text style={styles.profileEmail}>{userProfile.email}</Text>
          <View style={styles.profileBadge}>
            <MaterialCommunityIcons name="crown" size={14} color="#FFB800" />
            <Text style={styles.badgeText}>{userProfile.membershipType}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsRow}>
            {profileStats.map((stat, index) => (
              <TouchableOpacity key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                  <MaterialCommunityIcons name={stat.icon as any} size={20} color="#FFF" />
                </View>
                <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity style={styles.quickActionCard} onPress={handleBackup}>
              <MaterialCommunityIcons name="backup-restore" size={24} color="#4ECDC4" />
              <Text style={styles.quickActionText}>Backup</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard} onPress={handleShareApp}>
              <MaterialCommunityIcons name="share-variant" size={24} color="#FF6B6B" />
              <Text style={styles.quickActionText}>Share App</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard} onPress={handleAchievements}>
              <MaterialCommunityIcons name="trophy" size={24} color="#FFB800" />
              <Text style={styles.quickActionText}>Achievements</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Preferences */}
        <View style={styles.preferencesContainer}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          <View style={styles.preferenceCard}>
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceLeft}>
                <MaterialCommunityIcons name="theme-light-dark" size={20} color="#64748B" />
                <Text style={styles.preferenceLabel}>Dark Mode</Text>
              </View>
              <Switch
                value={preferences.isDarkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: '#E2E8F0', true: '#6366F1' }}
                thumbColor={preferences.isDarkMode ? '#FFF' : '#FFF'}
              />
            </View>

            <View style={styles.preferenceItem}>
              <View style={styles.preferenceLeft}>
                <MaterialCommunityIcons name="bell-outline" size={20} color="#64748B" />
                <Text style={styles.preferenceLabel}>Notifications</Text>
              </View>
              <Switch
                value={preferences.notifications}
                onValueChange={toggleNotifications}
                trackColor={{ false: '#E2E8F0', true: '#6366F1' }}
                thumbColor={preferences.notifications ? '#FFF' : '#FFF'}
              />
            </View>

            <View style={styles.preferenceItem}>
              <View style={styles.preferenceLeft}>
                <MaterialCommunityIcons name="content-save-outline" size={20} color="#64748B" />
                <Text style={styles.preferenceLabel}>Auto Save</Text>
              </View>
              <Switch
                value={preferences.autoSave}
                onValueChange={toggleAutoSave}
                trackColor={{ false: '#E2E8F0', true: '#6366F1' }}
                thumbColor={preferences.autoSave ? '#FFF' : '#FFF'}
              />
            </View>
          </View>
        </View>

        {/* Settings Sections */}
        {settingsOptions.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.settingsContainer}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.settingsCard}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.settingsItem,
                    itemIndex === section.items.length - 1 && styles.lastSettingsItem
                  ]}
                  onPress={item.onPress}
                  activeOpacity={0.7}
                >
                  <View style={styles.settingsLeft}>
                    <MaterialCommunityIcons name={item.icon as any} size={20} color="#64748B" />
                    <Text style={styles.settingsLabel}>{item.title}</Text>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={16} color="#C0C0C0" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="logout" size={20} color="#FF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>AI Content Creator v2.1.0</Text>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditProfileModalVisible}
        onRequestClose={() => setIsEditProfileModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setIsEditProfileModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={tempUserProfile.name}
                  onChangeText={(text) => setTempUserProfile(prev => ({ ...prev, name: text }))}
                  placeholder="Enter your full name"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.textInput}
                  value={tempUserProfile.email}
                  onChangeText={(text) => setTempUserProfile(prev => ({ ...prev, email: text }))}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                />
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsEditProfileModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={saveProfileChanges}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isChangePasswordModalVisible}
        onRequestClose={() => setIsChangePasswordModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Change Password</Text>
              <TouchableOpacity onPress={() => setIsChangePasswordModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Current Password</Text>
                <TextInput
                  style={styles.textInput}
                  value={passwordData.currentPassword}
                  onChangeText={(text) => setPasswordData(prev => ({ ...prev, currentPassword: text }))}
                  placeholder="Enter current password"
                  secureTextEntry
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>New Password</Text>
                <TextInput
                  style={styles.textInput}
                  value={passwordData.newPassword}
                  onChangeText={(text) => setPasswordData(prev => ({ ...prev, newPassword: text }))}
                  placeholder="Enter new password"
                  secureTextEntry
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Confirm New Password</Text>
                <TextInput
                  style={styles.textInput}
                  value={passwordData.confirmPassword}
                  onChangeText={(text) => setPasswordData(prev => ({ ...prev, confirmPassword: text }))}
                  placeholder="Confirm new password"
                  secureTextEntry
                />
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsChangePasswordModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={savePasswordChange}
              >
                <Text style={styles.saveButtonText}>Update Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    backgroundColor: '#6366F1',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 12,
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D97706',
    marginLeft: 4,
  },
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    marginHorizontal: 4,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 8,
    fontWeight: '500',
  },
  preferencesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  preferenceCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  preferenceLabel: {
    fontSize: 14,
    marginLeft: 10,
    color: '#1E293B',
    fontWeight: '500',
  },
  settingsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  settingsCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  lastSettingsItem: {
    borderBottomWidth: 0,
  },
  settingsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsLabel: {
    fontSize: 14,
    marginLeft: 10,
    color: '#1E293B',
    fontWeight: '500',
  },
  logoutContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE4E4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  logoutText: {
    fontSize: 14,
    color: '#FF4444',
    fontWeight: '600',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 30,
  },
  versionText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  modalBody: {
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#1E293B',
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1E293B',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#6366F1',
    borderRadius: 10,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF',
  },
});

export default ProfileScreen;
