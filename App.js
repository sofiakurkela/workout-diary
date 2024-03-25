import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { ExerciseProvider } from './ExerciseContext';
import { NavigationContainer } from '@react-navigation/native';
import AddExerciseScreen from './AddExercise';
import WorkoutHistory from './WorkoutHistory';
import SettingsScreen from './Settings';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const ExerciseNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({

        tabBarIcon: ({ color, size }) => {

          let iconName;

          switch (route.name) {
            case 'Add Workout':
              iconName ='add-circle';
              break;
            case 'Workout History':
              iconName = 'list';
              break;
            case 'Settings':
              iconName = 'settings';
              break;
            default:
              iconName = 'error';
              break;
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },

      })}>
      <Tab.Screen name="Add Workout" component={AddExerciseScreen} />
      <Tab.Screen name="Workout History" component={WorkoutHistory} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

// sovelluksen pääkomponentti

const App = () => {

  return (
    <ExerciseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Workout Diary" component={ExerciseNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </ExerciseProvider>
  );

};

export default App;

