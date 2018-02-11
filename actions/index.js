export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

export function receiveEntries(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    };
}

export function addDeck(deckName) {
	console.log('actions addDeck deckName: ', deckName);
    return {
        type: ADD_DECK,
        deck: {
        	[deckName]: {
        		title: deckName,
        		questions: []
        	}
        }
    };
}

export function addCard(deckName, card) {
    return {
        type: ADD_CARD,
        deckName,
        card
    };
}