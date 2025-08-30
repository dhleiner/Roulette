import React, { useState } from 'react';
import './Wheel.css';

const Wheel = ({result, setResult}) => {
    const [spinAngle, setSpinAngle] = useState(0)
    //const [result, setResult] = useState(0)
    

    const numbersArray = [
        0,
        28,
        9,
        26,
        30,
        11,
        7,
        20,
        32,
        17,
        5,
        22,
        34,
        15,
        3,
        24,
        36,
        13,
        1,
        '00',
        27,
        10,
        25,
        29,
        12,
        8,
        19,
        31,
        18,
        6,
        21,
        33,
        16,
        4,
        23,
        35,
        14,
        2,
    ];
    const reds = [
        1, 3, 5, 7, 9, 12, 14, 16, 18, 21, 23, 25, 27, 28, 30, 32, 34, 36,
    ];
    const blacks = [
        2, 4, 6, 8, 10, 11, 13, 15, 17, 19, 20, 22, 24, 26, 29, 31, 33, 35,
    ];
    
    function handleSpin(){
        const spinDegree=Math.floor(Math.random()*(1440-720+1))+720
        const newSpinAngle=spinAngle+spinDegree
        setSpinAngle(newSpinAngle)
        setTimeout(() => {
           const segmentDegree=360/38
           const normalizedAngle=newSpinAngle%360
           const index=Math.floor((360-normalizedAngle)/segmentDegree)%38
           setResult(numbersArray[index])
        }, 2000);
    }
    return (
        <section className='wheelSection'>
         <div className='result'>{result}</div>   
        <div className="wheelContainer">
            <div className="pointer"></div>
            <div className="wheel" style={{transform: `rotate(${spinAngle}deg)`, transition:"transform 2s ease-out" }}>
                {numbersArray.map((number, index) => {
                    const angle = 360 / 38;
                    const rotation = angle * index;
                    const skew = angle * -8.5;
                    return (
                        <div className="segmentContainer" key={number} style={{transform: `rotate(${rotation}deg)`}}>
                            <div
                                className="segment"
                                style={{
                                    transform: `skewY(${skew}deg)`,
                                }}
                            ></div>
                            <div className="number">{number}</div>
                        </div>
                    );
                })}
            </div>
            <button className="spinButton" onClick={handleSpin}>SPIN</button>

        </div>
        </section>
    );
};

export default Wheel;
