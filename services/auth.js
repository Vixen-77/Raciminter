import api from './api';
import { useNavigate } from 'react-router-dom';


export const signupPatient = (data ) => {
    return api.post('/auth/signupWithFile', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
};

export const signupProS = (data ) => {
  return api.post('/auth/signupWithFileProS', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
};

export const signinPatient = (data ) => {
    return api.post('/auth/signinPatient', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
}

export const signinProS = (data ) => {
  return api.post('/auth/signinProS', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
}