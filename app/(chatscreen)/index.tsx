import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import io from 'socket.io-client';
import AgoraUIKit from 'agora-rn-uikit';
import {router} from 'expo-router';
const SERVER_URL = 'http://192.168.72.139:3000/';
const socket = io('http://192.168.72.139:3000/'); // Update with your server address
const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [videoCall, setVideoCall] = useState(false);
  const connectionData = {
    appId: '929e7019ba3b43eda5e948e3eeec0a5c',
    channel: 'test',
    token: null,
  };
  const rtcCallbacks = {
    EndCall: () => setVideoCall(false),
  };

  useEffect(() => {
    // Fetch initial messages from server
    fetch(`http://192.168.72.139:3000/messages`)
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error(error));

    // Listen for new messages from the server
    socket.on('chat message', (newMessage) => {
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const handleSend = () => {
    if (inputText.trim()) {
      const message = { text: inputText, sender: 'user' };
      socket.emit('chat message', message);
      setInputText('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.otherMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* {
        videoCall ? (
          <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
        ) : (
          <Text onPress={() => setVideoCall(true)}>Start Call</Text>
        )
      } */}
      <Pressable onPress={() =>
      {
       router.push("(videoscreen)")
      }}>
        <Text>
          Start A call
        </Text>
      </Pressable>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messagesList}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesList: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  messageContainer: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  userMessage: {
    backgroundColor: '#007bff',
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },
  otherMessage: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  messageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
