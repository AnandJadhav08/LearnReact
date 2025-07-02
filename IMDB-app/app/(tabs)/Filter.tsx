import React, { useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ScrollView,SafeAreaView,StatusBar,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FilterScreenProps {
  navigation?: any;
}

interface SortOption {
  id: string;
  label: string;
}

interface YearRange {
  id: string;
  label: string;
  selected: boolean;
}

const Filter: React.FC<FilterScreenProps> = ({ navigation }) => {
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [yearRanges, setYearRanges] = useState<YearRange[]>([
    { id: '2022', label: '2022', selected: false },
    { id: '2010-2020', label: '2010 - 2020', selected: false },
    { id: '2000-2009', label: '2000 - 2009', selected: false },
    { id: '1990-2000', label: '1990 - 2000', selected: false },
    { id: '2023', label: '2023', selected: false },
  ]);

  const sortOptions: SortOption[] = [
    { id: 'popularity', label: 'Popularity' },
    { id: 'rating', label: 'Rating' },
    { id: 'release_date', label: 'Release Date' },
  ];

  const handleSortSelection = (optionId: string) => {
    setSelectedSort(optionId);
  };

  const handleYearToggle = (yearId: string) => {
    setYearRanges(prev =>
      prev.map(year =>
        year.id === yearId ? { ...year, selected: !year.selected } : year
      )
    );
  };

  const handleApply = () => {
    // Handle apply filter logic here
    console.log('Applying filters...');
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filter</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sort by</Text>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.radioOption}
              onPress={() => handleSortSelection(option.id)}
            >
              <View style={styles.radioButton}>
                <View
                  style={[
                    styles.radioCircle,
                    selectedSort === option.id && styles.radioCircleSelected,
                  ]}
                />
              </View>
              <Text style={styles.radioLabel}>Label</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.dropdownSection}>
          <View>
            <Text style={styles.sectionTitle}>Genre</Text>
            <Text style={styles.dropdownValue}>All</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.dropdownSection}>
          <View>
            <Text style={styles.sectionTitle}>Country</Text>
            <Text style={styles.dropdownValue}>All</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.dropdownSection}>
          <View>
            <Text style={styles.sectionTitle}>Rating</Text>
            <Text style={styles.dropdownValue}>All</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Year</Text>
          <View style={styles.chipContainer}>
            {yearRanges.map((year) => (
              <TouchableOpacity
                key={year.id}
                style={[
                  styles.chip,
                  year.selected && styles.chipSelected,
                ]}
                onPress={() => handleYearToggle(year.id)}
              >
                <Text
                  style={[
                    styles.chipText,
                    year.selected && styles.chipTextSelected,
                  ]}
                >
                  {year.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 15,
    marginTop: 10,
  },
  headerTitle: {
    paddingTop: 5,
    fontSize: 30,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  radioButton: {
    marginRight: 15,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  radioCircleSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  radioLabel: {
    fontSize: 16,
    color: '#666',
  },
  dropdownSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownValue: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  chipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  chipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#fff',
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 35,
  },
  applyButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Filter;