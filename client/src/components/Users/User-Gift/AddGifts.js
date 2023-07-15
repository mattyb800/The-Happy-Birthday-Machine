import React, { useState } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom"

function AddGifts() {
    const [error, setError] = useState(null)
    const navigate = useNavigate()


    const schema = yup.object().shape({
        description: yup.string().required("WHAT IS IT???"),
        image: yup.string("WHAT DOES IT LOOK LIKE??"),
        location: yup.string("WHERE DID YOU SEE IT???")
    })



    const formik = useFormik({
        //initial values form
        initialValues: {
            description: "",
            image: "",
            location: ""
        },
        //yup schema for validation
        validationSchema: schema,
        //submit callback
        onSubmit: (values, actions) => {
            fetch("/gifts", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(values)
            }).then(res => {
                if (res.ok) {
                    res.json().then(gift => {
                        actions.resetForm()
                        console.log(gift)
                        navigate(`/`)
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

                <label> Description:
                    <input
                        type="text"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        onBlur={formik.handleBlur} />
                    {formik.touched.description && formik.errors.description ? (
                        <h3>{formik.errors.description}</h3>
                    ) : ("")}
                </label>

                <label> Image:
                    <input
                        type="text"
                        name="image"
                        onChange={formik.handleChange}
                        value={formik.values.image}
                        onBlur={formik.handleBlur} />
                    {formik.touched.image && formik.errors.image ? (
                        <h3>{formik.errors.image}</h3>
                    ) : ("")}
                </label>
                <label> Location:
                    <input
                        type="text"
                        name="location"
                        onChange={formik.handleChange}
                        value={formik.values.location}
                        onBlur={formik.handleBlur} />
                    {formik.touched.location && formik.errors.location ? (
                        <h3>{formik.errors.location}</h3>
                    ) : ("")}
                </label>
                <input type="submit" value="Add Gift!" />
            </form>
        </section>



    )
}

export default AddGifts