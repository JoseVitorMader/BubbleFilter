// Quiz JavaScript - Bolhas de Filtro
class FilterBubbleQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.totalQuestions = 0;
        this.userAnswers = [];
        this.startTime = null;
        this.endTime = null;
        this.streak = 0;
        this.maxStreak = 0;
        
        this.questions = [
            {
                question: "O que são 'bolhas de filtro' no contexto das redes sociais?",
                options: [
                    "Sistemas de segurança que protegem dados pessoais",
                    "Algoritmos que personalizam o conteúdo mostrado aos usuários",
                    "Ferramentas para bloquear usuários indesejados",
                    "Métodos de compressão de dados para economizar internet"
                ],
                correct: 1,
                explanation: "Bolhas de filtro são algoritmos que personalizam o conteúdo mostrado aos usuários com base em seus comportamentos anteriores, criando um ambiente informacional único e potencialmente limitado para cada pessoa."
            },
            {
                question: "Quem popularizou o termo 'Filter Bubble' (Bolha de Filtro)?",
                options: [
                    "Mark Zuckerberg, CEO do Facebook",
                    "Eli Pariser, ativista da internet",
                    "Tim Berners-Lee, criador da Web",
                    "Sergey Brin, cofundador do Google"
                ],
                correct: 1,
                explanation: "Eli Pariser popularizou o termo em 2011 em seu livro 'The Filter Bubble', alertando sobre os riscos dos algoritmos de personalização para a democracia e o pensamento crítico."
            },
            {
                question: "Aproximadamente quantos brasileiros se informam principalmente pelas redes sociais?",
                options: [
                    "45%",
                    "52%", 
                    "68%",
                    "81%"
                ],
                correct: 2,
                explanation: "Segundo o Reuters Institute Digital News Report 2023, cerca de 68% dos brasileiros se informam principalmente através das redes sociais, o que torna o problema das bolhas de filtro ainda mais relevante."
            },
            {
                question: "Qual dos seguintes NÃO é um tipo de dado coletado pelos algoritmos para personalização?",
                options: [
                    "Tempo de permanência em cada conteúdo",
                    "Histórico de cliques e curtidas",
                    "Temperatura corporal do usuário",
                    "Localização geográfica"
                ],
                correct: 2,
                explanation: "Os algoritmos coletam diversos dados comportamentais como tempo de permanência, cliques, curtidas e localização, mas não dados biométricos como temperatura corporal."
            },
            {
                question: "Qual é o principal problema causado pelas bolhas de filtro na democracia?",
                options: [
                    "Redução do tempo gasto online",
                    "Aumento dos custos de internet",
                    "Polarização política e redução do diálogo",
                    "Diminuição da velocidade de conexão"
                ],
                correct: 2,
                explanation: "As bolhas de filtro contribuem para a polarização política ao expor as pessoas apenas a conteúdo que confirma suas crenças, dificultando o diálogo construtivo necessário para uma democracia saudável."
            },
            {
                question: "Segundo estudos, que porcentagem do conteúdo online é filtrado por algoritmos de personalização?",
                options: [
                    "45%",
                    "65%",
                    "85%",
                    "95%"
                ],
                correct: 2,
                explanation: "Estudos indicam que aproximadamente 85% do conteúdo que consumimos online é filtrado por algoritmos de personalização, mostrando a extensão do impacto das bolhas de filtro."
            },
            {
                question: "Qual das seguintes estratégias NÃO é eficaz para combater bolhas de filtro?",
                options: [
                    "Diversificar fontes de informação",
                    "Buscar ativamente pontos de vista diferentes",
                    "Usar apenas uma plataforma de rede social",
                    "Verificar informações em fontes confiáveis"
                ],
                correct: 2,
                explanation: "Usar apenas uma plataforma de rede social aumenta o risco de ficar preso em uma bolha de filtro. É importante diversificar as fontes de informação e plataformas utilizadas."
            },
            {
                question: "Qual impacto econômico das bolhas de filtro é mais preocupante?",
                options: [
                    "Redução do PIB nacional",
                    "Concentração de poder em poucas empresas de tecnologia",
                    "Aumento da inflação",
                    "Diminuição do salário mínimo"
                ],
                correct: 1,
                explanation: "A concentração de poder em poucas empresas de tecnologia é um dos principais impactos econômicos, pois essas empresas controlam o acesso à informação e acumulam riqueza através do controle de dados e algoritmos."
            },
            {
                question: "Na proposta de intervenção apresentada, qual é o orçamento anual estimado para combater as bolhas de filtro?",
                options: [
                    "R$ 200 milhões",
                    "R$ 350 milhões",
                    "R$ 430 milhões",
                    "R$ 500 milhões"
                ],
                correct: 2,
                explanation: "A proposta de intervenção estima um orçamento anual de R$ 430 milhões, distribuídos entre regulamentação, educação digital, incentivos tecnológicos e fortalecimento jornalístico."
            },
            {
                question: "Qual é o objetivo principal da educação digital como solução para as bolhas de filtro?",
                options: [
                    "Ensinar programação para todos os cidadãos",
                    "Desenvolver pensamento crítico sobre tecnologia e mídia",
                    "Aumentar o tempo gasto em redes sociais",
                    "Promover apenas o uso de tecnologias nacionais"
                ],
                correct: 1,
                explanation: "A educação digital visa desenvolver o pensamento crítico dos cidadãos sobre tecnologia e mídia, capacitando-os a identificar e questionar informações, compreender como funcionam os algoritmos e diversificar suas fontes de informação."
            }
        ];
        
        this.totalQuestions = this.questions.length;
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.showStartScreen();
    }
    
    bindEvents() {
        // Start quiz button
        const startBtn = document.getElementById('start-quiz-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startQuiz());
        }
        
        // Next question button
        const nextBtn = document.getElementById('next-question-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }
        
        // Restart quiz button
        const restartBtn = document.getElementById('restart-quiz-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => this.restartQuiz());
        }
        
        // Share results button
        const shareBtn = document.getElementById('share-results-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareResults());
        }
        
        // Back to results button
        const backBtn = document.getElementById('back-to-results-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.showResults());
        }
    }
    
    showStartScreen() {
        this.hideAllScreens();
        const startScreen = document.getElementById('quiz-start');
        if (startScreen) {
            startScreen.classList.add('active');
        }
    }
    
    startQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        this.streak = 0;
        this.maxStreak = 0;
        this.startTime = new Date();
        
        this.hideAllScreens();
        const progressScreen = document.getElementById('quiz-progress');
        if (progressScreen) {
            progressScreen.classList.add('active');
        }
        
        this.displayQuestion();
    }
    
    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        
        // Update progress
        this.updateProgress();
        
        // Display question
        const questionText = document.getElementById('question-text');
        if (questionText) {
            questionText.textContent = question.question;
        }
        
        // Display options
        this.displayOptions();
        
        // Hide next button and explanation
        this.hideNextButton();
        this.hideExplanation();
        
        // Update question counter
        const currentQuestionEl = document.getElementById('current-question');
        if (currentQuestionEl) {
            currentQuestionEl.textContent = this.currentQuestion + 1;
        }
        
        const totalQuestionsEl = document.getElementById('total-questions');
        if (totalQuestionsEl) {
            totalQuestionsEl.textContent = this.totalQuestions;
        }
    }
    
    displayOptions() {
        const container = document.getElementById('options-container');
        if (!container) return;
        
        const question = this.questions[this.currentQuestion];
        container.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = this.createOptionElement(option, index);
            container.appendChild(optionElement);
        });
    }
    
    createOptionElement(optionText, index) {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.dataset.index = index;
        
        const optionLetter = document.createElement('div');
        optionLetter.className = 'option-letter';
        optionLetter.textContent = String.fromCharCode(65 + index); // A, B, C, D
        
        const optionTextDiv = document.createElement('div');
        optionTextDiv.className = 'option-text';
        optionTextDiv.textContent = optionText;
        
        optionDiv.appendChild(optionLetter);
        optionDiv.appendChild(optionTextDiv);
        
        optionDiv.addEventListener('click', () => this.selectOption(index));
        
        return optionDiv;
    }
    
    selectOption(selectedIndex) {
        // Remove previous selections
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect');
        });
        
        // Mark selected option
        const selectedOption = document.querySelector(`[data-index="${selectedIndex}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }
        
        // Check answer
        const question = this.questions[this.currentQuestion];
        const isCorrect = selectedIndex === question.correct;
        
        // Store user answer
        this.userAnswers.push({
            questionIndex: this.currentQuestion,
            selectedIndex: selectedIndex,
            correct: isCorrect,
            question: question.question,
            selectedAnswer: question.options[selectedIndex],
            correctAnswer: question.options[question.correct],
            explanation: question.explanation
        });
        
        // Update score and streak
        if (isCorrect) {
            this.score++;
            this.streak++;
            this.maxStreak = Math.max(this.maxStreak, this.streak);
            selectedOption.classList.add('correct');
        } else {
            this.streak = 0;
            selectedOption.classList.add('incorrect');
            // Show correct answer
            const correctOption = document.querySelector(`[data-index="${question.correct}"]`);
            if (correctOption) {
                correctOption.classList.add('correct');
            }
        }
        
        // Disable all options
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        // Show explanation and next button
        this.showExplanation(question.explanation);
        this.showNextButton();
        
        // Update score display
        this.updateScore();
    }
    
    showExplanation(explanationText) {
        const container = document.getElementById('explanation-container');
        const textElement = document.getElementById('explanation-text');
        
        if (container && textElement) {
            textElement.textContent = explanationText;
            container.style.display = 'block';
        }
    }
    
    hideExplanation() {
        const container = document.getElementById('explanation-container');
        if (container) {
            container.style.display = 'none';
        }
    }
    
    showNextButton() {
        const nextBtn = document.getElementById('next-question-btn');
        if (nextBtn) {
            nextBtn.style.display = 'inline-flex';
            
            // Change text for last question
            if (this.currentQuestion === this.totalQuestions - 1) {
                nextBtn.innerHTML = 'Ver Resultados <i class="fas fa-chart-bar"></i>';
            } else {
                nextBtn.innerHTML = 'Próxima Pergunta <i class="fas fa-arrow-right"></i>';
            }
        }
    }
    
    hideNextButton() {
        const nextBtn = document.getElementById('next-question-btn');
        if (nextBtn) {
            nextBtn.style.display = 'none';
        }
    }
    
    nextQuestion() {
        this.currentQuestion++;
        
        if (this.currentQuestion < this.totalQuestions) {
            this.displayQuestion();
        } else {
            this.endQuiz();
        }
    }
    
    endQuiz() {
        this.endTime = new Date();
        this.hideAllScreens();
        this.showResults();
    }
    
    showResults() {
        this.hideAllScreens();
        const resultsScreen = document.getElementById('quiz-results');
        if (resultsScreen) {
            resultsScreen.classList.add('active');
        }
        
        this.displayResults();
    }
    
    displayResults() {
        // Calculate percentage
        const percentage = Math.round((this.score / this.totalQuestions) * 100);
        
        // Update score display
        const finalScore = document.getElementById('final-score');
        const scorePercentage = document.getElementById('score-percentage');
        
        if (finalScore) {
            finalScore.textContent = `${this.score}/${this.totalQuestions}`;
        }
        
        if (scorePercentage) {
            scorePercentage.textContent = `${percentage}%`;
        }
        
        // Update results icon and title
        this.updateResultsIcon(percentage);
        this.updateResultsTitle(percentage);
        
        // Display performance analysis
        this.displayPerformanceAnalysis();
        
        // Display recommendations
        this.displayRecommendations(percentage);
        
        // Show certificate if excellent performance
        this.showCertificate(percentage);
    }
    
    updateResultsIcon(percentage) {
        const resultsIcon = document.getElementById('results-icon');
        if (!resultsIcon) return;
        
        resultsIcon.className = 'results-icon';
        
        if (percentage >= 90) {
            resultsIcon.classList.add('excellent');
            resultsIcon.innerHTML = '<i class="fas fa-trophy"></i>';
        } else if (percentage >= 70) {
            resultsIcon.classList.add('good');
            resultsIcon.innerHTML = '<i class="fas fa-medal"></i>';
        } else if (percentage >= 50) {
            resultsIcon.classList.add('average');
            resultsIcon.innerHTML = '<i class="fas fa-star"></i>';
        } else {
            resultsIcon.classList.add('poor');
            resultsIcon.innerHTML = '<i class="fas fa-book"></i>';
        }
    }
    
    updateResultsTitle(percentage) {
        const resultsTitle = document.getElementById('results-title');
        if (!resultsTitle) return;
        
        if (percentage >= 90) {
            resultsTitle.textContent = 'Excelente! Você é um Expert!';
        } else if (percentage >= 70) {
            resultsTitle.textContent = 'Muito Bem! Bom Conhecimento!';
        } else if (percentage >= 50) {
            resultsTitle.textContent = 'Bom Trabalho! Continue Estudando!';
        } else {
            resultsTitle.textContent = 'Continue Aprendendo!';
        }
    }
    
    displayPerformanceAnalysis() {
        // Knowledge level
        const knowledgeLevel = document.getElementById('knowledge-level');
        if (knowledgeLevel) {
            const percentage = Math.round((this.score / this.totalQuestions) * 100);
            if (percentage >= 90) {
                knowledgeLevel.textContent = 'Especialista';
            } else if (percentage >= 70) {
                knowledgeLevel.textContent = 'Avançado';
            } else if (percentage >= 50) {
                knowledgeLevel.textContent = 'Intermediário';
            } else {
                knowledgeLevel.textContent = 'Iniciante';
            }
        }
        
        // Total time
        const totalTimeEl = document.getElementById('total-time');
        if (totalTimeEl && this.startTime && this.endTime) {
            const timeDiff = this.endTime - this.startTime;
            const minutes = Math.floor(timeDiff / 60000);
            const seconds = Math.floor((timeDiff % 60000) / 1000);
            totalTimeEl.textContent = `${minutes}min ${seconds}s`;
        }
        
        // Streak
        const streakEl = document.getElementById('streak');
        if (streakEl) {
            streakEl.textContent = this.maxStreak;
        }
    }
    
    displayRecommendations(percentage) {
        const recommendationList = document.getElementById('recommendation-list');
        if (!recommendationList) return;
        
        recommendationList.innerHTML = '';
        
        let recommendations = [];
        
        if (percentage < 50) {
            recommendations = [
                {
                    icon: 'fas fa-book-open',
                    title: 'Revisar Conceitos Básicos',
                    description: 'Leia a seção "Contexto" para entender melhor o que são bolhas de filtro'
                },
                {
                    icon: 'fas fa-video',
                    title: 'Assistir Documentários',
                    description: 'Recomendamos "The Social Dilemma" na Netflix para aprofundar o conhecimento'
                },
                {
                    icon: 'fas fa-newspaper',
                    title: 'Ler Artigos Acadêmicos',
                    description: 'Busque artigos científicos sobre algoritmos e personalização'
                }
            ];
        } else if (percentage < 70) {
            recommendations = [
                {
                    icon: 'fas fa-exclamation-triangle',
                    title: 'Estudar Impactos',
                    description: 'Revise a seção "Impactos" para compreender melhor as consequências'
                },
                {
                    icon: 'fas fa-lightbulb',
                    title: 'Explorar Soluções',
                    description: 'Analise as propostas de intervenção apresentadas no site'
                }
            ];
        } else if (percentage < 90) {
            recommendations = [
                {
                    icon: 'fas fa-share-alt',
                    title: 'Compartilhar Conhecimento',
                    description: 'Ajude outros a entender os riscos das bolhas de filtro'
                },
                {
                    icon: 'fas fa-search',
                    title: 'Pesquisar Mais',
                    description: 'Explore casos de estudo específicos do Brasil'
                }
            ];
        } else {
            recommendations = [
                {
                    icon: 'fas fa-graduation-cap',
                    title: 'Tornar-se um Educador',
                    description: 'Considere ensinar outros sobre privacidade digital'
                },
                {
                    icon: 'fas fa-code',
                    title: 'Desenvolver Soluções',
                    description: 'Participe de projetos que promovam transparência algorítmica'
                }
            ];
        }
        
        recommendations.forEach(rec => {
            const recElement = this.createRecommendationElement(rec);
            recommendationList.appendChild(recElement);
        });
    }
    
    createRecommendationElement(recommendation) {
        const div = document.createElement('div');
        div.className = 'recommendation-item';
        
        div.innerHTML = `
            <i class="${recommendation.icon}"></i>
            <div class="recommendation-text">
                <strong>${recommendation.title}</strong>
                <span>${recommendation.description}</span>
            </div>
        `;
        
        return div;
    }
    
    showCertificate(percentage) {
        const certificateSection = document.getElementById('certificate-section');
        if (!certificateSection) return;
        
        if (percentage >= 80) {
            certificateSection.style.display = 'block';
            
            // Update certificate details
            const completionDate = document.getElementById('completion-date');
            const certificateScore = document.getElementById('certificate-score');
            
            if (completionDate) {
                completionDate.textContent = new Date().toLocaleDateString('pt-BR');
            }
            
            if (certificateScore) {
                certificateScore.textContent = `${this.score}/${this.totalQuestions} (${percentage}%)`;
            }
        } else {
            certificateSection.style.display = 'none';
        }
    }
    
    updateProgress() {
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            const percentage = ((this.currentQuestion + 1) / this.totalQuestions) * 100;
            progressFill.style.width = `${percentage}%`;
        }
    }
    
    updateScore() {
        const currentScore = document.getElementById('current-score');
        if (currentScore) {
            currentScore.textContent = this.score;
        }
    }
    
    shareResults() {
        const percentage = Math.round((this.score / this.totalQuestions) * 100);
        const text = `Acabei de fazer o quiz sobre Bolhas de Filtro e consegui ${percentage}% de aproveitamento! 🎯\n\nTeste seu conhecimento sobre privacidade digital: ${window.location.href}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Quiz - Bolhas de Filtro',
                text: text,
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    alert('Resultado copiado para a área de transferência!');
                });
            } else {
                // Even older browsers fallback
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('Resultado copiado para a área de transferência!');
            }
        }
    }
    
    restartQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        this.streak = 0;
        this.maxStreak = 0;
        this.startTime = null;
        this.endTime = null;
        
        this.showStartScreen();
    }
    
    hideAllScreens() {
        const screens = document.querySelectorAll('.quiz-screen');
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
    }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new FilterBubbleQuiz();
});

