import { useState, useEffect } from "react";

function Index() {
    const [pokeName, setPokeName] = useState("");
    const [result, setResult] = useState("");

    function handle_new_pokemon_name(e) {
        const poke_new_name = e.target.value;
        setPokeName(poke_new_name.toLowerCase());
    }

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
            .then((res) => res.json())
            .then((data) => {
                if (pokeName == "") {
                    setResult("");
                    console.warn("<empty string>");
                    return;
                }
                console.log(data);
                setResult("Founded Pokémon");
                //
            })
            .catch((err) => {
                setResult("Pokémon no encontrado");
            });

        //   return () => {
        //     second
        //   }
    }, [pokeName]);

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
                    <br />
                    <br />
                    {result}
                </form>
            </div>
            <div></div>
        </>
    );
}

export default Index;
