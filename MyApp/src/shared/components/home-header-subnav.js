import React from "react";
class Home_header_subnav extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const subitems = this.props.items?.map((item)=> <li key={item} className="home_header-subitem">{item}</li>)
        return(
            <nav className="home_header_subnavigation">
                <ul className="home_header-subitemslist">
                    {subitems}
                </ul>
            </nav>
        )
    }
}

export default Home_header_subnav;