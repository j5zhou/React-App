import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {postRequest} from "../../services/database.service";
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

class Login_Form extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            errorPop:false,
        }
        this.emailRef = React.createRef();
    }

    createAccount = ()=>{
        this.props.createAccount();
    }

    handleChange = (event)=>{
        this.setState({
            errorPop:false
        });
        this.setState({[event.target.name]:event.target.value});
    }
    handleLogin = (event)=>{
        event.preventDefault();
        const data = {email:this.state.email,password:this.state.password};
        
        postRequest("/userlogin",data).then((result)=>{
            console.log(result);
            if(result.status === 200){
                window.location.href = "/";
            }else if(result.status === 400){
                this.setState({
                    errorPop:true
                });
            }
        });
        return false;
    }

    render() {
        return (<Form onSubmit={this.handleLogin}>
            <h1 className="form-header">Login</h1>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control ref={this.emailRef} required type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange}/>
            </Form.Group>
            <Overlay target={this.emailRef.current} show={this.state.errorPop} placement="right">
                    {(props) => (
                    <Tooltip id="error-pop" {...props}>
                        User email does not exist or <br/>User email and password doesn't match.
                    </Tooltip>
                    )}
            </Overlay>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" required />
            </Form.Group>
            <Form.Group className="mb-3 btn-group" controlId="formBasicButtons">
            <Button variant="outline-primary" type="submit">Log In</Button>
            <Button variant="outline-secondary" type="button" onClick={this.createAccount}>Create New Account</Button>
            </Form.Group>
        </Form>
        );
    }
}

export default Login_Form;