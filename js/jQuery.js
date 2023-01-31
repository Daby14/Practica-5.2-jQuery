//Declaramos las variables con las que vamos a trabajar
let main;
let area;
let coords;
let cube;
let ejeX = 50;
let ejeY = 25;
let heightAreaSecun = 100;
let estiloAreaPrin;
let estiloCuboPrin;
let estiloAreaSecun;

//Accedemos al main del html mediante su id
main = $('#main');

//!AREA PRINCIPAL

//Creamos el area principal
area = document.createElement("div");

//Le añadimos al main el area principal donde vamos a trabajar (el método preprend es para añadir el elemento al principio del elemento main)
main.prepend(area);

//Accedemos a dicha area que acabamos de crear
estiloAreaPrin = $('div');

//Le añadimos las propiedades necesarias a dicha area
estiloAreaPrin.addClass("container");
estiloAreaPrin.css({
    'border': '2px solid red',
    'height': '400px',
    'position': 'relative'
});

//!COORDENADAS X, Y DEL RATÓN

//Accedemos al area que acabamos de crear
coords = $('div');

//Le añadimos un evento para que nos muestre las coordenadas del ratón dentro de dicha area (el método on es para añadir un evento mediante jquery)
coords.on("mousemove", showCoords);

//Método que calcula las coordenadas del ratón dentro del área del proyecto
function showCoords(event) {
    x = event.offsetX;
    y = event.offsetY;

    document.getElementById("x").value = x;
    document.getElementById("y").value = y;

}

//!CUBO PRINCIPAL

//Creamos el cubo principal
cube = document.createElement("div");

//Le añadimos el cubo que acabamos de crear al area principal
area.append(cube);

estiloCuboPrin = $(cube);

//Le añadimos las propiedades necesarias a dicho cubo
estiloCuboPrin.css({
    'background': 'red',
    'width': '50px',
    'height': '50px',
    'position': 'absolute',
    'top': '100px',
    'left': '150px'
});

//!MOVIMIENTO DEL CUBO PRINCIPAL

//Método para mover el cubo hacia arriba
function moveUp(cube) {
    let top = cube.offsetTop;
    top -= 10;

    //Controlamos que al moverse el cubo no se salga por la parte de arriba del área
    top = top < 0 ? 0 : top;
    cube.style.top = top + "px";
}

//Método para mover el cubo hacia abajo
function moveDown(cube) {
    let top = cube.offsetTop;
    top += 10;
    //Controlamos que al moverse el cubo no se salga por la parte de abajo del área
    top =
        top > area.offsetHeight - cube.offsetHeight
            ? area.offsetHeight - cube.offsetHeight
            : top;
    cube.style.top = top + "px";
}

//Método para mover el cubo hacia la izquierda
function moveLeft(cube) {
    let left = cube.offsetLeft;
    left -= 10;

    //Controlamos que al moverse el cubo no se salga por la parte izquierda del área
    left = left < 0 ? 0 : left;
    cube.style.left = left + "px";
}

//Método para mover el cubo hacia la derecha
function moveRight(cube) {
    let left = cube.offsetLeft;
    left += 10;

    //Controlamos que al moverse el cubo no se salga por la parte derecha del área
    left =
        left > area.offsetWidth - cube.offsetWidth
            ? area.offsetWidth - cube.offsetWidth
            : left;
    cube.style.left = left + "px";
}

//Método para cambiarle el color de manera aleatoria al cubo
function randomColor(cube) {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    cube.style.background = `rgb(${r}, ${g}, ${b})`;
}

//Método para aumentar el tamaño del cubo
function addSize(cube) {
    let width = cube.offsetWidth;
    let height = cube.offsetHeight;

    //Controlamos que no se salga del área el cubo tras hacerlo más grande
    if (cube.offsetTop < (area.offsetHeight - height)) {
        width += 5;
        height += 5;
    }

    cube.style.width = width + "px";
    cube.style.height = height + "px";

}

//Método para disminuir el tamaño del cubo
function removeSize(cube) {
    let width = cube.style.width;
    let height = cube.style.height;

    //Controlamos que el tamaño mínimo del cubo es de 10px, por lo que no se puede hacer más pequeño
    if (width !== "10px" && height !== "10px") {
        let width2 = cube.offsetWidth;
        let height2 = cube.offsetHeight;

        width2 -= 5;
        height2 -= 5;

        cube.style.width = width2 + "px";
        cube.style.height = height2 + "px";
    }

}

//!ACCIONES DEL CUBO

//Array donde se van a almacenar las acciones que se vayan pulsando
let acctions = [];

//Método que añade una acción en el area del proyecto
function addAction(action) {

    //Creamos el span
    let span = document.createElement("span");

    //Añadimos el span creado y la acción en el array acctions
    acctions.push({
        action: action,
        span: span,
    });

    //Añadimos al area principal el span creado
    area.append(span);

    //Accedemos al span que acabamos de crear
    let span2 = $(span);

    //Le asignamos las propiedades/estilos necesarios
    span.textContent = action;
    span2.addClass("span2");
    span2.css({
        'padding': '10px',
        'border': '1px solid #ddd',
        'display': 'block',
        'float': 'left',
        'margin': '2px',
        'cursor': 'pointer',
    });

    //Evento que cambio el color del span si el ratón está encima de dicho span
    span2.on("mouseenter", function () {
        this.style.backgroundColor = "red";
        this.style.color = "white";
    });

    //Evento que cambio el color del span si el ratón deja de estar encima de dicho span
    span2.on("mouseleave", function () {
        this.style.backgroundColor = "white";
        this.style.color = "black";
    });

    //Evento que al hacer click sobre el span lo elimina
    span2.on("click", function () {

        //Comprobamos si está en el array
        let index = acctions.findIndex((action) => {
            return action.span === this;
        });

        //En el caso de que esté lo borramos
        acctions.splice(index, 1);
        this.remove();
    });

}

