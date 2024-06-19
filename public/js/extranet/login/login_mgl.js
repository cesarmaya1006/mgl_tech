$(document).ready(function() {
    $("#botoneye").on("click", function() {
        const input = document.querySelector('#password');
        if ($('#password').attr('type') == "password") {
            $('#togglePassword').removeClass('fa fa-eye-slash');
            $('#togglePassword').addClass('fa fa-eye');
            input.type = "text"
            $('#password').addClass('form-control-sm');
        } else {
            $('#togglePassword').removeClass('fa fa-eye');
            $('#togglePassword').addClass('fa fa-eye-slash');
            input.type = "password"
            $('#password').addClass('form-control-sm');
        }
    });
});
