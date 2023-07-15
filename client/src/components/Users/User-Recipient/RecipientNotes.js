import React, { useState, useEffect } from 'react'

import { useLocation } from "react-router-dom"
import { useFormik } from "formik";
import * as yup from "yup";

function RecipientNotes() {

    const [error, setError] = useState(null)
    const location = useLocation()
    const recipient = location.state


    const mappedNotes = recipient.notes.map((note, index) => <p key={index}>{note}</p>)








    console.log(recipient.id)

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
                    res.json().then((note) => {

                        actions.resetForm()

                        console.log(note)

                    })
                } else {
                    res.json().then((error) => setError(error.message));
                }
            })
        }

    })

















    return (
        <div>
            <ul>Notes about {recipient.name}:
                <p>{recipient.notes.length === 0 ? "Perfect. No notes." : mappedNotes}</p>
            </ul>
            <section>

                <form onSubmit={formik.handleSubmit}>

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
        </div>
    )
}

export default RecipientNotes