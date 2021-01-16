import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CFormGroup,
  CInput,
  CJumbotron,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from "@coreui/react";
import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import "./Diary.css";

const Diary = () => {
  const [foodsData, setFoods] = useState([]);

  const calculateTodayDate = () => {
    var current = new Date();
    current.setDate(current.getDate());
    return current.toISOString().substr(0, 10);
  };

  const userId = localStorage.getItem("userId");
  const [todayDate] = useState(calculateTodayDate());
  const [modal, setModal] = useState(false);
  const [diaryId, setDiaryId] = useState(false);
  const [calories, setCalories] = useState("");
  const [caloriesEaten, setCaloriesEaten] = useState("");
  const [sex, setSex] = useState("");
  const [data] = useState({
    name: "",
    calories: "",
  });

  const displayFoodModal = () => {
    setModal(!modal);
  };

  const loadUserData = async () => {
    fetch(`/api/users/${userId}/details/`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        setCalories(json.calories);
        setSex(json.sex);
      });
  };

  const loadTodaysDiary = async () => {
    fetch(`/api/diaries/by-user/${userId}/today/`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        const { foods, id } = json;
        calculateCaloriesEaten(foods);
        setFoods(foods);
        setDiaryId(id);
      });
  };

  const calculateCaloriesEaten = (foods) => {
    if (foods.length === 0) {
      return;
    }
    const caloriesEaten = foods
      .map((food) => food.calories)
      .reduce((a, b) => a + b);
    setCaloriesEaten(caloriesEaten);
  };

  useEffect(() => {
    loadTodaysDiary();
    loadUserData();
  }, [userId]);

  const deleteFood = (foodId) => {
    fetch(`/api/diaries/foods/${foodId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {});
    loadTodaysDiary();
  };

  const addNew = (values) => {
    saveNewFood(values);
  };

  const saveNewFood = (food) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(food),
    };

    fetch(`/api/diaries/foods/`, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        saveFoodToDiary(json.id);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const saveFoodToDiary = (foodId) => {
    let foods = foodsData.map((food) => {
      return food.id;
    });

    foods.push(foodId);

    const diaryData = {
      user: Number(userId),
      date: todayDate,
      foods: foods,
    };
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(diaryData),
    };

    fetch(`/api/diaries/${diaryId}`, requestOptions)
      .then((res) => res.json())
      .then(() => {
        loadTodaysDiary();
        displayFoodModal();
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const fields = [
    { key: "name", label: "Posiłek", _style: { width: "50%" } },
    { key: "calories", label: "Kalorie", _style: { width: "40%" } },
    {
      key: "delete",
      label: "",
      _style: { width: "5%" },
      sorter: false,
      filter: false,
    },
  ];

  return (
    <div>
      <CRow>
        <CCol xs="12" md="4">
          <CCard>
            <CCardBody className="diaryDate">
              Twoje spożycie w dniu {todayDate}
            </CCardBody>
          </CCard>
          <CCard>
            <CCardBody>
              <CJumbotron className="border">
                <h1 className="display-7">
                  Twój cel na dzisiaj to {calories} kalorii.
                </h1>
                <p className="lead">
                  Dzisiaj {String(sex) === "true" ? "spożyłeś" : "spożyłaś"} już{" "}
                  {caloriesEaten} kalorii.
                </p>
              </CJumbotron>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" md="8">
          <CCol xs="12">
            <CCard className="captionCard">
              <CCardBody className="caption">
                <CButton
                  color="primary"
                  onClick={() => {
                    displayFoodModal();
                  }}
                >
                  Dodaj posiłek
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs="12">
            <CDataTable
              items={foodsData}
              fields={fields}
              columnFilter
              itemsPerPage={10}
              hover
              sorter
              pagination
              scopedSlots={{
                delete: (item, index) => {
                  return (
                    <td className="py-2">
                      <CButton
                        color="danger"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={() => {
                          deleteFood(item.id);
                        }}
                      >
                        Usuń
                      </CButton>
                    </td>
                  );
                },
              }}
            />
          </CCol>
        </CCol>
      </CRow>
      <CModal show={modal} onClose={displayFoodModal}>
        <CModalHeader closeButton>Dodaj posiłek</CModalHeader>
        <Formik
          onSubmit={(values, { resetForm }) => {
            addNew(values);
            resetForm({ values: "" });
          }}
          initialValues={data}
          enableReinitialize={true}
        >
          {({ values, setFieldValue }) => {
            return (
              <div>
                <Form>
                  <CModalBody>
                    <CRow>
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel htmlFor="name">Nazwa</CLabel>
                          <CInput
                            id="name"
                            name="name"
                            placeholder="Wprowadź nazwę posiłku"
                            type="text"
                            value={values.name}
                            required
                            onChange={({ target }) =>
                              setFieldValue("name", target.value)
                            }
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel htmlFor="calories">Kalorie</CLabel>
                          <CInput
                            id="calories"
                            name="calories"
                            placeholder="Wprowadź ilość kalorii"
                            type="number"
                            value={values.calories}
                            required
                            onChange={({ target }) =>
                              setFieldValue("calories", target.value)
                            }
                          />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                  </CModalBody>
                  <CModalFooter>
                    <CButton type="submit" color="success">
                      Dodaj posiłek
                    </CButton>{" "}
                    <CButton color="secondary" onClick={displayFoodModal}>
                      Anuluj
                    </CButton>
                  </CModalFooter>
                </Form>
              </div>
            );
          }}
        </Formik>
      </CModal>
    </div>
  );
};

export default Diary;
