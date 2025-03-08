import {crearItemPaginador, manejarCambioPagina, mostrarPaginador} from '../paginador.js'

test ('crearItemPaginador debe crear un elemento de paginación con el texto y URL correctos', () => {
    const item = crearItemPaginador('1', 'https://asd.com/pagina1');
    
    expect(item.tagName).toBe('LI');
    expect(item.className).toContain('page-item');

    const link = item.querySelector('a'); //buscar el <a> dentro del <li>
    expect(link).toBeDefined();
    expect(link.classList.contains('page-link')).toBe(true);
    expect(link.textContent).toBe('1');
    expect(link.getAttribute('href')).toBe('https://asd.com/pagina1');
});


describe('mostrarPaginador', () => {
    let $paginador;

    beforeEach(() => {
        document.body.innerHTML = '<ul id="paginador"></ul>';
        $paginador = document.querySelector('#paginador');
    });

    test('debe deshabilitar "Anterior" si no hay URL anterior', () => {
        mostrarPaginador(20, 1, 'urlSiguiente', null, () => {});
        
        const botonAnterior = $paginador.children[0];
        expect(botonAnterior.textContent).toBe('Anterior');
        expect(botonAnterior.classList.contains('disabled')).toBe(true);
    });

    test('debe marcar el botón de la página actual como activo', () => {
        mostrarPaginador(1300, 5, 'https://asd.com/pagina6', 'https://asd.com/pagina4', () => {});
        const paginaActual = $paginador.querySelector('.active');
        expect(paginaActual.textContent).toBe('5');
    });

    test('debe deshabilitar "Siguiente" si no hay URL siguiente', () => {
        mostrarPaginador(1300, 66, null, 'urlSiguiente', () => {});
        
        const botonSiguiente = $paginador.children[66];
        expect(botonSiguiente.textContent).toBe('Siguiente');
        expect(botonSiguiente.classList.contains('disabled')).toBe(true);
    });
});

describe("manejarCambioPagina", () => {
    let callbackPaginaSeleccionada;
    
    beforeEach(() => {
        callbackPaginaSeleccionada = jest.fn();
    });

    test("debe llamar al callback con el número de página cuando se hace click en un número", () => {
        const event = {
            preventDefault: jest.fn(),
            target: {
                getAttribute: jest.fn(() => "#"),
                dataset: { pagina: "3" },
            },
        };
    
    manejarCambioPagina(event, callbackPaginaSeleccionada);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(callbackPaginaSeleccionada).toHaveBeenCalledWith(3);
    });

    test("debe llamar al callback con el href cuando se hace click en anterior o siguiente", () => {
        const event = {
            preventDefault: jest.fn(),
            target: {
                getAttribute: jest.fn(() => "https://asd.com/pagina2"),
                dataset: {},
            },
        };

        manejarCambioPagina(event, callbackPaginaSeleccionada);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(callbackPaginaSeleccionada).toHaveBeenCalledWith("https://asd.com/pagina2");
    });
});

test("debe llamar a manejarCambioPagina cuando se hace clic en el paginador", () => {
    
    const totalPokemones = 1000;
    const paginaActual = 1;
    const urlSiguiente = 'https://asd.com/pagina2';
    const urlAnterior = 'https://asd.com/pagina0';

    const mockCallPaginaSeleccionada = jest.fn();

    document.body.innerHTML = `<ul id="paginador"></ul>`;

    mostrarPaginador(totalPokemones, paginaActual, urlSiguiente, urlAnterior, mockCallPaginaSeleccionada);

    //para simular el evento click en el paginador
    const $paginador = document.querySelector('#paginador');
    const boton = $paginador.querySelector('.page-item');

    boton.click();

    expect(mockCallPaginaSeleccionada).toHaveBeenCalled();
});