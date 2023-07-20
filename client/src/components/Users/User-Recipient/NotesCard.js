import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function NotesCard({ note, onDeleteNotes, recipient }) {
    const { id, body } = note


    function handleDelete() {
        fetch(`/notes/${recipient}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => {
                onDeleteNotes(note);
            });
    }


    console.log(recipient)







    return (
        <div>
            <Row xs={1} md={1} className="notes">
                <Col>
                    <Card style={{ width: '18rem' }} className="text-center" bg="warning">
                        <li id={id}>
                            <section className="info">
                                <Card.Text>{body}</Card.Text>

                                <Button variant="outline-dark" size="sm" onClick={() => handleDelete(note.id)}>Delete</Button>

                            </section>
                        </li>
                    </Card>
                </Col>
            </Row>
        </div >
    )
}

export default NotesCard