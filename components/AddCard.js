import React, { Component } from 'react';
import { Text, View, TextInput,  StyleSheet, TouchableOpacity, Platform, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { addCardToDeck } from '../utils/api';
import { addCard } from '../actions';

/**
**AddCard component can add a card to a deck.
**  props.navigation.state.params
**      deck - the deck to which the card to be added.
**/
class AddCard extends Component {

    /**
    **Internal function to handle the card submission.
    **/
    _submit = () => {
        //this.props will have the deck. Set by 'mapStateToProps'
        const { deck } = this.props;

        //this.set.question and this.set.answer will have the card question and answer respectively.
        //set in the 'onChangeText' event handler for TextInput
        const { question, answer } = this.state;

        //check if the user has entered both question and answer
        if (question && answer) {
            //user has entered both question and answer

            //show a toast message - works only in Android
            if (Platform.OS === 'android') {
                ToastAndroid.show('Card Added', ToastAndroid.SHORT);
            }

            //clears the TextInputs.
            //this.question refers the question TextInput.            
            //this.answer refers the answer TextInput.            
            this.question.setNativeProps({text: ''});
            this.answer.setNativeProps({text: ''});

            //save the card to the deck
            addCardToDeck(deck.title, {question, answer});

            //update the redux store with the new deck
            this.props.dispatch(addCard(deck.title, {question, answer}));            
        }
        else {
            //user has not entered either the question or answer or both
            //display a toast message - works only in android
            if (Platform.OS === 'android') {
                ToastAndroid.show('Card Not Added', ToastAndroid.SHORT);
            }            
        }
    }

    render() {
        console.log('AddCard render props: ', this.props);
        return (
            <View>
                {/* the question input */}
                <TextInput
                    style={styles.textInput}
                    placeholder="Question"
                    onChangeText={text => this.setState({question: text})}
                    ref={input => this.question = input}
                />

                {/* the answer input */}
                <TextInput
                    style={styles.textInput}
                    placeholder="Answer"
                    onChangeText={text => this.setState({answer: text})}
                    ref={input => this.answer = input}
                />

                <TouchableOpacity
                    onPress={this._submit}
                    style={styles.submitBtn}
                >
                    <Text style={styles.submitBtnText}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        margin: 10,
        marginTop: 40,
        height: 50,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
        padding: 5,
        fontSize: 25
    },
    submitBtn: {
        backgroundColor: 'green',
        marginTop: 20,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },   
    submitBtnText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center'
    }
});

function mapStateToProps(decks, ownProps) {
    console.log('AddCard mapStateToProps decks: ', decks);
    const { deck } = ownProps.navigation.state.params;
    return { deck }
}

export default connect(mapStateToProps)(AddCard);