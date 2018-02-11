import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import NewDeck from './components/NewDeck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import { setLocalNotification } from './utils/helpers';

//set up a tab navigator with two tabs 
const Tabs = TabNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'DECKS'
        }        
    },
    AddDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'NEW DECK'
        }        
    }
}, {
    navigationOptions: {
        header: null
    }    
});

//set up a stack navigator 
const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'purple'
            }
        }        
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            headerTintColor: 'white',
            title: 'Add Card',
            headerStyle: {
                backgroundColor: 'purple'
            }
        }        
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            headerTintColor: 'white',
            title: 'Quiz',
            headerStyle: {
                backgroundColor: 'purple'
            }
        }        
    }    
});


export default class App extends React.Component {
    componentDidMount() {
        console.log('App componentDidMount props: ', this.props);
        setLocalNotification();
    }

    render() {
        console.log('App render props: ', this.props);
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <View style={[{height: Constants.statusBarHeight}]}/>
                    <MainNavigator/>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    withBorder: {
        borderColor: 'red',
        borderWidth: 1,
    }    
});
