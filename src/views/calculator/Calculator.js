import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CInputRadio,
  CLabel,
  CRow,
  CJumbotron,
} from "@coreui/react";
import "./Calculator.css";
import { Formik, Form } from "formik";

const Calculator = () => {
  const [data, setData] = useState({ hits: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = fetch(
        "/api/users/112/details/",
        {
          method: "GET",
          // headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => res.json())
        .then((json) => {
          console.log(
            "🚀 ~ file: Calculator.js ~ line 30 ~ .then ~ json",
            json
          );

          setData(json);
        });
    };

    fetchData();
  }, []);

  const sendData = (values) => {
    console.log(
      "🚀 ~ file: Calculator.js ~ line 21 ~ sendData ~ values",
      values
    );
  };
  return (
    <>
      <CRow className="rtlDirection">
        <CCol xs="12" md="6">
          <CCard>
            <CCardBody>
              <CJumbotron className="border">
                <h1 className="display-4">
                  Kalkulator zapotrzebowania kalorycznego
                </h1>
                <p className="lead">
                  W formularzu obok obliczysz swoje parametry BMI i BMR, które
                  pomogą Ci określić swój stan fizyczny i zapotrzebowanie
                  kaloryczne potrzebne do osiągnięcia wyznaczonego celu.
                </p>
                <hr className="my-2" />
              </CJumbotron>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>Kalkulator kaloryczności</CCardHeader>
            <CCardBody>
              <Formik
                initialValues={{
                  height: "",
                  weight: "",
                  age: "",
                  sex: "",
                }}
                onSubmit={sendData}
              >
                {({ values, handleChange }) => (
                  <Form>
                    <CRow>
                      <CCol xs="12" md="6">
                        <CFormGroup>
                          <CLabel htmlFor="weight">Masa</CLabel>
                          <CInput
                            id="weight"
                            name="weight"
                            placeholder="Wprowadź masę"
                            type="number"
                            required
                            onChange={handleChange}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" md="6">
                        <CFormGroup>
                          <CLabel htmlFor="height">Wzrost</CLabel>
                          <CInput
                            id="height"
                            name="height"
                            placeholder="Wprowadź wzrost"
                            type="number"
                            required
                            onChange={handleChange}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" md="6">
                        <CFormGroup>
                          <CLabel htmlFor="age">Wiek</CLabel>
                          <CInput
                            id="age"
                            name="age"
                            placeholder="Wprowadź wiek"
                            type="number"
                            required
                            onChange={handleChange}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="6">
                        <div>
                          <CLabel>Płeć</CLabel>
                        </div>
                        <div>
                          <CFormGroup variant="custom-radio" inline>
                            <CInputRadio
                              custom
                              id="inline-radio1"
                              name="sex"
                              value={true}
                              onChange={handleChange}
                            />
                            <CLabel
                              variant="custom-checkbox"
                              htmlFor="inline-radio1"
                            >
                              Mężczyzna
                            </CLabel>
                          </CFormGroup>
                          <CFormGroup variant="custom-radio" inline>
                            <CInputRadio
                              custom
                              id="inline-radio2"
                              name="sex"
                              value={false}
                              onChange={handleChange}
                            />
                            <CLabel
                              variant="custom-checkbox"
                              htmlFor="inline-radio2"
                            >
                              Kobieta
                            </CLabel>
                          </CFormGroup>
                        </div>
                      </CCol>
                    </CRow>
                    <CRow className="marginTop">
                      <CCol xs="12 noPadding">
                        <CFormGroup className="form-actions">
                          <CButton type="submit" size="sm" color="success">
                            Zapisz
                          </CButton>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                  </Form>
                )}
              </Formik>
            </CCardBody>
          </CCard>
          <CCard>
            <CCardBody>
              <CJumbotron className="border">
                <div>
                  <CLabel htmlFor="weight">Masa</CLabel>
                </div>
                <div>{}</div>
              </CJumbotron>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Calculator;