//!CONTROL DE TECLAS
//Controlamos si se pulsa una tecla
$(document).ready(function () {
    $(document).keydown(function (event) {

        //Mostramos por consola la tecla que se va pulsando
        console.log(event.code);

        //Menú dependiendo de la tecla pulsada
        switch (event.code) {
            case "ArrowUp":
                addAction("up");
                break;

            case "ArrowDown":
                addAction("down");
                break;

            case "ArrowLeft":
                addAction("left");
                break;

            case "ArrowRight":
                addAction("right");
                break;

            case "KeyC":
                addAction("color");
                break;

            //Este caso y el siguiente son las teclas + (como hay 2 pues se puede agrandar con la que quieras)
            case "BracketRight":
                addAction("+");
                break;

            case "NumpadAdd":
                addAction("+");
                break;

            //Este caso y el siguiente son las teclas - (como hay 2 pues se puede disminuir con la que quieras)
            case "Slash":
                addAction("-");
                break;

            case "NumpadSubtract":
                addAction("-");
                break;

            case "Enter":
                executeAcctions();
                break;

            default:
                break;
        }
        event.preventDefault();

    });
});

//Método que ejecuta las acciones que hay en ese momento tras pulsar la tecla enter
function executeAcctions() {

    //Comprobamos si hay acciones para ejecutar
    if (acctions.length > 0) {

        let action = acctions.shift();

        //Menú dependiendo la acción a ejecutar
        switch (action.action) {
            case "up":
                moveUp(cube);
                break;

            case "down":
                moveDown(cube);
                break;

            case "left":
                moveLeft(cube);
                break;

            case "right":
                moveRight(cube);
                break;

            case "color":
                randomColor(cube);
                break;

            case "+":
                addSize(cube);
                break;

            case "-":
                removeSize(cube);
                break;

            default:
                break;
        }
        action.span.remove();
        setTimeout(executeAcctions, 50);
    }
}

//!CREACIÓN DEL AREA SECUNDARIA

//Array donde se van a almacenar los cubos que se crean haciendo click
let cubes = [];

//Contador para crear las instancias de los nuevos cubos que se van creando
let instance = 0;

//Creamos el área secundaria donde vamos a ir almacenando los cubos eliminados
let area2 = document.createElement("div");

//Añadimos este area secundaria al main (la añadimos después del area principal por eso uso el método after)
area.after(area2);

//Accedemos al area secundaria que acabamos de crear
estiloAreaSecun = $(area2);

//Le añadimos los estilos necesarios
estiloAreaSecun.css({
    'border': '2px solid red',
    'height': '100px',
    'position': 'relative'
});

//!EVENTO PERSONALIZADO

//Accedemos al area principal mediante su clase
let areaPrin = $('.container');

//Creamos el evento personalizado que cuando se haga click en el area se ejecutan las siguientes acciones
let miEvento = new Event(areaPrin.on("click", function (e) {

    //Comprobamos si hemos pulsado en el área principal (que tiene la clase container)
    if (e.target.classList == "container") {

        //Creamos el nuevo cubo
        let cub = document.createElement("div");

        //Incrementamos la instacia
        instance++;

        //Añadimos el nuevo cubo que acabamos de crear con la instancia correspondiente al array
        cubes.push({
            instance: instance,
            cube: cub,
        });

        //Añadimos al area principal dicho cubo
        area.append(cub);

        //Accedemos al cubo nuevo que acabamos de crear
        let cuboNuevo = $(cub);

        //Le añadimos las propiedades/estilos correspondientes
        cuboNuevo.text(instance);
        cuboNuevo.addClass("cube2");
        cuboNuevo.css({
            'background': 'red',
            'width': '50px',
            'height': '50px',
            'position': 'absolute',
            'left': x + 'px',
            'top': y + 'px'
        });

        //Si hacemos click en el nuevo cubo
        cuboNuevo.on("click", function () {

            //Mostramos la instancia del cubo que hemos pinchado
            console.log(cub.textContent);

            //Comprobamos si existe el cubo que hemos pinchado
            let index = cubes.findIndex((cu) => {
                return cu.cube === this;
            });

            //En el caso de que exista lo borramos
            cubes.splice(index, 1);
            this.remove();

            //Le asignamos las nuevas coordenadas donde se va a almacenar en el area secundaria
            cub.style.top = ejeY + "px";
            cub.style.left = ejeX + "px";

            //Incrementamos el eje de la x
            ejeX = ejeX + 80;

            //Si no caben más cubos en dicha area secundaria la incrementamos (incrementamos la altura de dicha area secundaria)
            if (ejeX > area2.offsetWidth - cub.offsetWidth) {
                heightAreaSecun += 100;
                area2.style.height = heightAreaSecun + "px";
                ejeY = ejeY + 80;
                ejeX = 50;
            } else {

                //En el caso de que no esté llena el area secundaria la añadimos
                area2.append(cub);
            }

        });

    }

}));

//Disparamos el evento personalizado
area.dispatchEvent(miEvento);