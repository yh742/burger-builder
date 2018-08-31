import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     totalPrice: 0,
    // }

    // will always mount unless it is a nested route
    // change to component will mount before rendering since we have data already
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         // ['salad', '1']
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = Number(param[1]);
    //         }
    //     }
    //     this.setState({
    //         ingredients: ingredients,
    //         totalPrice: price,
    //     });
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    // when routing a component, it will create a new element for mounting
    // when routing using render, it will simply update (the props is the router property)
    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings} 
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) =>
                        <ContactData 
                            {...props}
                            ingredients={this.props.ings} 
                            price={this.props.price} />} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
    };
}

// if not passing state, set the first argument to null
export default connect(mapStateToProps)(Checkout);