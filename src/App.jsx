import React, { useState, useEffect } from 'react';
import './App.css';

const BuscadorPokemon = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let timeoutId;

    const fetchData = async () => {
      if (searchTerm.trim() !== '') {
        setIsLoading(true);
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
          if (response.ok) {
            const data = await response.json();
            setSearchResults([data]);
            setError(null);
          } else {
            setSearchResults([]);
            setError('No se encontraron resultados.');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Hubo un problema al buscar el Pokémon. Por favor, inténtalo de nuevo.');
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
        setError(null);
      }
    };

    clearTimeout(timeoutId);
    if (searchTerm.trim() !== '') {
      timeoutId = setTimeout(fetchData, 500); // Espera 500ms después de que el usuario deja de escribir
    }

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="buscador-container">
      <h2>Buscador de Pokémon</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Ingrese el nombre del Pokémon"
          value={searchTerm}
          onChange={handleChange}
        />
      </form>
      {isLoading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {searchResults.length > 0 && !isLoading && !error && (
        <div className="resultado-container">
          {searchResults.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <h3>{pokemon.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuscadorPokemon;
