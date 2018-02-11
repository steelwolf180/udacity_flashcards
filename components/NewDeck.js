import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, KeyboardAvoidingView, View, TextInput,  StyleSheet, TouchableOpacity } from 'react-native';
import { saveDeckTitle } from '../utils/api';
import { addDeck } from '../actions';

/**
**NewDeck component can add a new deck.
**/
class NewDeck extends Component {

    /**
    **Internal function to handle the deck submission.
    **/
    _submit = () => {
        //this.set.deckName will have the new deck name.
        //set in the 'onChangeText' event handler for TextInput
        const { deckName } = this.state; 

        //clears the TextInput.
        //this.deckTitle refers the TextInput.
        this.deckTitle.setNativeProps({text: ''});

        //save the new deck
        saveDeckTitle(deckName, deckName);

        //update the redux store with the new deck
        this.props.dispatch(addDeck(deckName));

        //navigate to the Deck screen
        this.props.navigation.navigate('Deck', {deckName: deckName});
    };

    render() {
        console.log('NewDeck render props: ', this.props);
        return (
            <KeyboardAvoidingView
                behavior="position"
            >
                <Text style={styles.label}>
                    What is the title of your new deck?
                </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Deck Title"
                    onChangeText={text => this.setState({deckName: text})}
                    ref={input => this.deckTitle = input}
                />
                <TouchableOpacity
                    onPress={this._submit}
                    style={styles.submitBtn}
                >
                    <Text style={styles.submitBtnText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    label: {
        margin: 20,
        fontSize: 40,
        textAlign: 'center'
    },    
    textInput: {
        margin: 10,
        marginTop: 20,
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

export default connect()(NewDeck);