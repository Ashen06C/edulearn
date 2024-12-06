import React, { useState, useEffect } from "react";
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

const Favorites = () => {
  interface Book {
    id: number;
    title?: string;
    author: string;
    publicationYear: number;
    genre: string[];
    description: string;
    coverImage: string;
  }

  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Partial<Book>>({
    title: "",
    author: "",
    publicationYear: undefined,
    genre: [],
    description: "",
    coverImage: "",
  });

  const fetchFavoriteBooks = async () => {
    try {
      const response = await fetch("https://freetestapi.com/api/v1/books?limit=45");
      const data = await response.json();
  
      // Slice the data from index 10 to 15
      const slicedData = data.slice(30, 45);
  
      setFavoriteBooks(slicedData);
    } catch (error) {
      console.error("Error fetching favorite books:", error);
    }
  };
  

  useEffect(() => {
    fetchFavoriteBooks();
  }, []);

  const handleAddBook = () => {
    if (newBook.title && newBook.author) {
      const bookToAdd: Book = {
        id: favoriteBooks.length + 1, // Simple ID generator
        title: newBook.title || "Untitled",
        author: newBook.author,
        publicationYear: newBook.publicationYear || new Date().getFullYear(),
        genre: newBook.genre || [],
        description: newBook.description || "No description provided.",
        coverImage: newBook.coverImage || "https://via.placeholder.com/150", // Placeholder image
      };

      setFavoriteBooks([...favoriteBooks, bookToAdd]);
      setNewBook({ title: "", author: "", publicationYear: undefined, genre: [], description: "", coverImage: "" });
    } else {
      alert("Please provide both title and author!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Favorite Books</Text>
      </View>

      {/* Add New Book Section */}
      <View style={styles.addBookContainer}>
        <Text style={styles.addBookHeader}>Add a New Favorite Book</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={newBook.title}
          onChangeText={(text) => setNewBook({ ...newBook, title: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Author"
          value={newBook.author}
          onChangeText={(text) => setNewBook({ ...newBook, author: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Publication Year"
          keyboardType="numeric"
          value={newBook.publicationYear?.toString() || ""}
          onChangeText={(text) => setNewBook({ ...newBook, publicationYear: parseInt(text, 10) })}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddBook}>
          <Text style={styles.addButtonText}>Add Book</Text>
        </TouchableOpacity>
      </View>

      {/* Favorite Books List */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.innerContainer}>
          {favoriteBooks.length > 0 ? (
            favoriteBooks.map((book) => (
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
            ))
          ) : (
            <Text style={styles.emptyText}>No favorite books found.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    marginTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  addBookContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  addBookHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#4A90E2",
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollContent: {
    padding: 16,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },
});

export default Favorites;
