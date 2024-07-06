import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import AgoraUIKit from 'agora-rn-uikit';

const VideoScreen = () => {
  const [videoCall, setVideoCall] = useState(true); // Set to true to start with video call
  const router = useRouter();

  const handleEndCall = () => {
    setVideoCall(false);
    router.back(); // Navigate back to previous screen
  };

  return (
    <View style={styles.container}>
      {videoCall ? (
        <AgoraUIKit
          rtcProps={{
            appId: '929e7019ba3b43eda5e948e3eeec0a5c',
            channel: 'Test',
          }}
          callbacks={{ 
            EndCall: handleEndCall,
          }}
        />
      ) : (
        <TouchableOpacity style={styles.startCallButton} onPress={() => setVideoCall(true)}>
          <Text style={styles.startCallText}>Start Call</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  startCallButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  startCallText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
