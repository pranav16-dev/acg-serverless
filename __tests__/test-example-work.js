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
    it("Should be a 'span' element", () => {
        expect(component.type()).toEqual('span');

    });

    it("should contains as many children as there are work examples", () => {
        expect(component.find("ExampleWorkBubble").length).toEqual(myWork.length);
    });

    it("should allow modal to open and close", () => {
        component.instance().openModal();
        expect(component.instance().state.modalOpen).toBe(true);

        component.instance().closeModal();
        expect(component.instance().state.modalOpen).toBe(false );
    });
});


describe("ExampleWorkBubble Component", () => {
    let mockOpenModalFn = jest.fn();


    let component = shallow(<ExampleWorkBubble example={myWork[1]}
    openModal={mockOpenModalFn}/>);
    let images = component.find("img");
    it("should contain a single image element", () => {
        expect(images.length).toEqual(1);
    });

    it("should have the image src set correctly", () => {
        expect(images.prop('src')).toEqual(myWork[1].image.src);
    });


    it("should call open modal handler when clicked", () => {
        component.find(".section__exampleWrapper").simulate('click');
        expect(mockOpenModalFn).toHaveBeenCalled();
    });
});