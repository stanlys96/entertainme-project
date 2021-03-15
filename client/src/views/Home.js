import { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Carousel } from 'react-bootstrap';
import Movie from '../components/Movie';
import Series from '../components/Series';
import { GET_DATA } from '../graph/index';

function processingData(input) {
  let output = [];
  let container = [];
  for (let i = 0; i < input.length; i++) {
    if (i % 4 === 0 && i !== 0) {
      output.push(container);
      container = [];
    }
    container.push(input[i]);
  }
  output.push(container);
  return output;
}

function Home() {
  const { loading, error, data } = useQuery(GET_DATA);
  const [ moviesData, changeMoviesData ] = useState([]);
  const [ seriesData, changeSeriesData ] = useState([]);
  useEffect(() => {
    if (loading) {
      console.log('loading...');
    } else {
      const processingMoviesData = processingData(data.movies);
      const processingSeriesData = processingData(data.series);
      changeMoviesData(processingMoviesData);
      changeSeriesData(processingSeriesData);
    }
  }, [data]);
  if (loading) return <h3>Loading...</h3>;
  return (
    <div id="home">
      <h2 className="text-light mt-4 mb-3">Movies</h2>
      <Carousel interval={1000000000} indicators={false}>
          {
            moviesData.map((movie, index) => {
              return (
              <Carousel.Item key={Math.random() * 100000}>
                {
                  movie.map((data, index) => {
                    return (
                      <Movie data={data} key={Math.random() * 100000} />
                    )
                  })
                }
              </Carousel.Item>
              )
            }
          )
        }
      </Carousel>
      <h2 className="text-light mt-4">TV Series</h2>
      <Carousel interval={1000000000} indicators={false}>
          {
            seriesData.map((series, index) => {
              return (
              <Carousel.Item key={Math.random() * 100000}>
                {
                  series.map((data, index) => {
                    return (
                      <Series data={data} key={Math.random() * 100000} />
                    )
                  })
                }
              </Carousel.Item>
              )
            }
          )
        }
      </Carousel>
    </div>
  )
}

export default Home;