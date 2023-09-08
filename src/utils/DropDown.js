import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const DropDown = (props) => {
  return (
    <div>
      <DropdownButton
        as={ButtonGroup}
        key='Secondary'
        id={`dropdown-variants-Secondary`}
        variant='secondary'
        title={
          props.items[0].categoryName != null ? 'Categories' : 'Subcategories'
        }
      >
        {props.items &&
          props.items.map((item) => {
            return (
              <Dropdown.Item eventKey={item.id}>
                {item.categoryName != null
                  ? item.categoryName
                  : item.subCategoryName}
              </Dropdown.Item>
            );
          })}
      </DropdownButton>
    </div>
  );
};

export default DropDown;
