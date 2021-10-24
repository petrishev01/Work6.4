window.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");
});
function calculator() {
    let number = Number(document.getElementById("number").value);
    let cost = Number(document.getElementById("cost").value);


    let re = new RegExp(/^[0-9]+$/i);
    if (
        !(
            re.test(number) &&
            re.test(cost)
        )
    ) {
        alert("Проверьте правильность введённых данных, необходимо вводить только целые положительные числа!");
    } else if (number == "") {
        alert("Не указана цена товара");
    } else if (cost == "") {
        alert("Не указано количество товара");
    } else {
        const result = number * cost;
        document.getElementById("result1").innerHTML = "Итоговая стоимость: " + result + " рублей";
    }
}

function price() {
    let cost = 0;
    let prices = getPrices();
    let priceIndex = parseInt(select.value) - 1;
    if (priceIndex >= 0) {
        cost = prices.prodTypes[priceIndex];
    }
    let quantity = Number(document.getElementById('quantity').value);
    let checkboxes = document.querySelectorAll('#checkboxes input');
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            let many = prices.prodProperties[checkbox.name];
            if (many !== undefined) {
                cost += many;
            }
        }
    });
    let radios = document.getElementsByName('radio');
    radios.forEach(function (radio) {
        if (radio.checked) {
            let optionPrice = prices.prodOptions[radio.value];
            if (optionPrice !== undefined) {
                cost += optionPrice;
            }
        }
    });
    let dinPriceCounter = document.getElementById( 'quantity') ;
    dinPriceCounter.addEventListener( 'input', function(){price();})
    let situation = document.getElementsByName('sel');
    situation[0].addEventListener('change', function (event) {
        let select = event.target;
        let radios = document.getElementById('radios');
        let checkboxes = document.getElementById('checkboxes');
        if (select.value == '1') {
            radios.style.display = 'none';
            checkboxes.style.display = 'none';
            hiddenR();
            hiddenC();
            document.getElementById('result').innerHTML =
                'Стоимость равна: ' + prices.prodTypes[0] * quantity + 'рублей';
        } else if (select.value == '2') {
            hiddenC();
            radios.style.display = 'block';
            checkboxes.style.display = 'none';
            document.getElementById('result').innerHTML =
                'Стоимость равна: ' + prices.prodTypes[1] * quantity + 'рублей';
        } else if (select.value == '3') {
            radios.style.display = 'none';
            checkboxes.style.display = 'block';
            hiddenR();
            document.getElementById('result').innerHTML =
                'Стоимость равна: ' + prices.prodTypes[2] * quantity + 'рублей';
        } else {
        }
    });
    let startPrice = document.getElementById('result');
    startPrice.innerHTML = 'Стоимость равна: ' + cost * quantity + 'рублей';
}
function getPrices() {
    return {
        prodTypes: [1, 2, 3],
        prodOptions: {
            first: 10,
            second: 20,
            third: 30,
        },
        prodProperties: {
            first: 40,
            second: 50,
        },
    };
}
let rad = document.getElementById('hid-radio');
let boxes = document.getElementById('check');
rad.style.display = 'none';
function hiddenR() {
    rad.checked = !rad.checked;
}
function hiddenC() {
    document.getElementById('first').checked = false;
    document.getElementById('second').checked = false;
}
window.addEventListener('DOMContentLoaded', function (event) {
    let newR = document.getElementById('radios');
    newR.style.display = 'none';
    let newC = document.getElementById('checkboxes');
    newC.style.display = 'none';
    let situation = document.getElementsByName('sel');
    let select = situation[0];
    select.addEventListener('change', function (event) {
        let target = event.target;
        price();
    });
    let radios = document.getElementsByName('radio');
    radios.forEach(function (radio) {
        radio.addEventListener('change', function (event) {
            let r = event.target;
            price();
        });
    });
    let checkboxes = document.querySelectorAll('#checkboxes input');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function (event) {
            let sit = event.target;
            price();
        });
    });
    price();
});