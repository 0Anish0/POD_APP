import React, { useEffect } from 'react';
import { View, ImageBackground, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <ImageBackground
            source={require('../images/ddm-splash.png')}
            style={styles.container}
            resizeMode="contain"
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>DDM POD</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(215, 125, 80, 0.4)',
    },
    overlay: {
        position: 'absolute',
        top: 200,
        alignSelf: 'center',
    },
    title: {
        fontSize: 33,
        fontWeight: 'bold',
        color: 'rgba(51, 153, 249, 0.8)',
        textShadowRadius: 5,
    },
});

export default SplashScreen;
