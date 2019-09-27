import React from 'react';
import { shallow } from 'enzyme';
import ExampleWork, { ExampleWorkBubble } from '../js/example-work';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter() });

const  myWork = [
    {
        'title': "Work Example",
        'image': {
            'desc': "example screenshot of a project involving code",
            'src': "images/example1.png",
            'comment': ""
        }
        
    },  
    {
        'title': "Portfolio Boilerplate",
        'image': {
            'desc': "example screenshot of a project involving code2",
            'src': "images/example2.png",
            'comment': ""
        }
        
    }
];

describe("Example work component", () => {
    let component = shallow(<ExampleWork work={myWork}/>);
    it("Should be a 'section' element", () => {
        expect(component.type()).toEqual('section');

    });

    it("should contains as many children as there are work examples", () => {
        expect(component.find("ExampleWorkBubble").length).toEqual(myWork.length);
    })

});


describe("ExampleWorkBubble Component", () => {
    let component = shallow(<ExampleWorkBubble example={myWork[1]}/>);
    let images = component.find("img");

    it("should contain a single image element", () => {
        expect(images.length).toEqual(1);
    });

    it("should have the image src set correctly", () => {
        expect(images.prop('src')).toEqual(myWork[1].image.src);
        expect(5).toEqual(6);
    });
});