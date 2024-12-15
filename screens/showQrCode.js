import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import API_BASE_URL from '../config/config.js';
import { SvgXml } from 'react-native-svg';

export default function ShowQrCode() {
    const [qrCodes, setQrCodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchQRCodes() {
            try {
                const response = await axios.get(`${API_BASE_URL}api/get-all-qr-codes`);
                setQrCodes(response.data.packages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching QR codes:', error);
                setError(error);
                setLoading(false);
            }
        }
        fetchQRCodes();
    }, []);

    if (loading) {
        return (
            <View style={styles.centered}>
                <Text>Loading QR Codes...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>Error fetching QR codes: {error.toString()}</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>All Generated QR Codes</Text>
            {qrCodes.length === 0 ? (
                <Text>No QR Codes found.</Text>
            ) : (
                qrCodes.map((pkg, index) => (
                    <View key={index} style={styles.qrCodeContainer}>
                        <Text style={styles.qrCodeText}>QR Code: {pkg.qrCode}</Text>
                        <SvgXml xml={pkg.qrCodeSVG} width="200" height="200" />
                    </View>
                ))
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    qrCodeContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    qrCodeText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
