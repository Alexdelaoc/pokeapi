import axios from "axios";
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Card from './Card'

const Main = () => {

  // Creamos los estados
  const [input, setInput] = useState('');
  const [pokemon, setPokemon] = useState([]);

  useEffect(
    () => {
      const fetchData = async () => {
        try {
          if (input !== '') {
            const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${input}`);
            const data = await resp.data;
            setPokemon([data]); // setPokemon([data, ...pokemon]) si quiero que se sigan almacenando en Pokemons en el array del estado, y seguir pintándolos.
            setInput('');
          }
        } catch (error) {
          console.log(error);
          setInput('');
        }
      };
      fetchData();
    },
    [input] 
    // eslint-disable-line react-hooks/exhaustive-deps
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput(e.target.input.value.toLowerCase());
    e.target.input.value = '';
  };

  const paintCards = () => {
    return pokemon.map(aPokemon => (
      <Card key={uuidv4()} data={aPokemon} />
    ));
  }

  return (
    <div>
      <h1>Welcome to your Pokedex!</h1>
      <h3>This is a project, developed with React and with help from:</h3>
      <img src="https://avatars.githubusercontent.com/u/64151210?v=4" alt="pokeApi" />

      <form onSubmit={handleSubmit}>
        <input name="input" />
        <button type="submit"> Search </button>
      </form>
      { pokemon.length !== 0 ? paintCards() : "" }
    </div>
  )
}

export default Main;
