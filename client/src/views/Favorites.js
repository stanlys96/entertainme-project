import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { favoritesVar } from '../config/vars';
import Favorite from '../components/Favorite';
import { NavLink } from 'react-router-dom';

function Favorites() {
  const favorites = useReactiveVar(favoritesVar);
  if (favorites.length === 0) {
    return (
      <div style={{ position: 'absolute', zIndex: 2, top: '40%', left: '35%' }}>
        <h2 className="text-light">No favorites to display!</h2>
        <h3 className="text-light py-2">Add some movies to your favorites!</h3>
        <NavLink to="/" className="btn btn-primary">Go Back home</NavLink>
      </div> 
    )
  } else {
    return (
      <div style={{ position: 'relative', zIndex: 2, paddingBottom: '30px' }}>
        <h2 className="text-light">Favorites</h2>
        <div className="card-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: 0, margin: '20px auto', gridRowGap: '40px', padding: '0 90px' }}>
          {
            favorites.map((favorite, index) => {
              return <Favorite favorite={favorite} key={Math.random() * 100000} />
            })
          }
        </div>
      </div>
    )
  }
}

export default Favorites;