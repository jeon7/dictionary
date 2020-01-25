import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { MdModeEdit, MdRemoveCircleOutline } from 'react-icons/md';

const RecordListItemBlock = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  background: #495057;
  &:nth-child(even) {
    background: #f8f9fa;
  }
  &:nth-child(odd) {
    background: #eaf2f3;
  }
`;

const RecordContent = styled.div`
  margin-left: 0.5rem;
  flex: 1;
`;

const RemoveBtn = styled.div`
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #ff6b6b;
  cursor: pointer;
  &:hover {
    color: #ff8787;
  }

  & + & {
    border-top: 1px solid #dee2e6;
  }
`;

const EditBtn = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #2d84ac;
  cursor: pointer;
  &:hover {
    color: #7bb4ba;
  }

  & + & {
    border-top: 1px solid #dee2e6;
  }
`;

const RecordListItem = ({ id, selected_dictionary_title, domain, range,
  // handleRecordUpdate, 
  handleRecordDelete }) => {
  // TODO
  // const onEdit = () => {
  // let willEdit = window.confirm('do you want to edit this dictionary?');
  // }

  return (
    <RecordListItemBlock>

      {/* TODO */}
      <RecordContent> {domain} </RecordContent>
      <RecordContent> {range} </RecordContent>
      {/* TODO */}
      <EditBtn
      // onClick={(e) => handleDictionaryEdit(id, !done)}
      > <MdModeEdit /> </EditBtn>
      <RemoveBtn onClick={() => handleRecordDelete(id)}> <MdRemoveCircleOutline /> </RemoveBtn>
    </RecordListItemBlock>
  );
};

RecordListItem.propTypes = {
  id: PropTypes.number.isRequired,
  dictionary_title: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  range: PropTypes.string.isRequired,
  // handleRecordUpdate: PropTypes.func.isRequired,
  handleRecordDelete: PropTypes.func.isRequired
};

export default RecordListItem;
