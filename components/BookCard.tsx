import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useLikeContext } from "@/contexts/LikeContext";

const BookCard = ({
  title,
  author,
  publicationYear,
  genre,
  description,
  coverImage,
}: {
  title: string;
  author: string;
  publicationYear: number;
  genre: string[];
  description: string;
  coverImage: string;
}) => {
  const [Liked, setLiked] = useState(false);

  const heartIcon = Liked
    ? require("../assets/icons/donenil.png")
    : require("../assets/icons/doneline.png");

  const { incrementLike, decrementLike } = useLikeContext();

  const toggleLike = () => {
    if (Liked) {
      decrementLike();
    } else {
      incrementLike();
    }
    setLiked(!Liked);
  };

  return (
    <View style={styles.card}>
      <Image style={styles.coverImage} source={{ uri: coverImage }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>by {author}</Text>
        <Text style={styles.genre}>Genre: {genre.join(", ")}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <TouchableOpacity style={styles.likeButton} onPress={toggleLike}>
        <Image style={styles.likeIcon} source={heartIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    margin: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    width: "90%",
  },
  coverImage: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  author: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  publicationYear: {
    fontSize: 12,
    color: "#777",
    marginBottom: 5,
  },
  genre: {
    fontSize: 12,
    color: "#555",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#444",
  },
  likeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  likeIcon: {
    width: 25,
    height: 25,
  },
});

export default BookCard;