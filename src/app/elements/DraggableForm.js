"use client"
import React from 'react';
import { BlockPicker } from 'react-color';
import { Draggable, state } from 'react-page-maker';
import DonationForm from "../../../../components/forms/donation-form/DonationForm"


class DraggableForm extends React.Component {
  state = {
    showColorPicker: false,
    background: '',
  };

  handleChangeComplete = (color) => {
    const { id, dropzoneID, parentID }= this.props;
    this.setState({ background: color.hex }, () => {
      state.updateElement(id, dropzoneID, parentID, {
        payload: { background: color.hex }
      });
    });
  };

  toggleColorPicker = () => {
    this.setState({
      showColorPicker: !this.state.showColorPicker
    });
  }

  render() {
    const {
      id, showBasicContent, showPreview,
      dropzoneID, parentID, name, payload
    } = this.props;

    const background =  this.state.background ||
      payload && payload.background || '#37d67a';

    if (showBasicContent) {
      return (
        <Draggable { ...this.props } >
          {
      <h1>DonationForm</h1>
          }
        </Draggable>
      )
    }
    
    if (showPreview) {
      return (
        <>
        <DonationForm/>
       </>
      );
    }

    return (
      <Draggable { ...this.props } >
       <div className='w-40' >
       <h1>Donation Form</h1>
       </div>

      </Draggable>
    )
  }
};


DraggableForm.propTypes = {
    id: PropTypes.string.isRequired,
    showBasicContent: PropTypes.bool.isRequired
  };
  
  export default DraggableForm;