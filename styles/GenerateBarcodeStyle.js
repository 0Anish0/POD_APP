import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#F9F9F9',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#1E90FF',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 33,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#333',
    },
    generateButton: {
        backgroundColor: '#1E90FF',
        paddingVertical: 15,
        borderRadius: 33,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    generateButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    qrCodeContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    qrCodeWrapper: {
        marginBottom: 20,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    qrCodeText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    qrCodeLink: {
        marginTop: 5,
        fontSize: 12,
        color: '#1E90FF',
    },
});

export default styles;
