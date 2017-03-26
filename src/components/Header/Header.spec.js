import {Header} from './Header';
import React from 'react';
import * as TestUtils from 'react-addons-test-utils';


describe('Given an instance of the Header', () => {
    let headerConfig;

    beforeEach(()=>{
        headerConfig = [
            {
                title: "Login",
                destination: "/login"
            },
            {
                title: "Home",
                destination: "/home"
            },
            {
                title: "Account",
                destination: "/account"
            }
        ];
    });

    it ('The header should contains the link to login page', ()=>{
        const header = TestUtils.renderIntoDocument(<Header config={headerConfig}/>);
        const anchors = TestUtils.scryRenderedDOMComponentsWithTag(
            header, 'a'
        );

        // let href = anchors[0].findDOMNode().getAttribute('href');
        // expect(href).to.equal("/login");

        console.log(anchors[0].hasAttribute('href'));

        expect(anchors.length).to.equal(3);
    });

    it ('The header should contains the link to home page', ()=>{

    });

    it ('The header should contains the link to account page', ()=>{

    });

    it ('Login navigation link should navigate to /login', ()=>{

        // TestUtils.Simulate.click(a);
    });

    it ('Home navigation link should navigate to /home', ()=>{

    });

    it ('Account navigation link should navigate to /account', ()=>{

    });
});
