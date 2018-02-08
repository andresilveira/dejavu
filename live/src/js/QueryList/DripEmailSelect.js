import React from 'react';
import PropTypes from 'prop-types';
import { getOptionsForDripEmail } from '../helper/closeconnection';

class DripEmailSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { options: [] };
  }

  componentWillMount() {
    this.props.getOptionsForDripEmail(this.props.field)
      .then(options => this.setState({ options }));
  }

  render() {
    const { field, getOptionsForDripEmail, ...selectProps } = this.props;
    return (
      <select {...selectProps} ref={(s) => { this.select = s }}>
        <option value="">Please select...</option>
        {this.state.options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    );
  }
}

DripEmailSelect.defaultProps = {
  getOptionsForDripEmail: getOptionsForDripEmail
};

DripEmailSelect.propTypes = {
	field: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  getOptionsForDripEmail: PropTypes.func.isRequired
};

export default DripEmailSelect;
