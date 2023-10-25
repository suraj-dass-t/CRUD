import React, { useState,useEffect } from "react"; 
import { 
	View, 
	Text, 
	TextInput, 
	ScrollView, 
	TouchableOpacity, 
	Modal, 
	Image, 
	ActivityIndicator,
	ToastAndroid,
	Alert
} from "react-native"; 
import { styles } from "./styles";
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-uuid';

const App = () => { 

	const [notes, setNotes] = useState([]); 
	const [isLoading,setIsLoading]=useState(false);
	const [selectedNote, setSelectedNote] = useState(null); 
	const [title, setTitle] = useState(""); 
	const [modalVisible, setModalVisible] = useState(false); 

	useEffect(() => {
		setIsLoading(true)
		const unsubscribe = firestore()
		  .collection('Notes')
		  .onSnapshot(querySnapshot => {
			const updatedNotes = [];
			querySnapshot.forEach(documentSnapshot => {
			  const data = documentSnapshot.data();
			  updatedNotes.push({
				id: data.id,
				title: data.content,
			  });
			});
			setNotes(updatedNotes);
			setIsLoading(false)
			console.log("data: ",updatedNotes)
		  },
		  (error) => {
			console.error('Error fetching data:', error);
			ToastAndroid.show('Error Occured, please try again.', ToastAndroid.SHORT);
			setIsLoading(false); 
		  }
		  );
		return () => unsubscribe();
	  }, []);

	const handleSaveNote = () => { 
		if(title)
		{
		setIsLoading(true);
		if (selectedNote) { 
					firestore()
  .collection('Notes')
  .doc(selectedNote.id)
  .update({
    content: title? title : selectedNote.title,
  })
  .then(() => {
	ToastAndroid.show('Note Updated successfully', ToastAndroid.SHORT);
	setIsLoading(false);
  })
  .catch((error)=>{
	console.error('Error fetching data:', error);
			ToastAndroid.show('Error Occured, please try again.', ToastAndroid.SHORT);
			setIsLoading(false); 
  });
			setSelectedNote(null); 
		} else { 
			const id = uuid();
			firestore()
  .collection('Notes')
  .doc(id)
  .set({
    id:id ,
    content: title,
  })
  .then(() => {
	ToastAndroid.show('Note Added successfully', ToastAndroid.SHORT);
	setIsLoading(false);
  })
  .catch((error)=>{
	console.error('Error fetching data:', error);
			ToastAndroid.show('Error Occured, please try again.', ToastAndroid.SHORT);
			setIsLoading(false); 
  });
		} 
		setTitle("");  
		setModalVisible(false); 
	}
	else{
		ToastAndroid.show('Please Enter any content', ToastAndroid.SHORT);	
	}
	}; 

	const handleEditNote = (note) => { 
		setSelectedNote(note); 
		setTitle(note.title); 
		setModalVisible(true); 
	}; 

	const handleDeleteNote = (note) => { 
		firestore()
  .collection('Notes')
  .doc(note.id)
  .delete()
  .then(() => {
	setIsLoading(false);
    ToastAndroid.show('Note deleted successfully', ToastAndroid.SHORT);
  })
  .catch((error)=>{
	console.error('Error fetching data:', error);
			ToastAndroid.show('Error Occured, please try again.', ToastAndroid.SHORT);
			setIsLoading(false); 
  });
		setSelectedNote(null); 
		setModalVisible(false); 
	}; 

	return ( 
		<View style={styles.container}> 
			<Text style={styles.title}>Notes App</Text> 
			{isLoading ? (
				<View style={styles.indicator}>
        <ActivityIndicator size="large" color="green" />
		</View>
      ) : (
			<ScrollView style={styles.noteList}> 
				{notes.length === 0 ? (
					<View style={styles.noNotes}>
    <Text style={styles.noNotesText} >No Notes found !!!</Text>
	</View>
  ) : (
				notes.map((note) => ( 
					<TouchableOpacity 
						key={note.id} 
						onPress={() => handleEditNote(note)} 
					> 
						<Text style={styles.noteTitle}> 
							{note.title} 
						</Text> 
					</TouchableOpacity> 
				)))} 
			</ScrollView> 
	  )
				}

			<TouchableOpacity 
				style={styles.addButton} 
				onPress={() => { 
					setTitle(""); 
					setModalVisible(true); 
				}} 
			> 
				 <Image
        style={styles.stretch}
        source={require('./assets/addIcon.png')}
      />
			</TouchableOpacity> 

			<Modal 
				visible={modalVisible} 
				animationType="slide"
				transparent={false} 
			> 
				<View style={styles.modalContainer}> 
					<TextInput 
					placeholderTextColor={'black'}
						style={styles.contentInput} 
						multiline 
						placeholder="Enter your content"
						value={title} 
						onChangeText={setTitle} 
					/> 
					<View style={styles.buttonContainer}> 
						<TouchableOpacity 
				onPress={handleSaveNote} 
			> 
				 <Image
        style={styles.buttonImage}
        source={require('./assets/save.png')}
      />
	  <Text style={styles.buttonText}>Save</Text>
			</TouchableOpacity>
			<TouchableOpacity 
				onPress={() => 
					setModalVisible(false) 
				}  
			> 
				 <Image
        style={styles.buttonImage}
        source={require('./assets/cancel.png')}
      />
	  <Text style={styles.buttonText}>Cancel</Text>
			</TouchableOpacity>
						{selectedNote && ( 
							<TouchableOpacity 
							onPress={() => {
								Alert.alert('Delete Note', 'Are you sure you want to delete the Note?', [
									{
									  text: 'Cancel',
									  onPress: () => console.log('Cancel Pressed'),
									  style: 'cancel',
									},
									{text: 'Yes', onPress: () => {
										setIsLoading(true);
								handleDeleteNote( 
									selectedNote 
								) 
									}},
								  ]);
							}
							}   
			> 
				 <Image
        style={styles.buttonImage}
        source={require('./assets/delete.png')}
      />
	  <Text style={styles.buttonText}>Delete</Text>
			</TouchableOpacity>
						)} 
					</View> 
				</View> 
			</Modal> 
		</View> 
	); 
}; 

export default App;
