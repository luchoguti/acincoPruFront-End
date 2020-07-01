import { Form, Col } from 'react-bootstrap';

import { valideFocus, valideFocusOut } from '../utils';

const InputSelect = ( props ) => {
  const { unique, label, name, value, optionvalue, error, ...rest } = props;

  return (
      <Form.Group as={Col} controlId={unique}>
        <Form.Label>{label} </Form.Label>
        <Form.Control 
          { ...rest }
          name={name}
          onFocus={valideFocus}
          onBlur={valideFocusOut}
          isInvalid={!!error}
          as="select"
          value={value}
        >
        <option value="">Choose...</option>
        {(()=>{
            let cant = Object.keys(optionvalue).length;

            if(name == "bank"){
              if(cant > 0){
                return optionvalue.map((ittem,index) => (<option key={index+1} value={ittem.id_banks}>{ittem.name_bank}</option>)); 
              }
            }
            else if(name == "numberAccount_transaction"){
              if(cant > 0){
                return optionvalue.map((ittem,index) => (<option key={index+1}  value={index+1}>{ittem.number_account_association} - {ittem.name_bank}</option>)); 
              }
            }
            else if(name == "type_document"){
              if(cant > 0){
                return optionvalue.map((ittem,index) => (<option key={index+1}  value={ittem.id_type_document}>{ittem.description_type_document}</option>)); 
              }
            }
            else if(name == "type_account"){
              if(cant > 0){
                return optionvalue.map((ittem,index) => (<option key={index+1}  value={ittem.id_type_account}>{ittem.description_type_account}</option>)); 
              }
            }
        })()}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      </Form.Group>
  );
}

export default InputSelect;