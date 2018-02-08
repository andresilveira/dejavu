import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import { sendToCloseIO } from '../helper/closeconnection';

const SendToCloseIOButton = (props) => (
  <Button
    bsStyle='primary'
    onClick={() => {
      props
        .sendToCloseIO(props.queryEntry)
        .then(alert('Leads updated.'))
    }}
    disabled={!props.queryEntry}
    >
    <i className="fa fa-send"></i>&nbsp; Send to CloseIO
  </Button>
)

SendToCloseIOButton.defaultProps = { sendToCloseIO };

SendToCloseIOButton.propTypes = {
	sendToCloseIO: PropTypes.func.isRequired,
  queryEntry: PropTypes.object
};

export default SendToCloseIOButton;
