import React, { Component } from 'react';

import Aux from '../../hoc/Dummy';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
  render() {
    return (
      <Aux>
        <Burger />
        <div>Build Tools</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
