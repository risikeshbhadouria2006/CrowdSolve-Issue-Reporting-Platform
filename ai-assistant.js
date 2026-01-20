/**
 * AI Assistant Logic for Smart City Civic Issue Reporting
 */

class AIAssistant {
    constructor() {
        this.isOpen = false;
        this.currentState = 'GREETING';
        this.container = null;
        this.chatWindow = null;
        this.messageContainer = null;
        this.optionsContainer = null;
        this.fab = null;

        this.init();
    }

    init() {
        this.createElements();
        this.attachEvents();
        this.listenForLanguageChange();
    }

    getT(key) {
        const lang = window.currentLang || localStorage.getItem('language') || 'en';
        return (window.translations && window.translations[lang] && window.translations[lang][key])
            ? window.translations[lang][key]
            : key;
    }

    listenForLanguageChange() {
        // Since script.js doesn't emit an event, we wrap the global updateLanguage function
        const originalUpdateLanguage = window.updateLanguage;
        window.updateLanguage = (lang) => {
            if (typeof originalUpdateLanguage === 'function') {
                originalUpdateLanguage(lang);
            }
            this.updateUIPure();
        };
    }

    updateUIPure() {
        if (!this.fab) return;

        // Update FAB Label if not active
        if (!this.isOpen) {
            this.fab.innerHTML = `<i class="fas fa-robot"></i><span class="ai-fab-label">${this.getT('ai_fab_label')}</span>`;
        }

        // Update Header
        const headerInfo = this.container.querySelector('.ai-chat-header-info');
        if (headerInfo) {
            headerInfo.innerHTML = `
                <h3>${this.getT('ai_header_title')}</h3>
                <p>${this.getT('ai_header_subtitle')}</p>
            `;
        }

        // Only clear and restart if chat is open and we just changed language
        if (this.isOpen) {
            this.messageContainer.innerHTML = '';
            this.optionsContainer.innerHTML = '';
            this.startConversation();
        }
    }

    createElements() {
        if (document.getElementById('ai-assistant-container')) return;

        const container = document.createElement('div');
        container.id = 'ai-assistant-container';
        container.innerHTML = `
            <div id="ai-chat-window">
                <div class="ai-chat-header">
                    <div class="ai-chat-header-info">
                        <h3>${this.getT('ai_header_title')}</h3>
                        <p>${this.getT('ai_header_subtitle')}</p>
                    </div>
                    <button id="ai-chat-close" style="background: none; border: none; color: white; margin-left: auto; cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="ai-chat-messages" id="ai-messages"></div>
                <div class="ai-chat-options" id="ai-options"></div>
            </div>
            <button id="ai-assistant-fab">
                <i class="fas fa-robot"></i>
                <span class="ai-fab-label">${this.getT('ai_fab_label')}</span>
            </button>
        `;

        document.body.appendChild(container);

        this.container = container;
        this.chatWindow = document.getElementById('ai-chat-window');
        this.messageContainer = document.getElementById('ai-messages');
        this.optionsContainer = document.getElementById('ai-options');
        this.fab = document.getElementById('ai-assistant-fab');
    }

