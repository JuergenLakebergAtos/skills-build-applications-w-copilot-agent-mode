
import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Modal } from 'react-bootstrap';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : data.results || [];
        setWorkouts(results);
        console.log('Fetched workouts:', results);
      })
      .catch(err => console.error('Fetch error:', err));
  }, [endpoint]);

  const handleShowModal = (workout) => {
    setSelectedWorkout(workout);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Workouts</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Typ</th>
              <th>Aktion</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, idx) => (
              <tr key={workout.id || idx}>
                <td>{workout.id || idx + 1}</td>
                <td>{workout.name || '-'}</td>
                <td>{workout.type || '-'}</td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => handleShowModal(workout)}>
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="success" className="mt-2">Neues Workout</Button>
      </Card.Body>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Workout Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedWorkout ? (
            <div>
              <p><strong>Name:</strong> {selectedWorkout.name}</p>
              <p><strong>Typ:</strong> {selectedWorkout.type}</p>
              <p><strong>ID:</strong> {selectedWorkout.id}</p>
            </div>
          ) : <p>Keine Details verfügbar.</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Schließen</Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default Workouts;
