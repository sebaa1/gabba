
class FirebaseManager {
    constructor() {
        this.isInitialized = false;
        this.token = null;
    }

    init() {
        if (this.isInitialized) return;

        document.addEventListener('cordova-ready', () => {
            this.setupFirebase();
        });

        this.isInitialized = true;
    }

    setupFirebase() {
        if (!window.FirebasePlugin) {
            return;
        }

        this.requestPermission();

        this.getToken();

        this.setupMessageHandling();
    }

    requestPermission() {
        FirebasePlugin.grantPermission((granted) => {
        }, (error) => {
            console.error('Error requesting notification permission:', error);
        });
    }

    getToken() {
        FirebasePlugin.getToken((token) => {
            this.token = token;
            localStorage.setItem('firebase_token', token);
            
            this.sendTokenToServer(token);
        }, (error) => {
            console.error('Error getting Firebase token:', error);
        });
    }

    setupMessageHandling() {
        FirebasePlugin.onMessageReceived((data) => {
            if (data.tap || data.tap === true) {
                this.handleMessageTap(data);
            } else {
                this.handleForegroundMessage(data);
            }
        }, (error) => {
            console.error('Error handling Firebase message:', error);
        });

        FirebasePlugin.onTokenRefresh((token) => {
            this.token = token;
            localStorage.setItem('firebase_token', token);
            this.sendTokenToServer(token);
        }, (error) => {
            console.error('Error on token refresh:', error);
        });
    }

    handleMessageTap(data) {
        if (data.page) {
            window.location.href = data.page;
        } else if (data.url) {
            window.location.href = data.url;
        }
    }

    handleForegroundMessage(data) {
        const title = data.title || 'Nueva notificación';
        const body = data.body || data.message || '';
        
        if (window.cordovaManager) {
            window.cordovaManager.showToast(`${title}: ${body}`);
        }
    }

    sendTokenToServer(token) {
    }

    subscribeToTopic(topic) {
        return new Promise((resolve, reject) => {
            if (!window.FirebasePlugin) {
                reject('FirebasePlugin not available');
                return;
            }

            FirebasePlugin.subscribe(topic, () => {
                resolve();
            }, (error) => {
                reject(error);
            });
        });
    }

    unsubscribeFromTopic(topic) {
        return new Promise((resolve, reject) => {
            if (!window.FirebasePlugin) {
                reject('FirebasePlugin not available');
                return;
            }

            FirebasePlugin.unsubscribe(topic, () => {
                resolve();
            }, (error) => {
                reject(error);
            });
        });
    }
}

window.firebaseManager = new FirebaseManager();

document.addEventListener('DOMContentLoaded', () => {
    window.firebaseManager.init();
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FirebaseManager;
}
