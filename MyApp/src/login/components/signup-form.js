import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {postRequest} from "../../services/database.service";
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

class Signup_Form extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            errorPop:false,
        }
        this.emailRef = React.createRef();
    }

    backToLogin = ()=>{
        this.props.backToLogin();
    }
    handleChange = (event)=>{
        this.setState({
            errorPop:false
        });
        this.setState({[event.target.name]:event.target.value});
    }
    handleSignup = (event) =>{
        event.preventDefault();
        const data = {email:this.state.email,password:this.state.password}
        postRequest("/signup",data).then((result)=>{
            if(result.status === 201){
                window.location.href = "/";
            }else if(result.status === 400){
                this.setState({
                    errorPop:true
                });
            }
        });
    }

    render() {
        return (<Form onSubmit={this.handleSignup}>
            <h1 className="form-header">Sign Up</h1>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control ref={this.emailRef} required type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange}/>
            </Form.Group>
            <Overlay target={this.emailRef.current} show={this.state.errorPop} placement="right">
                    {(props) => (
                    <Tooltip id="error-pop" {...props}>
                        User email has already exist.
                    </Tooltip>
                    )}
            </Overlay>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Form.Group className="mb-3 btn-group" controlId="formBasicButtons">
            <Button variant="outline-primary" type="submit">Sign Up</Button>
            <Button variant="outline-secondary" type="button" onClick={this.backToLogin}>Return to Log In</Button>
            </Form.Group>
        </Form>
        );
    }
}

export default Signup_Form;