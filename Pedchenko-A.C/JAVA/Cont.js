function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function register() {
  var fullName = document.getElementById("fullName").value.trim();
  var email = document.getElementById("email").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var msg = document.getElementById("msg").value.trim();

  var errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = "";

  if (!fullName || !email || !phone || !msg) {
      errorMessage.textContent = "Пожалуйста, заполните все поля!";
      alert("werwrw");
      return false;
  }

  if (fullName.length < 2) {
      errorMessage.textContent = "Пожалуйста, введите полное имя!";
      return false;
  }

  if (!validateEmail(email)) {
      errorMessage.textContent = "Пожалуйста, введите правильный email!";
      return false;
  }

  // Если все проверки успешно пройдены
  alert("Регистрация успешно завершена!");
}