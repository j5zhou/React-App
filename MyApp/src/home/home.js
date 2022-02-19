import React from 'react';
import ReactDOM from 'react-dom';
import Home_footer from '../shared/components/home-footer';
import Home_header from '../shared/components/home-header';
import Recipes from './components/recipies';

class Home extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <>
            <Home_header/>
            <main>
                <Recipes />
            </main>
            <Home_footer/>
            </>
        )
    }
}

ReactDOM.render(
    <Home />,
    document.getElementById('root')
);