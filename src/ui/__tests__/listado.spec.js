import { mostrarListadoPokemones } from "../listado";

describe('mostrarListadoPokemones', () => {
    let pokemonSeleccionadoCallback;
    let nombresPokemones;

    beforeEach(() => {
        pokemonSeleccionadoCallback = jest.fn(); 
        nombresPokemones = ['Bulbasaur', 'Pikachu', 'Charmander'];
    });

    it('debe llamar a pokemonSeleccionadoCallback cuando se hace clic en un Pokémon', () => {
        mostrarListadoPokemones(nombresPokemones, pokemonSeleccionadoCallback);
    
        const $indice = document.querySelector('#indice');
        const $enlace1 = $indice.querySelector('a');
    
        $enlace1.click();
    
        expect(pokemonSeleccionadoCallback).toHaveBeenCalledTimes(1); 
        expect(pokemonSeleccionadoCallback).toHaveBeenCalledWith('Bulbasaur');
    });

    it('debe agregar el texto del nombre del Pokémon al enlace', () => {
        mostrarListadoPokemones(nombresPokemones, pokemonSeleccionadoCallback);
    
        const $indice = document.querySelector('#indice');
        const $enlace1 = $indice.querySelector('a');
    
        expect($enlace1.textContent).toBe('Bulbasaur');
    });
});
