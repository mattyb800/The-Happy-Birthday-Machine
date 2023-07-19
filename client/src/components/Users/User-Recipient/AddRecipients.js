import React, { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams, useContext } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function AddRecipients({ user, updateRecipients }) {
  const [error, setError] = useState(null)

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
        fetch(`/users/${username}/recipients`, {
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

      <Form className='friend-form' onSubmit={formik.handleSubmit}>
        <Row >
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label column="lg" lg={4}> Name:
              <Form.Control
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur} />
              {formik.touched.name && formik.errors.name ? (
                <h3>{formik.errors.name}</h3>
              ) : ("")}
            </Form.Label>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridBday">
            <Form.Label column="lg" lg={4}> Birthday:
              <Form.Control
                type="date"
                name="birthday"
                onChange={formik.handleChange}
                value={formik.values.birthday}
                onBlur={formik.handleBlur} />
              {formik.touched.birthday && formik.errors.birthday ? (
                <h3>{formik.errors.birthday}</h3>
              ) : ("")}
            </Form.Label>
            <input type="submit" value="Add!" />
          </Form.Group>
        </Row>
      </Form>
    </section>



  )
}

export default AddRecipients