// Danang Bingo App
class DanangBingo {
    constructor() {
        this.currentScreen = 'landing';
        this.bingoCard = [];
        this.completedItems = new Set();
        this.adminPasscode = 'danang2024';
        this.guestInfo = {
            name: '',
            roomNumber: '',
            instagramUsername: ''
        };
        
        // Initialize master experiences list
        this.masterExperiences = [
            // Landmarks & Natural Attractions
            { id: 1, text: "Marvel at the Marble Mountains", category: "landmarks" },
            { id: 2, text: "Watch the Dragon Bridge fire show (weekends)", category: "landmarks" },
            { id: 3, text: "Relax at My Khe Beach", category: "landmarks" },
            { id: 4, text: "Explore Son Tra Peninsula (Monkey Mountain)", category: "landmarks" },
            { id: 5, text: "Visit Linh Ung Pagoda (Lady Buddha)", category: "landmarks" },
            { id: 6, text: "Adventure to Ba Na Hills & Golden Bridge", category: "landmarks" },
            { id: 7, text: "Drive the scenic Hai Van Pass", category: "landmarks" },
            { id: 8, text: "See Han River Bridge rotate", category: "landmarks" },
            { id: 9, text: "Ride the Sun Wheel at Asia Park", category: "landmarks" },
            { id: 10, text: "Walk across the Love Bridge with lanterns", category: "landmarks" },
            
            // Temples, Museums & History
            { id: 11, text: "Discover the Museum of Cham Sculpture", category: "temples" },
            { id: 12, text: "Visit Da Nang Cathedral (Pink Church)", category: "temples" },
            { id: 13, text: "Pray at Phap Lam Pagoda", category: "temples" },
            { id: 14, text: "Learn at Da Nang Museum", category: "temples" },
            { id: 15, text: "Explore Ho Chi Minh Museum", category: "temples" },
            { id: 16, text: "Visit Dong Dinh Museum (Son Tra)", category: "temples" },
            { id: 17, text: "See Cao Dai Temple", category: "temples" },
            { id: 18, text: "Explore Am Phu Cave (Marble Mountains)", category: "temples" },
            { id: 19, text: "Tour Military Zone 5 Museum", category: "temples" },
            { id: 20, text: "Take Thanh Binh District heritage walk", category: "temples" },
            
            // Markets & Shopping
            { id: 21, text: "Browse Han Market", category: "markets" },
            { id: 22, text: "Shop at Con Market", category: "markets" },
            { id: 23, text: "Try avocado ice cream at Bac My An Market", category: "markets" },
            { id: 24, text: "Experience Night Market near Dragon Bridge", category: "markets" },
            { id: 25, text: "Find souvenirs on Bach Dang Street", category: "markets" },
            { id: 26, text: "Browse Vincom Plaza Mall", category: "markets" },
            { id: 27, text: "Discover street art alleys", category: "markets" },
            { id: 28, text: "Watch Non Nuoc stone carving artisans", category: "markets" },
            { id: 29, text: "Browse riverside night stalls", category: "markets" },
            { id: 30, text: "Shop at My An Beach souvenir stalls", category: "markets" },
            
            // Food & Drink Experiences
            { id: 31, text: "Savor Mi Quang (local noodle dish)", category: "food" },
            { id: 32, text: "Taste banh xeo (Vietnamese pancake)", category: "food" },
            { id: 33, text: "Enjoy fresh seafood at My Khe", category: "food" },
            { id: 34, text: "Cool down with avocado ice cream", category: "food" },
            { id: 35, text: "Try Vietnamese coffee (egg/coconut coffee)", category: "food" },
            { id: 36, text: "Join a street food tour", category: "food" },
            { id: 37, text: "Eat banh trang cuon thit heo (pork rice paper rolls)", category: "food" },
            { id: 38, text: "Slurp bun cha ca (fish cake noodle soup)", category: "food" },
            { id: 39, text: "Enjoy drinks at a rooftop bar with river view", category: "food" },
            { id: 40, text: "Experience afternoon tea at the hotel", category: "food" },
            
            // Cultural & Adventure Activities
            { id: 41, text: "Capture lantern photos in Hoi An (day trip)", category: "cultural" },
            { id: 42, text: "Take a romantic Han River cruise", category: "cultural" },
            { id: 43, text: "Ride Sun World cable car at Ba Na Hills", category: "cultural" },
            { id: 44, text: "Take a morning walk at Son Tra Nature Reserve", category: "cultural" },
            { id: 45, text: "Practice beach yoga or tai chi at sunrise", category: "cultural" },
            { id: 46, text: "Learn to cook with a local chef", category: "cultural" },
            { id: 47, text: "Take a Vietnamese language mini-lesson", category: "cultural" },
            { id: 48, text: "Sing karaoke at a local bar", category: "cultural" },
            { id: 49, text: "Adventure on a motorbike ride to Hai Van Pass", category: "cultural" },
            { id: 50, text: "Join locals on a fishing trip", category: "cultural" }
        ];
        
        this.loadData();
        this.init();
    }
    
