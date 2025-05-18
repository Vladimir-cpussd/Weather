document.getElementById('loginForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      try {
        const response = await fetch('https://reqres.in/api/login', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1' 
          },
          body: JSON.stringify({ email, password })
        });
        
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('authToken', data.token);
          window.location.href = 'weather.html';
        } else {
          document.getElementById('error').textContent = 'Ошибка входа';
        }
      } catch {
        document.getElementById('error').textContent = 'Ошибка сети';
      }
    });