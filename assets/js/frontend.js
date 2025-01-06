// ... (poprzednie części)

    validateStep() {
        const step = this.steps[this.currentStep];
        
        switch(step) {
            case 'gender':
                const selected = document.querySelector('.gender-option.selected');
                if (!selected) {
                    alert('Proszę wybrać płeć');
                    return false;
                }
                this.answers.gender = selected.dataset.gender;
                break;
                
            case 'age':
                const selectedAge = document.querySelector('.age-button.selected');
                if (!selectedAge) {
                    alert('Proszę wybrać przedział wiekowy');
                    return false;
                }
                this.answers.age = selectedAge.dataset.age;
                break;
                
            case 'sleep':
            case 'concentration':
            case 'relaxation':
            case 'memory':
                const value = document.querySelector(`#${step}-slider`).value;
                this.answers[step] = parseInt(value);
                break;
        }
        
        return true;
    }

    calculateScore() {
        let total = 0;
        let count = 0;
        
        ['sleep', 'concentration', 'relaxation', 'memory'].forEach(key => {
            if (this.answers[key]) {
                total += this.answers[key];
                count++;
            }
        });
        
        return Math.round(total / count);
    }

    getResult(score) {
        if (score <= 3) {
            return {
                message: "Twój wynik wskazuje na poważne problemy...",
                therapy: "Terapia relaksacyjna",
                frequency: "3 razy w tygodniu",
                sessionLength: "45 minut",
                therapyLength: "3 miesiące"
            };
        } else if (score <= 5) {
            return {
                message: "Twój wynik wskazuje na problemy z jakością snu...",
                therapy: "Trening autogenny",
                frequency: "2 razy w tygodniu",
                sessionLength: "30 minut",
                therapyLength: "2 miesiące"
            };
        } else if (score <= 8) {
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
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.renderStep();
        }
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.renderStep();
        }
    }

    restart() {
        this.currentStep = 0;
        this.answers = {};
        this.renderStep();
    }
}

// Inicjalizacja po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
    new TherapySurvey();
}); 