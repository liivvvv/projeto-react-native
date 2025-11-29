import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../services/api';

export default function ListagemScreen({ navigation }) {
    const [tarefas, setTarefas] = useState([]);
    const isFocused = useIsFocused();

    async function fetchTarefas() {
        try {
            const response = await api.get('/tarefas');
            setTarefas(response.data);
        } catch (error) {
            console.log(error);
            Alert.alert('erro', 'não foi possível carregar as tarefas.');
        }
    }

    useEffect(() => {
        if (isFocused) {
            fetchTarefas();
        }
    }, [isFocused]);

    async function handleDelete(id) {
        Alert.alert(
            'excluir tarefa',
            'tem certeza que deseja excluir esta tarefa?',
            [
                { text: 'cancelar', style: 'cancel' },
                {
                    text: 'sim',
                    onPress: async () => {
                        await api.delete(`/tarefas/${id}`);
                        fetchTarefas();
                    },
                },
            ]
        );
    }

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemTextContainer}>
                <Text style={styles.itemTitle}>{item.titulo}</Text>
                <Text style={styles.itemStatus}>{item.status}</Text>
            </View>
            <View style={styles.itemButtonContainer}>
                <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('Edicao', { id: item.id })}>
                    <Text style={styles.buttonText}>editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                    <Text style={styles.buttonText}>excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Cadastro')}>
                <Text style={styles.addButtonText}>adicionar nova tarefa</Text>
            </TouchableOpacity>
            <FlatList
                data={tarefas}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#a8bdc2' }, // cor 2 - azul acinzentado
    addButton: { backgroundColor: '#99cccc', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 }, // cor 1 - teal
    addButtonText: { color: '#333', fontWeight: 'bold' },
    itemContainer: { backgroundColor: 'white', padding: 15, marginVertical: 5, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between' },
    itemTextContainer: { flex: 1 },
    itemTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    itemStatus: { color: '#666' },
    itemButtonContainer: { flexDirection: 'row', alignItems: 'center' },
    editButton: { backgroundColor: '#c79ead', padding: 10, borderRadius: 6, marginRight: 5 }, // cor 4 - rosa
    deleteButton: { backgroundColor: '#888', padding: 10, borderRadius: 6 }, // cinza neutro
    buttonText: { color: 'white', fontWeight: 'bold' }
});