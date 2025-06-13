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
  const triggerButton = document.getElementById("final-msg");
  if (triggerButton) {
    triggerButton.style.display = "none";
  }

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
    flexDirection: "column",
    alignItems: "center",
    zIndex: "9999",
    paddingTop: "60px",
    paddingBottom: "60px",
    overflowY: "auto",
    animation: "fadeIn 2s ease",
    gap: "30px"
  });

  const logoWrapper = document.createElement("div");
  Object.assign(logoWrapper.style, {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: "0"
  });

  const logo = document.createElement("img");
  logo.src = "../img/Logo.png";
  logo.alt = "Logo";

  Object.assign(logo.style, {
    width: "300px",
    opacity: "0",
    transform: "scale(0.5)",
    transition: "all 2s ease",
    marginTop: "20px",
    marginBottom: "10px"
  });

  logoWrapper.appendChild(logo);
  finalScreen.appendChild(logoWrapper);

  const textContainer = document.createElement("div");
  Object.assign(textContainer.style, {
    maxWidth: "800px",
    color: "white",
    fontSize: "20px",
    lineHeight: "1.8",
    textAlign: "justify",
    opacity: "0",
    transition: "opacity 1.5s ease",
    margin: "0 20px"
  });

  const storyText = document.createElement("p");
  storyText.id = "finalStoryText";
  textContainer.appendChild(storyText);
  finalScreen.appendChild(textContainer);

  document.body.appendChild(finalScreen);

  const continueButton = document.createElement("button");
  continueButton.textContent = "Reiniciar";
  Object.assign(continueButton.style, {
    position: "fixed",
    bottom: "100px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "12px 30px",
    fontSize: "18px",
    backgroundColor: "#1a1a1a",
    color: "white",
    border: "2px solid white",
    borderRadius: "10px",
    cursor: "pointer",
    display: "none",
    zIndex: "10000"
  });

  continueButton.addEventListener("click", () => {
    window.location.href = "/src/index.html";
  });

  document.body.appendChild(continueButton);

  setTimeout(() => {
    logo.style.opacity = "1";
    logo.style.transform = "scale(1.5)";
    logo.style.filter = "drop-shadow(0 0 10px #ccc)";
  }, 100);

  setTimeout(() => {
    textContainer.style.opacity = "1";
    typeWriterEffect(finalStory, storyText, 50, () => {
      setTimeout(() => {
        textContainer.style.opacity = "0";

        setTimeout(() => {
          textContainer.remove();

          const villainReveal = document.createElement("div");
          Object.assign(villainReveal.style, {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            gap: "20px",
            opacity: "0",
            transition: "opacity 2s ease",
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 20px",
            position: "relative",
            top: "0"
          });

          const villainImg = document.createElement("img");
          villainImg.src = "../img/Vikron.png";
          villainImg.alt = "Vilão";
          Object.assign(villainImg.style, {
            width: "200px",
            borderRadius: "8px",
            marginBottom: "10px"
          });

          const villainQuote = document.createElement("p");
          villainQuote.innerHTML = `Tolos... acharam mesmo que os artefatos trariam a paz? Está tudo indo exatamente como eu planejei!`;
          Object.assign(villainQuote.style, {
            fontSize: "16px",
            fontStyle: "italic",
            lineHeight: "1.6",
            textAlign: "justify"
          });

          const part2Hint = document.createElement("p");
          part2Hint.textContent = "Agora só na parte 2...";
          Object.assign(part2Hint.style, {
            fontSize: "12px",
            color: "#ccc",
            marginTop: "10px",
            fontStyle: "normal"
          });

          villainReveal.appendChild(villainImg);
          villainReveal.appendChild(villainQuote);
          villainReveal.appendChild(part2Hint);

          finalScreen.appendChild(villainReveal);

          setTimeout(() => {
            villainReveal.style.opacity = "1";
          }, 100);

          setTimeout(() => {
            continueButton.style.display = "block";
          }, 2500);

        }, 1000);
      }, 800);
    });
  }, 2500);
}

