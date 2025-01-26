document.addEventListener("DOMContentLoaded", () => {
    let totalSum = 0;

    const questions = [
        { question: "A news article with a sensational headline and no cited sources is likely to be reliable?", options: [{name : "YES", grade : 0}, {name : "MAYDE", grade : 5}, {name : "NO", grade : 10}] },
        { question: "If a piece of information is repeated many times, it must be true", options: [{name : "YES", grade : 0}, {name : "MAYDE", grade : 5}, {name : "NO", grade : 10}] },
        { question: "All opinions are equally valid.", options: [{name : "YES", grade : 10}, {name : "MAYDE", grade : 5}, {name : "NO", grade : 0}] },
        { question: "If a website's URL ends in \".org,\" it is guaranteed to be a neutral and unbiased source", options: [{name : "YES", grade : 0}, {name : "MAYDE", grade : 5}, {name : "NO", grade : 10}]},
        { question: "If a study is funded by a company that would benefit from its results, there is a possibility of bias", options: [{name : "YES", grade : 10}, {name : "MAYDE", grade : 5}, {name : "NO", grade : 0}] },
        { question: "It's always best to get your information from a single source to avoid confusion.", options: [{name : "YES", grade : 0}, {name : "MAYDE", grade : 5}, {name : "NO", grade : 10}] },
        { question: "All cats are black. Mittens is a cat. Therefore, Mittens is black.", options: [{name : "YES", grade : 10}, {name : "MAYDE", grade : 5}, {name : "NO", grade : 0}] },
        { question: "If you flip a fair coin five times and it lands on heads each time, the next flip is more likely to be tails.", options: [{name : "YES", grade : 0}, {name : "MAYDE", grade : 5}, {name : "NO", grade : 10}] },
        { question: "If a person is a professional athlete, they must be in excellent physical condition. John is in excellent physical condition. Therefore, John is a professional athlete.", options: [{name : "YES", grade : 5}, {name : "MAYDE", grade : 10}, {name : "NO", grade : 0}] },
    ];

    let currentQuestionIndex = 0;

    const mainContainer = document.querySelector(".main");

    // Функция для отображения вопроса
    function displayQuestion(index) {
        mainContainer.innerHTML = ""; // Очистить экран

        const questionData = questions[index];

        // Создаём контейнер для вопроса
        const questionContainer = document.createElement("div");
        questionContainer.className = "question-container";

        const questionElement = document.createElement("h1");
        questionElement.textContent = questionData.question;
        questionContainer.appendChild(questionElement);

        // Добавляем варианты ответа
        questionData.options.forEach((option) => {
            const label = document.createElement("label");
            label.style.display = "block";
            label.style.margin = "20px 0";

            const input = document.createElement("input");
            input.type = "radio";
            input.name = `question-${index}`;
            input.value = option.grade; // Храним значение оценки

            // При выборе ответа переходим к следующему вопросу
            input.addEventListener("change", () => {
                totalSum += parseInt(input.value); // Увеличиваем сумму

                if (currentQuestionIndex < questions.length - 1) {
                    currentQuestionIndex++;
                    displayQuestion(currentQuestionIndex);
                } else {
                    displayEndMessage();
                }
            });

            label.appendChild(input);
            label.appendChild(document.createTextNode(option.name));
            questionContainer.appendChild(label);
        });

        // Добавляем вопрос на экран
        mainContainer.appendChild(questionContainer);
    }

    // Функция для отображения сообщения после последнего вопроса
    function displayEndMessage() {
        mainContainer.innerHTML = ""; // Очистить экран
    
        const maxScore = questions.length * 10; // Максимальный балл (все вопросы по 10 баллов)
        const percentage = Math.round((totalSum / maxScore) * 100); // Рассчитать процент
    
        let resultMessage = "";
    
        // Определяем сообщение в зависимости от процента
        if (percentage <= 30) {
            resultMessage = "You are hardly susceptible to manipulation.";
        } else if (percentage <= 60) {
            resultMessage = "You are somewhat susceptible to manipulation, be more cautious.";
        } else {
            resultMessage = "You are highly susceptible to manipulation, it's important to develop critical thinking";
        }
    
        const endMessage = document.createElement("h1");
        endMessage.textContent = `Thank you for your answers! Your result is: ${percentage}%.\n${resultMessage}`;
        endMessage.style.textAlign = "center";
    
        mainContainer.appendChild(endMessage);
    }
    


    displayQuestion(currentQuestionIndex);
});
