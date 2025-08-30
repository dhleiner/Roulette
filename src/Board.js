import Chip from './Chip.js';
import './Board.css';
import Bet from './Bet.js';
const rows = [0, 1, 2];
const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const reds = [
    1, 3, 5, 7, 9, 12, 14, 16, 18, 21, 23, 25, 27, 28, 30, 32, 34, 36,
];
let payout = 0
let win=0
let loss=0
let gain=0
let bet
let adjustingBet=false


const blacks = [
    2, 4, 6, 8, 10, 11, 13, 15, 17, 19, 20, 22, 24, 26, 29, 31, 33, 35,
];

function Board({ numbers, handleNewBet, activeBets, setActiveBet, totalBet, setTotalBet, selectedChip, balance, setBalance,result}) {
  function handleLeftBorderClick(number, colIndex, adjustingBet){
    
    if (number===2){
      console.log("Basket")
      payout=5
      if (adjustingBet){
      console.log("Adjusting: "+adjustingBet)
      handleNewBet(number,"basket")
      }
      else{
        console.log("Adjusting: "+adjustingBet)
        return "basket"
      }
      
    }
    else if(number===1 || number===3){
      //console.log("Not allowed!")
    }
    
    else{
      console.log("Split: "+number+" "+(number-3))
      payout=17
    //   if (result===number || result===number-3){
    //      win=win+(bet*payout)
    //      loss=loss+bet
    //      gain=win-loss
    //   //setBalance(balance+gain)}
         if (adjustingBet){
         handleNewBet(number,"split")
         }
         else{ 
         return "split"
         }
      
      // call function for left split
    }
  }
     // declare function for left split
     // if (Total<balance && Total<HouseMax){
      //  setActiveBet([...activeBets, newBet])
    //}
  function handleBottomBorderClick(number, rowIndex){
    if (rowIndex===2){
    console.log("Street:",number,(number+1),(number+2))
    payout=11
    if (adjustingBet){
        handleNewBet(number,"street")
        }
        else{ 
        return "street"
        }
    
    }
    else{
      console.log("Split:",number,number-1)
     payout=17
     if (adjustingBet){
        handleNewBet(number,"split")
        }
     else{ 
        return "split"
        }
     
    }
  }
  function handleCornerBet(number, rowIndex){
    if (rowIndex===2){
      console.log("Line:",number,number-3,number-2,number-1,number+1,number+2)
      payout=5
      if (adjustingBet){
        handleNewBet(number,"line")
        }
     else{ 
        return "line"
        }
      
    }
    else{
      console.log("Corner:",number,number-1,number-3,number-4)
      payout=8
      if (adjustingBet){
        handleNewBet(number,"corner")
        }
     else{ 
        return "corner"
        }
      activeBets.push(selectedChip)
      
      if (balance-selectedChip>0){
        setBalance(balance-selectedChip)
      
      setTotalBet(totalBet+selectedChip)
      }
      console.log("Total bet: "+totalBet)
      
      console.log("Selected chip: "+selectedChip)
      console.log("Active bets: "+activeBets)
      console.log("Balance: "+balance)
      
    }
  }


    return (
        <div className="board-container">
            <div className="row">
                <div className="col-1">
                    <div className="row justify-content-center">
                        <div className="col text-white bg-success border-left border-right custom-border-top custom-border-bottom">
                            0
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col text-white bg-success border-left border-right custom-border-top custom-border-bottom">
                            00
                        </div>
                    </div>
                </div>
                <div className="col-10">
                    <div className="row">
                        {cols.map((col, colIndex) => {
                            return (
                                <div key={colIndex} className="col border-right border-left no-padding p-0">
                                    {rows.map((row, rowIndex) => {
                                        const number = col * 3 + (3 - row);
                                        let classes =
                                            'custom-border-top custom-border-bottom text-white pointer custom-button w-100';
                                        const isRed = reds.includes(number);
                                        if (isRed) {
                                            classes = classes + ' bg-danger';
                                        }

                                        const isBlack = blacks.includes(number);
                                        if (isBlack) {
                                            classes = classes + ' bg-black';
                                        }
                                        let sum = 0;
                                        let chipToDisplay = null;
                                        activeBets.forEach((bet) => {
                                            
                                            if (bet.number === number) {
                                                sum = sum + bet.amount;
                                                //chipToDisplay=bet.amount
                                            }
                                        });
                                        console.log(sum);
                                        
                                        // if (sum >= 1 && sum < 5) {
                                        //     //if (selectedChip)
                                        //     chipToDisplay = 1;
                                        // } else if (sum >= 1 && sum < 10) {
                                        //     chipToDisplay = 5;
                                        // } else if (sum >= 10 && sum < 25) {
                                        //     chipToDisplay = 10;
                                        // } else if (sum >= 25) {
                                        //     chipToDisplay = 25;
                                        // }
                                        // //if (selectedChip){
                                        //     chipToDisplay=selectedChip
                                        // }

                                        return (
                                            <div key={rowIndex} className="singleNumber">
                                                {rowIndex === 0 ? (
                                                    <div className="topRow"></div>
                                                ) : (
                                                    <></>
                                                )}

                                                <div className="middleRow">
                                                    <div className="leftBorder" onClick={()=>handleLeftBorderClick(number, colIndex, true)}>
                                                    {    (()=>{
                                                            const type=handleLeftBorderClick(number, colIndex, false)
                                                            const lastBet=activeBets.findLast(bet=>(bet.number===number && bet.type===type))
                                                            
                                                            return lastBet? <Bet type={lastBet.type} chipToDisplay={lastBet.amount}/> : null
                                                        })()
                                                             
                                                        }
                                                    </div>
                                                    <div
                                                        className={classes}
                                                        style={{
                                                            position:
                                                                'relative',
                                                        }}
                                                        onClick={() =>
                                                            handleNewBet(number,"straight")
                                                        }
                                                    >   
                                                        {number} 
                                                        {/* Figure out type of bet */}
                                                        {    (()=>{
                                                            const lastBet=activeBets.findLast(bet=>(bet.number===number && bet.type==="straight"))
                                                            return lastBet? <Bet type={lastBet.type} chipToDisplay={lastBet.amount}/> : null
                                                        })()
                                                             
                                                        }
                                                    {/* <Bet chipToDisplay={chipToDisplay} type="straight"/> */}
                                                        {/* {chipToDisplay && (
                                                            <span
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    top: '50%',
                                                                    left: '50%',
                                                                    transform:
                                                                        'translate(-50%,-50%)',
                                                                }}
                                                            >
                                                                <Chip
                                                                    number={
                                                                        chipToDisplay
                                                                    }
                                                                    setSelectedChip={() =>
                                                                        null
                                                                    }
                                                                />
                                                            </span>
                                                        )} */}
                                                    </div>
                                                    {/* <div className="rightBorder"></div> */}
                                                </div>

                                                <div className="bottomRow">
                                                {colIndex !== 0 ? (
                                                    <div className="cornerBet" onClick={()=>handleCornerBet(number, rowIndex)} ></div>
                                                ) : (
                                                    <></>
                                                )}
                                                  {/* <div className="cornerBet"></div> */}
                                                    <div className="bottomBorder"  onClick={()=>handleBottomBorderClick(number, rowIndex)}></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                    <div className="row">
                        <div className="col text-white bg-success border-left border-right custom-border-top custom-border-bottom">
                            1st 12
                        </div>
                        <div className="col text-white bg-success border-left border-right custom-border-top custom-border-bottom">
                            2nd 12
                        </div>
                        <div className="col text-white bg-success border-left border-right custom-border-top custom-border-bottom">
                            3rd 12
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-white bg-success border-left border-right custom-border-top custom-border-bottom">
                            EVEN
                        </div>
                        <div className="col text-white bg-success border-left border-right custom-border-top custom-border-bottom">
                            ODD
                        </div>
                        <div className="col text-white bg-danger border-left border-right custom-border-top custom-border-bottom">
                            RED
                        </div>
                        <div className="col text-white bg-black border-left border-right custom-border-top custom-border-bottom">
                            BLACK
                        </div>
                        <div className="col text-white bg-success border-left border-right custom-border-top custom-border-bottom">
                            1-18
                        </div>
                        <div className="col text-white bg-success border-left border-right custom-border-top custom-border-bottom">
                            19-36
                        </div>
                    </div>
                </div>
                <div className="col-1">
                    <div className="row justify-content-center text-white bg-success border-left border-right custom-border-top custom-border-bottom">
                        2 to 1
                    </div>
                    <div className="row justify-content-center text-white bg-success border-left border-right custom-border-top custom-border-bottom">
                        2 to 1
                    </div>
                    <div className="row justify-content-center text-white bg-success border-left border-right custom-border-top custom-border-bottom">
                        2 to 1
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Board;
