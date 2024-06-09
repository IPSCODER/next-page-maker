"use client"
import React from 'react';
import PropTypes from 'prop-types';
import { Draggable, Dropzone } from 'react-page-maker';
import {elements} from '../const';

const DraggableContainer1R3C = (props) => {
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
        <div className="w-full min-h-[10vh] flex gap-2 flex-col lg:flex-row bg-[#1114]">
              <span className='w-full lg:w-[33%]' >
              {rest.childNode['canvas-1R3C1']}
              </span>
              <span className='w-full lg:w-[33%]' >
              {rest.childNode['canvas-1R3C2']}
              </span>
              <span className='w-full lg:w-[33%]' >
              {rest.childNode['canvas-1R3C3']}
              </span>
        </div>
    )
  }

  const filterInitialElements = (dID) => {
    return initialElements.filter(e => e.dropzoneID === dID) || [];
  };

  return (
    <Draggable {...props} >
      <span>{ rest.name }</span>
      <div className="w-full min-h-[10vh] flex flex-col gap-2 lg:flex-row bg-[#1114]">
            <span className='w-full lg:w-[33%]' >
            <Dropzone
              {...dropzoneProps}
              initialElements={filterInitialElements('canvas-1R3C1')}
              id="canvas-1R3C1"
              onDrop={_onDrop}
              placeholder="Drop Here"
            />
            </span>
            <span className='w-full lg:w-[33%]' >
            <Dropzone
              {...dropzoneProps}
              initialElements={filterInitialElements('canvas-1R3C2')}
              id="canvas-1R3C2"
              onDrop={_onDrop}
              placeholder="Drop Here"
            />
            </span>
            <span className='w-full lg:w-[33%]' >
            <Dropzone
              {...dropzoneProps}
              initialElements={filterInitialElements('canvas-1R3C3')}
              id="canvas-1R3C3"
              onDrop={_onDrop}
              placeholder="Drop Here"
            />
            </span>
      </div>
    </Draggable>
  );
};

DraggableContainer1R3C.propTypes = {
  id: PropTypes.string.isRequired,
  showBasicContent: PropTypes.bool.isRequired
};

export default DraggableContainer1R3C;