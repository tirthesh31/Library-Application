import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import styles from '../../styles/screens/Borrowed';
const BorrowedScreen = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    // Fetch borrowed books from state or local storage
    const storedBooks = []; // Replace with actual data
    setBorrowedBooks(storedBooks);
  }, []);

  const handleReturn = (bookToReturn) => {
    const updatedBooks = borrowedBooks.filter(book => book !== bookToReturn);
    setBorrowedBooks(updatedBooks);
    Alert.alert('Returned', `You have returned "${bookToReturn.title}"`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={borrowedBooks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
            <Button title="Return Book" onPress={() => handleReturn(item)} />
          </View>
        )}
      />
    </View>
  );
};


export default BorrowedScreen;
