const input = document.getElementById("input_add_item");
const btn_add_item = document.getElementById("btn_add_item");

const item_container = document.querySelector(".item-container");



btn_add_item.addEventListener('click', () => {
    const val = input.value;
    
    const div = document.createElement('div');
    div.className = "item";

    const p = document.createElement('p');
    p.innerHTML = val;

    const button = document.createElement('button');
    button.type = "button";
    button.innerHTML = "❌";

    div.appendChild(p);
    div.appendChild(button);
    item_container.appendChild(div);
})


item_container.addEventListener('click', (ev) => {
    const item = ev.target.closest(".item");
    item_container.removeChild(item);
});