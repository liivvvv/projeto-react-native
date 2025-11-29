import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CadastroScreen from './screens/CadastroScreen';
import EdicaoScreen from './screens/EdicaoScreen';
import ListagemScreen from './screens/ListagemScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#b8aeb8' }, // cor 3 - mauve
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      >
        <Stack.Screen name="Listagem" component={ListagemScreen} options={{ title: 'Lista de tarefas' }} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Nova tarefa' }} />
        <Stack.Screen name="Edicao" component={EdicaoScreen} options={{ title: 'Editar tarefa' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}