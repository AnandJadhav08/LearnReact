import React from 'react';
import {View,Text,ScrollView,TouchableOpacity,SafeAreaView,StyleSheet,StatusBar,} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
interface ContentWarning {
  id: string;
  category: string;
  severity: 'Severe' | 'Mild';
  userVotes: number;
  description: string;
}

const GuidePage: React.FC = () => {
    const router = useRouter();
  const contentWarnings: ContentWarning[] = [
    {
      id: '1',
      category: 'Sex & Nudity',
      severity: 'Severe',
      userVotes: 356,
      description: 'Graphic orgy sex scenes with explicit and full nudity. Very explicit, very graphic.\nRomanticized relationships between adult men and teen girls, including child brides for procreation. Glamourized incestuous sexual relations are also a reoccurring theme.',
    },
    {
      id: '2',
      category: 'Violence & Gore',
      severity: 'Severe',
      userVotes: 289,
      description: 'There are extremely graphic violence, brutally murdering people with swords. Limbs are shown getting chopped off. Several heads and mangled dripping up limbs are shown in a wheelbarrow.\nA woman who is in labor has her womb cut open to take out the child. Blood is shown with screaming.\nSeveral shots of men being nailed to posts and left alive to crabs. Brief but disturbing.\nA man is suddenly crushed underfoot by a dragon. An intense battle sequence involving many blunt weapons. Many quick shots of heads being carved in half by various weapons.\nMany soldiers are burned alive by dragons, some are seen screaming and running while engulfed in flames, others are completely disintegrated.',
    },
    {
      id: '3',
      category: 'Profanity',
      severity: 'Severe',
      userVotes: 289,
      description: 'Fuck is used pretty frequently throughout the series so far. It varies between 2 to 7 uses per episode, some episodes more profane than the others. Shit, \'cunt\', \'cock\', \'bitch\', \'whore\', \'wench\', \'twat\' and \'bastard\' are all used as well.',
    },
    {
      id: '4',
      category: 'Alcohol, Drugs & Smoking',
      severity: 'Mild',
      userVotes: 289,
      description: 'A character gets increasingly drunk and despondent over the course of a night.',
    },
    {
      id: '5',
      category: 'Frightening & Intense Scenes',
      severity: 'Severe',
      userVotes: 289,
      description: 'One antagonist has burns and scars covering his body, and wears a mask that appears to be fused to his face. He does not speak and carries himself in a very unnerving way.',
    },
  ];

  const renderSeverityBadge = (severity: 'Severe' | 'Mild') => (
    <View style={[
      styles.severityBadge,
      severity === 'Severe' ? styles.severeBadge : styles.mildBadge
    ]}>
      <Text style={[
        styles.severityText,
        severity === 'Severe' ? styles.severeText : styles.mildText
      ]}>
        {severity}
      </Text>
    </View>
  );

  const renderContentWarning = (warning: ContentWarning) => (
    <View key={warning.id} style={styles.warningSection}>
      <View style={styles.warningHeader}>
        {/* <MaterialCommunityIcons 
          name="alert" 
          size={20} 
          color="#FF6B6B" 
          style={styles.warningIcon}
        /> */}
        <Text style={styles.categoryTitle}>{warning.category}</Text>
      </View>
      
      <View style={styles.ratingInfo}>
        {renderSeverityBadge(warning.severity)}
        <Text style={styles.userVotes}>Based on {warning.userVotes} user votes</Text>
      </View>
      
      <Text style={styles.description}>{warning.description}</Text>
    </View>
  );

  return (
 <View style={styles.outerContainer}>
          <StatusBar barStyle="dark-content" backgroundColor="#F5C842" />
          <SafeAreaView style={styles.safeArea}>
      
            <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/MovieDetail')}>
          <MaterialCommunityIcons name="chevron-left" size={34} color="#000" />
        </TouchableOpacity>
        <Text style={styles.imdbLogo}>Parent Guide</Text>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Show Title */}
        <View style={styles.titleSection}>
          <Text style={styles.showTitle}>House of the Dragon</Text>
        </View>

        {/* Spoiler Warning */}
        <View style={styles.spoilerSection}>
          <View style={styles.spoilerHeader}>
            <MaterialCommunityIcons name="alert" size={16} color="#FF6B6B" />
            <Text style={styles.spoilerTitle}>Spoiler!</Text>
          </View>
          <Text style={styles.spoilerText}>
            The Parents Guide items below may give away important plot points.
          </Text>
        </View>

        {/* Content Warnings */}
        <View style={styles.warningsContainer}>
          {contentWarnings.map(renderContentWarning)}
        </View>
      </ScrollView>
    </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  header: {
    backgroundColor: '#F5C842',
    paddingVertical: 30,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imdbLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginTop:20,
  },

  backButton: {
    marginRight: 12,
    marginTop:20,
  },
    scrollContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  titleSection: {
    padding: 20,
    paddingBottom: 12,
  },
  showTitle: {
    fontSize: 19,
    fontWeight: '400',
    color: '#000',
  },
  spoilerSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  spoilerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  spoilerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 4,
  },
  spoilerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 16,
  },
  warningsContainer: {
    paddingHorizontal: 20,
  },
  warningSection: {
    marginBottom: 24,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  warningIcon: {
    marginRight: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  ratingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  severeBadge: {
    backgroundColor: '#FFE5E5',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  mildBadge: {
    backgroundColor: '#E5F3FF',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  severityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  severeText: {
    color: '#FF6B6B',
  },
  mildText: {
    color: '#4A90E2',
  },
  userVotes: {
    fontSize: 14,
    color: '#000000',
  },
  description: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
  },
});

export default GuidePage;