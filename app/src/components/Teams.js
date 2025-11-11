
import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Modal } from 'react-bootstrap';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : data.results || [];
        setTeams(results);
        console.log('Fetched teams:', results);
      })
      .catch(err => console.error('Fetch error:', err));
  }, [endpoint]);

  const handleShowModal = (team) => {
    setSelectedTeam(team);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Teams</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Beschreibung</th>
              <th>Aktion</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr key={team.id || idx}>
                <td>{team.id || idx + 1}</td>
                <td>{team.name || '-'}</td>
                <td>{team.description || '-'}</td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => handleShowModal(team)}>
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="success" className="mt-2">Neues Team</Button>
      </Card.Body>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Team Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTeam ? (
            <div>
              <p><strong>Name:</strong> {selectedTeam.name}</p>
              <p><strong>Beschreibung:</strong> {selectedTeam.description}</p>
              <p><strong>ID:</strong> {selectedTeam.id}</p>
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

export default Teams;
