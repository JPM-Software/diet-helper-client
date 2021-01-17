import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CJumbotron,
  CRow,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Contact.css";

const Contact = () => {
  const position = [50.28678, 18.67793];

  return (
    <>
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardBody>
              <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>Witamy u Nas</Popup>
                </Marker>
              </MapContainer>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" md="6">
          <CCard>
            <CCardBody>
              <CJumbotron className="border">
                <h1 className="display-7">Nasza siedziba znajduje się w</h1>
                <p className="lead">
                  Gliwice 44-100 <br /> Kujawska 2
                </p>
              </CJumbotron>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Contact;
