import React, { useState, useContext } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom"
import UserContext from "./Context/UserContext";


function SignUp({ updateUser }) {
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { username } = useParams()

    const schema = yup.object().shape({
        name: yup.string().required("Name is required."),
        username: yup.string().required("Username is required"),
        email: yup.string().required("Email is required."),
        password: yup.string().required("Password is required."),

    })



    const formik = useFormik({
        //initial values form
        initialValues: {
            name: "",
            username: "",
            email: "",
            password: ""
        },
        //yup schema for validation
        validationSchema: schema,
        //submit callback
        onSubmit: (values, actions) => {

            fetch("/signup", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(values)
            }).then(res => {
                if (res.ok) {
                    res.json().then(user => {
                        actions.resetForm()
                        setUser(user)
                        navigate(`/home`)
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
                <label> Name:
                    <input
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        onBlur={formik.handleBlur} />
                    {/*this is the onBlur*/}
                    {formik.touched.name && formik.errors.name ? (
                        <h3>{formik.errors.name}</h3>
                    ) : ("")}
                </label>
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
                <label> Email:
                    <input
                        type="text"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur} />
                    {formik.touched.email && formik.errors.email ? (
                        <h3>{formik.errors.email}</h3>
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
                <input type="submit" value="Let's Light These Candles!" />
            </form>
        </section>
    )
}

export default SignUp