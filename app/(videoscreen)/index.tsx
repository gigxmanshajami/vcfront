import {
    StyleSheet, Text, View, SafeAreaView
} from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router';
import AgoraUIKit from 'agora-rn-uikit';


type Props = {}

const index = (props: Props) => {
    const [videoCall, setVideoCall] = useState(true);
    const connectionData = {
        appId: '929e7019ba3b43eda5e948e3eeec0a5c',
        channel: 'Test',
    };
    const rtcCallbacks = {
        EndCall: () => {
            setVideoCall(false)
            router.back();
            // hello

        },
    };
    if (router.back == true) {
        console.log(true);
    }

    return (
        videoCall ? (
            <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
        ) : (
            <Text style={{
                color: "#fff",
            }} onPress={() => setVideoCall(true)}>Start Call</Text>
        )
    )
}

export default index

const styles = StyleSheet.create({})