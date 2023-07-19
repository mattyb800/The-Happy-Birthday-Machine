import React, { useState, useEffect } from 'react'
import NotesCard from './NotesCard'
import { useLocation } from "react-router-dom"
import { useFormik } from "formik";
import * as yup from "yup";

function RecipientNotes() {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null)
    const location = useLocation()
    const recipient = location.state

    console.log(recipient.id)

    useEffect(() => {
        getNotes();
    }, [])


    // console.log(mappedNotes)
    function getNotes() {
        fetch(`/notes/${recipient.id}`)
            .then(response => {
                if (response.ok) {
                    response.json().then(notes => setNotes(notes))
                }

                else setNotes([])
            }
            )

    }

    const mappedNotes = notes.map((note) => (
        <NotesCard
            key={note.id}
            recipient={recipient.id}
            note={note}
            onDeleteNotes={onDeleteNotes}
        />
    ));

    function updateNotes(note) {
        setNotes([...notes, note])
    }
    function onDeleteNotes(noteToDelete) {
        const updateNotes = notes.filter((note) => note.id !== noteToDelete.id);
        setNotes(updateNotes)
    }

    const schema = yup.object().shape({
        body: yup.string().required("Leave a note"),


    })

    console.log(recipient)

    const formik = useFormik({
        //initial values form
        initialValues: {
            body: "",



        },
        //yup schema for validation
        validationSchema: schema,
        //submit callback
        onSubmit: (values, actions) => {
            const newNote = {
                body: values.body,
                recipient_id: recipient.id
            }
            fetch(`/addnotes`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(newNote),
            }).then(res => {
                if (res.ok) {
                    console.log(newNote)
                    res.json().then((note) => {

                        actions.resetForm()

                        updateNotes(note)

                    })
                } else {
                    res.json().then((error) => setError(error.message));
                }
            })
        }

    })


    console.log(notes)














    return (
        <div>
            <section>

                Notes about {recipient.name}:
                <ul className='cards'>
                    <p>{notes.length === 0 ? "Perfect. No notes." : mappedNotes}</p>
                </ul>
            </section>
            <section>

                <form onSubmit={formik.handleSubmit} className="addNote">

                    <label> Note to self:
                        <input
                            type="text"
                            name="body"
                            onChange={formik.handleChange}
                            value={formik.values.body}
                            onBlur={formik.handleBlur} />
                        {formik.touched.body && formik.errors.body ? (
                            <h3>{formik.errors.body}</h3>
                        ) : ("")}
                    </label>

                    <input type="submit" value="Add Note" />
                </form>
            </section>
        </div >
    )
}

export default RecipientNotes