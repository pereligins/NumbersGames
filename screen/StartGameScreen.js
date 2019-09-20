import React, {useState} from 'react';
import {Button, StyleSheet, Text, TouchableWithoutFeedback, View, Keyboard, Alert} from 'react-native';
import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from "../components/Input";

const StartGameScreen = prop => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(0);

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));

    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {

        const chosenNumber = parseInt(enteredValue);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number', 'Number has to be 1-99', [{text:'Ok', style:'destructive',onPress: resetInputHandler}]);
            return;
        }

        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = <Text>Chosen number: {selectedNumber}</Text>
    }

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start New Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>
                    <Input
                        style={styles.input}
                        blurOnSubmit autoCapitalize='none'
                        autoCorrect={false} keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>

                        <View style={styles.button}>
                            <Button title='Reset' onPress={resetInputHandler} color={Colors.accent}/>
                        </View>
                        <View style={styles.button}>
                            <Button title='Confirm' onPress={confirmInputHandler} color={Colors.primary}/>
                        </View>

                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>);
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: 'center'
    }
});

export default StartGameScreen;