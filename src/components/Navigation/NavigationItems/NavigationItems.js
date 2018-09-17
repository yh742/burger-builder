import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
    <NavigationItem exact link='/'>Burger Builder</NavigationItem>
    {props.isAuthenticated
      ?<NavigationItem exact link='/orders'>Orders</NavigationItem>
      :null
    }
    {props.isAuthenticated 
      ?<NavigationItem exact link='/logout'>Logout</NavigationItem>
      :<NavigationItem exact link='/auth'>Authenticate</NavigationItem>
    }
  </ul>
  );
};

export default navigationItems;
