import { useState, useEffect } from "react";

function Index() {
    const [pokemon, setPokemon] = useState("");
    const [result, setResult] = useState(false);
    const [poke_name, setPoke_name] = useState(false);
    const [poke_img, setPoke_img] = useState(false);
    const [poke_types, setPoke_types] = useState(false);

    const capitalize = (value) => {
        if (typeof value !== "string") return value;
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    };

    function handle_new_pokemon_name(e) {
        const poke_new_name = e.target.value;
        setPokemon(poke_new_name.toLowerCase());
    }

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then((res) => res.json())
            .then((data) => {
                if (pokemon == "") {
                    setResult(false);
                    console.warn("<empty string>");
                    return;
                }
                console.log(data);
                // setResult(`Founded Pokémon: ${capitalize(data.name)}`);
                setPoke_name(capitalize(data.name));
                setPoke_img(data.sprites.front_default);
                setPoke_types();
                setResult(true);
                //
            })
            .catch((err) => {
                setResult(false);
            });
    }, [pokemon]);

    return (
        <>
            <div>
                <h1>Busca un Pokémon</h1>
                <form>
                    <input
                        type="text"
                        id="poke_input"
                        onChange={handle_new_pokemon_name}
                        placeholder="Busca un pokemon"
                    />
                </form>
            </div>
            <br />
            <div>
                <>
                    {result !== false ? (
                        <p>{pokemon}</p>
                    ) : pokemon == "" ? (
                        <></>
                    ) : (
                        <b>Pokémon no encontrado</b>
                    )}
                </>
            </div>
        </>
    );
}

export default Index;
