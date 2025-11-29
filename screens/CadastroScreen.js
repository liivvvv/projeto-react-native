import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from '../services/api';

export default function CadastroScreen({ navigation }) {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');

    async function handleSubmit() {
        if (!titulo) {
            Alert.alert('erro', 'o campo título é obrigatório.');
            return;
        }
        await api.post('/tarefas', { titulo, descricao });
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>título:</Text>
            <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />
            <Text style={styles.label}>descrição:</Text>
            <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#a8bdc2' }, // cor 2 - azul acinzentado
    label: { fontWeight: 'bold', marginBottom: 5, color: '#333' },
    input: { backgroundColor: 'white', padding: 10, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ccc' },
    button: { backgroundColor: '#99cccc', padding: 15, borderRadius: 8, alignItems: 'center' }, // cor 1 - teal
    buttonText: { color: '#333', fontWeight: 'bold' }
});