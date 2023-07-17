import React from 'react'

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
            <li className="card" id={id}>
                <section classname="info">
                    <h2>{body}</h2>

                    <button className="button" onClick={() => handleDelete(note.id)}>Delete</button>

                </section>
            </li>
        </div >
    )
}

export default NotesCard