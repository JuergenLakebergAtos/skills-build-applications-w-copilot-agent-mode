
import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Modal } from 'react-bootstrap';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : data.results || [];
        setActivities(results);
        console.log('Fetched activities:', results);
      })
      .catch(err => console.error('Fetch error:', err));
  }, [endpoint]);

  const handleShowModal = (activity) => {
    setSelectedActivity(activity);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Activities</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Details</th>
              <th>Aktion</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, idx) => (
              <tr key={activity.id || idx}>
                <td>{activity.id || idx + 1}</td>
                <td>{activity.name || '-'}</td>
                <td>{activity.details || '-'}</td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => handleShowModal(activity)}>
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="success" className="mt-2">Neue Aktivität</Button>
      </Card.Body>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Aktivität Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedActivity ? (
            <div>
              <p><strong>Name:</strong> {selectedActivity.name}</p>
              <p><strong>Details:</strong> {selectedActivity.details}</p>
              <p><strong>ID:</strong> {selectedActivity.id}</p>
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

export default Activities;
