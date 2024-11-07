import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db, collection, getDocs, updateDoc, doc, getDoc } from '../firebase/firebase'; // Import necessary functions
import { arrayUnion, arrayRemove } from 'firebase/firestore'; // Import arrayUnion and arrayRemove
import styles from '../../styles/screens/BookDetail';

const BookDetail = ({ route, navigation }) => {
  const { book } = route.params;
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const USER_DOC_ID = 'GhpRmvJUqbgESCkxVQQr'; // User document ID

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
    try {
      const borrowedBooksRef = doc(db, 'userBorrowedBooks', USER_DOC_ID); // Reference to the user's document
      const docSnapshot = await getDoc(borrowedBooksRef);
  
      if (docSnapshot.exists()) {
        const borrowedBooksArray = docSnapshot.data().BorrowedBooks || []; // Default to empty array if BorrowedBooks is missing
        console.log('Fetched borrowed books:', borrowedBooksArray);
        setBorrowedBooks(borrowedBooksArray);
        return borrowedBooksArray;
      } else {
        console.log('No such document!');
        setBorrowedBooks([]);
        return [];
      }
    } catch (error) {
      console.error('Error fetching borrowed books:', error);
      Alert.alert('Error', 'Failed to fetch borrowed books');
      return [];
    }
  };
  
  const handleReturn = async () => {
    setIsLoading(true);
    try {
      const currentBooks = await fetchBorrowedBooks();

      // Remove the book from the BorrowedBooks array
      const userDocRef = doc(db, 'userBorrowedBooks', USER_DOC_ID);  // Reference to the user's document
      await updateDoc(userDocRef, {
        BorrowedBooks: arrayRemove(book.id)  // Remove book ID from the BorrowedBooks array
      });

      await fetchBorrowedBooks(); // Refresh the list
      Alert.alert('Returned', 'Book returned successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error returning book:', error);
      Alert.alert('Error', 'Failed to return book');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBorrow = async () => {
    setIsLoading(true);
    try {
      const currentBooks = await fetchBorrowedBooks();
      console.log('Number of borrowed books:', currentBooks.length);

      if (currentBooks.length >= 3) {
        Alert.alert('Limit reached', 'You can borrow a maximum of 3 books.');
        return;
      }

      // Check if the book is already borrowed
      const isAlreadyBorrowed = currentBooks.includes(book.id);

      if (isAlreadyBorrowed) {
        Alert.alert('Already borrowed', 'You have already borrowed this book');
        return;
      }

      // Add the book ID to the BorrowedBooks array field in the user document
      const userDocRef = doc(db, 'userBorrowedBooks', USER_DOC_ID);  // Reference to the user's document
      await updateDoc(userDocRef, {
        BorrowedBooks: arrayUnion(book.id)  // Add book ID to the BorrowedBooks array
      });

      await fetchBorrowedBooks(); // Refresh the list
      Alert.alert('Success', 'Book borrowed successfully');
      navigation.goBack();

    } catch (error) {
      console.error('Error borrowing book:', error);
      Alert.alert('Error', 'Failed to borrow book');
    } finally {
      setIsLoading(false);
    }
  };

  // Check if the book is borrowed
  const isBookBorrowed = borrowedBooks.includes(book.id);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}
        disabled={isLoading}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Book Title */}
      <Text style={styles.title}>{book.title}</Text>

      {/* Book Cover Image */}
      <Image 
        source={{ uri: book.imageUrl }} 
        style={styles.coverImage} 
        resizeMode="contain"
      />

      {/* Book Details */}
      <ScrollView style={styles.detailsContainer}>
        <Text style={styles.author}>Author: {book.author}</Text>
        <Text style={styles.summary}>{book.summary}</Text>
        <Text style={styles.borrowedCount}>
          Currently borrowed books: {borrowedBooks.length}/3
        </Text>
      </ScrollView>

      {/* Borrow or Return Book Button */}
      <Button 
        title={isLoading ? "Processing..." : isBookBorrowed ? "Return this Book" : "Borrow this Book"} 
        onPress={isBookBorrowed ? handleReturn : handleBorrow} 
        disabled={isLoading || borrowedBooks.length >= 3 && !isBookBorrowed}
        color="#555" 
      />
    </View>
  );
};

export default BookDetail;
