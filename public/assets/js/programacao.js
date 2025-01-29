// URL da planilha publicada no formato CSV
const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR5aotwfcZXAbzx6aL-uMKH75qxdqADXQQ9x_2dSJP8i-nyeMZ16eB2vcnKCO8yicB7pgqrpwJUMGcp/pub?gid=875115378&single=true&output=csv";

// Função para converter data de AAAA-MM-DD para DD/MM/AAAA com o dia da semana
function formatDateToBR(dateString) {
  try {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset()); // Ajusta para UTC
    const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('pt-BR', options);
  } catch (error) {
    console.error("Erro ao formatar data:", dateString, error);
    return dateString;
  }
}

// Função para carregar dados da planilha
async function fetchEvents() {
  try {
    const response = await fetch(sheetUrl);
    if (!response.ok) throw new Error("Erro ao acessar a planilha. Verifique a URL e as permissões.");
    const csvText = await response.text();

    // Converte o CSV em linhas e colunas
    const rows = csvText.split("\n").map(row => row.split(","));
    const [headers, ...data] = rows;

    // Identifica os índices das colunas importantes
    const normalize = str => str.trim().toLowerCase();
    const dateIndex = headers.findIndex(header => normalize(header) === "data");
    const nameIndex = headers.findIndex(header => normalize(header) === "nome do evento");
    const timeIndex = headers.findIndex(header => normalize(header) === "horário do evento");

    if (dateIndex === -1 || nameIndex === -1 || timeIndex === -1) {
      throw new Error("Colunas esperadas ('Data', 'Nome do evento', 'Horário do evento') não encontradas.");
    }

    return data
      .filter(row => row.length > Math.max(dateIndex, nameIndex, timeIndex))
      .map(row => ({
        date: row[dateIndex].trim(),
        event: row[nameIndex].trim(),
        time: row[timeIndex].trim(),
      }));
  } catch (error) {
    document.getElementById("error-message").textContent = error.message;
    console.error("Erro ao buscar eventos:", error);
    return [];
  }
}

// Função para exibir eventos
async function displayEvents() {
  const eventGrid = document.getElementById("event-grid");
  const events = await fetchEvents();

  // Obtém a data atual no início do dia
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  // Filtra eventos do dia atual e futuros
  const filteredEvents = events
    .filter(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return !isNaN(eventDate) && eventDate >= now;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6); // Pegando apenas 6 eventos

  eventGrid.innerHTML = "";

  if (filteredEvents.length === 0) {
    document.getElementById("error-message").textContent = "Nenhum evento encontrado.";
    return;
  }

  filteredEvents.forEach(event => {
    const eventElement = document.createElement("div");
    eventElement.className = "event";
    eventElement.innerHTML = `
      <h3>${event.event}</h3>
      <p><strong>Data:</strong> ${formatDateToBR(event.date)}</p>
      <p><strong>Horário:</strong> ${event.time}</p>
    `;
    eventGrid.appendChild(eventElement);
  });
}


// Executa a função ao carregar a página
displayEvents();
