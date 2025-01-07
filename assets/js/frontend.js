class TherapySurvey {
    constructor() {
        this.state = {
            currentStep: 0,
            answers: {}
        };

        this.config = {
            steps: [
                'gender',
                'age',
                'sleep',
                'concentration',
                'relaxation',
                'memory',
                'results'
            ],
            questions: {
                sleep: 'Jak oceniasz jakość swojego wyspania?',
                concentration: 'Jak oceniasz możliwości swojego skoncentrowania się/skupienia/wyciszenia?',
                relaxation: 'Jak oceniasz wyciszenie/rozluźnienie/relaks na co dzień?',
                memory: 'Jak oceniasz swoją pamięć?'
            },
            sliderMessages: {
                sleep: {
                    1: "Mam bardzo poważne problemy ze snem",
                    2: "Mam duże problemy ze snem",
                    3: "Często nie mogę spać",
                    4: "Czasami mam problemy ze snem",
                    5: "Średnio się wysypiam",
                    6: "Raczej dobrze śpię",
                    7: "Dobrze śpię",
                    8: "Bardzo dobrze śpię",
                    9: "Świetnie śpię",
                    10: "Idealnie się wysypiam"
                },
                concentration: {
                    1: "Nie mogę się w ogóle skupić",
                    2: "Mam bardzo duże problemy ze skupieniem",
                    3: "Często nie mogę się skupić",
                    4: "Czasami mam problemy ze skupieniem",
                    5: "Średnio się koncentruję",
                    6: "Raczej dobrze się skupiam",
                    7: "Dobrze się koncentruję",
                    8: "Bardzo dobrze się skupiam",
                    9: "Świetnie się koncentruję",
                    10: "Mam idealne skupienie"
                },
                relaxation: {
                    1: "Nie potrafię się zrelaksować",
                    2: "Mam bardzo duże problemy z relaksem",
                    3: "Często nie mogę się zrelaksować",
                    4: "Czasami mam problemy z relaksem",
                    5: "Średnio się relaksuję",
                    6: "Raczej dobrze się relaksuję",
                    7: "Dobrze się relaksuję",
                    8: "Bardzo dobrze się relaksuję",
                    9: "Świetnie się relaksuję",
                    10: "Idealnie się relaksuję"
                },
                memory: {
                    1: "Mam bardzo poważne problemy z pamięcią",
                    2: "Mam duże problemy z pamięcią",
                    3: "Często zapominam",
                    4: "Czasami mam problemy z pamięcią",
                    5: "Średnio pamiętam",
                    6: "Raczej dobrze pamiętam",
                    7: "Dobrze pamiętam",
                    8: "Bardzo dobrze pamiętam",
                    9: "Świetnie pamiętam",
                    10: "Mam idealną pamięć"
                }
            }
        };

        this.init();
    }

    init() {
        this.renderStep();
        this.attachEventListeners();
    }

    renderStep() {
        const step = this.config.steps[this.state.currentStep];
        const container = document.querySelector('.survey-container');
        
        const progressBar = this.renderProgressBar();
        const content = this.getStepContent(step);
        
        container.innerHTML = `
            ${progressBar}
            ${content}
        `;
    }

    renderProgressBar() {
        const progress = (this.state.currentStep / (this.config.steps.length - 1)) * 100;
        return `
            <div class="progress-bar">
                <div class="progress-bar-fill" style="width: ${progress}%"></div>
            </div>
        `;
    }

    renderGenderStep() {
        return `
            <div class="gender-selection">
                <h2>Sprawdź zalecaną kurację dla ciebie lub dla bliskiego.</h2>
                <div class="gender-options">
                    <div class="gender-option" data-gender="male">
                        <img src="https://plaza.universe.ehost.pl/strona-Mnemosline/wp-content/uploads/male.png" 
                             alt="Mężczyzna"
                             width="180"
                             height="180">
                        <span>Mężczyzna</span>
                    </div>
                    <div class="gender-option" data-gender="female">
                        <img src="https://plaza.universe.ehost.pl/strona-Mnemosline/wp-content/uploads/female-e1735604916446.png" 
                             alt="Kobieta"
                             width="180"
                             height="180">
                        <span>Kobieta</span>
                    </div>
                </div>
                ${this.renderNavigation()}
            </div>
        `;
    }

    renderAgeStep() {
        return `
            <div class="age-selection">
                <h2>Wybierz swój wiek</h2>
                <div class="age-grid">
                    <button class="age-button" data-age="0-20">0-20 lat</button>
                    <button class="age-button" data-age="20-40">20-40 lat</button>
                    <button class="age-button" data-age="40-50">40-50 lat</button>
                    <button class="age-button" data-age="50-60">50-60 lat</button>
                    <button class="age-button" data-age="60-80">60-80 lat</button>
                    <button class="age-button" data-age="85+">85+ lat</button>
                </div>
                ${this.renderNavigation()}
            </div>
        `;
    }

    renderSliderStep(step) {
        return `
            <div class="slider-question" role="form" aria-label="Pytanie ${this.state.currentStep + 1} z ${this.config.steps.length}">
                <h2 id="${step}-question">${this.config.questions[step]}</h2>
                <div class="slider-container">
                    <input type="range" 
                           min="1" 
                           max="10" 
                           value="5" 
                           class="slider" 
                           id="${step}-slider"
                           step="1"
                           aria-labelledby="${step}-question"
                           aria-valuemin="1"
                           aria-valuemax="10"
                           aria-valuenow="5">
                    <div class="slider-value" aria-live="polite">5</div>
                    <div class="slider-message" aria-live="polite"></div>
                </div>
                ${this.renderNavigation()}
            </div>
        `;
    }

    renderResults() {
        const result = this.calculateResults();
        return `
            <div class="results-screen">
                <h2>Twoje wyniki</h2>
                <div class="result-message">${result.message}</div>
                <div class="recommended-therapy">
                    <h3>Zalecana terapia:</h3>
                    <p class="therapy-name">${result.therapy}</p>
                    <p class="therapy-frequency">Częstotliwość: ${result.frequency}</p>
                    <p class="therapy-session">Długość sesji: ${result.sessionLength}</p>
                    <p class="therapy-duration">Długość terapii: ${result.therapyLength}</p>
                </div>
                <button class="restart-btn">Rozpocznij ponownie</button>
            </div>
        `;
    }

    renderNavigation() {
        return `
            <div class="navigation-buttons">
                ${this.state.currentStep > 0 ? '<button class="back-btn">Wróć</button>' : ''}
                <button class="next-btn">Dalej</button>
            </div>
        `;
    }

    attachEventListeners() {
        const container = document.querySelector('.survey-container');

        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('next-btn')) {
                if (this.validateStep()) {
                    this.nextStep();
                }
            }
            
            if (e.target.classList.contains('back-btn')) {
                this.previousStep();
            }
            
            if (e.target.classList.contains('restart-btn')) {
                this.restart();
            }

            if (e.target.closest('.gender-option')) {
                const genderOptions = document.querySelectorAll('.gender-option');
                genderOptions.forEach(opt => opt.classList.remove('selected'));
                e.target.closest('.gender-option').classList.add('selected');
            }

            if (e.target.classList.contains('age-button')) {
                const ageButtons = document.querySelectorAll('.age-button');
                ageButtons.forEach(btn => btn.classList.remove('selected'));
                e.target.classList.add('selected');
            }
        });

        container.addEventListener('input', (e) => {
            if (e.target.classList.contains('slider')) {
                const step = this.config.steps[this.state.currentStep];
                const value = parseInt(e.target.value);
                const valueDisplay = e.target.parentElement.querySelector('.slider-value');
                const messageDisplay = e.target.parentElement.querySelector('.slider-message');
                
                valueDisplay.textContent = value;
                messageDisplay.textContent = this.config.sliderMessages[step][value];
            }
        });

        // Obsługa klawiatury
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && document.activeElement.classList.contains('next-btn')) {
                e.preventDefault();
                if (this.validateStep()) {
                    this.nextStep();
                }
            }
            
            if (e.key === 'ArrowLeft' && this.state.currentStep > 0) {
                this.previousStep();
            }
            
            if (e.key === 'ArrowRight' && this.validateStep()) {
                this.nextStep();
            }
        });
    }

    validateStep() {
        const step = this.config.steps[this.state.currentStep];
        
        switch(step) {
            case 'gender':
                const selectedGender = document.querySelector('.gender-option.selected');
                if (!selectedGender) {
                    alert('Proszę wybrać płeć');
                    return false;
                }
                this.state.answers.gender = selectedGender.dataset.gender;
                break;
                
            case 'age':
                const selectedAge = document.querySelector('.age-button.selected');
                if (!selectedAge) {
                    alert('Proszę wybrać przedział wiekowy');
                    return false;
                }
                this.state.answers.age = selectedAge.dataset.age;
                break;
                
            case 'sleep':
            case 'concentration':
            case 'relaxation':
            case 'memory':
                const value = document.querySelector(`#${step}-slider`).value;
                this.state.answers[step] = parseInt(value);
                break;
        }
        
        return true;
    }

    calculateResults() {
        const scores = ['sleep', 'concentration', 'relaxation', 'memory']
            .map(key => this.state.answers[key] || 0);
        
        const average = scores.reduce((a, b) => a + b, 0) / scores.length;

        if (average <= 3) {
            return {
                message: "Twój wynik wskazuje na poważne problemy...",
                therapy: "Terapia relaksacyjna",
                frequency: "3 razy w tygodniu",
                sessionLength: "45 minut",
                therapyLength: "3 miesiące"
            };
        } else if (average <= 5) {
            return {
                message: "Twój wynik wskazuje na problemy z jakością snu...",
                therapy: "Trening autogenny",
                frequency: "2 razy w tygodniu",
                sessionLength: "30 minut",
                therapyLength: "2 miesiące"
            };
        } else if (average <= 8) {
            return {
                message: "Twój wynik jest w porządku...",
                therapy: "Techniki Mindfulness",
                frequency: "1 raz w tygodniu",
                sessionLength: "20 minut",
                therapyLength: "1 miesiąc"
            };
        } else {
            return {
                message: "Twój wynik jest bardzo dobry...",
                therapy: "Zadania wizualizacyjne",
                frequency: "2 razy w miesiącu",
                sessionLength: "15 minut",
                therapyLength: "2 tygodnie"
            };
        }
    }

    nextStep() {
        if (this.state.currentStep < this.config.steps.length - 1) {
            this.state.currentStep++;
            this.renderStep();
        }
    }

    previousStep() {
        if (this.state.currentStep > 0) {
            this.state.currentStep--;
            this.renderStep();
        }
    }

    restart() {
        this.state = {
            currentStep: 0,
            answers: {}
        };
        this.renderStep();
    }
}

// Inicjalizacja po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
    new TherapySurvey();
}); 