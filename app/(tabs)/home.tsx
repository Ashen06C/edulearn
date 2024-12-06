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
import { useLikeContext } from "@/contexts/LikeContext";

const Home = () => {
  type RouteParams = {
    username?: string;
  };

  const route = useRoute();
  const { username } = route.params as RouteParams;

  interface Book {
    id: number;
    title?: string;
    author: string;
    publicationYear: number;
    genre: string[];
    description: string;
    coverImage: string;
  }

  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const heartIcon = require("../../assets/icons/done.png");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://www.freetestapi.com/api/v1/books");
      const data = await response.json();

      // Add a real random book image to each book and sort by id in descending order
      const booksWithImages = data
        .map((book: Book) => ({
          ...book,
          coverImage: `https://picsum.photos/seed/${book.id}/200/300`, // Random image based on book ID
        }))
        .sort((a: Book, b: Book) => b.id - a.id); // Sort in descending order by id

      setBooks(booksWithImages);
      setFilteredBooks(booksWithImages); // Set initial filtered books
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text.trim() === "") {
      setFilteredBooks(books); // Show all books if search is empty
    } else {
      const filtered = books.filter((book) =>
        book.title?.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  const { likeCount } = useLikeContext();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>
            Hello{" "}
            <Text style={{ fontFamily: "SpaceMono", color: "#4A90E2" }}>
              {username || "Guest"}
            </Text>
            ,
          </Text>
          <Text style={styles.welcomeText}>
            <Text style={{ fontFamily: "SpaceMono", color: "#4A90E2" }}>
              EduLearn{" "}
            </Text>
            is here!
          </Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search books..."
          value={searchTerm}
          onChangeText={handleSearch}
        />

        <TouchableOpacity style={styles.floatingButton}>
          <TouchableOpacity>
            <Image style={{ height: 20, width: 20 }} source={heartIcon} />
          </TouchableOpacity>
          <Text style={styles.floatingButtonText}>{likeCount.toString()}</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Loading books...</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.innerContainer}>
            {filteredBooks.map((book) => (
              <BookCard
                read={false}
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
      )}
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
  greetingContainer: {
    flexDirection: "column",
    marginLeft: 36,
    marginBottom: 10,
  },
  greetingText: {
    color: "black",
    fontSize: 20,
  },
  welcomeText: {
    color: "black",
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
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#4A90E2",
  },
});

export default Home;
