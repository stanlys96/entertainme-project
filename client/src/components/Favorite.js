import { Card, Button, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import { favoritesVar } from '../config/vars';
import Swal from 'sweetalert2';
import { Toast } from '../styling/swal';

function Favorite(props) {
  const favorite = props.favorite;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function deleteFavorite(e) {
    e.preventDefault();
    const existingFavorites = favoritesVar();

    const newData = {
      id: favorite.id,
      title: favorite.title,
      overview: favorite.overview,
      poster_path: favorite.poster_path,
      popularity: +favorite.popularity,
      tags: favorite.tags
    }

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
        const filteredFavorites = existingFavorites.filter(favorite => {
          return favorite.id !== newData.id;
        })
        favoritesVar([...filteredFavorites])
        Toast.fire({
          icon: 'success',
          title: 'Favorite deleted successfully!'
        })
      }
    })
  }
  return (
    <Card style={{ width: '18rem', margin: '0 auto' }}>
      <Card.Img variant="top" style={{ height: '60%' }} src={favorite.poster_path} />
      <Card.Body>
        <Card.Title>{favorite.title}</Card.Title>
        <Button variant="primary" className="mr-3" onClick={handleShow}><i className="fas fa-info-circle"></i></Button>
        <Button variant="danger" onClick={deleteFavorite}><i className="fas fa-trash-alt"></i></Button>
      </Card.Body>
      <Modal 
        show={show} 
        onHide={handleClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Movie Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="mt-2">Title: <span className="text-primary">{favorite.title}</span></h4>
          <h4 className="mt-3">Overview: <span className="text-primary">{favorite.overview}</span></h4>
          <h4 className="mt-3">Popularity: <span className="text-primary">{favorite.popularity}</span></h4>
          <h4 className="mt-3">Tags: <span className="text-primary">[{favorite.tags.split(',').join(', ')}]</span></h4>
          <Button variant="primary" style={{ margin: '25px auto 15px', textAlign: 'center', display: 'block' }} onClick={handleClose}>OK</Button>
        </Modal.Body>
      </Modal>
    </Card>
  )
}

export default Favorite;