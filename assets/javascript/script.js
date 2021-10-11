const inputForm = document.querySelectorAll(".input-form");
const submit = document.querySelector(".submit-btn");
const tbody = document.querySelector(".tbody");

function Mahasiswa(npm, nama, jenisKelamin) {
    this.npm = npm;
    this.nama = nama;
    this.jenisKelamin = jenisKelamin;
}

Mahasiswa.prototype.createTr = (data) => {
    // tr
    const newTr = document.createElement("tr");
    newTr.innerHTML = `<td class="uppercase">${data.npm}</td>
                        <td class="capitalize">${data.nama}</td>
                        <td>${data.jenisKelamin}</td>
                        <td class="action">
                            <button class="btn btn-red">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>`
    tbody.appendChild(newTr);
}

Mahasiswa.prototype.add = (e) => {
    e.preventDefault();

    if(localStorage.getItem("data") === null) {
        data = [];
    }else {
        data = JSON.parse(localStorage.getItem("data"));
    }

    let npm;
    let nama;
    let jenisKelamin;

    inputForm.forEach((input) => {
        if(input.getAttribute("name") == "npm") {
            npm = input.value;
            
        }else if(input.getAttribute("name") == "nama") {
            nama = input.value;
        }
        else if(input.getAttribute("name") == "jenis-kelamin") {
            jenisKelamin = input.value;
        }
        input.value = "";
    });    
    
    const newData = new Mahasiswa(npm, nama, jenisKelamin);
    data.push(newData);
    localStorage.setItem("data", JSON.stringify(data));

    Mahasiswa.prototype.createTr(newData);
    console.log(newData)
}

Mahasiswa.prototype.get = () => {
    if(localStorage.getItem("data") === null) {
        data = [];
    }else {
        data = JSON.parse(localStorage.getItem("data"));
    }

    data.forEach((val) => {
        Mahasiswa.prototype.createTr(val);
    })
}

submit.addEventListener("click", Mahasiswa.prototype.add);
window.addEventListener("DOMContentLoaded", Mahasiswa.prototype.get);