import React from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';

const GameOverScreen = props => {
    return (<View style={styles.screen}>
        <Text>Game over!</Text>
        <Image source={require('../assets/success.png')} />
        <Text>Number of rounds: {props.roundsNumber}</Text>
        <Text>Number was: {props.userNumber}</Text>
        <Button title="NEW GAME" onPress={props.onRestart} />
    </View>);
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default GameOverScreen;