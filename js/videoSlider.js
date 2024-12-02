// Seleciona todos os vídeos dentro da classe ".video-slider"
const videos = document.querySelectorAll(".video-container video");
let currentIndex = 0; // Índice do vídeo atual

// Função para reproduzir o vídeo atual e configurar o evento de término
function playVideo(index) {
  if (!videos || videos.length === 0) {
    console.error("Nenhum vídeo encontrado na classe .video-slider");
    return;
  }

  if (index < 0 || index >= videos.length) {
    console.error(`Índice fora do limite: ${index}`);
    return;
  }

  // Pausa e remove "active" de todos os vídeos
  videos.forEach(video => {
    video.pause();
    video.currentTime = 0; // Reinicia o tempo
    video.classList.remove("active");
  });

  // Seleciona o vídeo atual
  const currentVideo = videos[index];
  currentVideo.classList.add("active");

  // Define o vídeo como mudo para evitar bloqueios de autoplay
  currentVideo.muted = true;

  // Reproduz o vídeo
  currentVideo.play().catch(error => {
    console.error("Erro ao tentar reproduzir o vídeo:", error);
  });

  // Quando o vídeo termina, avança para o próximo
  currentVideo.onended = () => {
    currentIndex = (currentIndex + 1) % videos.length; // Próximo vídeo (circular)
    playVideo(currentIndex);
  };
}

// Inicia o slider de vídeos
playVideo(currentIndex);
