document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
  
    document.getElementById('submit').addEventListener('click', function (event) {
      event.preventDefault(); 
  
      const email = emailInput.value;
  
      if (validateEmail(email)) {
        fetch('/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        })
        .then(response => {
          if (response.ok) {
            return response.text();
          }
          throw new Error('Network response was not ok');
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
      } else {
        console.log('Invalid email address');
      }
    });
  
    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  });