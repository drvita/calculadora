let screen = document.getElementById('screen'), operador, a=0, b=0;

function processDecimal(value){
    let num = Math.trunc(value);
    let digitos = num.toString().length;
    let numDec;

    if(digitos < 9){
        numDec = 8 - digitos;
        value = value.toFixed(numDec);
        value = parseFloat(value);
    } else {
        let x=1;
        numDec = digitos -6;
        value = 1 * (num.toString().substr(0,6));
        value = value / 10;
        value = value.toFixed(1);
        value = value + "E" + numDec;
    }

    return value;
}
function proccess(tecla){
    if(tecla == "/" || tecla == "*" || tecla == "-" || tecla == "+" || tecla=="=" || tecla == "Enter" || tecla == "c" || tecla == "C"){
        let value = screen.value * 1;

        if(screen.value.length){
            if(a != 0) b = value;
            else a = value;

            if(a != 0 && b != 0){
                switch(tecla){
                    case "/":
                        value = a / b;
                        value = processDecimal(value);
                        screen.placeholder = value;
                        screen.value = "";
                        a = value;
                        b = 0;
                        operador = tecla;
                        break;
                    case "*":
                        value = a * b;
                        value = processDecimal(value);
                        screen.placeholder = value;
                        screen.value = "";
                        a = value;
                        b = 0;
                        operador = tecla;
                        break;
                    case "-":
                        if(screen.value.length == 0){
                            screen.value += tecla;
                        } else {
                            value = a - b;
                            value = processDecimal(value);
                            screen.placeholder = value;
                            screen.value = "";
                            a = value;
                            b = 0;
                            operador = tecla;
                        }
                        break;
                    case "+":
                        value = a + b;
                        value = processDecimal(value);
                        screen.placeholder = value;
                        screen.value = "";
                        a = value;
                        b = 0;
                        operador = tecla;
                        break;
                    case "c":
                    case "C":
                        screen.value = "";
                        screen.placeholder = 0;
                        a = 0;
                        b = 0;
                        operador = null;
                        break;
                    case "=":
                    case "Enter":
                        if(operador=="/"){
                            value = a / b;
                        } else if(operador=="*"){
                            value = a * b;
                        } else if(operador=="-"){
                            value = a - b;
                        } else if(operador=="+"){
                            value = a + b;
                        }
                        value = processDecimal(value);
                        a = 0;
                        b = 0;
                        operador = null;
                        screen.value = value;
                        screen.placeholder = 0;
                 }
            } else {
                if(tecla == "c" || tecla == "C"){
                    a = 0;
                    b = 0;
                    operador = null;
                    screen.value = "";
                } else {
                    a = value;
                    screen.value = "";
                    if(tecla != "." && tecla != "=" && tecla != "Enter") operador = tecla;
                    else operador = "+";
                }
            }
        } else {
            screen.value += tecla;
        }
    } else {
        if(tecla != ".") tecla = tecla * 1;
        if( (tecla > 0 && screen.value.length < 8) || (tecla == 0 && screen.value.length > 0 && screen.value.length < 8) || (tecla == "." && screen.value.length > 0 && screen.value.length < 8)){
            screen.value += tecla;
        }
    }
    console.log("a",a,"b",b,"Operador",operador,'Valor',screen.value,'Tecla',tecla);
}

window.addEventListener('load', (event) => {
    //Botones
    const btn7 = document.getElementById('btn7');
    const btn8 = document.getElementById('btn8');
    const btn9 = document.getElementById('btn9');
    const btnDiv = document.getElementById('btnDiv');
    const btn4 = document.getElementById('btn4');
    const btn5 = document.getElementById('btn5');
    const btn6 = document.getElementById('btn6');
    const btnMult = document.getElementById('btnMult');
    const btn3 = document.getElementById('btn3');
    const btn2 = document.getElementById('btn2');
    const btn1 = document.getElementById('btn1');
    const btnSub = document.getElementById('btnSub');
    const btn0 = document.getElementById('btn0');
    const btnPoint = document.getElementById('btnPoint');
    const btnC = document.getElementById('btnC');
    const btnAdd = document.getElementById('btnAdd');
    const btnEqua = document.getElementById('btnEqua');

    //Listerning
    document.addEventListener('keypress', (e) => {
        proccess(e.key);
    });
    btn9.addEventListener('click', () => {
        if(screen.value.length < 8) screen.value += 9;
    });
    btn8.addEventListener('click', () => {
        if(screen.value.length < 8) screen.value += 8;
    });
    btn7.addEventListener('click', () => {
        if(screen.value.length < 8) screen.value += 7;
    });
    btn6.addEventListener('click', () => {
        if(screen.value.length < 8) screen.value += 6;
    });
    btn5.addEventListener('click', () => {
        if(screen.value.length < 8) screen.value += 5;
    });
    btn4.addEventListener('click', () => {
        if(screen.value.length < 8) screen.value += 4;
    });
    btn3.addEventListener('click', () => {
        if(screen.value.length < 8) screen.value += 3;
    });
    btn2.addEventListener('click', () => {
        if(screen.value.length < 8) screen.value += 2;
    });
    btn1.addEventListener('click', () => {
        if(screen.value.length < 8) screen.value += 1;
    });
    btn0.addEventListener('click', () => {
        if(screen.value.length < 8 && screen.value.length > 0) screen.value += 0;
    });
    btnPoint.addEventListener('click', () => {
        if(screen.value.length < 8 && screen.value.length > 0) screen.value += ".";
    });
    btnC.addEventListener('click', () => {
        proccess('c');
    });
    btnAdd.addEventListener('click', () => {
        proccess('+');
    });
    btnDiv.addEventListener('click', () => {
        proccess('/');
    });
    btnMult.addEventListener('click', () => {
        proccess('*');
    });
    btnSub.addEventListener('click', () => {
        proccess('-');
    });
    btnEqua.addEventListener('click', () => {
        proccess('=');
    });
});