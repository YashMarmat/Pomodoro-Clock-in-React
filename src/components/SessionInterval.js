import React from "react";

function SessionInterval(props) {
  function decreaseSession() {
    if (props.sessionLength === 1) {
      return; // return nothing
    }
    props.decreaseSession();
  }

  function increaseSession() {
    if (props.sessionLength === 60) {
      return; // return nothing
    }
    props.increaseSession();
  }

  return (
    <section>
      <h4>Session Length</h4>
      <section className="interval-container">
        {/* Down Arrow Button Condition for Session Length */}
        {props.isPlay ? (
          <span>
            <i className="button fas fa-arrow-circle-down" />
          </span>
        ) : (
          <span onClick={decreaseSession}>
            <i className="button fas fa-arrow-circle-down" />
          </span>
        )}

        <p className="interval-length">{props.sessionLength}</p>

        {/* Up Arrow Button Condition for Session Length */}

        {props.isPlay ? (
          <span>
            <i className="button fas fa-arrow-circle-up" />
          </span>
        ) : (
          <span onClick={increaseSession}>
            <i className="button fas fa-arrow-circle-up" />
          </span>
        )}
      </section>
    </section>
  );
}

export default SessionInterval;
