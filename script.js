const adviceCard = document.createElement('div');
adviceCard.className = 'advice-card';

const adviceNumber = document.createElement('div');
adviceNumber.className = 'advice-number';

const adviceQuote = document.createElement('p');
adviceQuote.className = 'advice-quote';

const adviceButtonImage = document.createElement('img');
adviceButtonImage.className = 'advice-button-image';
adviceButtonImage.src = './images/icon-dice.svg';
adviceButtonImage.alt = 'dice icon';

const adviceButton = document.createElement('button');
adviceButton.className = 'advice-button';
adviceButton.appendChild(adviceButtonImage);

adviceCard.appendChild(adviceNumber);
adviceCard.appendChild(adviceQuote);
adviceCard.appendChild(adviceButton);

const divideImage = (src, alt) => {
    const divide = document.createElement('img');
    divide.src = src;
    divide.alt = alt;
    return divide;
}

const desktopDivide = divideImage('./images/pattern-divider-desktop.svg', 'divider image for desktop');
const mobileDivide = divideImage('./images/pattern-divider-mobile.svg', 'divider image for mobile');

const appendDivide = () => {
    const desktop = window.matchMedia('(min-width: 550px)');

    if (desktopDivide.parentNode) {
        desktopDivide.parentNode.removeChild(desktopDivide);
    }
    if (mobileDivide.parentNode) {
        mobileDivide.parentNode.removeChild(mobileDivide);
    }

    if (desktop.matches) {
        desktopDivide.className = 'divide';
        adviceCard.appendChild(desktopDivide);
    } else {
        mobileDivide.className = 'divide';
        adviceCard.appendChild(mobileDivide);
    }
}

appendDivide();
window.addEventListener('resize', appendDivide);

function getAdvice() {
    fetch('https://api.adviceslip.com/advice')
    .then(response => response.json())
    .then(data => {
        adviceNumber.textContent = 'ADVICE #' + data.slip.id;
        adviceQuote.innerHTML = '"' + data.slip.advice + '"';
    })
    .catch(error => console.log(error));
}

const handleButtonClick = () => {
    getAdvice();
}

adviceButton.addEventListener('click', handleButtonClick);

document.body.appendChild(adviceCard);

getAdvice();

