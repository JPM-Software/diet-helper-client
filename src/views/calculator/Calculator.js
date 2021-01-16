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
  const maleCoefficent = 5;
  const femaleCoefficent = -161;
  const userId = localStorage.getItem("userId");

  const [BMI, setBMI] = useState("");
  const [data, setData] = useState({
    weight: "",
    height: "",
    sex: "true",
    calories: 0,
    age: "",
    dietTarget: "",
    user: "",
  });

  const formData = {
    weight: data.weight || "",
    height: data.height || "",
    sex: data.sex || "",
    age: data.age || "",
    dietTarget: data.dietTarget,
    user: data.user,
  };

  useEffect(() => {
    const fetchData = async () => {
      fetch(`/api/users/${userId}/details/`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((json) => {
          const preparedData = { ...json, sex: String(json.sex) };
          setData(preparedData);
          const bmi = calculateBMI(preparedData);
          setBMI(bmi);
        });
    };

    fetchData();
  }, [userId]);

  const sendData = (values) => {
    const valuesToSend = prepareValues(values);
    if (Object.keys(valuesToSend).length === 0) {
      return;
    }
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(valuesToSend),
    };

    fetch(`/api/users/${userId}/details/`, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        const preparedData = { ...json, sex: String(json.sex) };
        setData(preparedData);
        const bmi = calculateBMI(preparedData);
        setBMI(bmi);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const prepareValues = (data) => {
    if (
      !data.sex ||
      !data.age ||
      !data.weight ||
      !data.height ||
      !data.dietTarget
    ) {
      return {};
    }

    data.calories =
      data.sex === "true"
        ? calculateBMRForSetTarget(data, maleCoefficent)
        : calculateBMRForSetTarget(data, femaleCoefficent);
    return data;
  };

  const calculateBMRForSetTarget = (data, sexCoefficient) => {
    let BMR =
      10 * data.weight + 6.25 * data.height - 5 * data.age + sexCoefficient;

    switch (data.dietTarget) {
      case "STAY":
        return parseInt(BMR, 10);
      case "REDUCE":
        return parseInt(BMR * 0.8, 10);
      case "GAIN":
        return parseInt(BMR * 1.2, 10);
      default:
        break;
    }
  };

  const calculateBMI = (data) => {
    const heightInMeters = data?.height / 100;
    const bmi = data?.weight / (heightInMeters * heightInMeters);
    const reducedBMI = bmi.toFixed(2);
    return reducedBMI || 0;
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
                initialValues={formData}
                enableReinitialize={true}
                onSubmit={sendData}
              >
                {({ values, setFieldValue }) => {
                  return (
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
                              value={values.weight}
                              required
                              onChange={({ target }) =>
                                setFieldValue("weight", target.value)
                              }
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
                              value={values.height}
                              required
                              onChange={({ target }) =>
                                setFieldValue("height", target.value)
                              }
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
                              value={values.age}
                              required
                              onChange={({ target }) =>
                                setFieldValue("age", target.value)
                              }
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
                                id="sex-radio1"
                                name="sex"
                                value="true"
                                required
                                checked={values.sex === "true"}
                                onChange={({ target }) =>
                                  setFieldValue("sex", target.value)
                                }
                              />
                              <CLabel
                                variant="custom-checkbox"
                                htmlFor="sex-radio1"
                              >
                                Mężczyzna
                              </CLabel>
                            </CFormGroup>
                            <CFormGroup variant="custom-radio" inline>
                              <CInputRadio
                                custom
                                id="sex-radio2"
                                name="sex"
                                value="false"
                                checked={values.sex === "false"}
                                onChange={({ target }) =>
                                  setFieldValue("sex", target.value)
                                }
                              />
                              <CLabel
                                variant="custom-checkbox"
                                htmlFor="sex-radio2"
                              >
                                Kobieta
                              </CLabel>
                            </CFormGroup>
                          </div>
                        </CCol>
                        <CCol xs="12">
                          <div>
                            <CLabel>Wybierz swój cel</CLabel>
                          </div>
                          <div>
                            <CFormGroup variant="custom-radio" inline>
                              <CInputRadio
                                custom
                                required
                                id="dietTarget-radio1"
                                name="dietTarget"
                                value="REDUCE"
                                checked={values.dietTarget === "REDUCE"}
                                onChange={({ target }) =>
                                  setFieldValue("dietTarget", target.value)
                                }
                              />
                              <CLabel
                                variant="custom-checkbox"
                                htmlFor="dietTarget-radio1"
                              >
                                Zmniejsz masę
                              </CLabel>
                            </CFormGroup>
                            <CFormGroup variant="custom-radio" inline>
                              <CInputRadio
                                custom
                                id="dietTarget-radio2"
                                name="dietTarget"
                                value="STAY"
                                checked={values.dietTarget === "STAY"}
                                onChange={({ target }) =>
                                  setFieldValue("dietTarget", target.value)
                                }
                              />
                              <CLabel
                                variant="custom-checkbox"
                                htmlFor="dietTarget-radio2"
                              >
                                Utrzymaj mase
                              </CLabel>
                            </CFormGroup>
                            <CFormGroup variant="custom-radio" inline>
                              <CInputRadio
                                custom
                                id="dietTarget-radio3"
                                name="dietTarget"
                                value="GAIN"
                                checked={values.dietTarget === "GAIN"}
                                onChange={({ target }) =>
                                  setFieldValue("dietTarget", target.value)
                                }
                              />
                              <CLabel
                                variant="custom-checkbox"
                                htmlFor="dietTarget-radio3"
                              >
                                Przybierz masę
                              </CLabel>
                            </CFormGroup>
                          </div>
                        </CCol>
                      </CRow>
                      <CRow className="marginTop">
                        <CCol xs="12">
                          <CFormGroup className="form-actions">
                            <CButton type="submit" size="sm" color="success">
                              Zapisz
                            </CButton>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </Form>
                  );
                }}
              </Formik>
            </CCardBody>
          </CCard>
          <CCard>
            <CCardBody>
              <CJumbotron className="border">
                {data.calories > 0 && (
                  <div>
                    <h1 className="display-7">Twoje cele:</h1>
                    <p className="lead">
                      Twoje BMI wynosi {BMI}. Aby uzyskać wybrany cel zalecamy
                      spożywać {data.calories} kalorii dziennie.
                    </p>
                  </div>
                )}
                {data.calories === 0 && (
                  <div>
                    <h1 className="display-7">Najpierw oblicz dane</h1>
                    <p className="lead">
                      Aby wyznaczyć swoje cele prosimy użyć kalkulatora
                      znajdującego się powyżej.
                    </p>
                  </div>
                )}
              </CJumbotron>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Calculator;
