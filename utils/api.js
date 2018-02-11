import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'flascards:decks';

/**
**function to get the decks
**/
export  function getDecks() {
    console.log('getDecks');
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(results => {
            console.log('results: ', results);
            if (!results) return {};
            return JSON.parse(results);
        })
        .catch(error => console.log(error));
}

/**
**function to save a deck
**/
export function saveDeckTitle(key, title) {
    console.log('key and title', key, title);
    return AsyncStorage.mergeItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({
            [key]: {
                title,
                questions: []
            }
        })
    );
}

/**
**function to save a card to a deck
**/
export function addCardToDeck(deckName, card) {
    console.log('api addCardToDeck deckName and card  ', deckName, card);
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(data => {
            const decks = JSON.parse(data);
            decks[deckName].questions.push(card);
            //console.log('api addCardToDeck decks: ', decks);
            return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
        });
}

