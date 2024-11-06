import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import styles from '../../styles/components/BookCard';

const BookCard = ({ book, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: book.imageUrl }} style={styles.bookImage} /> 
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
    </TouchableOpacity>
  );
};

export default BookCard;
