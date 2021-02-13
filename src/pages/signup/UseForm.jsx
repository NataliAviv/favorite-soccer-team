import React, { useState } from 'react';

const useForm = () => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    password2: ''
  });
  const [error, setError] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };
  return { handleChange, userDetails };
};
export default useForm;
