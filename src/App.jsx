import './App.css'
import {useEffect, useState} from 'react'
import SingleCard from './components/SingleCard'
const cardImages = [
  {"src":"/img/helmet-1.png", matched:false},
  {"src":"/img/potion-1.png", matched:false},
  {"src":"/img/ring-1.png", matched:false},
  {"src":"/img/scroll-1.png", matched:false},
  {"src":"/img/shield-1.png", matched:false},
  {"src":"/img/sword-1.png", matched:false}
]

function App() {
  const [cards,setCards] = useState([])
  const [turns,setTurns] = useState(0)
  const [choiceOne,setChoiceOne] = useState(null)
  const [choiceTwo,setChoiceTwo] = useState(null)
  const [disabled,setDisabled] = useState(false)
  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages,...cardImages]
    .sort(()=> Math.random() - 0.5)
    .map((card => ({...card,id:Math.random()})))
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(0)
    setCards(shuffledCards)
  }
  //handle a choice of cards 
  const handleChoice = (card) => {
     choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }
  //compare 2 selected cards 
  useEffect(()=> {
   
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card=> {
            if(card.src === choiceOne.src){
              return {...card, matched:true}
            }else {
              return card
            }
          })
        })
        resetTurn();
      }else{
        setTimeout(()=> resetTurn(),1000);
       
      }
    }
  },[choiceOne,choiceTwo])
  console.log(cards)
  //reset choices and increase turn 
  const resetTurn= () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns+1)
    setDisabled(false)
  }

  //reset the game automatically 

  useEffect(()=>{
    shuffleCards()
  },[])
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      
      <div className="card-grid">
        {cards.map(card=>(
          <div className="card" key={card.id}>
            <SingleCard key={card.id} card={card} onHandleChoice={handleChoice} flipped={card===choiceOne || card===choiceTwo || card.matched} disabled={disabled}/>
          </div>
        ) )}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App