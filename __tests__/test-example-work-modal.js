import React from 'react';
import { shallow } from 'enzyme';
import ExampleWorkModal from '../js/example-work-modal';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter() });

const myExample ={
    
        'title': "Work Example",
        'href': "https://www.google.com",
        'desc': "lorem imsum blah blah blah",
        'image': {
            'desc': "example screenshot of a project involving code",
            'src': "images/example1.png",
            'comment': ""
        }
        
    
};

describe("Example work modal", () => {
    let component = shallow(<ExampleWorkModal example={myExample}
        open={false}/>);
    
    let opencomponent = shallow(<ExampleWorkModal example={myExample}
        open={true}/>);

    let anchors = component.find("a");

    it("Should contain a single 'A' element",() => {
        expect(anchors.length).toEqual(1);
    });

    it("should link to our project",() => {
        expect(anchors.prop('href')).toEqual(myExample.href);
    });

    it("should have the modal class set correctly",() => {
        expect(component.find('.background--skyBlue').hasClass("modal--closed")).toBe(true);
        expect(opencomponent.find('.background--skyBlue').hasClass("modal--open")).toBe(true);

    });

});
