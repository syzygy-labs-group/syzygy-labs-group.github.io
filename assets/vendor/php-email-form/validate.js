/**
* PHP Email Form Validation - v3.10
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  const form = document.getElementById("syzygy-email");

  async function handleSubmit(event) {
    event.preventDefault();
    
    const status = form.querySelector(".error-message");
    const loading = form.querySelector(".loading");
    const success = form.querySelector(".sent-message");

    status.style.display = "none";
    success.style.display = "none";
    loading.style.display = "block";

    const data = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      loading.style.display = "none";
      if (response.ok) {
        success.style.display = "block";
        form.reset();
      } else {
        response.json().then(data => {
          if (data.errors) {
            status.innerHTML = data.errors.map(error => error.message).join(", ");
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form.";
          }
          status.style.display = "block";
        });
      }
    }).catch(error => {
      loading.style.display = "none";
      status.innerHTML = "Oops! There was a problem submitting your form.";
      status.style.display = "block";
    });
  }

  form.addEventListener("submit", handleSubmit);

})();
