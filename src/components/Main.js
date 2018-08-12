import React from 'react';
import '../assets/styles/main.scss';
import Navigation from './layout/navbar.jsx';
import Footer from './layout/footer.jsx';

export default class App extends React.Component {    

    render() {

        return (
            <div>
                <Navigation></Navigation>
                <Footer></Footer>
            </div>
        );
    }
}