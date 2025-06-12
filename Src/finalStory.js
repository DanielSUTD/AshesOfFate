const finalStory = `
Zarien usou a chave do destino...  
O que ele libertou, porém, não foi o amor...  
Mas sim uma força esquecida, selada por milênios.  
Os artefatos foram reunidos, e com eles... o mundo tremeu.

Agora, os ventos mudam.  
O que era verdade virou dúvida.  
E o herói… talvez nunca tenha sido um herói.

Mas o que será que virá pela frente? Isso, só o tempo dirá.
`;

function typeWriterEffect(text, element, speed, callback) {
  let i = 0;
  element.innerHTML = '';
  const interval = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed);
}

function showFinalStory() {
  const finalScreen = document.createElement("div");
  finalScreen.id = "finalScreen";

  Object.assign(finalScreen.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    zIndex: "9999",
    padding: "40px",
    overflowY: "auto",
  });

  const textContainer = document.createElement("div");
  Object.assign(textContainer.style, {
    maxWidth: "800px",
    color: "white",
    fontSize: "20px",
    lineHeight: "1.8",
    textAlign: "justify",
    marginBottom: "80px",
  });

  const storyText = document.createElement("p");
  storyText.id = "finalStoryText";
  textContainer.appendChild(storyText);

  finalScreen.appendChild(textContainer);
  document.body.appendChild(finalScreen);

  const continueButton = document.createElement("button");
  continueButton.textContent = "Voltar ao início";
  Object.assign(continueButton.style, {
    position: "fixed",
    bottom: "100px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    display: "none",
    zIndex: "10000"
  });

  continueButton.addEventListener("click", () => {
    window.location.href = "../index.html";
  });

  document.body.appendChild(continueButton); 

  typeWriterEffect(finalStory, storyText, 50, () => {
    continueButton.style.display = "block";
  });
}
