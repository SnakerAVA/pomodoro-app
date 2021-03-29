import React, { useState } from 'react';
import './SettingsModal.scss';

function SettingsView({
    isShow,
    toggleFont,
    toggleColor,
    currentColor,
    currentFont,
    toggleSettingsView,
    settings }) {

    const [pomTime, setPomTime] = useState(settings.settingPomodoroTime / 60);
    const [shortTime, setShortTime] = useState(settings.settingShortTime / 60);
    const [longTime, setLongTime] = useState(settings.settingLongTime / 60);

    function onValueChange(source, event) {
        if (source === 'pom') {
            setPomTime(event.target.value);
        }
        else if (source === 'short') {
            setShortTime(event.target.value);
        }
        else {
            setLongTime(event.target.value);
        }
    }

    function onSubmit() {
        if (pomTime < 0 || shortTime < 0 || longTime < 0) {
            alert("You can not set time less than zero!");
            return;
        }
        settings.setSettingPomodoroTime(pomTime * 60);
        settings.setSettingShortTime(shortTime * 60);
        settings.setSettingLongTime(longTime * 60);
        toggleSettingsView();
    }

    function onArrowClick(trigger) {
        switch (trigger) {
            case 'pom-up':
                setPomTime(pomTime + 1);
                break;
            case 'pom-down':
                setPomTime(pomTime - 1);
                break;
            case 'short-up':
                setShortTime(shortTime + 1);
                break;
            case 'short-down':
                setShortTime(shortTime - 1);
                break;
            case 'long-up':
                setLongTime(longTime + 1);
                break;
            case 'long-down':
                setLongTime(longTime - 1);
                break;
            default:
                break;
        }
    }


    const show = isShow ? '' : ' hidden';

    return (
        <div className={`form-wrapper${show}`}>
            <div className='form-header'>
                <span className='title'><h2>Settings</h2></span>
                <button className='close-btn' onClick={toggleSettingsView}></button>
            </div>
            <div className='time-set'>
                <span className='time-title'><h4>TIME(MINUTES)</h4></span>
                <div className='inputs'>
                    <div className='input-block'>
                        <label htmlFor="pomodoro"><h6>pomodoro</h6></label>
                        <div className='number-wrapper'>
                            <input
                                type="number"
                                className='pomodoro-input'
                                id='pomodoro'
                                onChange={(event) => onValueChange('pom', event)}
                                value={pomTime} />
                            <div
                                className="number-wrapper-arrow up"
                                onClick={() => onArrowClick('pom-up')}></div>
                            <div
                                className="number-wrapper-arrow down"
                                onClick={() => onArrowClick('pom-down')}></div>
                        </div>
                    </div>
                    <div className='input-block'>
                        <label htmlFor="short"><h6>short break</h6></label>
                        <div className='number-wrapper'>
                            <input
                                type="number"
                                className='short-input'
                                id='short'
                                onChange={(event) => onValueChange('short', event)}
                                value={shortTime} />
                            <div
                                className="number-wrapper-arrow up"
                                onClick={() => onArrowClick('short-up')}></div>
                            <div
                                className="number-wrapper-arrow down"
                                onClick={() => onArrowClick('short-down')}></div>
                        </div>
                    </div>
                    <div className='input-block'>
                        <label htmlFor="long"><h6>long break</h6></label>
                        <div className='number-wrapper'>
                            <input
                                type="number"
                                className='long-input'
                                id='long'
                                onChange={(event) => onValueChange('long', event)}
                                value={longTime} />
                            <div
                                className="number-wrapper-arrow up"
                                onClick={() => onArrowClick('long-up')}></div>
                            <div
                                className="number-wrapper-arrow down"
                                onClick={() => onArrowClick('long-down')}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='font-set'>
                <div className='font-wrapper'>
                    <span className='font-title'><h4>FONT</h4></span>
                    <div className='font-block'>
                        <button
                            className={`font-btn1${currentFont === ' font-sans' ? ' active' : ''}`}
                            onClick={() => toggleFont(' font-sans')}>
                            <div className='hover-div'></div><h4>Aa</h4></button>
                        <button
                            className={`font-btn2${currentFont === ' font-slab' ? ' active' : ''}`}
                            onClick={() => toggleFont(' font-slab')}>
                            <div className='hover-div'></div><h4>Aa</h4></button>
                        <button
                            className={`font-btn3${currentFont === ' font-mono' ? ' active' : ''}`}
                            onClick={() => toggleFont(' font-mono')}>
                            <div className='hover-div'></div><h4>Aa</h4></button>
                    </div>
                </div>
            </div>
            <div className='color-set'>
                <div className='color-wrapper'>
                    <span className='color-title'><h4>COLOR</h4></span>
                    <div className='color-block'>
                        <button
                            className={`color-btn1${currentColor === ' peach' ? ' active' : ''}`}
                            onClick={() => toggleColor(' peach')}>
                            <div className='hover-div'></div></button>
                        <button
                            className={`color-btn2${currentColor === ' cyan' ? ' active' : ''}`}
                            onClick={() => toggleColor(' cyan')}>
                            <div className='hover-div'></div></button>
                        <button
                            className={`color-btn3${currentColor === ' purple' ? ' active' : ''}`}
                            onClick={() => toggleColor(' purple')}>
                            <div className='hover-div'></div></button>
                    </div>
                </div>
            </div>
            <button className={`apply-btn${currentColor}`} onClick={onSubmit}>Apply</button>
        </div>
    );
}


export default SettingsView;