import React, { useState } from "react";
import {
    Container, Row, Col, Spinner
} from "react-bootstrap";
import {
    REACT_APP_FAST_API_URL, STATUS_CODES, verifyUrl
} from "./../../constants/constants";

const VerifyShortURLForm = () => {

    const [value, setValue] = useState("");

    const [messageData, setmessageData] = useState({
        type: "",
        message: ""
    });
    const [isFetching, setIsFetching] = useState(false);


    const onClick = async () => {
        console.log("value", value);
        // api call
        try {
            setIsFetching(true);
            const result = await fetch(`${REACT_APP_FAST_API_URL}${verifyUrl}`, {
                method: "POST",
                body: value
            },
            )
            const data = await result.json();
            console.log("data", data);
            setmessageData({
                type: STATUS_CODES.SUCCESS === result.status ? "sucess" : "error",
                message: STATUS_CODES.SUCCESS === result.status ? `Short URL exists ->  ${data.actual_url}` :
                    "Short URL does not exist in the system"
            })
        } catch (err) {
            console.log("err", err)
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
                    Short Url:
                </h6>
            </Col>
        </Row>
        <Row className="mb-4" >
            <Col lg={4} md={9}>
                <input onChange={onChange} placeholder="Verify your short URL here...." value={value} />
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
            <Col lg={4} md={9}>
                <button onClick={onClick}>Verify</button>
            </Col>
            <Col md={4}>
                {
                    isFetching ? <Spinner animation="border" size="sm" /> :

                        <div className={`message-${messageData.type}`}>{messageData.message}</div>
                }
            </Col>
        </Row>
    </Container>
};


export default VerifyShortURLForm;