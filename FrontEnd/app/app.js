$(document).ready(function () {
    $('#mySelect').change(function () {
        var selectedValue = $(this).val();
        if (selectedValue == "1") {
            $('.form-box').hide();
            $('#employee-table').show();

            $.ajax({
                url: 'http://localhost:8000/get/emplooyes',
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + btoa('system:123456')
                },
                success: function (response) {
                    $('#employee-table tbody').empty();
                    response.forEach(function (employee) {
                        $('#employee-table tbody').append(
                            `<tr class="rows" onClick="updaterowsemp(event)">
                                <th scope="row" class="employee-id">${employee.empId}</th>
                                <td>${employee.empName}</td>
                                <td>${employee.salary}</td>
                                <td class="text-end"><button class="btn btn-danger delete-button">Delete</button></td>
                            </tr>`
                        );
                    });

                    // Satırlarda maaşı 3000'den fazla olanları kontrol et ve stil değiştir
                    $('#employee-table tbody tr').each(function () {
                        var salary = parseFloat($(this).find('td').eq(2).text().trim());
                        if (salary > 3000) {
                            $(this).css('background-color', 'red !important'); // Yazı rengini kırmızı yap
                        }
                    });

                    $('.delete-button').click(function () {
                        var empId = {
                            emp_id: $(this).closest('tr').find('.employee-id').text()
                        };
                        $.ajax({
                            url: 'http://localhost:8000/delete/emplooye',
                            method: 'POST',
                            contentType: 'application/json',
                            headers: {
                                'Authorization': 'Basic ' + btoa('system:123456')
                            },
                            data: JSON.stringify(empId),
                            success: function (response) {
                                console.log(empId);
                                alert('Employee deleted successfully.');
                                $(location).prop('href', '/index.html');
                            },
                            error: function (xhr, status, error) {
                                console.error("Error occurred:", error);
                                alert('Error deleting employee: ' + status + ' - ' + error + empId.emp_id);
                            }
                        });
                    });

                    employekle();
                },
                error: function (xhr, status, error) {
                    console.error("Error occurred:", error);
                    alert('Error fetching employees: ' + status + ' - ' + error);
                }
            });


        } else if (selectedValue === "2") {

            $('.form-box').hide();
            $('#malzeme-table').show(); // Malzeme tablosunu göster

            $.ajax({
                url: 'http://localhost:8000/get/malzeme',
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + btoa('system:123456')
                },
                success: function (response) {
                    $('#malzeme-table tbody').empty();
                    response.forEach(function (malzeme) {
                        $('#malzeme-table tbody').append(
                            `<tr class="rows" onClick="updaterowsmlz(event)">
                                <th scope="row" class="malzeme-id">${malzeme.mlzId}</th>
                                <td>${malzeme.mlzKodu}</td>
                                <td>${malzeme.mlzAdı}</td>
                                <td>${malzeme.oper}</td>
                                <td>${malzeme.islemZamani}</td>
                                <td class="text-end"><button class="btn btn-danger delete-button">Delete</button></td>
                            </tr>`
                        );
                        console.log(malzeme);
                    });

                    $('.delete-button').click(function () {
                        var mlzId = {
                            MLZ_ID: $(this).closest('tr').find('.malzeme-id').text()
                        };
                        console.log(mlzId);
                        $.ajax({
                            url: 'http://localhost:8000/delete/malzeme',
                            method: 'POST',
                            contentType: 'application/json',
                            headers: {
                                'Authorization': 'Basic ' + btoa('system:123456')
                            },
                            data: JSON.stringify(mlzId),
                            success: function (response) {
                                alert('Malzeme deleted successfully.');
                                $(location).prop('href', '/index.html');
                            },
                            error: function (xhr, status, error) {
                                console.error("Error occurred:", error);
                                alert('Error deleting malzeme: ' + status + ' - ' + error);
                            }
                        });
                    });

                    malzemekle(); // Formu göster
                },
                error: function (xhr, status, error) {
                    console.error("Error occurred:", error);
                    alert('Error fetching malzemes: ' + status + ' - ' + error);
                }
            });
        }
    });
});



function employekle() {
    let ekle = document.querySelector("#employekle");
    let sil = document.querySelector('#malzemekle');
    let sil_ = document.querySelector('#malzeme-table');
    if (ekle.style.display == "none") {
        ekle.style.display = "block";
        sil.style.display = "none";
        sil_.style.display = "none";
    }
    else {
    }
}

