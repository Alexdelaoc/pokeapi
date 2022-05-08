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
            setPokemon([data, ...pokemon]);
          }
        } catch (error) {
          console.log(error);
          setInput('');
        }
      };
      fetchData();
    }, [input] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const debounce = (callback, wait) => {
    let timeout; // Definimos una variable que, posteriormente, será el tiempo de espera hasta que se ejecute nuevamente la función de callback
    return (...args) => { // No acabo de entender muy bien cómo funciona esta línea.
      const context = this; // Teniendo en cuenta el comportamiento de la función de setTimeout (la cuál crea una nueva instancia en el objeto cada vez que se llama, aplicamos a la constante context la instancia en la que se le está aplicando, para posteriormente aplicárselo como argumento a la función de callback).
      clearTimeout(timeout); // Si timeout está definido, servirá como argumento para clearTimeout.
      timeout = setTimeout(() => callback.apply(context, args), wait); // El wait es innceseraio, ya que setTimeout() de por sí acepta como segundo argumento un número que significa el tiempo a esperar en milisegundos.
    };
  }

  const handleChange = (e) => {
    if (e.target.value !== '') {
      console.log(e.target.value);
      setInput(e.target.value.toLowerCase());
    }
    
  }

  const paintCards = () => {
    return pokemon.map(aPokemon => (
      <Card key={uuidv4()} data={aPokemon} />
    ));
  }

  return (
    <div>
      <h1>Welcome to your Pokedex!</h1>
      <h3>This is a project developed with React and with help from:</h3>
      <img src="https://avatars.githubusercontent.com/u/64151210?v=4" alt="pokeApi" />

      <form>
        <input type="text" name="input" placeholder="Gotta catch 'em all!" onChange={ debounce(handleChange, 2000)}/>
      </form>
      {pokemon.length !== 0 ? paintCards() : ""}

    </div>
  )
}

export default Main;
