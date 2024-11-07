import { StyleSheet } from 'react-native';

// In styles.js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  bookCardContainer: {
    width: '100%', // Ensures the container takes up the full width
    flex: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bookCard: {
    width: '100%', // BookCard will take the full width of its parent container
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10, // Adds space between cards
  },
});

export default styles;
