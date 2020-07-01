 
import {API_BASE_URL} from '../config';
import fetch from 'isomorphic-fetch';

 
 // Method request data
export const methodRequet = async (data,url,methodRequest,id) =>{
    let dataResp = {};
    if(methodRequest !='GET'){
      const resCreditCard = await fetch(`${API_BASE_URL}/${url}${id}`, {
          method: methodRequest,
          headers: {
              'Content-Type':'application/json',
          },
          body: JSON.stringify(data),
      });
      dataResp = await resCreditCard.json();
    }else{
      const resCreditCard = await fetch(`${API_BASE_URL}/${url}${id}`, {
        method: methodRequest,
        headers: {
            'Content-Type':'application/json',
        }
      });
      dataResp = await resCreditCard.json();
    }

    return dataResp;
}

//ReStart values data Init
export const reStartDataInit = (dataInit) => {
  const { data, errors } = dataInit;
  const newData = Object.values(data);
  for (let index = 0; index < newData.length; index++) {
      newData[index]['value'] = '';
  }
  let reOrganizeData = {};
  for (let j = 0; j < newData.length; j++) {
      reOrganizeData[newData[j]['var']] = newData[j];
  }
  let dataInitNew = {};
  dataInitNew['data'] = reOrganizeData;
  dataInitNew['errors'] = errors;
  return dataInitNew;
}

// Input onFocus append class handler
export const valideFocus = ( e ) => {
    e.target.parentElement.classList.add('focused');
}
  
// Input onBlur remove class handler
export const valideFocusOut = ( e ) => {
    const hasValue = e.target.value;
    if (!hasValue) {
      e.target.parentElement.classList.remove('focused');
    }
}
  // Input onKeyDown numbers only handler
export const valideNumbersOnly = ( e ) => {
  let flag;
  if((e.keyCode === 8) ||
      (e.keyCode === 9) || 
      (e.keyCode === 16 && e.keyCode >= 9) ||
      (e.keyCode === 37) ||
      (e.keyCode === 39) ||
      (e.keyCode === 46) || 
      (e.keyCode >= 48 && e.keyCode <= 57) || 
      (e.keyCode >= 96 && e.keyCode <= 105)) {
    flag = false;
  } else {
    flag = true;
  }

  if(flag) {
    e.preventDefault();
  }
}

export const multiplesFourValidate = (number) =>{
    let subtraction = number % 5;
    let result = false;
    if(subtraction==0){
        result = true;
    }
    return result;
}

export const isEmpty =(obj) => {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}