    attachEvents() {
        this.fab.addEventListener('click', () => this.toggleChat());
        document.getElementById('ai-chat-close').addEventListener('click', () => this.toggleChat());
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.chatWindow.classList.add('active');
            this.fab.classList.add('active');
            this.fab.innerHTML = '<i class="fas fa-chevron-down"></i>';
            if (this.messageContainer.children.length === 0) {
                this.startConversation();
            }
        } else {
            this.chatWindow.classList.remove('active');
            this.fab.classList.remove('active');
            this.fab.innerHTML = `<i class="fas fa-robot"></i><span class="ai-fab-label">${this.getT('ai_fab_label')}</span>`;
        }
    }

    startConversation() {
        this.showTypingIndicator();
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage("bot", this.getT('ai_greeting'));
            this.showOptions([
                { text: this.getT('ai_opt_report'), value: "REPORT" },
                { text: this.getT('ai_opt_track'), value: "TRACK" },
                { text: this.getT('ai_opt_contact'), value: "CONTACT" },
                { text: this.getT('ai_opt_explain'), value: "EXPLAIN" }
            ]);
        }, 1000);
    }

    handleOptionSelection(option) {
        this.addMessage("user", option.text);
        this.optionsContainer.innerHTML = '';
        this.showTypingIndicator();

        setTimeout(() => {
            this.hideTypingIndicator();
            switch (option.value) {
                case "REPORT":
                    this.flowReport();
                    break;
                case "TRACK":
                    this.flowTrack();
                    break;
                case "EXPLAIN":
                    this.flowExplain();
                    break;
                case "CONTACT":
                    this.flowContact();
                    break;
                case "START_OVER":
                    this.startConversation();
                    break;
                case "GO_REPORT_PAGE":
                    window.location.href = 'report.html';
                    break;
                case "GO_ISSUES_PAGE":
                    window.location.href = 'issues.html';
                    break;
                case "GO_ABOUT_PAGE":
                    window.location.href = 'about.html';
                    break;
                case "GO_CONTACT_PAGE":
                    window.location.href = 'contact.html';
                    break;
                default:
                    this.addMessage("bot", this.getT('ai_msg_error'));
                    this.showOptions([{ text: this.getT('ai_opt_start_over'), value: "START_OVER" }]);
            }
        }, 800);
    }

    flowReport() {
        this.addMessage("bot", this.getT('ai_msg_report_intro'));
        this.showOptions([
            { text: this.getT('ai_opt_yes_report'), value: "GO_REPORT_PAGE" },
            { text: this.getT('ai_opt_how_report'), value: "REPORT_STEPS" },
            { text: this.getT('ai_opt_back'), value: "START_OVER" }
        ]);

        this.subFlowHandler = (option) => {
            if (option.value === "REPORT_STEPS") {
                this.addMessage("user", option.text);
                this.showTypingIndicator();
                setTimeout(() => {
                    this.hideTypingIndicator();
                    this.addMessage("bot", this.getT('ai_msg_report_steps'));
                    this.showOptions([
                        { text: this.getT('ai_opt_report_now'), value: "GO_REPORT_PAGE" },
                        { text: this.getT('ai_opt_got_it'), value: "START_OVER" }
                    ]);
                }, 800);
            }
        };
    }

    flowTrack() {
        this.addMessage("bot", this.getT('ai_msg_track_intro'));
        this.showOptions([
            { text: this.getT('ai_opt_yes_track'), value: "GO_ISSUES_PAGE" },
            { text: this.getT('ai_opt_how_track'), value: "TRACK_STEPS" },
            { text: this.getT('ai_opt_back'), value: "START_OVER" }
        ]);

        this.subFlowHandler = (option) => {
            if (option.value === "TRACK_STEPS") {
                this.addMessage("user", option.text);
                this.showTypingIndicator();
                setTimeout(() => {
                    this.hideTypingIndicator();
                    this.addMessage("bot", this.getT('ai_msg_track_steps'));
                    this.showOptions([
                        { text: this.getT('ai_opt_yes_track'), value: "GO_ISSUES_PAGE" },
                        { text: this.getT('ai_opt_back'), value: "START_OVER" }
                    ]);
                }, 800);
            }
        };
    }

    flowExplain() {
        this.addMessage("bot", this.getT('ai_msg_explain_intro'));
        this.showTypingIndicator();

        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage("bot", this.getT('ai_msg_explain_steps'));
            this.showOptions([
                { text: this.getT('ai_opt_report_now'), value: "GO_REPORT_PAGE" },
                { text: this.getT('ai_opt_yes_track'), value: "GO_ISSUES_PAGE" },
                { text: this.getT('ai_opt_back_menu'), value: "START_OVER" }
            ]);
        }, 1000);
    }

    flowContact() {
        this.addMessage("bot", this.getT('ai_msg_contact_intro'));
        this.showOptions([
            { text: this.getT('ai_opt_yes_contact'), value: "GO_CONTACT_PAGE" },
            { text: this.getT('ai_opt_back'), value: "START_OVER" }
        ]);
    }

    addMessage(type, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${type}`;
        msgDiv.innerHTML = text.replace(/\n/g, '<br>');
        this.messageContainer.appendChild(msgDiv);
        this.scrollToBottom();
    }

    showOptions(options) {
        this.optionsContainer.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'chat-option';
            btn.innerText = opt.text;
            btn.addEventListener('click', () => {
                if (this.subFlowHandler && (opt.value === "REPORT_STEPS" || opt.value === "TRACK_STEPS")) {
                    this.subFlowHandler(opt);
                } else {
                    this.handleOptionSelection(opt);
                }
            });
            this.optionsContainer.appendChild(btn);
        });
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.id = 'typing-indicator';
        indicator.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        this.messageContainer.appendChild(indicator);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    scrollToBottom() {
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.aiAssistant = new AIAssistant();
});
