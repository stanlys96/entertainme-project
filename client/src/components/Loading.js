import { Spinner } from 'react-bootstrap';

function Loading() {
  return (
    <div style={{ position: 'absolute', zIndex: 2, top: '45%', left: '47.5%' }}>
      <Spinner animation="border" variant="success" role="status" />
      <p className="text-light">Loading...</p>
    </div>
  )
}

export default Loading;