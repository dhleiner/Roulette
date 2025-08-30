import './App.css';
import Board from './Board.js';
import Chip from './Chip.js';
import { useEffect, useState } from "react";
import Wheel from './Wheel.js';

const chips = [1, 5, 10, 25];
const numbers = Array.from(Array(37).keys());

function App() {
  const [balance, setBalance] = useState(1000);
  const [selectedChip, setSelectedChip] = useState(1);
  const [activeBets, setActiveBets] = useState([]);
  const [totalBet, setTotalBet] = useState(0);
  const [result, setResult] = useState(0);

  useEffect(() => {
    console.log(activeBets);
  }, [activeBets]);

  // Now always accepts an array of numbers
  function handleNewBet(numbersArray, type) {
    let existingBets = [...activeBets];
    existingBets.push({ numbers: numbersArray, amount: selectedChip, type });
    setActiveBets(existingBets);
  }

  return (
    <div className="App">
      <Board
        numbers={numbers}
        result={result}
        setResult={setResult}
        handleNewBet={handleNewBet}
        selectedChip={selectedChip}
        activeBets={activeBets}
        setActiveBet={setActiveBets}
        totalBet={totalBet}
        setTotalBet={setTotalBet}
        balance={balance}
        setBalance={setBalance}
      />
      <div>Balance: {balance}</div>
      <div className="d-flex">
        <div>
          {chips.map(number => (
            <Chip
              key={number}
              number={number}
              selectedChip={selectedChip}
              setSelectedChip={setSelectedChip}
            />
          ))}
        </div>
        <Wheel result={result} setResult={setResult} />
      </div>
    </div>
  );
}

export default App;
