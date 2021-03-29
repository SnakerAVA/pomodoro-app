import React from 'react';
import './TimerTabs.scss';

function TimerTabs({ currentColor, toggleTimer, activeTimer }) {

    return (
        <div className='panel'>
            <button
                className={`pomodoro-btn${currentColor}${activeTimer === 'pomodoro' ? ' active' : ''}`}
                onClick={() => toggleTimer('pomodoro')}
            ><h5>pomodoro</h5></button>
            <button
                className={`short-btn${currentColor}${activeTimer === 'short' ? ' active' : ''}`}
                onClick={() => toggleTimer('short')}
            ><h5>short break</h5></button>
            <button
                className={`long-btn${currentColor}${activeTimer === 'long' ? ' active' : ''}`}
                onClick={() => toggleTimer('long')}
            ><h5>long break</h5></button>
        </div>
    );
}

export default TimerTabs;