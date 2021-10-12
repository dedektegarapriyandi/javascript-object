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
                            <button id="delete-btn" class="btn btn-red">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>`
    tbody.appendChild(newTr);
}

Mahasiswa.prototype.add = (e) => {
    e.preventDefault();

    if (localStorage.getItem("data") === null) {
        data = [];
    } else {
        data = JSON.parse(localStorage.getItem("data"));
    }

    let npm;
    let nama;
    let jenisKelamin;

    inputForm.forEach((input) => {
        if (input.getAttribute("name") == "npm") {
            for (let i = 0; i < data.length; i++) {
                if (input.value.toLowerCase() == data[i].npm) {
                    return alert(`${input.value} sudah ada dalam daftar`);
                }
            }
            npm = input.value;

        } else if (input.getAttribute("name") == "nama") {
            nama = input.value;
        } else if (input.getAttribute("name") == "jenis-kelamin") {
            jenisKelamin = input.value;
        }
        input.value = "";
    });

    if ((npm == "") || (npm == undefined)) {
        return alert("Masukkan NPM yang valid");
    } else if (nama == "") {
        return alert("Masukkan Nama");
    } else if (jenisKelamin == "") {
        return alert("Pilih jenis kelamin")
    }

    const newData = new Mahasiswa(npm, nama, jenisKelamin);
    data.push(newData);
    localStorage.setItem("data", JSON.stringify(data));

    Mahasiswa.prototype.createTr(newData);
}

Mahasiswa.prototype.get = () => {
    if (localStorage.getItem("data") === null) {
        data = [];
    } else {
        data = JSON.parse(localStorage.getItem("data"));
    }

    data.forEach((val) => {
        Mahasiswa.prototype.createTr(val);
    })
}

Mahasiswa.prototype.delete = (e) => {
    const deleteBtn = e.target;
    if (deleteBtn.getAttribute("id") == "delete-btn") {
        data = JSON.parse(localStorage.getItem("data"));

        const index = deleteBtn.parentElement.parentElement.children[0].innerText.toLowerCase();

        if (confirm("Anda yakin ingin menghapus data ini?")) {
            data.splice(data.indexOf(index), 1);
            deleteBtn.parentElement.parentElement.remove();

            localStorage.setItem("data", JSON.stringify(data));
        }
    }
}

submit.addEventListener("click", Mahasiswa.prototype.add);
window.addEventListener("DOMContentLoaded", Mahasiswa.prototype.get);
tbody.addEventListener("click", Mahasiswa.prototype.delete);