$(document).ready(function () {
    $('#addEmplooye').click(function () {
        var empName = $('#empName').val();
        var salary = $('#salary').val();

        if (empName && salary) {
            var newEmployee = {
                EMP_NAME: empName,
                SALARY: salary
            };

            $.ajax({
                url: 'http://localhost:8000/post/emplooye',
                method: 'POST',
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Basic ' + btoa('system:123456')
                },
                data: JSON.stringify(newEmployee),
                success: function (response) {
                    alert('Employee added successfully.');
                    // $('#emplooyeForm')[0].reset();
                    console.log(response);
                },
                error: function (xhr, status, error) {
                    console.error("Error occurred:", error);
                    alert('Error adding employee: ' + status + ' - ' + error);
                }
            });
        } else {
            alert("Please fill all the fields.");
        }
    });
});




function malzemekle() {
    let ekle = document.querySelector("#malzemekle");
    let sil = document.querySelector('#employekle');
    let sil_ = document.querySelector('#employee-table');
    if (ekle.style.display == "none") {
        ekle.style.display = "block";
        sil.style.display = "none";
        sil_.style.display = "none";
    }
    else {

    }

}


$(document).ready(function () {
    $('#addmalzeme').click(function () {
        var mlzAdı = $('#malzemeadi').val();
        var mlzKodu = $('#malzemeKodu').val();
        var oper = $('#oper').val();
        var islemZamani = $('#islemzamani').val();

        if (mlzKodu && mlzAdı && islemZamani) {
            var newMalzeme = {
                MLZ_KODU: mlzKodu,
                MLZ_ADI: mlzAdı,
                OPER: oper,
                ISLEM_ZAMANI: islemZamani
            };

            $.ajax({
                url: 'http://localhost:8000/post/malzeme',
                method: 'POST',
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Basic ' + btoa('system:123456')
                },
                data: JSON.stringify(newMalzeme),
                success: function (response) {
                    alert('Malzeme added successfully.');
                    // $('#emplooyeForm')[0].reset();
                    console.log(response);
                },
                error: function (xhr, status, error) {
                    console.error("Error occurred:", error);
                    alert('Error adding Malzeme: ' + status + ' - ' + error);
                }
            });
        } else {
            alert("Please fill all the fields.");
        }
    });
});



function animation() {
    $('td').click(function () {
        alert('clicked');
    });
}

function updaterowsemp(event) {
    let emplooye = document.querySelector("#employekle");
    let clickedElement = event.target;
    let row = clickedElement.closest('tr');
    let cells = row.querySelectorAll('th, td');

    // Ekleme formunu temizle
    while (emplooye.firstChild) {
        emplooye.removeChild(emplooye.firstChild);
    }

    // Diğer satırları gizle
    let rows = document.querySelectorAll("#employee-table tr");
    rows.forEach(function (r) {
        if (r !== row) {
            r.style.display = 'none';
        }
    });

    // Düzenleme formunu oluştur ve ekle
    let editFormHtml = `
        <div class="mb-3">
            <label for="employeeName" class="form-label font-color">Employee Adı</label>
            <input type="text" class="form-control" id="editEmpName" value="${cells[1].textContent}">
        </div>
        <div class="mb-3">
            <label for="Salary" class="form-label font-color">Maaş</label>
            <input type="number" class="form-control" id="editSalary" value="${cells[2].textContent}">
        </div>

        <div class="mb-3" style="display: flex; flex-direction: row; justify-content:space-evenly;">
          <button type="button" class="btn btn-success btn-color" id="updateEmployee">Güncelle</button>

        <button type="button" class="btn btn-secondary btn-color" id="cancelUpdate">İptal</button>
        </div>
      
    `;
    emplooye.innerHTML = editFormHtml;
    emplooye.style.display = 'block';

    document.querySelector("#updateEmployee").addEventListener("click", function () {
        let updatedEmpName = document.querySelector("#editEmpName").value;
        let updatedSalary = document.querySelector("#editSalary").value;

        // AJAX isteği ile güncellenmiş verileri gönder
        let updatedEmployee = {
            empId: cells[0].textContent,
            empName: updatedEmpName,
            salary: updatedSalary
        };
        console.log(updatedEmployee);
        $.ajax({
            url: 'http://localhost:8000/update/employee',
            method: 'POST',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Basic ' + btoa('system:123456')
            },

            data: JSON.stringify(updatedEmployee),
            success: function (response) {
                alert('Employee updated successfully.');
                location.reload();

            },
            error: function (xhr, status, error) {
                console.error("Error occurred:", error);
                alert('Error updating employee: ' + status + ' - ' + error);
            }
        });
    });

    // İptal butonuna tıklama olayı
    document.querySelector("#cancelUpdate").addEventListener("click", function () {
        emplooye.style.display = 'none';
        rows.forEach(function (r) {
            r.style.display = '';
        });
    });
}


