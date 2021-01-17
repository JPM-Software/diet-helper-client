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
import { Formik, Form } from "formik";
import { useHistory, Link } from "react-router-dom";

const Login = () => {
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
      body: values,
    };

    fetch(`https://diet-helper-api-app.herokuapp.com/api/users/login/`, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        handleResponse(JSON.stringify(json));
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const handleResponse = (data) => {
    if (data.id) {
      localStorage.setItem("userId", data.id);
      history.push("/");
    } else {
      // toast z wiadomoscia data.message
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
                          <h1>Logowanie</h1>
                          <p className="text-muted">
                            Zaloguj się do swojego konta
                          </p>
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
                          <CInputGroup className="mb-4">
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
                              autoComplete="current-password"
                              required
                              onChange={({ target }) =>
                                setFieldValue("password", target.value)
                              }
                            />
                          </CInputGroup>
                          <CRow>
                            <CCol xs="12">
                              <CButton
                                type="submit"
                                color="primary"
                                block
                              >
                                Zaloguj się
                              </CButton>
                            </CCol>
                          </CRow>
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
                    <h2>Rejestracja</h2>
                    <p>
                      Utwórz swoje konto poznaj swój stan fizyczny. Zdecyduj o
                      swojej diecie i zapisuj swoje dzienne spożycie.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="success"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Zarejestruj się!
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

export default Login;
