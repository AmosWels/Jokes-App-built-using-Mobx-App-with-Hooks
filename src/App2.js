import React, {useState} from 'react';
import getData from './apiData'

const JokesData = () => {
    getData(number){
        axios.get('http://jsonplaceholder.typicode.com/users').then(response => {
            this.setUsers(response.data);
            console.log(response.data)
        });
    }
    const [jokes, setJokes] = useState("")
    console.log("state data", jokes)
    const jokeData = getData();
    // if(jokeData.length !== 0 ){
    //     setJokes(jokeData)
    // }
    // return(

    // );
}

export default JokesData;