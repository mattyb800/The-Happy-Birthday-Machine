import React, { useState, useContext } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom"
import UserContext from "./Context/UserContext";
import hats from "../hats.PNG";
function LogIn({ updateUser }) {
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { username } = useParams()
    const { setUser } = useContext(UserContext);
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
                        console.log(user)
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
        <section >

            <form onSubmit={formik.handleSubmit} className="login">

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
            <img style={{ width: 500, height: 600 }} src={hats} alt="hats"></img>
        </section>



    )
}

export default LogIn