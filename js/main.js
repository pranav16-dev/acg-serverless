import React from 'react'
import ReactDom from 'react-dom'
import ExampleWork from './example-work'


const  myWork = [
    {
        'title': "Work Example",
        'href': "www.google.com",
        'desc': "lorem imsum blah blah blah",
        'image': {
            'desc': "example screenshot of a project involving code",
            'src': "images/example1.png",
            'comment': ""
        }
        
    },  
    {
        'title': "Portfolio Boilerplate",
        'href': "www.google.com",
        'desc': "lorem imsum blah blah blah",
        'image': {
            'desc': "example screenshot of a project involving code2",
            'src': "images/example2.png",
            'comment': ""
        }
        
    },  
    {
        'title': "Blahhhhh",
        'href': "www.google.com",
        'desc': "lorem imsum blah blah blah",
        'image': {
            'desc': "example screenshot of a project involving code3",
            'src': "images/example3.png",
            'comment': ` {/*-- “Chemistry” by Surian Soosay is licensed under CC BY 2.0
            https://www.flickr.com/photos/ssoosay/4097410999 -->*/}`
        }
        
    }
]
ReactDom.render(<ExampleWork  work={myWork}/>, document.getElementById('example-work'))