
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExerciseContext = createContext();

export const ExerciseProvider = ({ children }) => {

    const [exercises, setExercises] = useState([]);
    const [unit, setUnit] = useState('kilometers');

  useEffect(() => {

    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      const storedExercises = await AsyncStorage.getItem('exercises');
        if (storedExercises !== null) {
        setExercises(JSON.parse(storedExercises));
      }
    } catch (error) {
      console.error('Error loading exercises:', error);
    }
  };

  const addExercise = async (exercise) => {
    try {

      const updatedExercises = [...exercises, exercise];

      setExercises(updatedExercises);

      await AsyncStorage.setItem('exercises', JSON.stringify(updatedExercises));

    } catch (error) {

      console.error('Error adding exercise:', error);
    }

  };

  const clearExerciseHistory = async () => {

    try {
      setExercises([]);

      await AsyncStorage.removeItem('exercises');

    } catch (error) {

      console.error('Error clearing workout history:', error);
    }

  };

  const convertExercisesUnit = (newUnit) => {

    const conversionFactor = newUnit === 'miles' ? 0.621371 : 1 / 0.621371;

    const updatedExercises = exercises.map(exercise => ({

      ...exercise,
      distance: exercise.distance * conversionFactor 

    }));

    setExercises(updatedExercises);
    setUnit(newUnit);
  };

  return (

    <ExerciseContext.Provider value={{ 

      exercises, 
      addExercise, 
      clearExerciseHistory, 
      unit,
      setUnit,
      convertExercisesUnit

    }}>

      {children}

    </ExerciseContext.Provider>

  );
};

export const useExerciseContext = () => React.useContext(ExerciseContext);
