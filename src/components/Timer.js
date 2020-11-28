import React from "react";

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSession: true,
      timerSecond: 0,
      intervalId: 0,
      sound:
        "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    };
    this.playTimer = this.playTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  // Play function: will run the session clock (will decrement the value)
  playTimer() {
    let intervalId = setInterval(this.decreaseTimer, 1000); // will run decreaseTimer function in every 1000 milliseconds (1 second)
    this.props.playStopTimer(true);

    this.setState({
      intervalId: intervalId
    });
  }

  // working with play function
  decreaseTimer() {
    switch (this.state.timerSecond) {
      case 0:
        if (this.props.timerMinute === 0) {
          if (this.state.isSession) {
            this.setState({
              isSession: false
            });

            this.props.toggleInterval(this.state.isSession);
          } else {
            this.setState({
              isSession: true
            });

            this.props.toggleInterval(this.state.isSession);
          }
        } else {
          this.props.updateTimerMinute();
          this.setState({
            timerSecond: 59
          });
        }
        break;

      default:
        this.setState((prevState) => ({
          timerSecond: prevState.timerSecond - 1
        }));
        break;
    }
  }

  // stop session clock
  stopTimer() {
    clearInterval(this.state.intervalId);
    this.props.playStopTimer(false);
  }

  // reset digits after 25 minutes (will reset to two zeros)
  // and also the first part back to 25 (function from App Component)
  resetTimer() {
    this.stopTimer();
    this.props.resetTimer();
    this.props.playStopTimer(false);
    this.setState({
      timerSecond: 0,
      isSession: true
    });
  }

  //
  playAudio(data) {
    let audio = new Audio(data);
    audio.play();
  }

  render() {
    const colorCondition = (
      <span className="timer-color">{this.props.timerMinute}</span>
    );

    // Alarm conditions
    if (this.state.timerSecond === 1) {
      if (this.props.timerMinute === 0) {
        this.playAudio(this.state.sound);
      }
    }

    return (
      <section>
        <audio className="audio-element">
          <source src={this.state.sound} />
        </audio>
        <section className="timer-container">
          <h4>{this.state.isSession ? "Session" : "Break"}</h4>
          <span className="timer">
            {this.props.timerMinute === 0
              ? colorCondition
              : this.props.timerMinute}
          </span>

          {/* clock colon */}
          <span className="timer">
            {this.props.timerMinute === 0 ? (
              <span className="timer-color">:</span>
            ) : (
              ":"
            )}
          </span>

          <span className="timer">
            {this.state.timerSecond === 0 ? (
              this.props.timerMinute === 0 ? (
                <span className="timer-color">0{this.state.timerSecond}</span>
              ) : (
                "00"
              )
            ) : this.state.timerSecond < 10 ? (
              this.props.timerMinute === 0 ? (
                <span className="timer-color">0{this.state.timerSecond}</span>
              ) : (
                "0" + this.state.timerSecond
              )
            ) : (
              <span>
                {this.props.timerMinute === 0 ? (
                  <span className="timer-color">{this.state.timerSecond}</span>
                ) : (
                  this.state.timerSecond
                )}
              </span>
            )}
          </span>
        </section>
        <section className="timer-actions">
          {/* Play and Stop button conditions */}
          {this.props.isPlay ? (
            <span onClick={this.stopTimer}>
              <i className="button far fa-stop-circle fa-3x" />
            </span>
          ) : (
            <span onClick={this.playTimer}>
              <i className="button far fa-play-circle fa-3x" />
            </span>
          )}

          <span onClick={this.resetTimer}>
            <i className="button fas fa-sync reset-button" />
          </span>
        </section>
      </section>
    );
  }
}

export default Timer;
