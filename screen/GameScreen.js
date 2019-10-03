import React, {useEffect, useRef, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons'

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

const renderListItem = (value, numOfRound) => {
    return <View key={numOfRound} style={styles.listItem}>
        <Text># {numOfRound}</Text>
        <Text>{value}</Text>
    </View>;
}

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoise);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const currentLow = useRef(1);
    const currentHight = useRef(100);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const {userChoise, onGameOver} = props;

    useEffect(() => {
        if (currentGuess === userChoise) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoise, onGameOver])

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < props.userChoise) ||
            (direction === 'greather' && currentGuess > props.userChoise)) {
            Alert.alert('Dont lie!', 'You know that it is wrong', [{text: 'sorry', style: 'cancel'}]);
            return;
        }
        if (direction === 'lower') {
            currentHight.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHight.current, currentGuess);
        setCurrentGuess(nextNumber);
        //setRounds(curRounds => curRounds + 1)
        setPastGuesses(curPastGuesses => [currentGuess, ...curPastGuesses])
    }

    return (
        <View style={styles.screen}>
            <Text>Opponentt's guess:</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name='md-remove' size={24}
                                                                                     color='white'/></MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greather')}><Ionicons name='md-add' size={24}
                                                                                        color='white'/></MainButton>
            </Card>
            <View style={styles.list}>
                <ScrollView>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length-index))}
                </ScrollView>
            </View>
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
        width: 400,
        maxWidth: '90%'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    list: {
        width: '80%',
        justifyContent: 'space-between',
        flex: 1
    }
});

export default GameScreen;