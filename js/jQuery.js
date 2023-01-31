//Declaramos las variables con las que vamos a trabajar
let main;
let area;
let coords;
let cube;

//Accedemos al main del html mediante su id
main = $('#main');

//!AREA PRINCIPAL

area = document.createElement("div");

//Le añadimos las propiedades necesarias a dicha area
area.style.border = "2px solid red";
area.style.height = "400px";
area.style.position = "relative";

//Le añadimos al main el area principal donde vamos a trabajar (el método preprend es para añadir el elemento al principio del elemento main)
main.prepend(area);

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

//Le añadimos las propiedades necesarias a dicho cubo
cube.style.background = "red";
cube.style.width = "50px";
cube.style.height = "50px";
cube.style.position = "absolute";
cube.style.top = "100px";
cube.style.left = "150px";

//Le añadimos el cubo que acabamos de crear al area principal
area.append(cube);

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

    //Le añadimos los estilos necesarios al span
    span.textContent = action;
    span.classList.add("span2");
    span.style.padding = "10px";
    span.style.border = "1px solid #ddd";
    span.style.display = "block";
    span.style.float = "left";
    span.style.margin = "2px";
    span.style.cursor = "pointer";

    //Añadimos al area principal el span creado
    area.append(span);

    //Accedemos al span que acabamos de crear
    let span2 = $('span');

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

//Menú con las teclas que se van pulsando
document.addEventListener("keydown", function (event) {

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