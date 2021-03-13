

function Series(props) {
  const data = props.data;
  return (
    <div style={{ display: 'inline-block' }}>
      <img
        className="d-inline-block mr-3 ml-2 mb-3 mt-3 movie-img"
        style={{ width: '250px', height: '156px', textAlign: 'center' }}
        src={data.poster_path}
        alt="First slide"
        />
      <h4 className="text-light mb-3">{data.title}</h4>
      <button className="btn btn-danger mr-3"><i className="fas fa-heart"></i></button>
      <button className="btn btn btn-secondary mr-3"><i class="fas fa-edit"></i></button>
      <button className="btn btn-warning"><i className="fas fa-trash-alt"></i></button>
    </div>  
  )
}

export default Series;