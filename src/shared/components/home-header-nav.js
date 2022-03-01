import React from "react";
class Home_header_nav extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <nav className="home_header_navigation">
                <ul className="home_header-itemslist">
                    <li className="home_header-item">Recipes</li>
                </ul>
            </nav>
        )
    }
}

export default Home_header_nav;