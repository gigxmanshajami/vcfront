import { Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
// import { v4 as uuidv4 } from 'uuid';

const HomeScreen = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    console.log('ello');
    fetch('http://192.168.237.164:3000/doctors')
      .then(response => response.json())
      .then(data => {
        setDoctors(data)
        console.log(data, "hello");
      })
      .catch(error => console.log(error));
  }, []);


  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.specialty}>{item.specialty}</Text>
      <Text style={styles.rate}>Rate: ${item.rate}/min</Text>
      <TouchableOpacity onPress={() => {
        router.push({ pathname: "/(chatscreen)/index", params: { roomId: "hello", } });
      }}>

        <Text >Chat</Text>
      </TouchableOpacity>
      <Link href={
        { pathname: "./(videoscreen)/index" }
      }>
        <Text style={styles.rate}>Start a video call</Text>
      </Link>
      <Text style={styles.status}>{item.online ? 'Online' : 'Offline'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={doctors}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 16,
    color: '#888',
  },
  rate: {
    fontSize: 16,
    color: '#007bff',
  },
  status: {
    fontSize: 16,
    color: '#007bff',
  },
});
