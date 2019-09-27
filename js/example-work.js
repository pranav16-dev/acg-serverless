import React from 'react';

class ExampleWork extends React.Component {
    render() {
        return (
            <section className="section section--alignCentered section--description">
            
            { this.props.work.map((example, idx) => {
                return (
                    <ExampleWorkBubble example={example} key={idx} />
                )
                })
            }            
            </section>
      

        )
    }
}


class ExampleWorkBubble extends React.Component {
    render() {
        let example = this.props.example;
        return (
            <section className="section section--alignCentered section--description">
            <div className="section__exampleWrapper">
              <div className="section__example">
                <img alt={ example.image.desc }
                     className="section__exampleImage"
                     src={example.image.src}/>
                {/*}“Bengal cat” by roberto shabs is licensed under CC BY 2.0
                     https://www.flickr.com/photos/37287295@N00/2540855181 */}
                <dl className="color--cloud">
                  <dt className="section__exampleTitle section__text--centered">
                    { example.title}
                  </dt>
                  <dd></dd>
                </dl>
              </div>
            </div>
          </section>
        )
    }
}

export default ExampleWork;
export { ExampleWorkBubble };