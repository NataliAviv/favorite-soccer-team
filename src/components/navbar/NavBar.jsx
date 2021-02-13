import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

function NavBar({ teams, filteredArray, field }) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    let newFillterArray = [];
    if (search === '') {
      filteredArray(teams);
    } else {
      newFillterArray = teams.filter(team => {
        return team[field].includes(search);
      });
      filteredArray(newFillterArray);
    }
  }, [teams, field, search]);

  return (
    <Navbar bg='light' variant='light'>
      <Navbar.Brand href='/main'></Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link href='/main'>Favorites</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl
          type='text'
          placeholder='Search'
          className='mr-sm-2'
          onChange={e => setSearch(e.target.value)}
        />
      </Form>
    </Navbar>
  );
}

export default NavBar;
