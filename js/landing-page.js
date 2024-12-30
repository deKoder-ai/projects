const signUpBtn1 = document.getElementById('sign_up_1');
const signUpBtn2 = document.getElementById('sign_up_2');
function goToSignUp() {
    window.location.href = '../html/sign-up.html';
}
signUpBtn1.addEventListener('click', goToSignUp);
signUpBtn2.addEventListener('click', goToSignUp);