import React from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


class Searchbar extends React.Component {
    constructor(props) {
        super(props);
        this.state={selectedCuisine:"All",query:""};
    }

    changeSelectedCuisine=(cuisine)=>{
        this.setState({selectedCuisine:cuisine});
    }

    handleSearch=(event)=>{
        if(event.keyCode === 13) { 
            if(this.state.query.length===0){
                alert("Query could not be empty");
                return;
            }
            this.props.changeQuery({query:this.state.query,options:{selectedCuisine:this.state.selectedCuisine}})   
        }
    }
    handleChange = (event)=>{
        this.setState({query:event.target.value});
    }

    render() {
        const search_items = this.props.items?.map((item)=> <Dropdown.Item href="#" className="dropdown-items" onClick={()=>this.changeSelectedCuisine(item)} key={item}>{item}</Dropdown.Item>)
        return (
            <div className="searchbar">
            <InputGroup className="mb-3">
                <FormControl aria-label="Text input with dropdown button" onChange={this.handleChange} onKeyDown={this.handleSearch} value={this.state.query}/>

                <DropdownButton
                    variant="outline-secondary"
                    title={this.state.selectedCuisine}
                    id="selectedCuisine"
                    align="end"
                >
                <Dropdown.Item href="#" className="dropdown-items" onClick={()=>this.changeSelectedCuisine("All")}>All</Dropdown.Item>
                {search_items}
                </DropdownButton>
            </InputGroup>
            </div>
        )
    }
}

export default Searchbar;