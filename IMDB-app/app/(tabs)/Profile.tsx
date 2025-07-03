import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import UpcomingMovies from "@/components/UpcomingMovies";


interface MovieProps {
  title: string;
  image: string;
}

const MovieCard: React.FC<MovieProps> = ({ title, image }) => (
  <TouchableOpacity style={styles.movieCard}>
    <Image source={{ uri: image }} style={styles.movieImage} />
    <Text style={styles.movieTitle}>{title}</Text>
  </TouchableOpacity>
);

const Profile = () => {

  // const topMovies = [
  //   { title: 'Minecraft', 
  //     image: 'https://i.ebayimg.com/images/g/wdIAAOSwcRxn7RxD/s-l1200.jpg'
  //    },
  //   { title: 'Thor: Love and Thunder', 
  //     image: 'https://m.media-amazon.com/images/M/MV5BZjRiMDhiZjQtNjk5Yi00ZDcwLTkyYTEtMDc1NjdmNjFhNGIzXkEyXkFqcGc@._V1_.jpg' 
  //   },
  //  { title: 'Elemental', 
  //     image: 'https://i0.wp.com/pixarpost.com/wp-content/uploads/2023/06/Elemental-Real-3D-Payoff-Poster.jpg?resize=1200%2C1778&ssl=1' 
  //   },
  //   { title: 'The Croods', 
  //    image: 'https://wallpaper.dog/large/10825231.jpg' 
  //  },
  // ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{uri:'https://img.nowrunning.com/content/Artist/GautamRode/banner.jpg'}}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.name}>Anand Jadhav</Text>
            <Text style={styles.email}>anandvjadhav2308@gmail.com</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editText}>Edit Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkText}>Watchlist</Text>
          <Ionicons name="chevron-forward" size={20} />
        </TouchableOpacity>
                   {/* <View style={styles.moviesScroll}>
                       <FlatList
                         data={topMovies}
                         keyExtractor={(item, index) => index.toString()}
                         horizontal
                        showsHorizontalScrollIndicator={false}
                         renderItem={({ item }) => (
                           <MovieCard title={item.title} image={item.image} />
                         )}
                       />
              </View> */}

              <UpcomingMovies/>
        <View>

        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkText}>Activities</Text>
          <Ionicons name="chevron-forward" size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkText}>Preferences</Text>
          <Ionicons name="chevron-forward" size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkText}>Settings</Text>
          <Ionicons name="chevron-forward" size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={() => router.push('/(tabs)/SignInScreen')}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
          
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    gap: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
    borderColor:"#000000",
    borderWidth: 0,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 12,
    color: "gray",
  },
  editButton: {
    borderWidth: 1,
    borderRadius: 9,
    borderColor: "#aaa",
    marginTop: 5,
    paddingHorizontal: 2,
    paddingVertical: 9,
  },
  editText: {
    fontSize: 15,
    textAlign: 'center',
    justifyContent: 'center',
    color: "#333",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,

  },
  moviesScroll: {
    paddingLeft: 16,
    backgroundColor: '#F5F6FA',
  },
  movieCard: {
    marginRight: 12,
    width: 120,
    backgroundColor: '#F5F6FA',
  },

  
  movieImage: {
    width: 120,
    height: 190,
    borderRadius: 5,
  },
  movieTitle: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  linkText: {
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#000",
    margin: 20,
    marginTop: 100,
    padding: 12,
    borderRadius: 10,
  },
  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
  },
});