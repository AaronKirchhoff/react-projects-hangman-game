import React, {Component} from "react";
import "./Hangman.css";
import { randomWord } from "./words";
import pic0 from "./0.jpg";
import pic1 from "./1.jpg";
import pic2 from "./2.jpg";
import pic3 from "./3.jpg";
import pic4 from "./4.jpg";
import pic5 from "./5.jpg";
import pic6 from "./6.jpg";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [pic0, pic1, pic2, pic3, pic4, pic5,pic6]
    };

    // counstructor is where yuo set the initial state of something, called initializing the state.
  constructor(props){
    super(props);
    this.state = { 
      nWrong: 0, 
      guessed: new Set(),
      answer: randomWord()};
    // bind the render function call of This here
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }

  guessWord(){
    return this.state.answer
    .split("")
    .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  handleGuess(evt){
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  generateButtons(){
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
      // every unique instance of an event or button puch needs to have its own key, an identifier to make it unique. since each button is its own letter, we set it to ltr.
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  reset(){
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    })
  }

  render(){
    const gameOver = this.state.nWrong >= this.props.maxWrong;
    const isWinner = this.guessWord().join("") === this.state.answer;
    const altText = `${this.state.nWrong}/${this.props.nWrong} guesses`;
    let gameState = this.generateButtons();
    if (isWinner) gameState = "You Win!";
    if (gameOver) gameState = "You Lose";
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={altText}></img>
        <p className="Wrong-guesses"># of wrong guesses | {this.state.nWrong}</p>
        <p className="Hangman-word">{!gameOver ? this.guessWord() : this.state.answer}</p>
        <p className="Hangman-btns">{gameState}</p>
        <button id="reset" onClick={this.reset}>Restart</button>
      </div>
    )
  }
}

export default Hangman;

{/* How to, Ternary Operator: notice those back ticks in the conditional satemtn above `` ??? that means it interpolates the exact values within for game over */}