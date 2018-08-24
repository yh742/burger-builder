import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Dummy/Dummy';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        };
        
        // setup the interceptors before child tries to render
        componentWillMount() {
            // must set state to null before requesting
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            // must set state to error after response is back
            this.resInterceptor = axios.interceptors.response.use(res => res, 
            error=> {
                this.setState({error: error});
                return; 
            });
        }

        componentWillUnmount() {
            console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        // set error to null so the modal doesn't show up when clearing
        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Aux>
                    <Modal 
                        modalClosed={this.errorConfirmedHandler}
                        show={this.state.error}>
                        {this.state.error? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.state.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;
