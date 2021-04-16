import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => { //Starting withErrorHandler with lower-cased letter means that it's not JSX
    return class extends Component {
        state = {
            error: null
        }
        
        componentDidMount(){
            axios.interceptors.request.use(req =>{
                this.setState({error: null});
                return req;
            })
            axios.interceptors.response.use(null, error =>{
                this.setState({
                    error: error
                });
            });
        }
        errorConfirmedHandler = () => {
            this.setState({
                error: null
            })
        }
        render(){
            return(
                <Aux>
                <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
            <WrappedComponent {...this.props} />
            </Aux>
            );
        }
    }
}

export default withErrorHandler; //Use to throw an error if information is not properly added to database (i.e. incorrect url, incorrect posting)
//Global error handling is used to throw an error if ANY information cannot be uploaded to database