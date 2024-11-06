import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // For the search icon
import { db, collection, getDocs } from '../firebase/firebase';  // Assuming firebase is already configured
import BookCard from '../components/BookCard';  // Importing the BookCard component
import styles from '../../styles/screens/BookList';  // Import your existing styles

const BooksList = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState('');


  useEffect(() => {
    const fetchBooks = async () => {
      const querySnapshot = await getDocs(collection(db, 'Books'));
      const booksList = querySnapshot.docs.map(doc => doc.data());
      setBooks(booksList);
    };

    fetchBooks();
  }, []);

  
  const filteredBooks = books.filter(book =>
    (book.title && book.title.toLowerCase().includes(searchText.toLowerCase())) ||
    (book.author && book.author.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Book List</Text>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for books..."
          placeholderTextColor="gray"
          value={searchText}
          onChangeText={(text) => setSearchText(text)} 
        />
      </View>

      <FlatList
        data={filteredBooks}  
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <BookCard
            book={item} 
            onPress={() => navigation.navigate('BookDetail', { book: item })}
          />
        )}
        numColumns={2}  
        columnWrapperStyle={styles.row} 
      />
    </View>
  );
};

export default BooksList;
