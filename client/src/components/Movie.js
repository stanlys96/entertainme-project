import { Modal, Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_DATA, UPDATE_MOVIE, DELETE_MOVIE } from '../graph/index';
import Swal from 'sweetalert2';
import { Toast } from '../styling/swal';
import { favoritesVar } from '../config/vars';

function Movie(props) {
  const data = props.data;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showInfo, setShowInfo] = useState(false);
  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => setShowInfo(true);
  const [updateMovie, { data: updatedMovie }] = useMutation(UPDATE_MOVIE);
  const [deleteMovie, { data: deletedMovie }] = useMutation(DELETE_MOVIE);

  const [title, setTitle] = useState(data.title);
  const [overview, setOverview] = useState(data.overview);
  const [posterPath, setPosterPath] = useState(data.poster_path);
  const [popularity, setPopularity] = useState(data.popularity);
  const [tags, setTags] = useState(data.tags.join(','));

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
      updateMovie({ 
        variables: { 
          input: {
            id: data._id,
            title,
            overview,
            poster_path: posterPath,
            popularity: +popularity,
            tags: tags.split(',')
          }
        }, refetchQueries: [{ query: GET_DATA }]
      })
      Toast.fire({
        icon: 'success',
        title: 'Movie updated successfully!'
      })
      handleClose();
    }
  }

  function handleDelete(e) {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMovie({
          variables: {
            id: data._id
          },
          refetchQueries: [{ query: GET_DATA }]
        });
        Toast.fire({
          icon: 'success',
          title: 'Movie deleted successfully!'
        })
      }
    })
  }

  function addToFavorites() {
    const existingFavorites = favoritesVar();
    let found = false;

    const newData = {
      id: data._id,
      title,
      overview,
      poster_path: posterPath,
      popularity: +popularity,
      tags
    }

    existingFavorites.find(favorite => {
      if (favorite.id === data._id) {
        found = true;
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: `${title} is already a favorite!`
        }) 
      }
    })

    if (!found) {
      favoritesVar([...existingFavorites, newData]);
      Toast.fire({
        icon: 'success',
        title: `${title} successfully added to favorites!`
      })
    }
  }

  return (
    <div style={{ display: 'inline-block' }} className="pb-3">
      <img
        className="d-inline-block mr-3 ml-2 mb-3 mt-3 movie-img"
        style={{ width: '250px', height: '156px', textAlign: 'center' }}
        src={data.poster_path}
        alt="First slide"
        onClick={handleShowInfo}
        />
      <h4 className="text-light mb-3">{data.title}</h4>
      <button className="btn btn-danger btn-icon mr-3" onClick={addToFavorites}><i className="fas fa-heart"></i></button>
      <button className="btn btn-icon btn-primary mr-3" onClick={handleShow}><i className="fas fa-edit"></i></button>
      <button className="btn btn-icon btn-warning" onClick={handleDelete}><i className="fas fa-trash-alt"></i></button>
      <Modal 
        show={show} 
        onHide={handleClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Movie</Modal.Title>
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
            <Form.Control value={tags} onChange={(e) => setTags(e.target.value)} className="mb-2" type="text" placeholder="Tags"/>           
            <Button onClick={handleClose} className="ml-3" variant="danger" style={{ float: 'right' }}>
                Cancel
            </Button>
            <Button variant="primary" style={{ float: 'right' }} type="submit">
                Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal 
        show={showInfo} 
        onHide={handleCloseInfo}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Movie Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="mt-2">Title: <span className="text-primary">{title}</span></h4>
          <h4 className="mt-3">Overview: <span className="text-primary">{overview}</span></h4>
          <h4 className="mt-3">Popularity: <span className="text-primary">{popularity}</span></h4>
          <h4 className="mt-3">Tags: <span className="text-primary">[{tags.split(',').join(', ')}]</span></h4>
          <Button variant="primary" style={{ margin: '25px auto 15px', textAlign: 'center', display: 'block' }} onClick={handleCloseInfo}>OK</Button>
        </Modal.Body>
      </Modal>
    </div>  
  )
}

export default Movie;