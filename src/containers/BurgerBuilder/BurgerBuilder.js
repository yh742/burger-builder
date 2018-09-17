import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Dummy/Dummy';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
      purchasing: false,
      loading: false,
      error: false,
    }

  componentDidMount() {
    this.props.onInitIngredient();
    // axios.get('https://react-my-burger-a7e2c.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ingredients: response.data});
    //   })
    //   .catch(error => {
    //     this.setState({error: true});
    //   });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated){
      this.setState({purchasing: true});
    }
    else{
      this.props.onSetRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    // const queryParams = [];
    // for (let i in this.state.ingredients){
    //   // encode URI for white space special symbols
    //   queryParams.push(encodeURIComponent(i) + '=' +
    //     encodeURIComponent(this.state.ingredients[i]));
    // }
    // queryParams.push('price=' + this.state.totalPrice);
    // const queryString = queryParams.join('&');
    this.props.onInitPurchase();
    this.props.history.push({
      pathname: '/checkout',
      //search: '?' + queryString,
    });
  }

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let burger = this.props.error? <p>Ingredients can't be loaded!</p>: <Spinner />;
    let orderSummary = null;
    if (this.props.ings){
      burger = (<Aux>
        <Burger
          ingredients={this.props.ings} />
        <BuildControls
          price={this.props.price}
          disabled={disabledInfo}
          ingredientAdded={this.props.onIngredientAdded}
          purchasable={this.updatePurchaseState(this.props.ings)}
          ingredientRemoved={this.props.onIngredientRemoved}
          ordered={this.purchaseHandler}
          isAuth={this.props.isAuthenticated} />
        </Aux>);
      orderSummary = <OrderSummary
        price={this.props.price}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        ingredients={this.props.ings} />;
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
        <Modal />
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredient: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