function updaterowsmlz(event) {
    let mlz = document.querySelector("#malzemekle");
    let clickedElement = event.target;
    let row = clickedElement.closest('tr');
    let cells = row.querySelectorAll('th, td');

    // Ekleme formunu temizle
    while (mlz.firstChild) {
        mlz.removeChild(mlz.firstChild);
    }

    // Diğer satırları gizle
    let rows = document.querySelectorAll("#malzeme-table tr");
    rows.forEach(function (r) {
        if (r !== row) {
            r.style.display = 'none';
        }
    });

    // Düzenleme formunu oluştur ve ekle
    let editFormHtml = `
        <div class="mb-3">
            <label for="malzemeAdi" class="form-label font-color">Malzeme Adı</label>
            <input type="text" class="form-control" id="editmalzemeadi" value="${cells[1].textContent}">
        </div>
        <div class="mb-3">
            <label for="malzemeKodu" class="form-label font-color">Malzeme Kodu</label>
            <input type="text" class="form-control" id="editmalzemeKodu" value="${cells[2].textContent}">
        </div>

            <div class="mb-3">
            <label for="OPER" class="form-label font-color">Operatör</label>
            <input type="number" class="form-control" id="editoper" value="${cells[3].textContent}">
        </div>

            <div class="mb-3">
            <label for="islemZamani" class="form-label font-color">İşlem Zamanı</label>
            <input type="text" class="form-control" id="editislemzamani" value="${cells[4].textContent}">
        </div>

        <div class="mb-3" style="display: flex; flex-direction: row; justify-content:space-evenly;">
          <button type="button" class="btn btn-success btn-color" id="updateMlz">Güncelle</button>

        <button type="button" class="btn btn-secondary btn-color" id="cancelUpdate">İptal</button>
        </div>
      
    `;
    mlz.innerHTML = editFormHtml;
    mlz.style.display = 'block';

    // Güncelle butonuna tıklama olayı
    document.querySelector("#updateMlz").addEventListener("click", function () {
        let updatemlzAdi = document.querySelector("#editmalzemeadi").value;
        let updatemlzKodu = document.querySelector("#editmalzemekodu").value;
        let updateoper = document.querySelector("#editoper").value;
        let updateislemzamani = document.querySelector("#editislemzamani").value;



        // AJAX isteği ile güncellenmiş verileri gönder
        let updateMalzeme = {
            mlzId: cells[0].textContent,
            mlzAdi: updatemlzAdi,
            mlzKodu: updatemlzKodu,
            oper: updateoper,
            islemZamani: updateislemzamani
        };
        console.log(updateMalzeme);

        $.ajax({
            url: 'http://localhost:8000/update/malzeme',
            method: 'POST',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Basic ' + btoa('system:123456')
            },
            data: JSON.stringify(updateMalzeme),
            success: function (response) {
                alert('Malzeme updated successfully.');
                location.reload();
            },
            error: function (xhr, status, error) {
                console.error("Error occurred:", error);
                alert('Error updating malzeme: ' + status + ' - ' + error);
            }
        });
    });

    document.querySelector("#cancelUpdate").addEventListener("click", function () {
        mlz.style.display = 'none';
        rows.forEach(function (r) {
            r.style.display = '';
        });
    });
}


$(document).ready(function() {
    $('#mySelect').change(function() {
        let selectedValue = $(this).val();

        if (selectedValue) {
            $('#employee-table tbody tr').each(function() {
                let salary = parseFloat($(this).find('td').eq(2).text().trim());
                if (salary > 3000) {
                    $(this).addClass('highlight');
                }
            });
        }
    });
});
