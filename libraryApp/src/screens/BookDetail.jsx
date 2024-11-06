import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert, TouchableOpacity,ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // For the back icon
import styles from '../../styles/screens/BookDetail';  // Import the updated styles

const BookDetail = ({ route, navigation }) => {
  const { book } = route.params;
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    // Get borrowed books data from state or local storage
    const storedBooks = []; // Replace with actual data from state or database
    setBorrowedBooks(storedBooks);
  }, []);

  const handleBorrow = () => {
    if (borrowedBooks.length >= 3) {
      Alert.alert('Limit reached', 'You can borrow a maximum of 3 books.');
    } else {
      // Logic to add the book to borrowed list
      setBorrowedBooks([...borrowedBooks, book]);
      Alert.alert('Success', 'You have borrowed this book.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Book Title */}
      <Text style={styles.title}>{book.title}</Text>

      {/* Book Cover Image */}
      <Image source={{ uri: book.imageUrl }} style={styles.coverImage} />

      {/* Book Details */}
      <ScrollView style={styles.detailsContainer}>
        <Text style={styles.author}>Author: {book.author}</Text>
        <Text style={styles.summary}>{book.summary}</Text>
      </ScrollView>

      {/* Borrow Book Button */}
      <Button title="Borrow this Book" onPress={handleBorrow} color="#555" />
    </View>
  );
};

export default BookDetail;
