import Chip from './Chip.js';
import './Board.css';
import Bet from './Bet.js';

const rows = [0, 1, 2];
const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const reds = [1, 3, 5, 7, 9, 12, 14, 16, 18, 21, 23, 25, 27, 28, 30, 32, 34, 36];
const blacks = [2, 4, 6, 8, 10, 11, 13, 15, 17, 19, 20, 22, 24, 26, 29, 31, 33, 35];

let payout = 0;

function Board({ numbers, handleNewBet, activeBets, setActiveBet, totalBet, setTotalBet, selectedChip, balance, setBalance, result }) {

  function handleLeftBorderClick(number, colIndex, adjustingBet) {
    if (number === 2) {
      payout = 5;
      const numbersArray = [number];
      if (adjustingBet) handleNewBet(numbersArray, "basket");
      else return "basket";
    } else if (number === 1 || number === 3) {
      return;
    } else {
      payout = 17;
      const numbersArray = [number, number - 3]; // left split
      if (adjustingBet) handleNewBet(numbersArray, "split");
      else return "split";
    }
  }

  function handleBottomBorderClick(number, rowIndex) {
    let numbersArray;
    if (rowIndex === 2) {
      numbersArray = [number, number + 1, number + 2];
      payout = 11;
      handleNewBet(numbersArray, "street");
    } else {
      numbersArray = [number, number - 1];
      payout = 17;
      handleNewBet(numbersArray, "split");
    }
  }

  function handleCornerBet(number, rowIndex) {
    let payoutType, numbersInCorner;

    if (rowIndex === 2) {
      payoutType = "line";
      numbersInCorner = [number, number - 3, number - 2, number - 1, number + 1, number + 2];
      payout = 5;
    } else {
      payoutType = "corner";
      numbersInCorner = [number, number - 1, number - 3, number - 4];
      payout = 8;
    }

    const newBets = [...activeBets, { numbers: numbersInCorner, amount: selectedChip, type: payoutType }];
    setActiveBet(newBets);
    setBalance(balance - selectedChip);
    setTotalBet(totalBet + selectedChip);
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
            {cols.map((col, colIndex) => (
              <div key={colIndex} className="col border-right border-left no-padding p-0">
                {rows.map((row, rowIndex) => {
                  const number = col * 3 + (3 - row);
                  let classes = 'custom-border-top custom-border-bottom text-white pointer custom-button w-100';
                  if (reds.includes(number)) classes += ' bg-danger';
                  if (blacks.includes(number)) classes += ' bg-black';

                  return (
                    <div key={rowIndex} className="singleNumber">
                      {rowIndex === 0 && <div className="topRow"></div>}

                      <div className="middleRow">
                        <div className="leftBorder" onClick={() => handleLeftBorderClick(number, colIndex, true)}>
                          {(() => {
                            const type = handleLeftBorderClick(number, colIndex, false);
                            const lastBet = activeBets.findLast(
                              bet => bet.numbers.includes(number) && bet.type === type
                            );
                            return lastBet ? <Bet type={lastBet.type} chipToDisplay={lastBet.amount} /> : null;
                          })()}
                        </div>

                        <div
                          className={classes}
                          style={{ position: 'relative' }}
                          onClick={() => handleNewBet([number], "straight")}
                        >
                          {number}
                          {(() => {
                            const lastBet = activeBets.findLast(
                              bet => bet.numbers.includes(number) && bet.type === "straight"
                            );
                            return lastBet ? <Bet type={lastBet.type} chipToDisplay={lastBet.amount} /> : null;
                          })()}
                        </div>
                      </div>

                      <div className="bottomRow">
                        {colIndex !== 0 && <div className="cornerBet" onClick={() => handleCornerBet(number, rowIndex)}></div>}
                        <div className="bottomBorder" onClick={() => handleBottomBorderClick(number, rowIndex)}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
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
