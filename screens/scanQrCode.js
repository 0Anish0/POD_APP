import React, { useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, Easing } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

export default function ScanQrCode() {
    const [scannedText, setScannedText] = React.useState(null);
    const [isScannerActive, setIsScannerActive] = React.useState(false);
    const translateY = useSharedValue(0);

    const handleQRCodeRead = (e) => {
        setScannedText(e.data);
        setIsScannerActive(false);
        translateY.value = 0;
    };

    const animatedLineStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    const startAnimation = useCallback(() => {
        translateY.value = withRepeat(
            withTiming(180, {
                duration: 700,
                easing: Easing.linear,
            }),
            -1,
            true
        );
    }, [translateY]);

    useEffect(() => {
        if (isScannerActive) {
            startAnimation();
        } else {
            translateY.value = 0;
        }
    }, [isScannerActive, startAnimation]);

    return (
        <GestureHandlerRootView>
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                {!isScannerActive ? (
                    <View style={styles.homeContainer}>
                        <Text style={styles.title}>QR Code Scanner</Text>
                        <TouchableOpacity
                            style={styles.scanButton}
                            onPress={() => setIsScannerActive(true)}
                        >
                            <Text style={styles.scanButtonText}>Scan QR Code</Text>
                        </TouchableOpacity>
                        {scannedText && <Text style={styles.resultText}>Scanned Text: {scannedText}</Text>}
                    </View>
                ) : (
                    <QRCodeScanner
                        onRead={handleQRCodeRead}
                        flashMode={RNCamera.Constants.FlashMode.auto}
                        showMarker={true}
                        reactivate={true}
                        reactivateTimeout={2000}
                        containerStyle={styles.scannerContainer}
                        customMarker={
                            <View style={styles.customMarker}>
                                <Animated.View style={[styles.animatedLine, animatedLineStyle]}>
                                    <LinearGradient
                                        colors={['rgba(150, 255, 150, 0.7)', 'rgba(150, 255, 150, 0.1)']}
                                        style={styles.gradient}
                                    />
                                </Animated.View>
                            </View>
                        }
                    />
                )}
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    homeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    scanButton: {
        backgroundColor: '#6200EE',
        padding: 15,
        borderRadius: 10,
    },
    scanButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    resultText: {
        marginTop: 20,
        fontSize: 16,
        color: '#333',
    },
    scannerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    customMarker: {
        width: 222,
        height: 222,
        borderColor: '#90EE90',
        borderWidth: 5,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    animatedLine: {
        width: '100%',
        height: 44,
        position: 'absolute',
        top: 0,
    },
    gradient: {
        flex: 1,
    },
});
