import axios from "axios";
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PokeCard from './PokeCard';
import { TextField, Typography, LinearProgress } from "@mui/material";

const Main = () => {

  // Creamos los estados
  const [input, setInput] = useState('');
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      const fetchData = async () => {
        try {
          if (input !== '') {
            const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${input}`);
            const data = await resp.data;
            setPokemon([data, ...pokemon]);
            setLoading(false)
          } else if (input === "") {
            setLoading(false)
          }
        } catch (error) {
          console.log(error);
          setInput('');
          setLoading(false);
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
      setLoading(true);
    };
  }

  const handleChange = (e) => {
    if (e.target.value !== '') {
      setInput(e.target.value.toLowerCase()); // Hay que asegurarse de que el Pokemon que se introduce en el estado pokemon no está repetido.
    }
    
  }

  const paintCards = () => {
    return pokemon.map(aPokemon => (
      <PokeCard key={uuidv4()} data={aPokemon} />
    ));
  }

  return (
    <div className="main">
      <div className="main__presentation">
        <Typography variant="h3">
          Welcome to your Pokedex!
        </Typography>
        <Typography variant="h4">
          This is a project developed with React for The Bridge
        </Typography>
      </div>
      <div className="main__searchbar">
        <TextField id="filled-basic" fullWidth label="Gotta catch 'em all!" variant="filled" name="input" onChange={debounce(handleChange, 3000)}/>
      </div>
      {loading ? <div className="main__loading-bar"> <LinearProgress/> </div> : ''}
      <div className="main__pokeList">
        {pokemon.length !== 0 ? paintCards() : ""}
      </div>
      

    </div>
  )
}

export default Main;