    init() {
        this.showScreen('landing');
        this.updateProgressBar();
    }
    
    // Local Storage Management
    saveData() {
        const data = {
            bingoCard: this.bingoCard,
            completedItems: Array.from(this.completedItems),
            guestInfo: this.guestInfo,
            masterExperiences: this.masterExperiences,
            adminNote: document.getElementById('admin-note')?.textContent || 'Good luck and enjoy exploring Danang!'
        };
        localStorage.setItem('danangBingo', JSON.stringify(data));
    }
    
    loadData() {
        const saved = localStorage.getItem('danangBingo');
        if (saved) {
            const data = JSON.parse(saved);
            this.bingoCard = data.bingoCard || [];
            this.completedItems = new Set(data.completedItems || []);
            this.guestInfo = data.guestInfo || this.guestInfo;
            this.masterExperiences = data.masterExperiences || this.masterExperiences;
            
            // Update admin note
            if (data.adminNote) {
                const adminNoteEl = document.getElementById('admin-note');
                if (adminNoteEl) {
                    adminNoteEl.textContent = data.adminNote;
                }
            }
        }
    }
    
    // Screen Management
    showScreen(screenName) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        const targetScreen = document.getElementById(`${screenName}-screen`);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
        
        this.currentScreen = screenName;
        
