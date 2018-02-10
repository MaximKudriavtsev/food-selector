import React from 'react';
import ReactDOM from 'react-dom';
import FormContainer from './components/FormContainer';

const wrapper = document.getElementById('root');

wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;
