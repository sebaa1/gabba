
class CordovaManager {
    constructor() {
        this.isDeviceReady = false;
        this.fcmToken = null;
        this.pendingOperations = [];
        
        // Bind methods
        this.init = this.init.bind(this);
        this.onDeviceReady = this.onDeviceReady.bind(this);
        this.initializeNotifications = this.initializeNotifications.bind(this);
    }

    init() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    }


    onDeviceReady() {
        this.isDeviceReady = true;
        
        this.initializeNotifications();
        this.initializeStatusBar();
        this.initializeBackButton();
        
        this.executePendingOperations();
        
        document.dispatchEvent(new CustomEvent('cordova-ready'));
    }

    initializeNotifications() {
        this.initializeNotificationSettings();

        if (!window.FirebasePlugin) {
            return;
        }

        if (window.firebaseManager) {
            window.firebaseManager.setupFirebase();
        }
    }

    initializeNotificationSettings() {
        const toggle = document.getElementById("notificationToggle");
        if (!toggle) return;

        let isDisabled = localStorage.getItem("notificationsDisabled");
        if (isDisabled === null) {
            isDisabled = "false";
            localStorage.setItem("notificationsDisabled", isDisabled);
        }

        toggle.checked = (isDisabled === "false");

        if (toggle.checked) {
            this.subscribeToTopic("general");
        }
        toggle.addEventListener("change", () => {
            if (toggle.checked) {
                this.subscribeToTopic("general", () => {
                    localStorage.setItem("notificationsDisabled", "false");
                    this.showToast("✅ Notificaciones activadas");
                });
            } else {
                this.unsubscribeFromTopic("general", () => {
                    localStorage.setItem("notificationsDisabled", "true");
                    this.showToast("🔕 Notificaciones desactivadas");
                });
            }
        });
    }


    subscribeToTopic(topic, callback) {
        if (!window.FirebasePlugin) return;

        FirebasePlugin.subscribe(topic, () => {
            if (callback) callback();
        }, (err) => {
            this.showToast(`Error suscribiendo: ${err}`);
        });
    }

    unsubscribeFromTopic(topic, callback) {
        if (!window.FirebasePlugin) return;

        FirebasePlugin.unsubscribe(topic, () => {
            if (callback) callback();
        }, (err) => {
            this.showToast(`Error desuscribiendo: ${err}`);
        });
    }

    handleNotification(data) {
        if (data.tap || data.tap === true) {
            this.handleNotificationTap(data);
        } else {
            this.showInAppNotification(data);
        }
    }


    handleNotificationTap(data) {
        if (data.page) {
            window.location.href = data.page;
        }
    }


    showInAppNotification(data) {
        const title = data.title || 'Nueva notificación';
        const message = data.body || data.message || '';
        
        this.showToast(`${title}: ${message}`);
    }


    initializeStatusBar() {
        if (window.StatusBar) {
            const isDarkMode = document.body.classList.contains('dark-mode');
            
            if (isDarkMode) {
                StatusBar.styleDefault();
            } else {
                StatusBar.styleLightContent();
            }
            
            StatusBar.overlaysWebView(false);
            StatusBar.backgroundColorByHexString('#000000');
        }
    }

    initializeBackButton() {
        document.addEventListener("backbutton", (e) => {
            e.preventDefault();
            
            const aboutPage = document.getElementById('aboutPage');
            const darkModeModal = document.getElementById('darkModeModal');
            
            if (aboutPage && !aboutPage.classList.contains('hidden')) {
                goBackToSettings();
            } else if (darkModeModal && !darkModeModal.classList.contains('hidden')) {
                closeDarkModeModal();
            } else if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
                window.location.href = 'index.html';
            } else {
                this.exitApp();
            }
        }, false);
    }


    exitApp() {
        if (navigator.app) {
            navigator.app.exitApp();
        } else if (navigator.device) {
            navigator.device.exitApp();
        } else {
            window.close();
        }
    }


    showToast(message, duration = 3000) {
        if (window.plugins && window.plugins.toast) {
            window.plugins.toast.showShortTop(message);
        }
    }


    executePendingOperations() {
        this.pendingOperations.forEach(operation => {
            try {
                operation();
            } catch (error) {
                console.error('Error executing pending operation:', error);
            }
        });
        this.pendingOperations = [];
    }


    executeWhenReady(operation) {
        if (this.isDeviceReady) {
            operation();
        } else {
            this.pendingOperations.push(operation);
        }
    }


    getDeviceInfo() {
        if (window.device) {
            return {
                cordova: device.cordova,
                model: device.model,
                platform: device.platform,
                uuid: device.uuid,
                version: device.version,
                manufacturer: device.manufacturer,
                isVirtual: device.isVirtual,
                serial: device.serial
            };
        }
        return null;
    }


    checkConnection() {
        if (navigator.connection) {
            return {
                type: navigator.connection.type,
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt
            };
        }
        return { type: 'unknown' };
    }


    openExternalURL(url) {
        if (window.cordova && window.cordova.InAppBrowser) {
            cordova.InAppBrowser.open(url, '_system');
        } else {
            window.open(url, '_blank');
        }
    }
}

window.cordovaManager = new CordovaManager();

document.addEventListener('DOMContentLoaded', () => {
    window.cordovaManager.init();
});

window.executeWhenReady = (operation) => {
    window.cordovaManager.executeWhenReady(operation);
};

window.openExternalURL = (url) => {
    window.cordovaManager.openExternalURL(url);
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CordovaManager;
}
