import React, { useState, useContext } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom"
import UserContext from "./Context/UserContext";


function UserForm({ editUser }) {

    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { username } = useParams()
    const { user, setUser } = useContext(UserContext)



    function handleDelete() {
        fetch(`/users/${username}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => {
                setUser(null);
                navigate('/app")')
            });
    }





    const schema = yup.object().shape({
        name: yup.string("Edit name"),
        username: yup.string("Edit username"),
        email: yup.string("Edit email"),
        password: yup.string("Change password"),

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
            editUser(values)
            actions.resetForm()
            navigate(`/users/${username}`)
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
                <input type="submit" value="Change Info!" />
            </form>
            <button className="button" onClick={() => handleDelete(user)}>Delete Account</button>
        </section>
    )
}

export default UserForm