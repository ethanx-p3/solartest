console.log('Script loaded');

const questions = [
    {
        question: "What state do you live in?",
        type: "text",
        key: "state"
    },
    {
        question: "Do you own your home?",
        type: "choice",
        options: ["Yes", "No"],
        key: "homeOwnership"
    },
    {
        question: "What's your average monthly electricity bill?",
        type: "choice",
        options: ["Less than $100", "$100-$200", "$200-$300", "More than $300"],
        key: "electricityBill"
    },
    {
        question: "How old is your roof?",
        type: "choice",
        options: ["Less than 5 years", "5-10 years", "10-20 years", "More than 20 years"],
        key: "roofAge"
    },
    {
        question: "What's your home's electrical service capacity?",
        type: "choice",
        options: ["100 Amp", "200 Amp", "400 Amp", "I don't know"],
        key: "electricalService"
    }
];

let currentQuestion = 0;
let answers = {};

const quizContent = document.getElementById('quiz-content');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const results = document.getElementById('results');

function displayQuestion() {
    const question = questions[currentQuestion];
    let html = `<div class="question"><h3>${question.question}</h3>`;

    if (question.type === 'choice') {
        html += '<div class="options">';
        question.options.forEach(option => {
            const isSelected = answers[question.key] === option;
            html += `
                <div class="option ${isSelected ? 'selected' : ''}" 
                     onclick="selectOption('${question.key}', '${option}')">
                    ${option}
                </div>`;
        });
        html += '</div>';
    } else if (question.type === 'text') {
        html += `
            <input type="text" 
                   value="${answers[question.key] || ''}" 
                   onchange="updateTextAnswer('${question.key}', this.value)">`;
    }

    quizContent.innerHTML = html;
    updateNavigation();
}

function selectOption(key, value) {
    answers[key] = value;
    displayQuestion();
}

function updateTextAnswer(key, value) {
    answers[key] = value;
}

function updateNavigation() {
    prevBtn.style.display = currentQuestion > 0 ? 'block' : 'none';
    nextBtn.textContent = currentQuestion === questions.length - 1 ? 'See Results' : 'Next';
}

function showResults() {
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.style.display = 'none';
    results.style.display = 'block';

    // Calculate estimated cost
    let costEstimate = calculateCostEstimate();
    let considerations = generateConsiderations();
    let dealers = recommendDealers();

    document.getElementById('cost-estimate').innerHTML = `
        <h3>Estimated System Cost</h3>
        <p>${costEstimate}</p>`;
    
    document.getElementById('dealers').innerHTML = `
        <h3>Recommended Solar Dealers</h3>
        <p>${dealers}</p>`;
    
    document.getElementById('considerations').innerHTML = `
        <h3>Important Considerations</h3>
        <p>${considerations}</p>`;
}

function calculateCostEstimate() {
    // Simple estimation logic - this should be more sophisticated in a real app
    let basePrice = 20000;
    
    if (answers.electricityBill === "More than $300") {
        basePrice += 10000;
    } else if (answers.electricityBill === "$200-$300") {
        basePrice += 5000;
    }

    return `Estimated cost: $${basePrice.toLocaleString()} - $${(basePrice * 1.3).toLocaleString()}`;
}

function generateConsiderations() {
    let considerations = [];

    if (answers.roofAge === "More than 20 years") {
        considerations.push("Your roof may need replacement before solar installation");
    }
    
    if (answers.electricalService === "100 Amp") {
        considerations.push("You may need an electrical service upgrade");
    }

    return considerations.length ? considerations.join("<br>") : "No major concerns identified";
}

function recommendDealers() {
    // In a real app, this would pull from a database based on location
    return "We'll connect you with top-rated solar installers in your area!";
}

// Event Listeners
prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
});

nextBtn.addEventListener('click', () => {
    console.log('Next button clicked');
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        showResults();
    }
});

document.getElementById('restart-btn').addEventListener('click', () => {
    currentQuestion = 0;
    answers = {};
    results.style.display = 'none';
    document.querySelector('.quiz-container').style.display = 'block';
    displayQuestion();
});

// Initialize the quiz
displayQuestion(); 