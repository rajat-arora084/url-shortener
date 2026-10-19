import React from "react";
import {
    Container, Row, Col
} from "react-bootstrap";
import ShortnerForm from "../shortnerform/ShortnerForm";
import "./MainContainer.scss";
import { mainText2, mainText3 } from "./../../constants/constants"


const MainContainer = () => {

    return <Container fluid className="main-container">
        <Row gx={4}>
            <Col lg={6} md={12} >
                <div className="px-5 py-5" >
                    <h1>Transform your long URLs <br /> into powerful
                        & short urls</h1>
                    <p className="pt-3">
                        {mainText2}
                    </p>
                    <p className="pt-2">
                        {mainText3}
                    </p>
                </div>
            </Col>
            <Col lg={6} md={12}>
                <div className="px-5 py-5" >
                    <ShortnerForm />
                </div>
            </Col>
        </Row>
    </Container>
};


export default MainContainer;