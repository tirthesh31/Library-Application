import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop:30
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 15,
    zIndex: 1,  // Ensures that the back button is above other content
  },
  coverImage: {
    width: 150,
    height: 225,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    lineHeight: 30,
  },
  author: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  summary: {
    fontSize: 16,
    color: '#999',
    marginBottom: 25,
    lineHeight: 22,
  },
  detailsContainer: {
    marginBottom: 25,
    backgroundColor:"#000",
    padding:20,
    borderRadius:10
  },
});

export default styles;
