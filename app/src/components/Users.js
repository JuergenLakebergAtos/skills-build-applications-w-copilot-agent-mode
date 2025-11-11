
import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Modal } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : data.results || [];
        setUsers(results);
        console.log('Fetched users:', results);
      })
      .catch(err => console.error('Fetch error:', err));
  }, [endpoint]);

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Users</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Aktion</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id || idx}>
                <td>{user.id || idx + 1}</td>
                <td>{user.name || '-'}</td>
                <td>{user.email || '-'}</td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => handleShowModal(user)}>
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="success" className="mt-2">Neuer User</Button>
      </Card.Body>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser ? (
            <div>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>ID:</strong> {selectedUser.id}</p>
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

export default Users;
