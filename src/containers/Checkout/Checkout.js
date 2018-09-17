import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    // when routing a component, it will create a new element for mounting
    // when routing using render, it will simply update (the props is the router property)
    render() {
        let summary = <Redirect to='/' />;
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased? <Redirect to='/' />: null;
            summary = (
                <div>
                    {purchasedRedirect}
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
                </div>);
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    };
}

// if not passing state, set the first argument to null
export default connect(mapStateToProps)(Checkout);