import React, { Component } from 'react'
import Cytoscape from 'cytoscape';

import CytoscapeComponent from 'react-cytoscapejs'
import coseBilkent from 'cytoscape-cose-bilkent';


Cytoscape.use(coseBilkent);

const layout = { name: 'cose-bilkent' };

export default class CyGraph extends Component {
  
  state = {
    w: 0,
    h: 0,
    elements: this.props.elements
  }

  componentDidMount = () => {
    this.setUpListeners()
  }
  setUpListeners = () => {
    // this.cy.on('click', 'node', function(e) {
    //     var sel = e.target;
    //     sel.addClass('highlighted')
    //         .outgoers()
    //         .union(sel.incomers())
    //         .absoluteComplement()
    //         .addClass('semitransparent').select();
    //     e.cy.endBatch()
    // });
    // this.cy.on('mouseout', 'node', function(e) {
    //     var sel = e.target;
    //     sel.removeClass('highlighted')
    //         .outgoers()
    //         .union(sel.incomers())
    //         .absoluteComplement()
    //         .removeClass('semitransparent');
    //     e.cy.endBatch()
    // });
  }
  
  render() {
    return(
      <div style={{borderRadius: '10px', border: '1px solid black', margin: '0 auto', width: '60%', height: '400px'}}>
        <CytoscapeComponent
            elements={this.state.elements}
            style={{ width: '100%', height: '100%' }}
            cy={(cy) => {this.cy = cy}}
            layout={layout}
            stylesheet={[
                {
                  selector: 'node',
                  style: {
                    'background-color': 'data(color)',
                    'label': 'data(label)',
                    // opacity: 0.1
                    'text-wrap': 'wrap',
                    'font-size': '10pt'

                  }
                },
                {
                  selector: 'edge',
                  style: {
                    'width': 'data(width)',
                    'line-color': 'data(color)',
                    'curve-style': 'bezier',
                    'label': 'data(label)',
                    'font-size': '8pt'
                  }
                }, 
                {
                    selector: 'node.highlight',
                    style: {
                        'border-color': '#FFF',
                        'border-width': '2px'
                    }
                },
                {
                    selector: 'node.semitransparent',
                    style:{ 'opacity': '0.5' }
                },
                {
                    selector: 'node.highlighted',
                    style:{ 'opacity': '1' }
                },
                {
                    selector: 'edge.highlight',
                    style: { 'mid-target-arrow-color': '#FFF' }
                },
                {
                    selector: 'edge.semitransp',
                    style:{ 'opacity': '0.2' }
                }
              ]}
            maxZoom={5}
            minZoom={.25}
        />
      </div>
    )
    }
}