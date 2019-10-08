import React from 'react';
import {Image, StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOverScreen = props => {
    return (<ScrollView>
            <View style={styles.screen}>
                <Text>Game over!</Text>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/success.png')}
                        style={styles.image}
                        resizeMode='cover'/>
                </View>
                <View style={styles.resultTextContainer}>
                    <Text style={styles.resultText}>Your phone needed <Text
                        style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess
                        number <Text style={styles.highlight}>{props.userNumber}</Text></Text>
                </View>

                <MainButton onPress={props.onRestart}>NEW GAME</MainButton>

            </View>
        </ScrollView>
    )
        ;
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
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height * 0.7 / 30
    },
    highlight: {
        color: colors.primary,
        fontFamily: 'open-sans-bold',
        textAlign: 'center'
    },
    resultTextContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height * 0.7 / 60
    },
    resultText: {
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    }
});

export default GameOverScreen;