function gerarTabuada() {
    let n = document.querySelector('#numero').value;
    let lista = document.querySelector('#resultado');

    lista.textContent = ""; // Limpa o conteúdo anterior

    for (let i = 0; i < 11; i++) {
        let item = document.createElement('li');
        item.textContent = `${n} * ${i} = ${n * i}`;
        lista.appendChild(item);
    }
}