// Additional utility functions for enhanced user experience
function animateScore(element, finalScore, duration = 1000) {
    const startScore = 0;
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentScore = Math.floor(progress * finalScore);
        element.textContent = currentScore;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
    // Space or Enter to select focused option
    if (e.code === 'Space' || e.code === 'Enter') {
        const focusedOption = document.querySelector('.option:focus');
        if (focusedOption) {
            e.preventDefault();
            focusedOption.click();
        }
    }
    
    // Arrow keys to navigate options
    if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
        const options = document.querySelectorAll('.option');
        const currentFocus = document.querySelector('.option:focus');
        
        if (options.length > 0) {
            e.preventDefault();
            
            let currentIndex = Array.from(options).indexOf(currentFocus);
            
            if (e.code === 'ArrowDown') {
                currentIndex = (currentIndex + 1) % options.length;
            } else {
                currentIndex = currentIndex <= 0 ? options.length - 1 : currentIndex - 1;
            }
            
            options[currentIndex].focus();
        }
    }
});

// Make options focusable for keyboard navigation
document.addEventListener('DOMContentLoaded', function() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                const options = document.querySelectorAll('.option');
                options.forEach(option => {
                    option.setAttribute('tabindex', '0');
                });
            }
        });
    });
    
    const optionsContainer = document.getElementById('options-container');
    if (optionsContainer) {
        observer.observe(optionsContainer, { childList: true });
    }
});