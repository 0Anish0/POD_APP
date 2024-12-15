import React, { useState } from 'react';
import { View, Text, Alert, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GOOGLE_MAPS_APIKEY } from '@env';
import styles from '../styles/GenerateBarcodeStyle.js';
import API_BASE_URL from '../config/config.js';

export default function GenerateQRCodeScreen() {
    const [recipientName, setRecipientName] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');
    const [shipmentAddress, setShipmentAddress] = useState('');
    const [carrierName, setCarrierName] = useState('');
    const [productSpecifications, setProductSpecifications] = useState('');
    const [itemWeight, setItemWeight] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [transactionModeDescription, setTransactionModeDescription] = useState('');
    const [numberOfPackages, setNumberOfPackages] = useState('');
    const [generatedQRCodes, setGeneratedQRCodes] = useState([]);

    const handleGenerate = async () => {
        try {
            const numberOfQRCodes = parseInt(numberOfPackages, 10);
            if (isNaN(numberOfQRCodes) || numberOfQRCodes <= 0) {
                Alert.alert('Invalid Input', 'Please enter a valid number of packages.');
                return;
            }

            const geocodedAddress = await getGeocodedAddress(shipmentAddress);

            const response = await axios.post(`${API_BASE_URL}api/generate-qr-by-master`, {
                recipientName,
                recipientAddress,
                shipmentAddress: {
                    address: shipmentAddress,
                    latitude: geocodedAddress.latitude,
                    longitude: geocodedAddress.longitude,
                    updatedAt: Date.now(),
                },
                carrierName,
                productSpecifications,
                itemWeight: parseFloat(itemWeight),
                itemQuantity: parseInt(itemQuantity, 10),
                transactionModeDescription,
                numberOfPackages: numberOfQRCodes,
            });

            setGeneratedQRCodes(response.data.packages);
            Alert.alert('Success', `${numberOfPackages} QR Codes generated and saved to the backend.`);
        } catch (error) {
            console.error('Error generating QR codes:', error);
            Alert.alert('Error', 'Failed to generate QR codes. Please ensure the network connection is stable.');
        }
    };

    const getGeocodedAddress = async (address) => {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_APIKEY}`);
            const result = response.data.results[0];
            if (result) {
                return {
                    latitude: result.geometry.location.lat,
                    longitude: result.geometry.location.lng,
                };
            } else {
                throw new Error('Address not found');
            }
        } catch (error) {
            console.error('Geocoding error:', error);
            throw error;
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Generate QR Codes</Text>

            <View style={styles.inputContainer}>
                <Icon name="user" size={20} color="#1E90FF" />
                <TextInput
                    style={styles.input}
                    placeholder="Recipient Name"
                    value={recipientName}
                    onChangeText={setRecipientName}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="map-marker" size={20} color="#1E90FF" />
                <TextInput
                    style={styles.input}
                    placeholder="Recipient Address"
                    value={recipientAddress}
                    onChangeText={setRecipientAddress}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="truck" size={20} color="#1E90FF" />
                <TextInput
                    style={styles.input}
                    placeholder="Shipment Address"
                    value={shipmentAddress}
                    onChangeText={setShipmentAddress}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="id-badge" size={20} color="#1E90FF" />
                <TextInput
                    style={styles.input}
                    placeholder="Carrier Name"
                    value={carrierName}
                    onChangeText={setCarrierName}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="info-circle" size={20} color="#1E90FF" />
                <TextInput
                    style={styles.input}
                    placeholder="Product Specifications"
                    value={productSpecifications}
                    onChangeText={setProductSpecifications}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="balance-scale" size={20} color="#1E90FF" />
                <TextInput
                    style={styles.input}
                    placeholder="Item Weight (kg)"
                    keyboardType="numeric"
                    value={itemWeight}
                    onChangeText={setItemWeight}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="sort-numeric-asc" size={20} color="#1E90FF" />
                <TextInput
                    style={styles.input}
                    placeholder="Item Quantity"
                    keyboardType="numeric"
                    value={itemQuantity}
                    onChangeText={setItemQuantity}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="exchange" size={20} color="#1E90FF" />
                <TextInput
                    style={styles.input}
                    placeholder="Transaction Mode Description"
                    value={transactionModeDescription}
                    onChangeText={setTransactionModeDescription}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="archive" size={20} color="#1E90FF" />
                <TextInput
                    style={styles.input}
                    placeholder="Number of Packages"
                    keyboardType="numeric"
                    value={numberOfPackages}
                    onChangeText={setNumberOfPackages}
                />
            </View>

            <TouchableOpacity style={styles.generateButton} onPress={handleGenerate}>
                <Text style={styles.generateButtonText}>Generate QR Codes</Text>
            </TouchableOpacity>

            {generatedQRCodes.length > 0 && (
                <View style={styles.qrCodeContainer}>
                    {generatedQRCodes.map((pkg, index) => (
                        <View key={index} style={styles.qrCodeWrapper}>
                            <QRCode
                                value={pkg.qrCode}
                                size={150}
                            />
                            <Text style={styles.qrCodeText}>{pkg.qrCode}</Text>
                            <Text style={styles.qrCodeLink}>QR Path: {pkg.qrCodePath}</Text>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}
