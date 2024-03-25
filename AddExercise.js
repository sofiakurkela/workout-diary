import React, { useState } from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, TouchableOpacity, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useExerciseContext } from './ExerciseContext';
import { TextInput } from 'react-native-paper';
import style from './style';

const AddExercise = () => {

  const navigation = useNavigation();
  const {addExercise, unit} = useExerciseContext();
  const [workoutType, setWorkoutType] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddExercise = () => {

    const convertedDistance = unit === 'miles' ? parseFloat(distance) * 1.60934 : parseFloat(distance);

    if (!workoutType || !distance || !duration || !selectedDate) {

      alert('Please, fill in all the fields');

      return;
    }

    const exercise = {

      workoutType,
      distance: convertedDistance,
      duration: parseFloat(duration),
      date: selectedDate.toLocaleDateString(),

    };

    addExercise(exercise);

    navigation.navigate('Workout History');

  };

  const showDatePicker = () => {

    Keyboard.dismiss();
    setDateModalVisible(true);

  };

  const handleDateChange = (event, selectedDate) => {

    if (selectedDate === undefined) {
      setDateModalVisible(false);

    } else {

      setSelectedDate(selectedDate || new Date());
      setDateModalVisible(false);

    }
  };

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={style.container}>

        <TouchableOpacity
          style={[style.button, workoutType === 'Running' ? style.selectedButton : null]}
          onPress={() => setWorkoutType('Running')}>

          <Text style={style.buttonText}>Running</Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={[style.button, workoutType === 'Walking' ? style.selectedButton : null]}
          onPress={() => setWorkoutType('Walking')}>

          <Text style={style.buttonText}>Walking</Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={[style.button, workoutType === 'Swimming' ? style.selectedButton : null]}
          onPress={() => setWorkoutType('Swimming')}>

          <Text style={style.buttonText}>Swimming</Text>

        </TouchableOpacity>

        <TextInput
          style={style.inputs}
          label={'Distance (' + unit + ')'}
          mode='outlined'
          value={distance}
          onChangeText={setDistance}
          keyboardType="numeric"
        />

        <TextInput
          style={style.inputs}
          label={'Duration (minutes)'}
          mode='outlined'
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />

        <TouchableOpacity style={style.paperbutton} onPress={showDatePicker}>

          <Text style={style.buttonText}>Select date</Text>

        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={dateModalVisible}
          onRequestClose={() => setDateModalVisible(false)}>
          
          <View>
            <DateTimePicker
              style={style.calendar}
              value={selectedDate || new Date()}
              mode="date"
              display="inline"
              onChange={handleDateChange}/>
          </View>
        </Modal>

        <TouchableOpacity style={style.paperbutton} onPress={handleAddExercise}>
          <Text style={style.buttonText}>Add Workout</Text>
        </TouchableOpacity>

      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddExercise;
