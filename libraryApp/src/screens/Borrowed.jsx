import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import { db, doc, updateDoc, arrayRemove, getDoc } from '../firebase/firebase';
import styles from '../../styles/screens/Borrowed';
import BookCard from '../components/BookCard';

const BorrowedScreen = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [numColumns, setNumColumns] = useState(1);
  const USER_DOC_ID = 'GhpRmvJUqbgESCkxVQQr';
  const [books, setBooks] = useState([]);

  // Fetch borrowed books function
  const fetchBorrowedBooks = async () => {
    try {
      console.log("Fetching borrowed books...");
      
      const borrowedBooksRef = doc(db, 'userBorrowedBooks', USER_DOC_ID);
      const docSnapshot = await getDoc(borrowedBooksRef);

      if (docSnapshot.exists()) {
        const borrowedBooksArray = docSnapshot.data().BorrowedBooks || [];
        console.log('Fetched borrowed books:', borrowedBooksArray);

        const booksList = await Promise.all(borrowedBooksArray.map(async (bookId) => {
          const bookRef = doc(db, 'Books', bookId);
          const bookDoc = await getDoc(bookRef);
          if (bookDoc.exists()) {
            return {
              id: bookDoc.id,
              ...bookDoc.data()
            };
          } else {
            console.log(`Book with ID ${bookId} not found`);
            return null;
          }
        }));

        setBooks(booksList.filter(book => book !== null));
        setBorrowedBooks(borrowedBooksArray);
      } else {
        console.log('No borrowed books found for this user.');
        setBorrowedBooks([]);
      }
    } catch (error) {
      console.error('Error fetching borrowed books:', error);
      Alert.alert('Error', 'Failed to fetch borrowed books');
    } 
  };

  useFocusEffect(
    useCallback(() => {
      fetchBorrowedBooks(); // Fetch books each time the screen is focused
    }, [])
  );

  const handleReturn = async (bookToReturn) => {
    try {
      const updatedBooks = borrowedBooks.filter(book => book.id !== bookToReturn.id);
      setBorrowedBooks(updatedBooks);

      const userDocRef = doc(db, 'userBorrowedBooks', USER_DOC_ID);

      await updateDoc(userDocRef, {
        BorrowedBooks: arrayRemove(bookToReturn.id)
      });

      Alert.alert('Returned', `You have returned "${bookToReturn.title}"`);
      fetchBorrowedBooks();
    } catch (error) {
      console.error('Error returning book:', error);
      Alert.alert('Error', 'Failed to return the book');
    } 
  };

  return (
    <View style={styles.container}>
       {books.length > 0 ? (
        <FlatList
          key={numColumns}
          data={books}
          keyExtractor={(item) => item.id} 
          renderItem={({ item }) => (
            <View style={styles.bookCardContainer}>
              <BookCard
                book={item} 
                style={styles.bookCard}
              />
              <View style={styles.buttonContainer}>
                <Button
                  title="Return Book"
                  onPress={() => handleReturn(item)}
                />
              </View>
            </View>
          )}
          numColumns={numColumns}
        />
      ) : (
        <Text style={styles.title}>No borrowed books found.</Text>
      )}
    </View>
  );
};

export default BorrowedScreen;
