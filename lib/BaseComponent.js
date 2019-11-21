import React from 'react';
import AppContext from './AppContext';

class BaseComponent extends React.Component {}
BaseComponent.contextType = AppContext;

export default BaseComponent;
