import React, { useState } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom"

function LogIn({ updateUser }) {
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { username } = useParams()

    const schema = yup.object().shape({
        username: yup.string().required("WHO GOES THERE???"),
        password: yup.string().required("WHAT'S YOUR PASSWORD???")

    })



    const formik = useFormik({
        //initial values form
        initialValues: {
            username: "",
            password: ""
        },
        //yup schema for validation
        validationSchema: schema,
        //submit callback
        onSubmit: (values, actions) => {
            fetch("/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(values)
            }).then(res => {
                if (res.ok) {
                    res.json().then(user => {
                        actions.resetForm()
                        updateUser(user)
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

                <label> Username:
                    <input
                        type="text"
                        name="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        onBlur={formik.handleBlur} />
                    {formik.touched.username && formik.errors.username ? (
                        <h3>{formik.errors.username}</h3>
                    ) : ("")}
                </label>

                <label> Password
                    <input
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur} />
                    {formik.touched.password && formik.errors.password ? (
                        <h3>{formik.errors.password}</h3>
                    ) : ("")}
                </label>
                <input type="submit" value="Welcome back!" />
            </form>
        </section>



    )
}

export default LogIn