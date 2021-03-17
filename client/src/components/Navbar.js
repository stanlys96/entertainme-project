import { NavLink } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_MOVIE, GET_DATA } from '../graph/index';
import { Toast } from '../styling/swal';
import Swal from 'sweetalert2';

function Navbar() {
  const [show, setShow] = useState(false);
  const [addMovie, { data }] = useMutation(ADD_MOVIE);

  const handleClose = () => {
    setShow(false);
    setTitle('');
    setOverview('');
    setPosterPath('');
    setPopularity('');
    setTags('');
  };

  const handleShow = () => setShow(true);

  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [posterPath, setPosterPath] = useState('');
  const [popularity, setPopularity] = useState('');
  const [tags, setTags] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !overview || !posterPath || !popularity || !tags) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Semua input harus diisi!'
      })
    } else if (Number(popularity) <= 0 || Number(popularity) > 10) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Nilai popularity harus dari 0.1 sampai 10!'
      }) 
    } else {
      addMovie({ 
        variables: { 
          input: {
            title,
            overview,
            poster_path: posterPath,
            popularity: +popularity,
            tags: tags.split(' ')
          }
        }, refetchQueries: [{ query: GET_DATA }]
      })
      Toast.fire({
        icon: 'success',
        title: 'Movie added successfully!'
      })
      handleClose();
    }
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-light mb-3" style={{ background: 'rgba(248, 249, 250, 0.8)' }}>
      <div className="container">
        <ul className="navbar-nav">
          <NavLink className="navbar-brand" to="/">Stanflix</NavLink>
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/favorites">Favorites</NavLink>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Button className="nav-link text-light" onClick={handleShow}>Add Movie</Button>
          </li>
        </ul>
      </div>
      
      <Modal 
        show={show} 
        onHide={handleClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Label className="ml-1 text-align-center">Title: </Form.Label>
            <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} className="mb-2" type="text" placeholder="Title"/>           
            <Form.Label className="ml-1">Overview: </Form.Label>
            <Form.Control value={overview} onChange={(e) => setOverview(e.target.value)} className="mb-2" type="text" placeholder="Overview"/>           
            <Form.Label className="ml-1">Poster Path: </Form.Label>
            <Form.Control value={posterPath} onChange={(e) => setPosterPath(e.target.value)} className="mb-2" type="text" placeholder="Poster Path"/>           
            <Form.Label className="ml-1">Popularity: </Form.Label>
            <Form.Control value={popularity} onChange={(e) => setPopularity(e.target.value)} className="mb-2" type="number" placeholder="Popularity"/>           
            <Form.Label className="ml-1">Tags: </Form.Label>
            <Form.Control value={tags} onChange={(e) => setTags(e.target.value)} className="mb-2" type="text" placeholder="Tags (Tag1,Tag2,Tag3)"/>           
            <Button onClick={handleClose} className="ml-3" variant="danger" style={{ float: 'right' }}>
                Cancel
            </Button>
            <Button variant="primary" style={{ float: 'right' }} type="submit">
                Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </nav>
  )
}

export default Navbar;