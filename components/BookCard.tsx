import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useLikeContext } from "@/contexts/LikeContext";

const BookCard = ({
  read,
  title,
  author,
  publicationYear,
  genre,
  description,
  coverImage,
}: {
  read: boolean;
  title: string;
  author: string;
  publicationYear: number;
  genre: string[];
  description: string;
  coverImage: string;
}) => {
  const [Liked, setLiked] = useState(false);

  const readIcon = Liked
    ? require("../assets/icons/donenil.png")
    : require("../assets/icons/doneline.png");


  const bl=  require("../assets/icons/donenil.png");

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
      <View style={styles.likeButtonContainer}>
      {read ? (
        
        <TouchableOpacity style={styles.likeButton} onPress={toggleLike}>
        <Image style={styles.likeIcon} source={bl} />
      </TouchableOpacity>


      ):(
        <TouchableOpacity style={styles.likeButton} onPress={toggleLike}>
        <Image style={styles.likeIcon} source={readIcon} />
      </TouchableOpacity>
      )}
      </View>
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
  likeButtonContainer:{
    position: "absolute",
    top: 10,
    right: 10,
    padding: 4,
    backgroundColor:"#fff",
    borderRadius: 9,
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
  },
  likeButton: {
    // position: "absolute",
    // top: 10,
    // right: 10,
    padding: 3,
  },
  likeIcon: {
    width: 25,
    height: 25,
  },
});

export default BookCard;