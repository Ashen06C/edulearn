import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import BookCard from "@/components/BookCard";

const AlreadyRead = () => {
  interface Book {
    id: number;
    title?: string;
    author: string;
    publicationYear: number;
    genre: string[];
    description: string;
    coverImage: string;
  }
  
  const [readBooks, setReadBooks] = useState<Book[]>([]);
  
  // Fetch already read books from storage or API
  const fetchReadBooks = async () => {
    try {
      // Fetch data from API or local storage (adjust as needed)
      const response = await fetch("https://freetestapi.com/api/v1/books?limit=10");
      const data = await response.json();
  
      // Sort data by ID in descending order
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
  
      // Add a random image to each dataset
      const booksWithImages = sortedData.map((book: Book) => ({
        ...book,
        coverImage: `https://picsum.photos/seed/${book.id}/200/300`, // Random image based on book ID
      }));
  
      // Update state with data including random images
      setReadBooks(booksWithImages);
    } catch (error) {
      console.error("Error fetching already read books:", error);
    }
  };
  
  

  useEffect(() => {
    fetchReadBooks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Books I've Read</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.innerContainer}>
          {readBooks.length > 0 ? (
            readBooks.map((book) => (
              <BookCard
              read={true}
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
            <Text style={styles.emptyText}>No books found in your read list.</Text>
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

export default AlreadyRead;
