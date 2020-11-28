import React from "react";
import "../styles.css";
import BreakInterval from "./BreakInterval";
import SessionInterval from "./SessionInterval";
import Timer from "./Timer";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerMinute: 25,
      isPlay: false // to stop break length and session length buttons while session clock is running
    };
    this.onIncreaseBreakLength = this.onIncreaseBreakLength.bind(this);
    this.onDecreaseBreakLength = this.onDecreaseBreakLength.bind(this);
    this.onIncreaseSessionLength = this.onIncreaseSessionLength.bind(this);
    this.onDecreaseSessionLength = this.onDecreaseSessionLength.bind(this);
    this.onUpdateTimerMinute = this.onUpdateTimerMinute.bind(this);
    this.onToggleInterval = this.onToggleInterval.bind(this);
    this.onResetTimer = this.onResetTimer.bind(this);
    this.onPlayStopTimer = this.onPlayStopTimer.bind(this);
  }

  onIncreaseBreakLength() {
    this.setState(prevState => ({
      breakLength: prevState.breakLength + 1
    }));
  }

  onDecreaseBreakLength() {
    this.setState(prevState => ({
      breakLength: prevState.breakLength - 1
    }));
  }

  onIncreaseSessionLength() {
    this.setState(prevState => ({
      sessionLength: prevState.sessionLength + 1,
      timerMinute: prevState.sessionLength + 1
    }));
  }

  onDecreaseSessionLength() {
    this.setState(prevState => ({
      sessionLength: prevState.sessionLength - 1,
      timerMinute: prevState.sessionLength - 1
    }));
  }

  // working on main timer (session clock) and then we will pass this
  // function to the Timer Component
  onUpdateTimerMinute() {
    this.setState(prevState => ({
      timerMinute: prevState.timerMinute - 1
    }));
  }

  // working on isSession property from Timer Component, then
  // we will pass this function to the Timer Component.
  onToggleInterval(isSession) {
    if (isSession) {
      this.setState({
        timerMinute: this.state.sessionLength
      });
    } else {
      this.setState({
        timerMinute: this.state.breakLength
      });
    }
  }

  // reset everthing
  onResetTimer() {
    this.setState({
      timerMinute: 25,
      sessionLength: 25,
      breakLength: 5
    });
  }

  // handle up, down buttons of session and break length
  onPlayStopTimer(isPlay) {
    this.setState({
      isPlay: isPlay
    });
  }

  render() {
    return (
      <main>
        <h2>25 + 5 Clock</h2>

        <section className="interval-length-container">
          <BreakInterval
            breakLength={this.state.breakLength}
            increaseBreak={this.onIncreaseBreakLength}
            decreaseBreak={this.onDecreaseBreakLength}
            isPlay={this.state.isPlay}
          />
          <SessionInterval
            sessionLength={this.state.sessionLength}
            increaseSession={this.onIncreaseSessionLength}
            decreaseSession={this.onDecreaseSessionLength}
            isPlay={this.state.isPlay}
          />
        </section>
        <Timer
          timerMinute={this.state.timerMinute}
          breakLength={this.state.breakLength}
          updateTimerMinute={this.onUpdateTimerMinute}
          toggleInterval={this.onToggleInterval}
          resetTimer={this.onResetTimer}
          playStopTimer={this.onPlayStopTimer}
          isPlay={this.state.isPlay}
        />
      </main>
    );
  }
}

export default App;
