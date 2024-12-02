async function getWeather() {
  const apiKey = 'c41d3ca47e0f4743540efab9204cedb7'; // Insira sua chave de API aqui
  const city = 'São Paulo'; // Altere para sua cidade, se necessário
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ef60a79c9c3ca99f2edfad01fd9badb3&units=metric&lang=pt_br`;

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
      }
      const data = await response.json();

      const iconCode = data.weather[0].icon;
      const temperature = Math.round(data.main.temp);
      // const description = data.weather[0].description;

      document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      document.getElementById('temperature').textContent = `${temperature}°C`;
      // document.getElementById('description').textContent = description.charAt(0).toUpperCase() + description.slice(1);
  } catch (error) {
      document.getElementById('description').textContent = "Erro ao carregar o clima.";
      console.error(error);
  }
}

getWeather();