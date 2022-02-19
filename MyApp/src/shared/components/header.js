import React from "react";
class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <header className = 'login_header'>
                {this.props.title}
            </header>
        )
    }
}

export default Header;