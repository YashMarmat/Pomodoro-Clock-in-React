import React from "react";

function BreakInterval(props) {
  function decreaseCounter() {
    if (props.breakLength === 1) {
      return; // return nothing
    }
    props.decreaseBreak(); // if not 1 then keep running this function (keeps decreasing the value on clicking)
  }

  function increaseCounter() {
    if (props.breakLength === 60) {
      return; // return nothing
    }
    props.increaseBreak(); // if not 60 then keep running this function (keeps incrementing the value on clicking)
  }

  return (
    <section>
      <h4>Break Length</h4>
      <section className="interval-container">
        {/* Down Arrow Button Condition for Break Length */}
        {props.isPlay ? (
          <span>
            <i className="button fas fa-arrow-circle-down" />
          </span>
        ) : (
          <span onClick={decreaseCounter}>
            <i className="button fas fa-arrow-circle-down" />
          </span>
        )}

        <p className="interval-length">{props.breakLength}</p>

        {/* Up Arrow Button Condition for Break Length */}
        {props.isPlay ? (
          <span>
            <i className="button fas fa-arrow-circle-up" />
          </span>
        ) : (
          <span onClick={increaseCounter}>
            <i className="button fas fa-arrow-circle-up" />
          </span>
        )}
      </section>
    </section>
  );
}

export default BreakInterval;
