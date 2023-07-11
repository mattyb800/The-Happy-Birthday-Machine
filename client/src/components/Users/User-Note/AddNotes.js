import React, { useState } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom"

function AddNotes({ user }) {
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { username } = useParams()


    const schema = yup.object().shape({
        body: yup.string().required("Leave a note"),


    })



    const formik = useFormik({
        //initial values form
        initialValues: {
            body: "",

        },
        //yup schema for validation
        validationSchema: schema,
        //submit callback
        onSubmit: (values, actions) => {
            fetch(`/users/${username}/addnotes`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(values)
            }).then(res => {
                if (res.ok) {
                    res.json().then((note) => {

                        actions.resetForm()

                        console.log(note)
                        navigate(`users/${username}>`)
                    })
                } else {
                    res.json().then((error) => setError(error.message));
                }
            })
        }

    })

    return (
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



    )
}

export default AddNotes