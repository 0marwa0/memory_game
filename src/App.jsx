import { useState, useEffect } from "react";
import "./App.css";
import ark from "./assets/ark.jpeg";
import home from "./assets/Home.png";
import ring from "./assets/ring.png";
import money from "./assets/money.avif";
import sword from "./assets/sword.jpeg";
import shiled from "./assets/shiled.jpeg";
import card_default from "./assets/card.avif";

const cardImage = [
  { src: ark, match: false },
  { src: home, match: false },
  { src: ring, match: false },
  { src: money, match: false },
  { src: sword, match: false },
  { src: shiled, match: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const shuffleCard = () => {
    const shuffleCards = [...cardImage, ...cardImage]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffleCards);
    setTurns(0);
  };
  const handleClick = (card) => {
    choiceOne == null ? setChoiceOne(card) : setChoiceTwo(card);
  };

  const restTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((pervTurn) => pervTurn + 1);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards((pervCard) => {
          return pervCard.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        restTurn();
      } else {
        setTimeout(() => {
          restTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCard();
  }, []);
  return (
    <div className="content">
      <h1>Magic Match</h1>
      <button onClick={shuffleCard}> New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <div
              className={
                card === choiceOne || card === choiceTwo || card.matched
                  ? "flipped"
                  : ""
              }
            >
              <img src={card.src} className="front" />
              <img
                className="back"
                src={card_default}
                onClick={() => handleClick(card)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
