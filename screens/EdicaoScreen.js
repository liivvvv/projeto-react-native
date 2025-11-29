import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from '../services/api';

export default function EdicaoScreen({ route, navigation }) {
    const { id } = route.params;
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        api.get(`/tarefas/${id}`).then(response => {
            setTitulo(response.data.titulo);
            setDescricao(response.data.descricao);
            setStatus(response.data.status);
        });
    }, []);

    async function handleSubmit() {
        await api.put(`/tarefas/${id}`, { titulo, descricao, status });
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>título:</Text>
            <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />
            <Text style={styles.label}>descrição:</Text>
            <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} />
            <Text style={styles.label}>status:</Text>
            <TextInput style={styles.input} value={status} onChangeText={setStatus} />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>atualizar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#a8bdc2' }, // cor 2 - azul acinzentado
    label: { fontWeight: 'bold', marginBottom: 5, color: '#333' },
    input: { backgroundColor: 'white', padding: 10, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ccc' },
    button: { backgroundColor: '#d78fa3', padding: 15, borderRadius: 8, alignItems: 'center' }, // cor 5 - rosa mais vivo
    buttonText: { color: 'white', fontWeight: 'bold' }
});