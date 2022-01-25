import React, { Component, Fragment } from "react";
import QRScan from "qrscan";
import Speech from "react-speech";

export class QRScaner extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", watching: false };
    this.onFind = this.onFind.bind(this);
  }

  onFind(value) {
    this.setState({ value, watching: false });
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en";
    speech.text = this.state.value;
    speech.rate = 1;
    speech.volume = 1;
    speech.pitch = 1;
    let voices = window.speechSynthesis.getVoices();

    // Initially set the First Voice in the Array.
    speech.voice = voices[0];
    window.speechSynthesis.speak(speech);

    /// STOP ON COMPLETE
    speech.onend = () => {
      window.speechSynthesis.pause();
      this.setState({ value: "", watching: false });
    };
  }

  render() {
    return (
      <Fragment>
        <h1>QRScan Demo</h1>
        {this.state.watching ? (
          <QRScan onFind={this.onFind} />
        ) : (
          <Fragment>
            <button onClick={() => this.setState({ watching: true })}>
              Scan
            </button>
            {this.state.value && (
              <>
                {/* <h4>value: {this.state.value}</h4> */}
                <Speech
                  textAsButton={true}
                  displayText={this.state.value}
                  text={this.state.value}
                />
              </>
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }
}
