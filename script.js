const correctAnswers = {
    q1: 'a',
    q2: 'a',
    q3: ['a', 'c', 'f'],
    q4:'c',
    q5:'b',
    q6:'a',
    q7:'d',
    q8:'d',
    q9:'b',
    q10:'a',
    q11:'c',
    q12:'b',
    q13:'a',
    q14:'b',
};
function reloadPageAndCloseModal() {
    closeModal(); // Cierra el modal
    location.reload(); // Recarga la página
}


function closeModal() {
    const modal = document.getElementById('resultModal');
    modal.style.display = "none";
}

function submitQuiz() {
    let score = 0;
    const form = document.getElementById('quizForm');

    // Contador de preguntas respondidas correctamente
    let correctCount = 0;

    // Variable para controlar si hay respuestas faltantes o incorrectas para la pregunta 3
    let missingAnswers = false;
    let incorrectAnswers = false;

    // Itera sobre las preguntas
    for (let questionId in correctAnswers) {
        const selectedOptions = form.elements[questionId];

        // Verifica si se encontraron elementos para esta pregunta
        if (selectedOptions) {
            let allCorrect = true;

            // Verifica cada opción seleccionada
            for (let j = 0; j < selectedOptions.length; j++) {
                const option = selectedOptions[j];
                const optionValue = option.value;

                // Si la opción está seleccionada pero no es una respuesta correcta
                if (option.checked && !correctAnswers[questionId].includes(optionValue)) {
                    allCorrect = false;
                    incorrectAnswers = true; // Hay respuestas incorrectas
                    break;
                }

                // Si la opción no está seleccionada pero es una respuesta correcta
                if (!option.checked && correctAnswers[questionId].includes(optionValue)) {
                    allCorrect = false;
                    missingAnswers = true; // Faltan respuestas
                    break;
                }
            }

            if (allCorrect) {
                score++; // Incrementa el puntaje por cada pregunta correcta
                correctCount++; // Incrementa el contador de preguntas correctas
            }
        }
    }

    // Calcula el puntaje total
    let totalScore = 0;
    if (correctCount === Object.keys(correctAnswers).length && !incorrectAnswers) {
        totalScore = 10; // Todas las respuestas son correctas
    } else {
        totalScore = Math.min(score, 9); // Limita el puntaje máximo a 9 si hay respuestas incorrectas
    }

    showResults(score, totalScore, missingAnswers, incorrectAnswers);
}


function showResults(score, totalScore, missingAnswers, incorrectAnswers) {
    const form = document.getElementById('quizForm');
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    // Crear un contenedor div para el puntaje y el mensaje
    const scoreContainer = document.createElement('div');

    // Crear un elemento para mostrar el puntaje
    const scoreElement = document.createElement('p');
    scoreElement.textContent = `Tu puntaje es: ${totalScore} / 10`;
    scoreContainer.appendChild(scoreElement);
    // Agregar una clase al elemento
    scoreElement.classList.add('score');

    // Mostrar el mensaje adicional según el puntaje total
    let message = '';
    if (totalScore >= 1 && totalScore <= 3) {
        message = "Vamos amor, podes hacerlo mejor. ¡Te amo! ❤️";
    } else if (totalScore >= 4 && totalScore <= 6) {
        message = "¡Ya casi amorcito! Vos podés. ¡Te amo! ❤️";
    } else if (totalScore >= 7 && totalScore <= 9) {
        message = "¡Excelente, vamos con toda! ¡Te amo! ❤️";
    } else if (totalScore === 10) {
        message = "¡Sos lo más crack de los crack! ¡Te amo! ❤️";
    }

    const messageElement = document.createElement('p');
    messageElement.classList.add('result-message'); 
    messageElement.textContent = message;
    scoreContainer.appendChild(messageElement);

    // Agregar el contenedor al div de resultados
    resultsDiv.appendChild(scoreContainer);

    // Iterar sobre las preguntas
    for (let questionId in correctAnswers) {
        const selectedOptions = form.elements[questionId];
        const questionDiv = document.createElement('div');
        const questionText = document.createElement('p');
        questionText.textContent = `Pregunta ${questionId.slice(1)}: `;

        questionDiv.appendChild(questionText);

        if (selectedOptions) {
            let allCorrect = true;

            for (let j = 0; j < selectedOptions.length; j++) {
                const option = selectedOptions[j];
                const optionValue = option.value;

                if (option.checked && !correctAnswers[questionId].includes(optionValue)) {
                    allCorrect = false;

                    // Agregar el texto 'Incorrecto' en rojo
                    const resultText = document.createElement('span');
                    resultText.textContent = 'Incorrecto';
                    resultText.style.color = 'red';
                    questionDiv.appendChild(resultText);

                    // Agregar el texto 'resultado' y el valor de la pregunta incorrecta
                    const resultValue = document.createElement('span');
                    resultValue.textContent = ` | resultado: ${optionValue}`;
                    resultValue.style.color = 'black';
                    questionDiv.appendChild(resultValue);

                    break;
                }

                if (!option.checked && correctAnswers[questionId].includes(optionValue)) {
                    allCorrect = false;

                    // Agregar el texto 'Incorrecto' en rojo
                    const resultText = document.createElement('span');
                    resultText.textContent = 'Incorrecto';
                    resultText.style.color = 'red';
                    questionDiv.appendChild(resultText);

                    // Agregar el texto 'resultado' y los valores de la pregunta
                    const correctValues = Array.isArray(correctAnswers[questionId]) ? correctAnswers[questionId].join(', ') : correctAnswers[questionId];
                    const resultValue = document.createElement('span');
                    resultValue.textContent = ` | resultado: ${correctValues}`;
                    resultValue.style.color = 'black';
                    questionDiv.appendChild(resultValue);

                    break;
                }
            }

            // Agregar el resultado de esta pregunta al HTML de resultados
            const resultText = document.createElement('span');
            resultText.textContent = allCorrect ? 'Correcto' : '';
            resultText.style.color = allCorrect ? 'green' : 'red';
            questionDiv.appendChild(resultText);
        }

        resultsDiv.appendChild(questionDiv);
    }

    // Mostrar el modal de resultados
    const modal = document.getElementById('resultModal');
    modal.style.display = "block";
}
