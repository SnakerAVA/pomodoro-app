import React, { useState, useEffect } from 'react';
import './App.scss';
import Timer from '../Timer/Timer';
import TimerTabs from '../TimerTabs/TimerTabs';
import SettingsView from '../SettingsModal/SettingsModal';


function App() {
    const [settingPomodoroTime, setSettingPomodoroTime] = useState(25 * 60);
    const [settingShortTime, setSettingShortTime] = useState(5 * 60);
    const [settingLongTime, setSettingLongTime] = useState(10 * 60);
    const [isTimerGo, setIsTimerGo] = useState(false);
    const [activeTimer, setActiveTimer] = useState('pomodoro');
    const [currentTime, setCurrentTime] = useState(settingPomodoroTime);
    const [currentRemainingTime, setCurrentRemainingTime] = useState(currentTime);
    const [timerInterval, setTimerInterval] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [font, setFont] = useState(' font-sans');
    const [color, setColor] = useState(' peach');
    const [cycle, setCycle] = useState(1);

    function onTimerToggle() {
        setIsTimerGo(!isTimerGo);
        if (isTimerGo) clearInterval(timerInterval);
        else {
            setCurrentRemainingTime(currentTime);
            setCycle(1);
            startTimer();
        }
    }

    useEffect(() => {
        if (activeTimer === 'pomodoro') {
            setCurrentTime(settingPomodoroTime);
            setCurrentRemainingTime(settingPomodoroTime);
        }
        else if (activeTimer === 'short') {
            setCurrentTime(settingShortTime);
            setCurrentRemainingTime(settingShortTime);
        }
        else {
            setCurrentTime(settingLongTime);
            setCurrentRemainingTime(settingLongTime);
        }
    }, [settingPomodoroTime, settingShortTime, settingLongTime]);

    function toggleTimer(timer) {
        setActiveTimer(timer);
        switch (timer) {
            case 'pomodoro':
                setCurrentTime(settingPomodoroTime);
                setCurrentRemainingTime(settingPomodoroTime);
                break;
            case 'short':
                setCurrentTime(settingShortTime);
                setCurrentRemainingTime(settingShortTime);
                break;
            case 'long':
                setCurrentTime(settingLongTime);
                setCurrentRemainingTime(settingLongTime);
                break;
            default:
                break;
        }
    }

    function toggleSettingsView() {
        setShowSettings(oldValue => !oldValue);
    }

    function toggleFont(newFont) {
        setFont(newFont);
    }

    function toggleColor(newColor) {
        setColor(newColor);
    }


    function startTimer() {
        setTimerInterval(setInterval(() => {
            setCurrentRemainingTime(oldValue => oldValue - 1);
        }, 1000));
    }


    useEffect(() => {
        if (currentRemainingTime <= -1) {
            if (activeTimer === 'pomodoro') {
                if (cycle === 4) {
                    toggleTimer('long');
                }
                else {
                    toggleTimer('short');
                    setCycle(oldValue => oldValue + 1);
                }
            }
            else if (activeTimer === 'short') {
                toggleTimer('pomodoro');
            }
            else if (activeTimer === 'long') {
                toggleTimer('pomodoro');
                setCycle(1);
                onTimerToggle();
                setCurrentRemainingTime(0);
            }
        }
    }, [currentRemainingTime]);



    const modal = showSettings ? <div className='modal'></div> : null;



    return (
        <div className={`app${font}`}>
            <TimerTabs
                currentColor={color}
                toggleTimer={toggleTimer}
                activeTimer={activeTimer} />
            <Timer
                time={currentTime}
                remainingTime={currentRemainingTime}
                onTimerToggle={onTimerToggle}
                isTimerGo={isTimerGo}
                currentColor={color} />
            <button className='settings-btn' onClick={toggleSettingsView}></button>
            <SettingsView
                isShow={showSettings}
                toggleFont={toggleFont}
                toggleColor={toggleColor}
                toggleSettingsView={toggleSettingsView}
                currentColor={color}
                currentFont={font}
                settings={{
                    settingPomodoroTime,
                    setSettingPomodoroTime,
                    settingShortTime,
                    setSettingShortTime,
                    settingLongTime,
                    setSettingLongTime
                }} />
            {modal}
        </div>
    );
}

export default App;
