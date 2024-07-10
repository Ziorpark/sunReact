import React from "react";
import { useForm } from 'react-hook-form';



function DBsend() {
    const spsrNum = "000300101";

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div>
            <h1> hi </h1>
        </div>

    );

}

export default DBsend;