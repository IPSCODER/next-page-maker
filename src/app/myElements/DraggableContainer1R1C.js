"use client"
import React from 'react';
import PropTypes from 'prop-types';
import { Draggable, Dropzone } from 'react-page-maker';
import {elements} from '../const';

const DraggableContainer1R1C = (props) => {
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
        <div className="w-full min-h-[10vh] bg-[#1114]">
                  {rest.childNode['canvas-1R1C']}
        </div>
    )
  }

  const filterInitialElements = (dID) => {
    return initialElements.filter(e => e.dropzoneID === dID) || [];
  };

  return (
    <Draggable {...props} >
      <span>{ rest.name }</span>
      <div className="w-full min-h-[10vh] bg-[#1114]">
            <Dropzone
              {...dropzoneProps}
              initialElements={filterInitialElements('canvas-1R1C')}
              id="canvas-1R1C"
              onDrop={_onDrop}
              placeholder="Drop Here"
            />
      </div>
    </Draggable>
  );
};

DraggableContainer1R1C.propTypes = {
  id: PropTypes.string.isRequired,
  showBasicContent: PropTypes.bool.isRequired
};

export default DraggableContainer1R1C;