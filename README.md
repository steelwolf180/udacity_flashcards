# FLASHCARDS

This project has been developed as part of the Udacity React Nanodegree. It creates a mobile app using React Native.

This app was tested on android devices. It may work on iOS devices also. 

You can execute this project by cloning or downloading the git repository `https://github.com/steelwolf180/udacity_flashcards.git`.

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Steps to install :

* Clone or download the git repository (`https://github.com/steelwolf180/udacity_flashcards.git`) to readable folder


* Change the  the folder to `flashcards`.

    * Execute `yarn install`
    * Execute `yarn start`
    * Then use an emulator or  device with Expo to test out the app.

## Guidelines to use the app :

* The app opens with a `DeckList` tab. 
* There is another tab `NewDeck` where user can add a deck.
* Once a deck is added, users can add cards to the deck.
A card is a combination of a question and an answer.
* Once cards are added, user can a take a quiz.
* If the user is not completing at least one quiz in a day, the app emits a local notification at 19:00 PM to remind about taking the quiz.