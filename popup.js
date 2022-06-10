function search() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchbox");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

document.getElementById('searchbox').addEventListener('input', function () {
    search();
});

var myRequest = new Request('https://raw.githubusercontent.com/hc-schoolextensions/slcs-apps-data/main/data.txt');
var items;
var itemdata;
var id2;
var myul = document.getElementById('myUL');
var cm = false;

function additems(data) {
    items = data.split(";;");
    items.forEach(item => {
        itemdata = item.split("::");
        if (itemdata[3] != undefined) {
            myul.innerHTML += `<li class="grid-item"><a><div class="midiv" data-url="${itemdata[3]}"><span class="material-icons material-icons--rounded" style="color: ${itemdata[1]}; background-color: ${itemdata[2]};">${itemdata[0]}</span>${itemdata[4]}</div></a></li>`;
        }
    });
    addlinks();
}

function addlinks() {
    var els = document.getElementsByClassName("midiv");

    Array.prototype.forEach.call(els, function (el) {
        el.addEventListener('click', function () { 
            window.open(el.dataset.url)
        });
    });
}

fetch(myRequest)
    .then(response => response.text())
    .then(data => additems(data));