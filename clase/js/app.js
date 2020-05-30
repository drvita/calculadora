class Calc {
    constructor(id){
        this.screen = document.getElementById(id);
        this.operador = "";
        this.a=0;
        this.b=0;
        this.value="";
    }

    proccess(tecla){
        let screen = this.screen,
            operador = this.operador,
            a = this.a,
            b = this.b,
            value = screen.innerText * 1;

        if(tecla == "/" || tecla == "*" || tecla == "-" || tecla == "+" || tecla=="=" || tecla == "Enter" || tecla == "c" || tecla == "C"){
            
            if(screen.innerText.length && !value) screen.innerText = "";
            if(screen.innerText.length){
                if(a != 0) b = value;
                else a = value;
    
                if(a != 0 && b != 0){
                    switch(tecla){
                        case "/":
                            value = a / b;
                            value = this.processDecimal(value);
                            screen.innerText = value;
                            a = value;
                            b = 0;
                            operador = tecla;
                            break;
                        case "*":
                            value = a * b;
                            value = this.processDecimal(value);
                            screen.innerText = value;
                            a = value;
                            b = 0;
                            operador = tecla;
                            break;
                        case "-":
                            if(screen.innerText.length == 0){
                                screen.innerText += tecla;
                            } else {
                                value = a - b;
                                value = this.processDecimal(value);
                                screen.innerText = value;
                                a = value;
                                b = 0;
                                operador = tecla;
                            }
                            break;
                        case "+":
                            value = a + b;
                            value = this.processDecimal(value);
                            screen.innerText = value;
                            a = value;
                            b = 0;
                            operador = tecla;
                            break;
                        case "c":
                        case "C":
                            screen.innerText = "0";
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
                            value = this.processDecimal(value);
                            a = 0;
                            b = 0;
                            operador = null;
                            screen.innerText = value;
                     }
                } else {
                    if(tecla == "c" || tecla == "C"){
                        a = 0;
                        b = 0;
                        operador = null;
                        screen.innerText = "0";
                    } else {
                        a = value;
                        screen.innerText = "0";
                        if(tecla != "." && tecla != "=" && tecla != "Enter") operador = tecla;
                        else operador = "+";
                    }
                }
            } else {
                screen.innerText += tecla;
            }
        } else {
            if(screen.innerText.length && tecla == "signo"){
                value = screen.innerText * 1;
                screen.innerText = value * -1;
            }

            if(screen.innerText.length && !value && screen.innerText != "-") screen.innerText = "";
            if(tecla != ".") tecla = tecla * 1;
            if( (tecla > 0 && screen.innerText.length < 8) || (tecla == 0 && screen.innerText.length > 0 && screen.innerText.length < 8) || (tecla == "." && screen.innerText.length > 0 && screen.innerText.length < 8)){
                screen.innerText += tecla;
            }
        }
        console.log("a",a,"b",b,"Operador",operador,'Valor',screen.value,'Tecla',tecla);

        this.screen = screen;
        this.operador = operador;
        this.a = a;
        this.b = b;
    }
    processDecimal(value){
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
}

window.addEventListener('load', (event) => {
    //Botones
    const btns = document.querySelectorAll('.teclado > img, .teclado > .row > .col1 > img, .teclado > .row > .col2 > img');
    let calc = new Calc('display');

    //Listerning
    document.addEventListener('keypress', (e) => {
        calc.proccess(e.key);
    });
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            calc.proccess(btn.alt);
        });
    });
});