import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Images from './images/index';

export default class App extends Component<{}> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      letterSelected: undefined,
      imagesIndex: 0,
      correct: 0
    };
  }
  letterSelected(random,index){
    if(Images[random].choices[index] === Images[random].firstLetter){
      this.setState({
        correct: this.state.correct + 1
      })
    }
    this.setState({
      letterSelected: Images[random].choices[index]
    })
  }
  nextPress(){
    this.setState({
      imagesIndex: this.state.imagesIndex + 1,
      letterSelected: undefined
    })
  }
  startOver(){
    this.setState({
      correct: 0,
      imagesIndex: 0,
      letterSelected: undefined
    })
  }
  render() {
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    const random = this.state.imagesIndex;
    const appendChoices = () => {
      return Images[random].choices.map((choice, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => this.letterSelected(random, index)}>
            <Text key={index} style={styles.choices}>{choice}</Text>
          </TouchableOpacity>
        )
      });
    }
    const buttonChange = () => {
      if(this.state.imagesIndex < Images.length - 1){
        return (
          <Text style={styles.nextButton}>Next</Text>
        )
      } else {
        return (
          <Text style={styles.nextButton}>Get Score</Text>
        )
      }
    }
    const appendAll = () => {
      if(this.state.imagesIndex < Images.length){
        if(!this.state.letterSelected){
          return (
              <View style={styles.container}>
                <Text style={styles.welcome}>
                  What letter does this animal start with?
                </Text>
                <Image style={styles.image} source={Images[random].image}/>
                {appendChoices()}
              </View>
          )
        } else {
          if(this.state.letterSelected === Images[random].firstLetter){
            return (
              <View style={styles.container}>
                <Text style={styles.welcome}>
                  You are CORRECT!
                </Text>
                <TouchableOpacity onPress={this.nextPress.bind(this)}>
                  {buttonChange()}
                </TouchableOpacity>
              </View>
            )
          } else {
            return (
              <View style={styles.container}>
                <Text style={styles.welcome}>
                  You are INCORRECT!
                </Text>
                <TouchableOpacity onPress={this.nextPress.bind(this)}>
                  {buttonChange()}
                </TouchableOpacity>
              </View>
            )
          }
        }
      } else {
        return (
          <View style={styles.container}>
            <Text style={styles.welcome}>You got {this.state.correct} out of 10 correct</Text>
            <TouchableOpacity onPress={this.startOver.bind(this)}>
              <Text style={styles.startOverButton}>Start Over</Text>
            </TouchableOpacity>
          </View>
        )
      }
    }
    return (
      <View style={styles.container}>
        {appendAll()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  choices: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: '#b2ffab'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10%',
  },
  nextButton: {
    color: '#964da3',
    fontSize: 35,
  },
  startOverButton: {
    backgroundColor: '#964da3',
    color: 'white',
    fontSize: 35,
  }
});
