import React, { useState } from "react";
import GenerateURLForm from "./GenerateURLForm";
import "./ShortnerForm.scss";
import VerifyShortURLForm from "./VerifyShortURLForm";


const ShortnerForm = () => {

    const [currentPage, setCurrentPage] = useState(1);

    const onChange = (newPage) => {
        setCurrentPage(newPage);
    }


    return <div className="shortner-form">
        <button onClick={() => onChange(1)} className={`${currentPage === 1 ? "btn-selected" : ""}`} >Generate</button>
        <button onClick={() => onChange(2)} className={`${currentPage === 2 ? "btn-selected" : ""}`}>Verfy</button>
        <div className="form-container">
            {
                currentPage == 1 ?
                    <GenerateURLForm />
                    :
                    <VerifyShortURLForm />
            }
        </div>


    </div>
}


export default ShortnerForm;