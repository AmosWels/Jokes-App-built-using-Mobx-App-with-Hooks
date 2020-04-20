import React from "react";
import axios from 'axios';

const getData = async (value)=> (
// http://api.icndb.com/jokes/15
    await axios.get(`https://api.icndb.com/jokes/${value}/`).then(response =>{
        const { value } = response?.data || [];
        console.log('response>>>>>', value)
        // const {data} = response;
        return value;
    })
);

export default getData;