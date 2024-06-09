"use client"
import React from 'react';
import PropTypes from 'prop-types';
import { BlockPicker } from 'react-color';
import { Draggable, Dropzone } from 'react-page-maker';
import {elements} from '../const';

const DraggableMain = (props) => {
  const {
    dropzoneID,
    parentID,
    showBasicContent,
    showPreview,
    id,
    dropzoneProps,
    initialElements,
    ...rest
  } = props;

  if (showBasicContent) {
    return (
      <Draggable {...props} >
        <span>{ rest.name }</span>
      </Draggable>
    );
  }

  const _onDrop = (data, cb) => {
    // no need to ask id and name again
    if (data.payload && data.payload.dropped) {
      return cb(data);
    }

    // This can be an async call or some modal to fetch data
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
  };

  if (showPreview) {
    return (
        <main className="w-full min-h-[100vh] bg-[#1114]">
            <h1>Menu</h1>
              {rest.childNode['main']}
        </main>
    )
  }

  const filterInitialElements = (dID) => {
    return initialElements.filter(e => e.dropzoneID === dID) || [];
  };

  return (
    <Draggable {...props} >
      <span>{ rest.name }</span>
      <main className="w-full min-h-[100vh]">
            <Dropzone
              {...dropzoneProps}
              initialElements={filterInitialElements('main')}
              id="main"
              onDrop={_onDrop}
              placeholder="Drop Here"
            />
      </main>
    </Draggable>
  );
};

DraggableMain.propTypes = {
  id: PropTypes.string.isRequired,
  showBasicContent: PropTypes.bool.isRequired
};

export default DraggableMain;