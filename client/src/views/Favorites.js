import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { favoritesVar } from '../config/vars';
import Favorite from '../components/Favorite';

function Favorites() {
  const favorites = useReactiveVar(favoritesVar);
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

export default Favorites;