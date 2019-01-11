import React from 'react';
import InputForm from './InputForm';
import Modal from 'react-modal';

const inputModal = (props) => (
  <Modal
    isOpen={!!props.inputModal}
    onRequestClose={props.closeInputModal}
    contentLabel="Input Modal"
  >
    <InputForm getWeather={props.getWeather} />
  </Modal>
);

export default inputModal;