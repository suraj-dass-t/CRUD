import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "lightblue",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "black",
    textAlign: "center",

  },
  noNotes: {
flex:1,
marginTop: "80%",
    alignItems: 'center',
  },
  noNotesText:{
fontSize:20,
color:'white',
  },
  indicator: {
flex:1,
justifyContent:'center',
  },
  noteList: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: "bold",
    color: "black",
    backgroundColor:'white',
    height: 50,
    width: "100%",
    padding: 10,
    borderRadius: 8,
    textAlignVertical:'center'
  },
  addButton: {
    position:'absolute',
    bottom:50,
    right:40,
  },

  stretch: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
  },
  buttonImage: {
    width: 30,
    height: 30,
    resizeMode: 'stretch',
    alignSelf:"center",
  },
  buttonText:{
color:'black',
marginTop:4,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    padding: 50,
    backgroundColor: "lightblue",
    justifyContent:'center'
  },
  contentInput: {
    backgroundColor:'white',
    elevation:10,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    height: 150,
    textAlignVertical: "top",
    color:'black',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
