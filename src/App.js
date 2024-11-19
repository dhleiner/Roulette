import logo from './logo.svg';
import './App.css';
import Board from './Board.js';
import Chip from './Chip.js';
import { useState } from "react";
import Wheel from './Wheel.js';

const chips=[1,5,10,25]
const numbers= Array.from(Array(37).keys());
console.log(numbers)
function App() {
  const [balance, setBalance] = useState(1000);
  const [selectedChip, setSelectedChip] = useState(1);
  const [activeBets,setActiveBets]=useState([]);

  function handleNewBet(number){
   let existingBets=[...activeBets]
   existingBets.push({number, amount:selectedChip,type:"straight"})
   setActiveBets(existingBets)
  }
  return (
    <div className="App">
     <Board numbers={numbers} handleNewBet={handleNewBet} activeBets={activeBets}/>
     <div>Balance:{balance}</div>
     <div className="d-flex">
      <div>

      {chips.map(number=>{
        return<Chip number={number} selectedChip={selectedChip} setSelectedChip={setSelectedChip}/>
      })}
      </div>
     <Wheel/>
     </div>
    </div>
  );
}

export default App;
