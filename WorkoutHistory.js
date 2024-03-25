import React from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { useExerciseContext } from './ExerciseContext';
import style from './style';



const WorkoutHistory = () => {
  const { exercises, clearExerciseHistory, unit } = useExerciseContext();

  const calculateTotalDistance = () => {

    return exercises.reduce((total, exercise) => {
      return total + exercise.distance;
    }, 0);
  };


  const renderExerciseItem = ({ item }) => (

    <View style={style.historycontainer}>
      <Text style={style.historytext}>{item.date}</Text>
      <Text style={style.historytext}>{item.sportType}</Text>
      <Text style={style.historytext}>
        Distance: {unit === 'miles' ? (item.distance * 0.621371).toFixed(2) : item.distance.toFixed(2)} {unit}
      </Text>
      <Text style={style.historytext}>Duration: {item.duration} minutes </Text>
    </View>

  );
  

  const handleClearExerciseHistory = () => {

    Alert.alert(
      'Clear workout history',
      'Are you sure you want to clear your workout history?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => clearExerciseHistory(),
        },
      ],
      { cancelable: false }
    );

  };

  return (

    <View style={style.historycontainer}>
      {exercises.length > 0 ? (
        <>
          <View style={style.sumbox}>

            <Text>
              Total Distance: {unit === 'miles' ? (calculateTotalDistance() * 0.621371).toFixed(2) : calculateTotalDistance().toFixed(2)} {unit}
            </Text>

          </View>

          <FlatList
            data={exercises}
            renderItem={renderExerciseItem}
            keyExtractor={(item, index) => index.toString()}
          />

          <Button title="Clear" onPress={handleClearExerciseHistory} />
        </>

      ) : (
        <Text style={style.text}>You have no saved workouts yet.</Text>
      )}

    </View>
    
  );
};

export default WorkoutHistory;
