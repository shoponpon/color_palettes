import React, { Component } from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default class TweetView extends Component {
  render() {
    return (
      <div className="tweet-form-wrap">
      <form>
        <FormControl componentClass="textarea" style={{height: 100 }} placeholder="変換した画像付きでツイート"/>
      </form>
      <div className="submitButton">
        Twitterに投稿（画像付き）
      </div>
      </div>
    );
  }
}