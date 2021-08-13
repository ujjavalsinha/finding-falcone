import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends Component {
  state = {
    error: '',
    errorInfo: '',
    hasError: false,
  };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.log({ error, errorInfo });
    this.setState({ errorInfo });
  }
  render() {
    const { hasError, errorInfo } = this.state;
    if (hasError) {
    return (
        <div className="ErrorBoundary">
            <p className='error-message'>Some Error Occurred</p>
        </div>
    );
    }
    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]).isRequired,
};
