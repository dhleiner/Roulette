import Chip from './Chip.js';
import "./Board.css"
const rows=[0,1,2]
const cols=[0,1,2,3,4,5,6,7,8,9,10,11]
const reds=[1,3,5,7,9,12,14,16,18,21,23,25,27,28,30,32,34,36]
const blacks=[2,4,6,8,10,11,13,15,17,19,20,22,24,26,29,31,33,35]




function Board({numbers, handleNewBet, activeBets}){
  return(
    <div className="board-container">
    <div className="row">
      <div className="col-1">
        <div className="row justify-content-center">
          <div className="col text-white bg-success border-left border-right custom-border-top custom-border-bottom">0</div>
          

        </div>
        <div className="row justify-content-center">
          <div className="col text-white bg-success border-left border-right custom-border-top custom-border-bottom">00</div>
          
        </div>
      </div>
      <div className="col-10">
        <div className="row">
        {cols.map(col=>{
        return(
          <div className="col border-right border-left no-padding p-0">{
            rows.map(row => {
              const number=(col*3)+(3-row)
              let classes="custom-border-top custom-border-bottom text-white pointer custom-button w-100"
              const isRed=reds.includes(number)
              if (isRed){
                classes=classes+" bg-danger"
                
              }
              
              const isBlack=blacks.includes(number)
              if (isBlack){
                classes=classes+" bg-black"
                
              }
              let sum=0
              activeBets.forEach(bet => {
                if (bet.number===number){
                  sum=sum+bet.amount
                }
              });
              console.log(sum)
              let chipToDisplay=null
              if(sum>=1 && sum<5){
                chipToDisplay=1
              } else if(sum>=1 && sum<10){
                chipToDisplay=5
              }
              else if(sum>=10 && sum<25){
                chipToDisplay=10
              }else if (sum>=25){
                chipToDisplay=25
              }
              
              return(
                <div className="singleNumber">
                  <div className='topRow'></div>
                  <div className="middleRow">
                    <div className="leftBorder"></div>
                  <div className={classes} style={{position:"relative"}} onClick={()=>handleNewBet(number)}>
                {number}
                {chipToDisplay && <span style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}><Chip number={chipToDisplay} setSelectedChip={()=>null}/></span>}
                </div>  
                <div className="rightBorder"></div>
                  </div>
                  <div className="bottomRow"></div>
                
                </div>
              )
            })
          }

          </div>   
        )
      })
    }
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
    
  )
}

export default Board