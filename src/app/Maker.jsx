
"use client"
import React, { Component } from 'react';
import {
  Row, Col, Button,
  TabContent, TabPane,
  Nav, NavItem, NavLink
 } from 'reactstrap';
import ReactJson from 'react-json-view';

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
import DraggableTextbox from './elements/DraggableTextbox';
import DraggableHeader from './elements/DraggableHeader';
import DraggableMain from './elements/DraggableMain';
import DraggableLayoutR1C2 from './elements/DraggableLayoutR1C2';

import './maker.css';

class PageMaker extends Component {
  constructor(props) {
    super(props);

    // register all palette elements
    registerPaletteElements([{
      type: elements.TEXTBOX,
      component: DraggableTextbox
    },{
      type: elements.HEADER,
      component: DraggableHeader
    },{
      type: elements.MAIN,
      component: DraggableMain
    },{
      type: elements.GRID_LAYOUT_1_2,
      component: DraggableLayoutR1C2
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
      localStorage.setItem('initialElements', JSON.stringify(newState));
    });
  }

  // re-hydrate canvas state
  initialElements = JSON.parse(localStorage.getItem('initialElements'))

  // define all palette elements that you want to show
  paletteItemsToBeRendered = [{
    type: elements.TEXTBOX,
    name: 'Text Field',
    id: 'f1'
  }, {
    type: elements.HEADER,
    name: 'Header',
    id: 'h1'
  },{
    type: elements.FORM,
    name: 'FORM',
    id: 'form'
  },{
    type: elements.MAIN,
    name: 'main',
    id: 'main'
  },{
    type: elements.GRID_LAYOUT_1_2,
    name: 'DraggableLayoutR1C2',
    id: 'DraggableLayoutR1C2'
  },]

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
      <div className="App container px-10">
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
        <NavItem>
          <NavLink
            className={`${this.state.activeTab === '3' ? 'active' : ''}`}
            onClick={() => { this._toggleTab('3'); }}
          >
            JSON
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={this.state.activeTab} >
        {
          this.state.activeTab == 1 &&
          <TabPane tabId="1">
          <Row className="grid grid-cols-2 gap-5">
            <Col className='h-full' >
              <Canvas onDrop={this._onDrop} initialElements={this.initialElements} placeholder="Drop Here" className="h-full" />
            </Col>
            <Col sm="3">
              <Palette paletteElements={this.paletteItemsToBeRendered} />
              <Trash />
              <Button color="danger" onClick={this._clearState}>Flush Canvas</Button>
            </Col>
            {/* <p className="col-span-2 m-auto h-10 flex items-center"><sup>*</sup>All canvas data is getting stored in localStorage. Try refresh, canvas will get pre-populate with previous state</p> */}
          </Row>
        </TabPane>
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
        
        {
          this.state.activeTab == 3 &&
          <TabPane tabId="3">
          <Row className="mt-3">
            <Col sm="12">
              <ReactJson src={this.state.currentState} collapsed theme="solarized" />
            </Col>
          </Row>
        </TabPane>
        }
           
      </TabContent>
    </div>

    );
  }
}

export default PageMaker;