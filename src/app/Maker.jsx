
"use client"
import React, { Component } from 'react';
import {
  Row, Col, Button,
  TabContent, TabPane,
  Nav, NavItem, NavLink
 } from 'reactstrap';
// import ReactJson from 'react-json-view';

import {
  Canvas,
  Palette,
  state,
  Trash,
  core,
  Preview,
  registerPaletteElements
} from 'react-page-maker';

import { elements } from './const';
import DraggableMain from './myElements/DraggableMain';
import DraggableContainer1R1C from './myElements/DraggableContainer1R1C';
import DraggableContainer1R2C from './myElements/DraggableContainer1R2C';
import DraggableContainer1R3C from './myElements/DraggableContainer1R3C';
import DraggableContainer1R4C from './myElements/DraggableContainer1R4C';
import DraggableHeader from './myElements/DraggableHeader';

import './maker.css';

class PageMaker extends Component {
  constructor(props) {
    super(props);
    // register all palette elements
    registerPaletteElements([{
      type: elements.MAIN,
      component: DraggableMain
    },{
      type: elements.CONTAINER_GRID_1R1C,
      component: DraggableContainer1R1C
    },{
      type: elements.CONTAINER_GRID_1R2C,
      component: DraggableContainer1R2C
    },{
      type: elements.CONTAINER_GRID_1R3C,
      component: DraggableContainer1R3C
    },{
      type: elements.CONTAINER_GRID_1R4C,
      component: DraggableContainer1R4C
    },{
      type: elements.HEADER,
      component: DraggableHeader
    }]);

    // state.clearState() triggers this event
    state.addEventListener('flush', (e) => {
      console.log('flush', e);
    });

    // state.removeElement() triggers this event
    state.addEventListener('removeElement', (e) => {
      console.log('removeElement', e);
    });

    // state.updateElement() triggers this event
    state.addEventListener('updateElement', (e) => {
      console.log('updateElement', e);
    });
  }

  state = {
    activeTab: '1',
    currentState: []
  }

  UNSAFE_componentWillMount() {
    state.addEventListener('change', this._stateChange);
  }

  UNSAFE_componentWillUnMount() {
    state.removeEventListener('change', this._stateChange);
  }

  _stateChange = (s) => {
    const newState = state.getStorableState();
    this.setState({ currentState: newState }, () => {
      console.log(newState);
      localStorage.setItem('initialElements', JSON.stringify(newState));
    });
  }

  // re-hydrate canvas state
  initialElements = JSON.parse(localStorage.getItem('initialElements'))

  // define all palette elements that you want to show
  paletteItemsToBeRendered = [{
    type: elements.MAIN,
    name: 'Main',
    id: 'Main'
  },{
    type: elements.HEADER,
    name: 'Header',
    id: 'Header'
  },{
    type: elements.CONTAINER_GRID_1R1C,
    name: 'Col1Row1',
    id: 'Col1Row1'
  },{
    type: elements.CONTAINER_GRID_1R2C,
    name: 'Col1Row2',
    id: 'Col1Row2'
  },{
    type: elements.CONTAINER_GRID_1R3C,
    name: 'Col1Row3',
    id: 'col1row3'
  },{
    type: elements.CONTAINER_GRID_1R4C,
    name: 'Col1Row4',
    id: 'Col1Row4'
  }]

  _onDrop = (data, cb) => {
    // no need to ask id and name again
    if (data.payload && data.payload.dropped) {
      return cb(data);
    }

    let name = data.name;

    if (data.type === elements.TEXTBOX || data.type === elements.DROPDOWN) {
      name = window.prompt('Enter name of field');
    }

    const id = window.prompt('Please enter unique ID');

    const result = cb({
      ...data,
      name,
      id,
      payload: { dropped: true }
    });
  }

  _toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  _clearState = () => {
    state.clearState();
  }

  render() {
    return (
      <div className="w-full px-5 h-full">
      <Nav tabs className="w-full flex justify-center gap-5 h-10">
        <NavItem>
          <NavLink
            className={`${this.state.activeTab === '1' ? 'active' : ''}`}
            onClick={() => { this._toggleTab('1'); }}
          >
            Canvas
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={`${this.state.activeTab === '2' ? 'active' : ''}`}
            onClick={() => { this._toggleTab('2'); }}
          >
            Preview
          </NavLink>
        </NavItem>  
      </Nav>
      <TabContent activeTab={this.state.activeTab} >
        {
          this.state.activeTab == 1 &&
          <div className='w-full m-h-[100vh] flex gap-2' >
            <span className='w-[20%] flex flex-col' >
              <Palette paletteElements={this.paletteItemsToBeRendered} />
              <Trash />
              <Button color="danger" onClick={this._clearState}>Flush Canvas</Button>
            </span>
            <span className='w-[80%] flex flex-col' >
              <Canvas onDrop={this._onDrop} initialElements={this.initialElements} placeholder="Drop Here" className="h-full" />
            </span>
              
            {/* <p className="col-span-2 m-auto h-10 flex items-center"><sup>*</sup>All canvas data is getting stored in localStorage. Try refresh, canvas will get pre-populate with previous state</p> */}
        </div>
        }
        {
          this.state.activeTab == 2 &&
            <Preview>
              {
                ({ children }) => (
                    <main className='w-full m-h-[100vh]' >
                    {children}
                    </main>
                )
              }
            </Preview>
        }
        
        {/* {
          this.state.activeTab == 3 &&
          <TabPane tabId="3">
          <Row className="mt-3">
            <Col sm="12">
              <ReactJson src={this.state.currentState} collapsed theme="solarized" />
            </Col>
          </Row>
        </TabPane>
        } */}
           
      </TabContent>
    </div>

    );
  }
}

export default PageMaker;