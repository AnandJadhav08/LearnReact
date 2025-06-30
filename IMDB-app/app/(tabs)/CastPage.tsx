import React from 'react';
import {View,Text,ScrollView,TouchableOpacity,SafeAreaView,StyleSheet,StatusBar,Image,} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
interface CastMember {
  id: string;
  name: string;
  image: string;
}

const CastPage: React.FC = () => {
    const router = useRouter();
  const castMembers: CastMember[] = [
    {
      id: '1',
      name: 'Matt Smith',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWs8GpphRGVgQ4CffAMw1P2kzqoG476UZZww&s',
    },
    {
      id: '2',
      name: 'Rhys Ifans',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBtwykPdiWdC3SvUDTr-RFEiaJN7eHs9nsLg&s',
    },
    {
      id: '3',
      name: 'Fabien Frankel',
      image: 'https://m.media-amazon.com/images/M/MV5BZWZhNjllZGYtN2JlOS00Nzc5LTkyODUtMzlkN2Y0ODQ3YWE3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    },
    {
      id: '4',
      name: 'Bill Paterson',
      image: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/75970_v9_bb.jpg',
    },
    {
      id: '5',
      name: 'Emma D\'Arcy',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Emma_D%27Arcy.jpg',
    },
    {
      id: '6',
      name: 'Olivia Cooke',
      image: 'https://m.media-amazon.com/images/M/MV5BYTBmMzEwYmItZThlOC00YzIxLWJlZTEtMmEzNjkwNDE0MzY0XkEyXkFqcGc@._V1_.jpg',
    },
    {
      id: '7',
      name: 'Bethany Antonia',
      image: 'https://m.media-amazon.com/images/M/MV5BYTc4YTEzMmQtYzY1Mi00ZTBmLWEzY2EtYWNjODcxNTQxMzRhXkEyXkFqcGc@._V1_.jpg',
    },
    {
      id: '8',
      name: 'Phoebe Campbell',
      image: 'https://ntvb.tmsimg.com/assets/assets/994373_v9_bd.jpg',
    },
    {
      id: '9',
      name: 'Tom Glynn-Carney',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpllLwjFY-Nv4UahHBLuXQgSd4gXVSuDj7Zw&s',
    },
    {
      id: '10',
      name: 'Ewan Mitchell',
      image: 'https://m.media-amazon.com/images/M/MV5BMDk2NGYyMmUtZDA2YS00YTI3LTk3ODYtMTM0YzdiNTg0OTg3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    },
    {
      id: '11',
      name: 'Harry Collett',
      image: 'https://m.media-amazon.com/images/M/MV5BYWYzYzFjNGEtN2MxYy00YTQ0LWFmMWItZTRjZjNmNjZkMGIzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    },
    {
      id: '12',
      name: 'Phia Saban',
      image: 'https://ntvb.tmsimg.com/assets/assets/1760949_v9_aa.jpg',
    },
    {
      id: '13',
      name: 'Ty Tennant',
      image: 'https://ntvb.tmsimg.com/assets/assets/1245078_v9_bb.jpg',
    },
    {
      id: '14',
      name: 'Eve Best',
      image: 'https://i2-prod.manchestereveningnews.co.uk/article24853390.ece/ALTERNATES/s1200b/0_evabest.jpg',
    },
    {
      id: '15',
      name: 'Steve Toussaint',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwIcguHpWn-F9l1yv-u8ppIjGBY5QKJAvayg&s',
    },
    {
      id: '16',
      name: 'Anthony Flanagan',
      image: 'https://m.media-amazon.com/images/M/MV5BODg3NDkzMDIwN15BMl5BanBnXkFtZTgwNzMyMDUyODE@._V1_.jpg',
    },
    {
      id: '17',
      name: 'Robert Rhodes',
      image: 'https://pbs.twimg.com/media/GSm1BEZXEAApjwE.jpg:large',
    },
    {
      id: '18',
      name: 'Kurt Egyiawan',
      image: 'https://images.mubicdn.net/images/cast_member/532208/cache-394249-1543802058/image-w856.jpg',
    },
    {
      id: '19',
      name: 'Abubakar Salim',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0IDclnA1n9LQSZ4TkfucqmdHo5n_FNiJGQQ&s',
    },
    {
      id: '20',
      name: 'Elliott Tittensor',
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Gallery_showbiz-elliott-tittensor.jpg',
    },
  ];

  const renderCastMember = (member: CastMember, index: number) => (
    <TouchableOpacity key={member.id} style={styles.castMemberContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: member.image }} style={styles.castImage} />
      </View>
      <Text style={styles.castName} numberOfLines={2}>
        {member.name}
      </Text>
    </TouchableOpacity>
  );

  const renderCastGrid = () => {
    const rows = [];
    for (let i = 0; i < castMembers.length; i += 4) {
      const rowMembers = castMembers.slice(i, i + 4);
      rows.push(
        <View key={i} style={styles.castRow}>
          {rowMembers.map((member, index) => renderCastMember(member, i + index))}
        </View>
      );
    }
    return rows;
  };

  return (
    <View style={styles.outerContainer}>
              <StatusBar barStyle="dark-content" backgroundColor="#F5C842" />
              <SafeAreaView style={styles.safeArea}>
          
                <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/MovieDetail')}>
              <MaterialCommunityIcons name="chevron-left" size={34} color="#000" />
            </TouchableOpacity>
            <Text style={styles.imdbLogo}>Cast</Text>
          </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.castContainer}>
          {renderCastGrid()}
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
  castContainer: {
    padding: 16,
  },
  castRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  castMemberContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#F0F0F0',
  },
  castImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  castName: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 16,
    minHeight: 32,
  },
});

export default CastPage;