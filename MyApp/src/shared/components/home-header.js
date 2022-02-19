import React from "react";
import Home_header_nav from "./home-header-nav";
import Home_header_subnav from "./home-header-subnav";
import Searchbar from "./searchbar";

class Home_header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            subitems:['French Cuisine','Mexican Cuisine','Japanese Cuisine','Chinese Cuisine','Thai Cuisine']
        }
    }
    render(){
        return(
            <header className = 'home_header'>
                <Home_header_nav />
                <Home_header_subnav items={this.state.subitems}/>
                <Searchbar items={this.state.subitems}/>
            </header>
        )
    }
}

export default Home_header;