import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null,
        }

        componentDidMount() {
            // dynamically loads import functions and assign it 
            // only loads the javascript that is needed 
            importComponent()
                .then(cmp => {
                    this.setState({component: cmp.default});
                });
        }

        render() {
            const C =  this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
}

export default asyncComponent;