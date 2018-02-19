import {AsyncStorage} from 'react-native';
import {getDeck, getDecks} from '../utils/api';

import {DELETE_DECK, FETCH_DECK_DB, FETCH_DECK_INFO} from './types';


export function fetchDeckDB() {
    return (dispatch) => {
        getDecks().then(data => dispatch({type: FETCH_DECK_DB, payload: data}));
    }
}

export function deleteDeck(removeTitle) {
    return (dispatch) => {
        AsyncStorage.removeItem(removeTitle)
            .then(getDecks().then(data => {
                dispatch({type: DELETE_DECK, payload: data})
            })
                .catch(err => console.log(err)))
            .catch(err => console.log(err));
    }
}

export function getDeckDetails(entryId) {
    return (dispatch) => {
        getDeck(entryId)
            .then(cardDeck => {
                dispatch({type: FETCH_DECK_INFO, payload: JSON.parse(cardDeck)})
            });
    }
}
