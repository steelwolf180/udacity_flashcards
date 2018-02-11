import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions';

function decks(state={}, action) {
    switch(action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            };
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            };

        case ADD_CARD:
            const deck = {
                title: action.deckName,
                questions: [...state[action.deckName].questions]
            };
            deck.questions.push(action.card);
            return {
                ...state,
                ...{[action.deckName]: deck}
            };                  
        default:
            return state;
    }
}

export default decks;