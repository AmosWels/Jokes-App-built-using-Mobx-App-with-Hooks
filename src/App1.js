import React, { useState } from "react";
import { useLocalStore, useObserver } from "mobx-react";
import getData from './apiData';
const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    jokes:[],
    addJoke: joke => {
      store.jokes.push(joke);
    },
    get jokesCount() {
      return store.jokes.length;
    }
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const JokesHeader = () => {
  const store = React.useContext(StoreContext);
  const jokeValue = store.jokesCount === 1 ? 'Joke': 'Jokes'; 
  return useObserver(() =>
    <h1>{store.jokesCount} {jokeValue} </h1>
  )
};

const JokesList = () => {
  const store = React.useContext(StoreContext);

  return useObserver(() => (
    <ul>
      {store.jokes.map(joke => (
        <li key={joke}>{joke}</li>
      ))}
    </ul>
  ));
};

const JokesForm = () => {
  const store = React.useContext(StoreContext);
  const [joke, setJoke] = React.useState("");

  const handleFetch = async (e) => {
      e.preventDefault();
      console.log('returned joke', joke)
    const returnedData = await getData(joke);
    console.log('returned data', returnedData)
    if (returnedData){
        store.addJoke(returnedData.joke);
        setJoke("");
    }
}

  return (
    <form onSubmit={handleFetch}>
      <input
        type="number"
        label="Joke number"
        placeholder="Enter Joke number"
        value={joke}
        onChange={e => {
          setJoke(e.target.value);
        }}
      /><br/>
      <button type="submit">Fetch Joke</button>
    </form>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <main>
        <JokesHeader />
        <JokesList />
        <JokesForm />
      </main>
    </StoreProvider>
  );
}
