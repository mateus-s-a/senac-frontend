function verificarIdade() {
    const idade = document.querySelector('#idade').value;
    const resultado = document.querySelector('#resultado');

    if (idade >= 18)
        resultado.textContent = "É maior de idade.";
    else
        resultado.textContent = "É menor de idade.";
}

function adicionarItem() {
    let lista = document.querySelector('#minha_lista');
    let novo_item = document.createElement('li');

    novo_item.textContent = `Item ${contarItems() + 1}`;
    lista.appendChild(novo_item);
}

function contarItems() {
    let ul = document.querySelector('#minha_lista');
    let elementos_li = ul.getElementsByTagName('li');

    return elementos_li.length;
}





console.log("loop 'for'");
for (let i = 1; i <= 10; i++)
    console.log(`Número ${i}`);

console.log("-----------------------------------");

console.log("loop 'while'");
let contador = 1;
while (contador <= 10) {
    console.log(`Número ${contador}`);
    contador++;
}