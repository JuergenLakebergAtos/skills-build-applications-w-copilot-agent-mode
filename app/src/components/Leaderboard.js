
import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Modal } from 'react-bootstrap';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : data.results || [];
        setLeaderboard(results);
        console.log('Fetched leaderboard:', results);
      })
      .catch(err => console.error('Fetch error:', err));
  }, [endpoint]);

  const handleShowModal = (entry) => {
    setSelectedEntry(entry);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Leaderboard</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Punkte</th>
              <th>Aktion</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, idx) => (
              <tr key={entry.id || idx}>
                <td>{entry.id || idx + 1}</td>
                <td>{entry.name || '-'}</td>
                <td>{entry.points || '-'}</td>
                <td>
                  <Button variant="info" size="sm" onClick={() => handleShowModal(entry)}>
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="success" className="mt-2">Leaderboard aktualisieren</Button>
      </Card.Body>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Leaderboard Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEntry ? (
            <div>
              <p><strong>Name:</strong> {selectedEntry.name}</p>
              <p><strong>Punkte:</strong> {selectedEntry.points}</p>
              <p><strong>ID:</strong> {selectedEntry.id}</p>
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

export default Leaderboard;
