import React, { useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory, Link } from "react-router-dom";
import { Form, Formik } from "formik";

const Register = () => {
  const formData = {
    login: "",
    password: "",
  };

  const history = useHistory();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userId");
    if (loggedInUser) {
      history.push("/");
    }
  }, [history]);

  const sendData = (values) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    };

    fetch(`https://diet-helper-api-app.herokuapp.com/api/users/`, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        handleResponse(json);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const handleResponse = (data) => {
    if (!data.message) {
      history.push("/login");
    } else {
      //toast ze nie istnieje juz takie konto
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <Formik initialValues={formData} onSubmit={sendData}>
                    {({ setFieldValue }) => {
                      return (
                        <Form>
                          <h1>Rejestracja</h1>
                          <p className="text-muted">Utwórz swoje konto</p>
                          <CInputGroup className="mb-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-user" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              id="login"
                              name="login"
                              type="text"
                              placeholder="Nazwa"
                              autoComplete="username"
                              required
                              onChange={({ target }) =>
                                setFieldValue("login", target.value)
                              }
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              id="password"
                              name="password"
                              type="password"
                              placeholder="Hasło"
                              autoComplete="new-password"
                              required
                              onChange={({ target }) =>
                                setFieldValue("password", target.value)
                              }
                            />
                          </CInputGroup>
                          <CButton type="submit" color="success" block>
                            Utwórz konto
                          </CButton>
                        </Form>
                      );
                    }}
                  </Formik>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-gradient-info py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Logowanie</h2>
                    <p>
                      Jeśli posiadasz już konto, kliknij przyciks poniżej i
                      przejdź do logowania.
                    </p>
                    <Link to="/login">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Zaloguj się!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
