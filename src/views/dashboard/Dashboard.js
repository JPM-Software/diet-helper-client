import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CJumbotron,
  CRow,
} from '@coreui/react'
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const history = useHistory();
  const goToDiary = () => history.push('/diary');
  const goToCalculator = () => history.push('/calculator');
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <CJumbotron className="border">
                <h1 className="display-4">Kalkulator zapotrzebowania kalorycznego</h1>
                <p className="lead">
                  Dowiedz się podstawowych informacji o swojej wadze i zapotrzebowaniu kalorycznym oraz wybierz cel jaki chcesz osiągnąć.
                </p>
                <hr className="my-2" />
                <p className="lead">
                  <CButton color="primary" size="lg" onClick={goToCalculator}>
                    Przejdź do kalkulatora
                  </CButton>
                </p>
              </CJumbotron>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard>
            <CCardBody>
              <CJumbotron className="border">
              <h1 className="display-4">Dziennik twojego spożycia</h1>
                <p className="lead">
                  Zapisuj i kontroluj swoje dzienne spożycie. 
                </p>
                <hr className="my-2" />
                <p className="lead">
                  <CButton color="primary" size="lg" onClick={goToDiary}>
                    Przejdź do dziennika
                  </CButton>
                </p>
              </CJumbotron>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
