import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    const rndNum = Math.floor(Math.random() * (max-min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1,100, props.userChoise));
    const currentLow = useRef(1);
    const currentHight = useRef(100);
    const [rounds, setRounds] = useState(0);
    const {userChoise, onGameOver} = props;

    useEffect(() => {
        if (currentGuess === userChoise) {
            onGameOver(rounds);
        }
    }, [currentGuess, userChoise, onGameOver])

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower'  && currentGuess < props.userChoise) ||
            (direction === 'greather'  && currentGuess > props.userChoise)){
            Alert.alert('Dont lie!', 'You know that it is wrong', [{text: 'sorry', style: 'cancel'}]);
            return;
        }
        if (direction === 'lower') {
            currentHight.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        const newtNuimber = generateRandomBetween(currentLow.current, currentHight.current,currentGuess);
        setCurrentGuess(newtNuimber);
        setRounds(curRounds => curRounds + 1)

    }

    return (
        <View style={styles.screen}>
            <Text>Opponentt's guess:</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title={'LOWER'} onPress={nextGuessHandler.bind(this,'lower')}/>
                <Button title={'GREATHER'} onPress={nextGuessHandler.bind(this,'greather')}/>
            </Card>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
});

export default GameScreen;