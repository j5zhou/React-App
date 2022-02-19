import React from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


class Searchbar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const search_items = this.props.items?.map((item)=> <Dropdown.Item href="#" key={item}>{item}</Dropdown.Item>)
        return (
            <div className="searchbar">
            <InputGroup className="mb-3">
                <FormControl aria-label="Text input with dropdown button" />

                <DropdownButton
                    variant="outline-secondary"
                    title="Dropdown"
                    id="input-group-dropdown-2"
                    align="end"
                >
                {search_items}
                </DropdownButton>
            </InputGroup>
            </div>
        )
    }
}

export default Searchbar;