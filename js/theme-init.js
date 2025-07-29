
(function() {
    'use strict';
    
    function applyTheme() {
        const theme = localStorage.getItem('theme') || 'dark';
        
        if (!document.body) {
            return false;
        }
        
        document.body.classList.remove('dark-mode', 'light-mode');
        
        document.body.classList.add(theme + '-mode');
        
        document.body.classList.add('app-ready');
        
        console.log('✅ Tema aplicado:', theme + '-mode');
        return true;
    }
    
    function initAnimations() {
        if (localStorage.getItem('disableAnimations') === 'true') {
            document.body?.classList.add('no-animations');
        }
    }
    
    function init() {
        if (applyTheme()) {
            initAnimations();
        }
    }
    
    init();
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    document.addEventListener('deviceready', init, false);
    
})();
