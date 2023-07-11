import React, { useState } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom"

function AddRecipients({ user, updateRecipients }) {
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { username } = useParams()




  const schema = yup.object().shape({
    name: yup.string().required("What do you call them?"),
    birthday: yup.date().required("What day were they born?")
  })

  console.log(user)

  const formik = useFormik({
    //initial values form
    initialValues: {
      name: "",
      birthday: ""
    },
    //yup schema for validation
    validationSchema: schema,
    //submit callback
    onSubmit: (values, actions) => {
      console.log(values)
      if (user) {
        fetch(`/recipient`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(values)
        }).then(res => {
          if (res.ok) {
            res.json().then((recipient) => {
              console.log(recipient);
              actions.resetForm();
              updateRecipients(recipient);
              navigate(`users/${username}`)
            })
          } else {
            res.json().then((error) => setError(error.message));
          }
        })
      }
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
          {formik.touched.name && formik.errors.name ? (
            <h3>{formik.errors.name}</h3>
          ) : ("")}
        </label>

        <label> Birthday:
          <input
            type="date"
            name="birthday"
            onChange={formik.handleChange}
            value={formik.values.birthday}
            onBlur={formik.handleBlur} />
          {formik.touched.birthday && formik.errors.birthday ? (
            <h3>{formik.errors.birthday}</h3>
          ) : ("")}
        </label>
        <input type="submit" value="Add!" />
      </form>
    </section>



  )
}

export default AddRecipients