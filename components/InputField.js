import { Form, Col } from 'react-bootstrap';
import { valideFocus, valideFocusOut } from '../utils';

const InputField = ( props ) => {
  const { unique, label, typetag, name, value, error, ...rest } = props;

  return (
      <Form.Group as={Col} controlId={unique}>
        <Form.Label>{label} </Form.Label>
        <Form.Control 
          { ...rest }
          type={typetag}
          name={name}
          value={value}
          onFocus={valideFocus}
          onBlur={valideFocusOut}
          isInvalid={!!error}
        />
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      </Form.Group>
  );
}

export default InputField;