import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOverScreen = props => {
    return (<View style={styles.screen}>
        <Text>Game over!</Text>
        <View style={styles.imageContainer}>
            <Image
                source={require('../assets/success.png')}
                style={styles.image}
                resizeMode='cover'/>
        </View>
        <View style={styles.resultTextContainer}>
            <Text>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess
                number <Text style={styles.highlight}>{props.userNumber}</Text></Text>
        </View>

        <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
    </View>);
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: '80%',
        height: 300,
        borderRadius: 200,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    highlight: {
        color: colors.primary,
        fontFamily: 'open-sans-bold',
        textAlign: 'center'
    },
    resultTextContainer: {
        marginHorizontal: 30,
        marginVertical: 15
    }
});

export default GameOverScreen;