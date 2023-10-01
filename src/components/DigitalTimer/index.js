import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timerCount: 25 * 60, // 25 minutes in seconds
      timerRunning: false,
    }
  }

  toggleTimer = () => {
    const {timerRunning} = this.state
    if (timerRunning) {
      this.pauseTimer()
    } else {
      this.startTimer()
    }
    this.setState(prevState => ({
      timerRunning: !prevState.timerRunning,
    }))
  }

  startTimer = () => {
    this.timer = setInterval(this.tick, 1000)
  }

  pauseTimer = () => {
    clearInterval(this.timer)
  }

  tick = () => {
    const {timerCount, timerRunning} = this.state

    if (timerCount === 0) {
      this.pauseTimer()
      this.setState({timerRunning: false})
    } else if (timerRunning) {
      this.setState(prevState => ({
        timerCount: prevState.timerCount - 1,
      }))
    }
  }

  resetTimer = () => {
    this.pauseTimer()
    this.setState({
      timerCount: 25 * 60, // Reset to 25 minutes in seconds
      timerRunning: false,
    })
  }

  onIncrement = () => {
    const {timerRunning, timerCount} = this.state
    if (!timerRunning && timerCount < 60 * 60) {
      // Limit the maximum timer limit to 60 minutes
      this.setState(prevState => ({
        timerCount: prevState.timerCount + 60, // Increment by 60 seconds (1 minute)
      }))
    }
  }

  onDecrement = () => {
    const {timerRunning, timerCount} = this.state
    if (!timerRunning && timerCount > 60) {
      // Limit the minimum timer limit to 1 minute
      this.setState(prevState => ({
        timerCount: prevState.timerCount - 60, // Decrement by 60 seconds (1 minute)
      }))
    }
  }

  render() {
    const {timerCount, timerRunning} = this.state
    const minutes = Math.floor(timerCount / 60)
    const seconds = timerCount % 60

    return (
      <div className="main-bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="bottom-container">
          <div className="bottom-left">
            <h1 className="timer">
              {String(minutes).padStart(2, '0')}:
              {String(seconds).padStart(2, '0')}
            </h1>
            <p>{timerRunning ? 'Running' : 'Paused'}</p>
          </div>
          <div className="bottom-right">
            <div className="bottom-right-top">
              <div className="pause-container">
                <img
                  className="stop-pause"
                  src={
                    timerRunning
                      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                  }
                  alt={timerRunning ? 'pause icon' : 'play icon'}
                  onClick={this.toggleTimer}
                />
                <button
                  type="button"
                  className="pause"
                  onClick={this.toggleTimer}
                >
                  {timerRunning ? 'Pause' : 'Start'}
                </button>
              </div>
              <div className="reset-container">
                <img
                  className="stop-pause"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  onClick={this.resetTimer}
                />
                <button
                  type="button"
                  className="reset"
                  onClick={this.resetTimer}
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="bottom-right-bottom">
              <p className="set-timer">Set Timer Limit</p>
              <div className="bottom-right-bottom-bottom">
                <button
                  type="button"
                  onClick={this.onDecrement}
                  className="decrease"
                  disabled={timerRunning || timerCount <= 60}
                >
                  -
                </button>
                <p className="number">{minutes}</p>
                <button
                  type="button"
                  onClick={this.onIncrement}
                  className="increase"
                  disabled={timerRunning || timerCount >= 60 * 60}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
