// Switch the brightness of an icon when its related text link is hovered 
// or in focus
HoverHL = {
    linkIDs: ['sb-home', 'sb-profile', 'sb-messages', 
        'sb-history', 'sb-tasks', 'sb-community', 
        'sb-settings', 'sb-support', 'sb-privacy'],
    iconIDs: ['home-icon', 'profile-icon', 'messages-icon', 
        'history-icon', 'tasks-icon', 'community-icon', 
        'settings-icon', 'support-icon', 'privacy-icon'],
    homeIcon: document.getElementById('home-icon'),
    profileIcon: document.getElementById('profile-icon'),
    messagesIcon: document.getElementById('messages-icon'),
    historyIcon: document.getElementById('history-icon'),
    tasksIcon: document.getElementById('tasks-icon'),
    communityIcon: document.getElementById('community-icon'),
    settingsIcon: document.getElementById('settings-icon'),
    supportIcon: document.getElementById('support-icon'),
    privacyIcon: document.getElementById('privacy-icon'),
    icons: [this.homeIcon, this.profileIcon, this.messagesIcon, 
        this.historyIcon,  this.tasksIcon, this.communityIcon, 
        this.settingsIcon, this.supportIcon, this.privacyIcon],
    resetInvert: function() {
        this.homeIcon.style.filter = 'invert(70%)';
        this.profileIcon.style.filter = 'invert(70%)';
        this.messagesIcon.style.filter = 'invert(70%)';
        this.historyIcon.style.filter = 'invert(70%)';
        this.tasksIcon.style.filter = 'invert(70%)';
        this.communityIcon.style.filter = 'invert(70%)';
        this.settingsIcon.style.filter = 'invert(70%)';
        this.supportIcon.style.filter = 'invert(70%)';
        this.privacyIcon.style.filter = 'invert(70%)';
    },
    brightenIcon: function(id) {
        if (id === 'sb-home') {
            this.homeIcon.style.filter = 'invert(100%)';
        } else if (id === 'sb-profile') {
            this.profileIcon.style.filter = 'invert(100%)';
        } else if (id === 'sb-messages') {
            this.messagesIcon.style.filter = 'invert(100%)';
        } else if (id === 'sb-history') {
            this.historyIcon.style.filter = 'invert(100%)';
        } else if (id === 'sb-tasks') {
            this.tasksIcon.style.filter = 'invert(100%)';
        } else if (id === 'sb-community') {
            this.communityIcon.style.filter = 'invert(100%)';
        } else if (id === 'sb-settings') {
            this.settingsIcon.style.filter = 'invert(100%)';
        } else if (id === 'sb-support') {
            this.supportIcon.style.filter = 'invert(100%)';
        } else if (id === 'sb-privacy') {
            this.privacyIcon.style.filter = 'invert(100%)';
        } else {
            this.resetInvert();
        }
    },
    switchIconBright: function(element) {
        if (element) {
            if (element.id) {
                this.brightenIcon(element.id);
            } else {
                this.resetInvert();
            }
        } else {
            this.resetInvert();
        }
    }
}

// run
document.addEventListener('mouseover', (e) => {
    const hoveredElement = e.target;
    HoverHL.switchIconBright(hoveredElement);
});

document.addEventListener('focusin', (e) => {
    const focusElement = e.target
    HoverHL.resetInvert();
    setTimeout(() => {
            HoverHL.switchIconBright(focusElement);
    }, 50);
});



