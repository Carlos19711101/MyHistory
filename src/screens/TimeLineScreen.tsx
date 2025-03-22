import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const TimelineScreen = () => {
  const [events, setEvents] = useState([]);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const addEvent = () => {
    if (description || image) {
      const newEvent = {
        id: Date.now().toString(),
        description,
        image,
        date: new Date().toLocaleString(),
      };
      setEvents([...events, newEvent]);
      setDescription('');
      setImage(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Línea de Tiempo</Text>
      <TextInput
        style={styles.input}
        placeholder="Descripción del evento"
        value={description}
        onChangeText={setDescription}
      />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={addEvent}>
        <Text style={styles.buttonText}>Agregar Evento</Text>
      </TouchableOpacity>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.event}>
            <Text style={styles.eventDate}>{item.date}</Text>
            <Text style={styles.eventDescription}>{item.description}</Text>
            {item.image && <Image source={{ uri: item.image }} style={styles.eventImage} />}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4c669f',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  event: {
    marginBottom: 20,
  },
  eventDate: {
    fontSize: 12,
    color: '#666',
  },
  eventDescription: {
    fontSize: 16,
    marginVertical: 5,
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
});

export default TimelineScreen;