        // Update screen content
        if (screenName === 'bingo') {
            this.renderBingoCard();
            this.updateProgressBar();
            this.loadGuestInfo();
        } else if (screenName === 'admin') {
            this.renderAdminPanel();
        }
    }
    
    // Bingo Card Generation
    generateBingoCard() {
        // Shuffle master list and take first 10
        const shuffled = [...this.masterExperiences].sort(() => Math.random() - 0.5);
        this.bingoCard = shuffled.slice(0, 10).map((exp, index) => ({
            ...exp,
            bingoIndex: index
        }));
        this.completedItems.clear();
        this.saveData();
    }
    
    renderBingoCard() {
        const container = document.getElementById('bingo-card');
        if (!container) return;
        
        if (this.bingoCard.length === 0) {
            this.generateBingoCard();
        }
        
        container.innerHTML = this.bingoCard.map(item => `
            <div class="bingo-item ${this.completedItems.has(item.id) ? 'completed' : ''}" 
                 onclick="app.toggleBingoItem(${item.id})">
                <div class="bingo-checkbox ${this.completedItems.has(item.id) ? 'checked' : ''}"></div>
                <div class="bingo-text">${item.text}</div>
                <div class="category-badge">${this.getCategoryName(item.category)}</div>
            </div>
        `).join('');
    }
    
    toggleBingoItem(itemId) {
        if (this.completedItems.has(itemId)) {
            this.completedItems.delete(itemId);
        } else {
            // Show confirmation dialog
            const confirmed = confirm(
                "Have you posted a selfie from this experience to Instagram with the hashtag #DanangBingo?\n\nOnly mark as complete after posting!"
            );
            if (confirmed) {
                this.completedItems.add(itemId);
            }
        }
        this.saveData();
        this.renderBingoCard();
        this.updateProgressBar();
        
        // Check for completion
        if (this.completedItems.size === 10) {
            setTimeout(() => {
                alert("🎉 Congratulations! You've completed your Danang Bingo card!\n\nShow your Instagram posts to Reception to claim your prize!");
            }, 500);
        }
    }
    
    updateProgressBar() {
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        if (progressFill && progressText) {
            const completed = this.completedItems.size;
            const total = this.bingoCard.length || 10;
            const percentage = total > 0 ? (completed / total) * 100 : 0;
            
            progressFill.style.width = `${percentage}%`;
            progressText.textContent = `${completed} of ${total} completed`;
        }
    }
    
    getCategoryName(category) {
        const categoryNames = {
            landmarks: 'Landmarks',
            temples: 'Culture',
            markets: 'Shopping',
            food: 'Food',
            cultural: 'Adventure'
        };
        return categoryNames[category] || 'Experience';
    }
    
    // Admin Panel
    renderAdminPanel() {
        const experienceList = document.getElementById('experience-list');
        if (!experienceList) return;
        
        experienceList.innerHTML = this.masterExperiences.map(exp => `
            <div class="experience-item">
                <span>${exp.text} (${this.getCategoryName(exp.category)})</span>
                <button onclick="app.deleteExperience(${exp.id})">Delete</button>
            </div>
        `).join('');
        
        // Load current prize note
        const prizeNoteInput = document.getElementById('prize-note');
        const adminNoteEl = document.getElementById('admin-note');
        if (prizeNoteInput && adminNoteEl) {
            prizeNoteInput.value = adminNoteEl.textContent;
        }
    }
    
    addExperience() {
        const input = document.getElementById('new-experience');
        const categorySelect = document.getElementById('experience-category');
        
        if (input.value.trim()) {
            const newId = Math.max(...this.masterExperiences.map(e => e.id)) + 1;
            this.masterExperiences.push({
                id: newId,
                text: input.value.trim(),
                category: categorySelect.value
            });
            input.value = '';
            this.saveData();
            this.renderAdminPanel();
        }
    }
    
    deleteExperience(id) {
        if (confirm('Are you sure you want to delete this experience?')) {
            this.masterExperiences = this.masterExperiences.filter(exp => exp.id !== id);
            this.saveData();
            this.renderAdminPanel();
        }
    }
    
    savePrizeNote() {
        const prizeNoteInput = document.getElementById('prize-note');
        const adminNoteEl = document.getElementById('admin-note');
        
        if (prizeNoteInput && adminNoteEl) {
            adminNoteEl.textContent = prizeNoteInput.value || 'Good luck and enjoy exploring Danang!';
            this.saveData();
            alert('Prize note saved successfully!');
        }
    }
    
    // Guest Information Management
    loadGuestInfo() {
        const nameInput = document.getElementById('guest-name');
        const roomInput = document.getElementById('room-number');
        const instagramInput = document.getElementById('instagram-username');
        
        if (nameInput) nameInput.value = this.guestInfo.name;
        if (roomInput) roomInput.value = this.guestInfo.roomNumber;
        if (instagramInput) instagramInput.value = this.guestInfo.instagramUsername;
    }
    
    saveGuestInfo() {
        const nameInput = document.getElementById('guest-name');
        const roomInput = document.getElementById('room-number');
        const instagramInput = document.getElementById('instagram-username');
        
        this.guestInfo = {
            name: nameInput?.value || '',
            roomNumber: roomInput?.value || '',
            instagramUsername: instagramInput?.value || ''
        };
        
        this.saveData();
    }
    
    // Submit bingo card functionality
    submitBingoCard() {
        // Create email content
        const completedItems = this.bingoCard.filter(item => this.completedItems.has(item.id));
        const totalCompleted = completedItems.length;
        const totalItems = this.bingoCard.length;
        
        // Build email body
        let emailBody = `Danang Discovery Bingo Card Submission\n\n`;
        emailBody += `Guest Information:\n`;
        emailBody += `Name: ${this.guestInfo.name || 'Not provided'}\n`;
        emailBody += `Room Number: ${this.guestInfo.roomNumber || 'Not provided'}\n`;
        emailBody += `Instagram Username: ${this.guestInfo.instagramUsername || 'Not provided'}\n\n`;
        emailBody += `Progress: ${totalCompleted} of ${totalItems} completed\n\n`;
        
        if (completedItems.length > 0) {
            emailBody += `Completed Experiences:\n`;
            completedItems.forEach((item, index) => {
                emailBody += `${index + 1}. ${item.text}\n`;
            });
            emailBody += `\n`;
        }
        
        if (this.bingoCard.length > completedItems.length) {
            const pendingItems = this.bingoCard.filter(item => !this.completedItems.has(item.id));
            emailBody += `Remaining Experiences:\n`;
            pendingItems.forEach((item, index) => {
                emailBody += `${index + 1}. ${item.text}\n`;
            });
            emailBody += `\n`;
        }
        
        emailBody += `Please verify my Instagram posts with #DanangBingo hashtag for the completed experiences.\n\n`;
        emailBody += `Best regards,\n${this.guestInfo.name || 'Guest'}`;
        
        // Create mailto link
        const subject = encodeURIComponent('Danang Discovery Complete');
        const body = encodeURIComponent(emailBody);
        const mailtoLink = `mailto:reception@thedananghotel.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
    }
    
    // Reset functionality
    resetCard() {
        if (confirm('Are you sure you want to generate a new bingo card? This will reset your progress.')) {
            this.generateBingoCard();
            this.renderBingoCard();
            this.updateProgressBar();
        }
    }
}

// Initialize app
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new DanangBingo();
});

// Global functions for HTML onclick handlers
function startBingo() {
    app.showScreen('bingo');
}

function showPrizeInfo() {
    app.showScreen('prize');
}

function backToBingo() {
    app.showScreen('bingo');
}

function backToLanding() {
    app.showScreen('landing');
}

function resetCard() {
    app.resetCard();
}

function submitBingoCard() {
    app.submitBingoCard();
}

function showAdminLogin() {
    const modal = document.getElementById('admin-modal');
    modal.classList.add('active');
}

function closeAdminModal() {
    const modal = document.getElementById('admin-modal');
    modal.classList.remove('active');
    document.getElementById('admin-passcode').value = '';
}

function checkAdminPasscode() {
    const passcode = document.getElementById('admin-passcode').value;
    if (passcode === app.adminPasscode) {
        closeAdminModal();
        app.showScreen('admin');
    } else {
        alert('Incorrect passcode');
        document.getElementById('admin-passcode').value = '';
    }
}

function savePrizeNote() {
    app.savePrizeNote();
}

function addExperience() {
    app.addExperience();
}

// Handle Enter key in admin inputs
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (e.target.id === 'admin-passcode') {
            checkAdminPasscode();
        } else if (e.target.id === 'new-experience') {
            addExperience();
        }
    }
});

// Handle modal background click to close
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeAdminModal();
    }
});