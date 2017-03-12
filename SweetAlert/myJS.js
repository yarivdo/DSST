$(document).ready(startHere);

function startHere() {
    $('#btnClick').on('click', showAlert);
}

function showAlert() {
    swal({
            title: "Done !",
            text: "This test has been completed",
            type: "success",
            showCancelButton: false,
            confirmButtonColor: "#48eb48",
            confirmButtonText: "Click to proceed",
            closeOnConfirm: false
        },
        function () {
            window.location.href = "SecondPage.html"
        });

}
