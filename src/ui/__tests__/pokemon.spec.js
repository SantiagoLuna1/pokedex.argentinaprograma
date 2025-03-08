import { mostrarTipos, mostrarHabilidades, mostrarMovimientos } from "../pokemon";
import mostrarPokemon from "../pokemon";
import { actualizarTextoAyuda } from "../general";

test('debe agregar tipos al DOM correctamente', () => {
    document.body.innerHTML = `<div id="tipos"></div>`;
    const $tipos = document.querySelector('#tipos');

    const tipos = ['fuego', 'agua'];

    mostrarTipos(tipos);

    expect($tipos.children.length).toBe(2);
    expect($tipos.children[0].classList.contains('fuego')).toBe(true);
    expect($tipos.children[1].classList.contains('agua')).toBe(true);
});

test('debe agregar movimientos al DOM correctamente', () => {
    document.body.innerHTML = `
    <div id="movimientos-contendor">
        <strong>Movimientos</strong>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Movimiento</th>
                    <th scope="col">Versiones</th>
                </tr>
            </thead>
            <tbody id="movimientos"></tbody>
        </table>
    </div>
    `;

    const $movimientos = document.querySelector('#movimientos');

    const movimientos = [
        { movimiento: 'Lanzallamas', versiones: ['Rojo', 'Amarillo'] },
        { movimiento: 'Rayo', versiones: ['Naranja', 'Verde'] },
    ];
    mostrarMovimientos(movimientos);

    expect($movimientos.children.length).toBe(2);
    const primeraFila = $movimientos.children[0];
    expect(primeraFila.querySelector('th').textContent).toBe('Lanzallamas');
    
    const primeraFilaVersiones = primeraFila.querySelectorAll('td span');
    expect(primeraFilaVersiones.length).toBe(2);
    expect(primeraFilaVersiones[0].textContent).toBe('Rojo');
    expect(primeraFilaVersiones[1].textContent).toBe('Amarillo');

    const segundaFila = $movimientos.children[1];
    expect(segundaFila.querySelector('th').textContent).toBe('Rayo');

    const segundaFilaVersiones = segundaFila.querySelectorAll('td span');
    expect(segundaFilaVersiones.length).toBe(2);
    expect(segundaFilaVersiones[0].textContent).toBe('Naranja');
    expect(segundaFilaVersiones[1].textContent).toBe('Verde');
});

test('debe agregar habilidades al DOM correctamente', () => {
    document.body.innerHTML = `
    <div id="habilidades-contenedor">
        <strong>Habilidades</strong>
        <div id="habilidades">
        <!-- -->
        </div>
    </div>
    `;

    const $habilidades = document.querySelector('#habilidades');
    const habilidades = ['Intimidación', 'Velocidad'];

    mostrarHabilidades(habilidades);

    expect($habilidades.children.length).toBe(2);

    expect($habilidades.children[0].textContent).toBe('Intimidación');
    expect($habilidades.children[1].textContent).toBe('Velocidad');
});


jest.mock('../general.js', () => ({
    actualizarTextoAyuda: jest.fn(), //se mockea la funcion actualizarTextoAyuda
}));

test('debe mostrar un Pokémon en el DOM', () => {
    document.body.innerHTML = `
    <div class="card" id="pokemon-contenedor">

        <div class="card-body">
            <h5 class="card-title"><strong id="pokemon-nombre">...</strong> (<strong
                    id="pokemon-id">...</strong>)</h5>

            <img class="card-img" id="pokemon-imagen" src="" alt="Imagen de pokemon"/>

            <div id="tipos-contenedor">
                <strong>Tipos</strong>
                <div id="tipos">
                    <!-- -->
                </div>
            </div>

            <div id="habilidades-contenedor">
                <strong>Habilidades</strong>
                <div id="habilidades">
                    <!-- -->
                </div>
            </div>

            <div id="movimientos-contendor">
                <strong>Movimientos</strong>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Movimiento</th>
                        <th scope="col">Versiones</th>
                    </tr>
                    </thead>
                    <tbody id="movimientos">
                    <!-- -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `;
    
    const pokemon = {
    id: 1,
    nombre: 'Pikachu',
    foto: 'pikachu.jpg',
    tipos: ['eléctrico'],
    habilidades: ['Estática'],
    movimientos: [
        { movimiento: 'Impactrueno', versiones: ['Rojo', 'Azul'] },
        { movimiento: 'Rayo', versiones: ['Amarillo', 'Platinum'] }
    ]
    };

    mostrarPokemon(pokemon);

    const $imagen = document.querySelector('#pokemon-imagen');
    expect($imagen.getAttribute('src')).toBe('pikachu.jpg');
    expect($imagen.getAttribute('alt')).toBe('Imagen frontal del pokemon Pikachu');

    expect(document.querySelector('#pokemon-nombre').textContent).toBe('Pikachu');
    expect(document.querySelector('#pokemon-id').textContent).toBe('1');

    const $tipos = document.querySelector('#tipos');
    expect($tipos.children.length).toBe(1);
    expect($tipos.children[0].classList.contains('eléctrico')).toBe(true);

    const $habilidades = document.querySelector('#habilidades');
    expect($habilidades.children.length).toBe(1);
    expect($habilidades.children[0].textContent).toBe('Estática');

    const $movimientos = document.querySelector('#movimientos');
    expect($movimientos.children.length).toBe(2);
    expect($movimientos.children[0].cells[0].textContent).toBe('Impactrueno');
    expect($movimientos.children[0].cells[1].textContent).toBe('RojoAzul');
    expect($movimientos.children[1].cells[0].textContent).toBe('Rayo');
    expect($movimientos.children[1].cells[1].textContent).toBe('AmarilloPlatinum');

    expect(actualizarTextoAyuda).toHaveBeenCalledWith('');
});