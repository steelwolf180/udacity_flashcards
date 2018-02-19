import React from 'react';
import {Keyboard, KeyboardAvoidingView} from 'react-native';
import {Button, Card, FormInput, FormLabel, FormValidationMessage} from 'react-native-elements';
import {addCardToDeck} from '../utils/api';


class AddEntry extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.navTitle
        }
    };
    state = {
        questionText: '',
        answerText: '',
        errorMessage: ''
    };
    handleSubmit = () => {
        if (this.state.questionText && this.state.answerText) {
            const {questionText, answerText} = this.state;
            const title = this.props.navigation.state.params.title;

            const card = {
                question: questionText,
                answer: answerText
            };

            addCardToDeck(title, card);

            this.setState({
                errorMessage: false,
                questionText: '',
                answerText: ''
            });

            this.props.navigation.goBack(Keyboard.dismiss());
        } else {
            this.setState({errorMessage: true})
        }
    };

    render() {
        return (
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center'
                }}
                behavior="padding"
            >
                <Card title="Add a Card">
                    <FormLabel>Question:</FormLabel>
                    <FormInput
                        onChangeText={questionText => this.setState({questionText})}
                        value={this.state.titleText}
                    />
                    <FormLabel>Answer:</FormLabel>
                    <FormInput
                        onChangeText={answerText => this.setState({answerText})}
                        value={this.state.titleText}
                    />
                    <FormValidationMessage>
                        {this.state.errorMessage ? 'Both fields are required' : ''}
                    </FormValidationMessage>
                    <Button
                        title="Submit"
                        raised
                        backgroundColor="rgb(72, 149, 236)"
                        onPress={this.handleSubmit}
                    />
                </Card>
            </KeyboardAvoidingView>
        );
    }
}

export default AddEntry;
