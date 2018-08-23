import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css'

// css module mangles class names so activeClassName needs to pass css module class

const navigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink 
      exact={props.exact}
      to={props.link}
      activeClassName={classes.active}>{props.children}</NavLink>
    </li>
  );
}


export default navigationItem;
