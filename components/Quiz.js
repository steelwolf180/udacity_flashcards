import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList,  StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { clearAndSetLocalNotification } from '../utils/helpers';

/**
**Quiz component renders the cards for a deck - in a quiz format.
**  props.navigation.state.params
**      deck - the deck for which the quiz is run.
**/
export default class Quiz extends Component {
	constructor(props) {
		super(props);
		//set the initial state
		this.state = {
			currentQuestionNo: 1,
			isQuizCompleted: false
		};
		//get the current deck from props.navigation.state.params.deck
		this.deck = this.props.navigation.state.params.deck;		
		this.score = 0; //set the intial score
		this.totalQuestions = this.deck.questions.length;
		this.isQuestion = true; //starts with the question side of the card
	}
	componentWillMount() {
		//sets up the animation
	    this.animatedValue = new Animated.Value(0);
	    
	    this.value = 0;
	    this.animatedValue.addListener(({ value }) => {
	    	this.value = value;
	    });
	    this.frontInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ['0deg', '180deg'],
	    });
	    this.backInterpolate = this.animatedValue.interpolate({
	      	inputRange: [0, 180],
	      	outputRange: ['180deg', '360deg']
	    });
		this.backOpacity = this.animatedValue.interpolate({
			inputRange: [89, 90], 
			outputRange: [0, 1] 
		});
	    this.frontOpacity = this.animatedValue.interpolate({
	    	inputRange: [89, 90], 
	    	outputRange: [1, 0] 
	    });    
	  }

    /**
    **Internal function to flip the question/answer card.
    **cb is the callback to do the after animation actions like going to the next question.
    **/
	_flipCard = (cb) => {
		//if call back is not passed, create a dummy function
		if (typeof cb !== 'function') cb = () => {};

		//if flipped from a question face, it goes to the answer face.
		//if flipped from a answer face, it goes to the question face.
		this.isQuestion = !this.isQuestion;

		if (this.value >= 90) {
		  	Animated.timing(this.animatedValue,{
		    	toValue: 0,
		    	duration: 2000,
		  	}).start(cb);
		} else {
		  	Animated.timing(this.animatedValue,{
		    	toValue: 180,
		    	duration: 2000
		  	}).start(cb);
		}
	}

    /**
    **Internal function to get the next card.
    **/
 	_getNextCard = () => {
 		let { currentQuestionNo } = this.state;
 		if (currentQuestionNo === this.totalQuestions) {
 			//completed the quiz
 			this.setState({isQuizCompleted: true});
 			//clear and set the daily notification
 			clearAndSetLocalNotification();
 		}
 		else {
 			currentQuestionNo++;
 			//if in question card, set the state to reflect the new question number
 			//if in answer card, first flip the card and then set the state to reflect the new question number
 			this.isQuestion? this.setState({currentQuestionNo}) : this._flipCard(() => this.setState({currentQuestionNo}));
	 	} 		
 	}

    /**
    **Internal function to restart the quiz.
    **/
 	_restart = () => {
 		this.score = 0; // reset the score

 		//if in question card, reset the state
 		//if in answer card, first flip the card and then reset the state
		if (this.isQuestion) { 
			this.setState({currentQuestionNo: 1, isQuizCompleted: false});
		}
		else {			
 			this._flipCard(() => this.setState({currentQuestionNo: 1, isQuizCompleted: false}));
 		}
 	};

    /**
    **Internal function to navigate back to the previous screen.
    **/
 	_goBack = () => {
 		this.props.navigation.goBack();
 	};

 	/**
    **Internal function which returns JSX to display score.
    **return formatted score if the quiz is completed. Else returns null
    **/
 	_getScore = () => {
 		const { isQuizCompleted } = this.state;
 		const { score } = this;
 		if (isQuizCompleted) 
 			return <View><Text style={styles.scoreCard}> Score {score}</Text></View>;
 		return null;
 	};

	render() {
		console.log('Quiz render props: ', this.props);
		const { currentQuestionNo, isQuizCompleted } = this.state;
		const { deck, totalQuestions, score } = this;

		//define animation styles
	    const frontAnimatedStyle = {
	    	opacity: this.frontOpacity,
	      	transform: [
	        	{ rotateY: this.frontInterpolate}
	      	]
	    };
	    const backAnimatedStyle = {
	    	opacity: this.backOpacity,
	      	transform: [
	        	{ rotateY: this.backInterpolate }
	      	]
	    };		


		return (
			<View style={[styles.container, styles.withBorder]}>

				{/*  first row - tracker and score */}
				<View style={[styles.row, styles.withBorder]}>
					<Text style={styles.tracker}>
						{currentQuestionNo} / {totalQuestions}
					</Text>
					{this._getScore()}
				</View>

				{/*  second row - Question/Answer  */}
				<View style={[styles.tallRow, styles.withBorder]}>
						{/* question card */}
			        	<Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
				            <Text style={styles.flipText}>
				            	{deck.questions[currentQuestionNo - 1].question}
				            </Text>
					        <TouchableOpacity onPress={() => this._flipCard()}>
					          	<Text style={styles.flipLink}>
					          		Show Answer
					          	</Text>
					        </TouchableOpacity>				            
			          	</Animated.View>

			          	{/* answer card */}
			          	<Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
			            	<Text style={styles.flipText}>
			              		{deck.questions[currentQuestionNo - 1].answer}
			            	</Text>
					        <TouchableOpacity onPress={() => this._flipCard()}>
					          	<Text style={styles.flipLink}>
					          		Go To Question
					          	</Text>
					        </TouchableOpacity>			            	
			          	</Animated.View>
				</View>

				{/* third row - Correct and Incorrect buttons */}
					{/* once quiz completed shows 'Restart Quiz' and 'Back to Deck' buttons instead of Correct and Incorrect buttons */}
	            <View style={[styles.row, {justifyContent: 'flex-end'}, styles.withBorder]}>
					{
						isQuizCompleted? 
							<View>
								{/* Quiz Restart button */}
				                <TouchableOpacity
				                    onPress={this._restart}
				                    style={styles.submitBtn}
				                >
				                    <Text style={styles.submitBtnText}>Restart Quiz</Text>
				                </TouchableOpacity>

				            	{/* Back to Deck button */}
				                <TouchableOpacity
				                    onPress={this._goBack}
				                    style={styles.submitBtn}
				                >
				                    <Text style={styles.submitBtnText}>Back to Deck</Text>
				                </TouchableOpacity>							
							</View>
						:
							<View>
								{/* Correct button */}
				                <TouchableOpacity
				                    onPress={() => {this.score++; this._getNextCard()}}
				                    style={styles.submitBtn}
				                >
				                    <Text style={styles.submitBtnText}>Correct</Text>
				                </TouchableOpacity>                		

				            	{/* Incorrect button */}
				                <TouchableOpacity
				                    onPress={this._getNextCard}
				                    style={[styles.submitBtn, {backgroundColor: 'red'}]}
				                >
				                    <Text style={styles.submitBtnText}>Incorrect</Text>
				                </TouchableOpacity>
				            </View>
				    }
	            </View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
	flipCard: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: 'lightblue',
		backfaceVisibility: 'hidden',
	},    
	flipCardBack: {
		flex: 1,
		backgroundColor: "lightpink",
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0
	},	
	flipText: {
		marginTop: 5,
		fontSize: 25,
		color: 'black',
		fontWeight: 'bold',
	},
	flipLink: {
		marginBottom: 30,
		fontSize: 22,
		color: 'white',
		fontWeight: 'bold',
	},	
    row: {
        flex: 1,
    },
    tallRow: {
        flex: 2,
    },    
	submitBtn: {
        backgroundColor: 'green',
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        margin: 10,
        height: 45,
        width: 200,
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },   
    tracker: {
    	fontSize: 30
    },  
    scoreCard: {
    	textAlign: 'center',
    	fontSize: 30,
    	fontWeight: 'bold'
    },      
    submitBtnText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center'
    },
    withBorder: {
        borderColor: 'red',
        borderWidth: 0,
    }
});