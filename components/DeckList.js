import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { receiveEntries } from '../actions';
import { getDecks } from '../utils/api';

/**
**DeckList component lists the decks.
**  uses the FlatList component for the lsit.
**/
class DeckList extends Component {

    async componentDidMount() {
        console.log('DeckList componentDidMount');
        try {
            const decks = await getDecks();//fetch the decks
            this.props.dispatch(receiveEntries(decks));//update the redux store, once the decks are fetched
        }
        catch(error) {
            console.log('error: ', error)
        }
    }

    /**
    **Internal function to render a list item.
    **   used by FlatList
    **/
    _renderItem = (item) => {
        //console.log('DeckList _renderItem item: ', item);
        const deck = item.item;
        const { index } = item;
        return (
            <TouchableOpacity
                style={[styles.deckCard, {backgroundColor: index % 2 ? 'skyblue' : 'white'}]}
                onPress={() => this.props.navigation.navigate('Deck', {deckName: deck.title})}
            >
                <Text style={styles.deckHeader}>{deck.title}</Text>
                <Text style={styles.deckSubHeader}>{deck.questions.length}</Text>
            </TouchableOpacity>
        );
    }

    /**
    **Internal function to return the key for each list item.
    **   used by FlatList
    **/
    _keyExtractor = (item, index) => index;

    render() {
        console.log('DeckList render props: ', this.props);
        const { decks } = this.props;
        return (
            <FlatList
                data={decks}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
            />
        )
    }
}

const styles = StyleSheet.create({
    deckCard: {
        paddingTop: 10,
        paddingBottom: 10
    },
    deckHeader: {
        textAlign: 'center',
        fontSize: 35
    },
    deckSubHeader: {
        textAlign: 'center',
        fontSize: 20
    }

});

function mapStateToProps(decks) {
    console.log('DeckList mapStateToProps decks: ', decks);

    if (!decks) return {decks: []}; //if no decks, set this.props.decks as an empty array.
    return {decks : Object.values(decks)}
}
export default connect(mapStateToProps)(DeckList);