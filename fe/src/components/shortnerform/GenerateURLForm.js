import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import "./ShortnerForm.scss";

import { REACT_APP_HOST, REACT_APP_FAST_API_URL, generateUrl, STATUS_CODES } from "../../constants/constants";

const GenerateURLForm = () => {

    const [value, setValue] = useState("");
    const [messageData, setmessageData] = useState({
        type: "",
        message: ""
    });
    const [isFetching, setIsFetching] = useState(false);

    const onSubmit = async () => {
        // call api
        try {
            setIsFetching(true);
            const result = await fetch(`${REACT_APP_FAST_API_URL}${generateUrl}`, {
                method: "POST",
                body: value
            },
            )
            const data = await result.json();
            console.log("data", data);
            setmessageData({
                type: STATUS_CODES.CREATED === result.status ? "sucess" : "error",
                message: `${data.message} URL: ${data.short_url}`
            })
        } catch (err) {
            setmessageData({
                type: "error",
                message: "Some error occured!"
            })

        } finally {
            setIsFetching(false);
        }
    }

    const onChange = (e) => setValue(e.target.value);

    return <Container fluid>
        <Row className="mb-2">
            <Col lg={4} md={9}>
                <h6>
                    Long Url:
                </h6>
            </Col>
        </Row>
        <Row className="mb-4" >
            <Col lg={4} md={9}>
                <input onChange={onChange} placeholder="Enter your URL here....." value={value} />
            </Col>
        </Row>
        <Row className="mb-2">
            <Col lg={4} md={9}>
                <h6>
                    Domain:
                </h6>
            </Col>
        </Row>
        <Row className="mb-4">
            <Col lg={4} md={9}>
                <h6>
                    {REACT_APP_FAST_API_URL}
                </h6>
            </Col>
        </Row>
        <Row>
            <Col md={2}>
                <button onClick={onSubmit} disabled={!value}>Generate</button>
            </Col>
            <Col md={2}>
                {
                    isFetching ? <Spinner animation="border" size="sm" /> :

                        <div className={`message-${messageData.type}`}>{messageData.message}</div>
                }
            </Col>
        </Row>
    </Container>
};

export default GenerateURLForm;