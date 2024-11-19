
function Chip({number, selectedChip, setSelectedChip}){
  let classes=`chip chip-${number}`
  if (number===selectedChip){
    classes=classes+" chip-lg"
  }
  return <div onClick={()=>setSelectedChip(number)} className={classes}>{number}</div>
}

export default Chip