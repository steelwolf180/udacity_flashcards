import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList,  StyleSheet, TouchableOpacity, Platform, ToastAndroid } from 'react-native';

/**
**Deck component renders a deck.
**  props.navigation.state.params
**      deckName - the deck name.
**/
class Deck extends Component {

    static navigationOptions = ({ navigation }) => {
        const { deckName } = navigation.state.params;
        //set the navigation bar title
        return {
            title: deckName
        };
    };    

    /**
    **Internal function to generate the text for card count.
    **/
    _getCardCountText = cardCount => {
        switch(cardCount) {
            case 0: return 'No Cards';
            case 1: return '1 Card';
            default: return `${cardCount} Cards`;
        }
    };

    /**
    **Internal function to navigate to  the text Quiz screen.
    **/
    _startQuiz = () => {
        //if there are cards available in the deck, navigate to the Quiz screen
        if (this.props.deck.questions.length) {
            this.props.navigation.navigate('Quiz', {deck: this.props.deck});    
        }
        else {
            //no cards available in the deck.
            //show a toast - works only in Android 
            if (Platform.OS === 'android') {
                ToastAndroid.show('Add Cards', ToastAndroid.SHORT);
            }
        }
    };

    render() {
        console.log('Deck render props: ', this.props);
        return (
            <View style={styles.container}>

                {/* first row - empty*/}
                <View style={[styles.row, styles.withBorder]}/>

                {/* second row. deck name and no. of cards */}
                <View style={[styles.row, {justifyContent: 'flex-start'}]}>
                    <Text style={styles.rowHeader}>{this.props.deck.title}</Text>
                    <Text style={styles.rowSubHeader}>{this._getCardCountText(this.props.deck.questions.length)}</Text>
                </View>

                {/* third row. 'Add Card' and 'Start Quiz' buttons */}
                <View style={[styles.row, {justifyContent: 'flex-end'}, styles.withBorder]}>

                    {/* 'Add Card' button */}
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('AddCard', {deck: this.props.deck})}
                        style={styles.submitBtn}
                    >
                        <Text style={styles.submitBtnText}>Add Card</Text>
                    </TouchableOpacity>

                    {/* 'Start Quiz' button */}
                    <TouchableOpacity
                        onPress={this._startQuiz}
                        style={styles.submitBtn}
                    >
                        <Text style={styles.submitBtnText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    row: {
        flex: 1,
    },
    rowHeader: {
        textAlign: 'center',
        fontSize: 30
    },
    rowSubHeader: {
        textAlign: 'center',
        fontSize: 15
    },
    submitBtn: {
        backgroundColor: 'green',
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        margin: 10,
        height: 45,
        width: 200,
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },    
    submitBtnText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    },
    withBorder: {
        borderColor: 'red',
        borderWidth: 0,
    }
});

function mapStateToProps(decks, ownProps) {
    console.log('Deck mapStateToProps decks: ', decks);

    return {
        deck : Object.values(decks).find(item => item.title === ownProps.navigation.state.params.deckName)
    }
}

export default connect(mapStateToProps)(Deck);