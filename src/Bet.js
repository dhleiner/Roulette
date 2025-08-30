import React from 'react';
import { useState } from 'react';
import Chip from './Chip.js';


function Bet({chipToDisplay,type}) {
  
const [color, setColor] = useState();
const [localTotal, setLocalTotal] = useState(0);
    return (
        <div>
            {chipToDisplay && (
                <span
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                    }}
                >
                    <Chip number={chipToDisplay} setSelectedChip={() => null} />
                </span>
            )}
        </div>
    );
}

export default Bet;
