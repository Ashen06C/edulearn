import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import BookCard from "@/components/BookCard";

const home = () => {
  type RouteParams = {
    username?: string;
  };

  const route = useRoute();
  const { username } = route.params as RouteParams;

  interface Book {
    id: number;
    title?: string;
    author: string;
    publicationYear: number; // Use camelCase for consistency with TypeScript conventions
    genre: string[];
    description: string;
    coverImage: string;
  }

  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const heartIcon = require("../../assets/icons/heartwhite.png");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://www.freetestapi.com/api/v1/books"
      );
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Dear <Text style={{color: "#4A90E2"}}>{username || "Guest"}</Text> ,</Text>
          <Text style={styles.welcomeText}>Welcome to <Text style={{color: "#4A90E2"}}>EduLearn</Text></Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for books..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />

        <TouchableOpacity style={styles.floatingButton}>
          <TouchableOpacity>
            <Image style={{ height: 25, width: 25 }} source={heartIcon} />
          </TouchableOpacity>
          <Text style={styles.floatingButtonText}>10</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.innerContainer}>
          {books.map((book) => (
            <BookCard
              key={book.id}
              title={book.title || "Untitled"}
              author={book.author}
              publicationYear={book.publicationYear}
              genre={book.genre}
              description={book.description}
              coverImage={book.coverImage}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    fontFamily: "SpaceMono",
    justifyContent: "center",
    marginTop: 25,
  },
  header: {
    flexDirection: "row",
    marginLeft: 16,
    alignItems: "center",
    marginTop: 40,
  },
  logo: {
    height: 50,
    width: 50,
    margin: 20,
  },
  greetingContainer: {
    flexDirection: "column",
    marginLeft: 36,
    marginBottom: 10,
  },
  greetingText: {
    color: "black",
    fontFamily: "SpaceMono",
    fontSize: 20,
  },
  welcomeText: {
    color: "black",
    fontFamily: "SpaceMono",
    fontSize: 25,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: "#4A90E2",
    borderRadius: 10,
    paddingHorizontal: 10,
    width: "80%",
    fontFamily: "SpaceMono",
  },
  searchButton: {
    backgroundColor: "white",
    borderColor: "#DE3163",
    borderWidth: 1,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  searchButtonText: {
    fontSize: 24,
    color: "#DE3163",
  },
  scrollContent: {
    padding: 16,
    fontFamily: "SpaceMono",
    marginTop: 0,
    paddingTop: 0,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "SpaceMono",
  },
  floatingButton: {
    flexDirection: "row",
    position: "absolute",
    bottom: 105,
    right: 24,
    backgroundColor: "#4A90E2",
    borderRadius: 10,
    width: 70,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  floatingButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10,
  },
});

export default home;