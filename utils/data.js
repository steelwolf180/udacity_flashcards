
export function getDecks() {
    return Promise.resolve(
        {decks: [
            {
                name: 'Deck1',
                cardsCount: 10
            },
            {
                name: 'Deck2',
                cardsCount: 0
            },
            {
                name: 'Deck3',
                cardsCount: 8
            },
            {
                name: 'Deck4',
                cardsCount: 101
            },
            {
                name: 'Deck5',
                cardsCount: 101
            },
                                    {
                name: 'Deck6',
                cardsCount: 101
            },
            {
                name: 'Deck7',
                cardsCount: 101
            },
                                    {
                name: 'Deck8',
                cardsCount: 101
            },
        ]}
    );
}