import React from "react";
import ReactDOM from 'react-dom';
import Header from "../shared/components/header";
import Footer from "../shared/components/footer";
import Login_Form from "./components/login-form";
import Signup_Form from "./components/signup-form";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            form_type:0,
        }
    }
    createAccount = ()=>{
        this.setState({form_type:1});
    }
    backToLogin = ()=>{
        this.setState({form_type:0});
    }

    render(){
        const form_selection = this.state.form_type ? <Signup_Form backToLogin={this.backToLogin}/> :<Login_Form createAccount={this.createAccount}/>
        return(
            <>
            <Header />
            <main>
                <section className="center-container">
                    <section className="Login-container">
                        {form_selection}
                    </section>
                </section>
            </main>
            <Footer />
            </>
        )
    }
}

ReactDOM.render(<Login/>,document.getElementById("root"));