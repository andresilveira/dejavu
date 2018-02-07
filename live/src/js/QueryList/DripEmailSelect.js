import React from 'react';
import PropTypes from 'prop-types';

class DripEmailSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    }
  }

  componentWillMount() {
    this.getOptionsForDripEmail(this.props.field)
    .then(options => this.setState({ options }));
  }

  getOptionsForDripEmail(field) {
    return fetch(`http://localhost:3000/dripemail/choices/?field=${field}`)
    .then(resp => resp.json());
  }

  render() {
    const { field, ...selectProps } = this.props;
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

DripEmailSelect.propTypes = {
	field: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DripEmailSelect;
