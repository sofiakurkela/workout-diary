import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useExerciseContext } from './ExerciseContext';
import style from './style';

const Settings = () => {

  const { unit, setUnit } = useExerciseContext();

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
  };

  return (

    <View style={style.historycontainer}>
      <Text style={style.text}>Choose Unit:</Text>

      <TouchableOpacity
        style={[style.button, unit === 'kilometers' ? style.selectedButton : null]}
        onPress={() => handleUnitChange('kilometers')}>
        <Text style={style.buttonText}>Kilometers</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[style.button, unit === 'miles' ? style.selectedButton : null]}
        onPress={() => handleUnitChange('miles')}>
        <Text style={style.buttonText}>Miles</Text>
      </TouchableOpacity>

    </View>
  );
  
};

export default Settings;
