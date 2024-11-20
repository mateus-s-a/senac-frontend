const input_1 = document.getElementById("input_1");
const input_2 = document.getElementById("input_2");
const select_operador = document.getElementById("select_operadores");
const btn_res = document.getElementById("btn_resposta");
const res = document.getElementById("resultado");

function calcular() {
    const operador_selecionado = select_operador.value;
    const val_1 = parseFloat(input_1.value);
    const val_2 = parseFloat(input_2.value);

    let resultado;
    if (operador_selecionado == "+") {
        resultado = val_1 + val_2;
    } else if (operador_selecionado == "-") {
        resultado = val_1 - val_2;
    } else if (operador_selecionado == "*") {
        resultado = val_1 * val_2;
    } else if (operador_selecionado == "/") {
        if (val_2 !== 0) {
            resultado = val_1 / val_2;
        } else {
            alert("Não se pode dividir por zero.");
            return;
        }
    }

    
    res.innerHTML = resultado;
    res.classList.add('fade-in');

    setTimeout(() => {
        res.classList.remove('fade-in');
    }, 500);
}

btn_res.addEventListener('click', () => calcular());
