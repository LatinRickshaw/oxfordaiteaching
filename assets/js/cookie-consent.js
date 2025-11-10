/**
 * GDPR UK Compliant Cookie Consent Manager
 * Manages user cookie preferences with localStorage persistence
 */

(function() {
    'use strict';

    const CookieConsent = {
        STORAGE_KEY: 'cookieConsent',
        CONSENT_VERSION: '1.0',

        // Cookie categories
        categories: {
            necessary: true, // Always enabled
            analytics: false,
            marketing: false,
            preferences: false
        },

        /**
         * Initialize the cookie consent system
         */
        init: function() {
            // Check if user has already made a choice
            const savedConsent = this.getConsent();

            if (!savedConsent) {
                // Show the modal if no consent has been saved
                this.showModal();
            } else {
                // Apply saved preferences
                this.applyConsent(savedConsent);
            }

            // Bind event listeners
            this.bindEvents();
        },

        /**
         * Get saved consent from localStorage
         */
        getConsent: function() {
            try {
                const saved = localStorage.getItem(this.STORAGE_KEY);
                return saved ? JSON.parse(saved) : null;
            } catch (e) {
                console.error('Error reading cookie consent:', e);
                return null;
            }
        },

        /**
         * Save consent to localStorage
         */
        saveConsent: function(preferences) {
            const consentData = {
                version: this.CONSENT_VERSION,
                timestamp: new Date().toISOString(),
                preferences: preferences
            };

            try {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(consentData));
                return true;
            } catch (e) {
                console.error('Error saving cookie consent:', e);
                return false;
            }
        },

        /**
         * Show the cookie consent modal
         */
        showModal: function() {
            const modal = document.getElementById('cookieConsentModal');
            if (modal) {
                modal.classList.add('active');
                // Prevent body scroll when modal is open
                document.body.style.overflow = 'hidden';
            }
        },

        /**
         * Hide the cookie consent modal
         */
        hideModal: function() {
            const modal = document.getElementById('cookieConsentModal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        },

        /**
         * Toggle the settings panel
         */
        toggleSettings: function() {
            const modal = document.getElementById('cookieConsentModal');
            if (modal) {
                modal.classList.toggle('show-settings');
            }
        },

        /**
         * Accept all cookies
         */
        acceptAll: function() {
            const preferences = {
                necessary: true,
                analytics: true,
                marketing: true,
                preferences: true
            };

            this.saveConsent(preferences);
            this.applyConsent({ preferences: preferences });
            this.hideModal();
        },

        /**
         * Reject all non-necessary cookies
         */
        rejectAll: function() {
            const preferences = {
                necessary: true,
                analytics: false,
                marketing: false,
                preferences: false
            };

            this.saveConsent(preferences);
            this.applyConsent({ preferences: preferences });
            this.hideModal();
        },

        /**
         * Save custom preferences
         */
        savePreferences: function() {
            const preferences = {
                necessary: true, // Always true
                analytics: document.getElementById('cookie-analytics')?.checked || false,
                marketing: document.getElementById('cookie-marketing')?.checked || false,
                preferences: document.getElementById('cookie-preferences')?.checked || false
            };

            this.saveConsent(preferences);
            this.applyConsent({ preferences: preferences });
            this.hideModal();
        },

        /**
         * Apply consent preferences (enable/disable tracking scripts)
         */
        applyConsent: function(consentData) {
            const prefs = consentData.preferences;

            // Analytics cookies (e.g., Google Analytics)
            if (prefs.analytics) {
                this.enableAnalytics();
            } else {
                this.disableAnalytics();
            }

            // Marketing cookies (e.g., Facebook Pixel, Google Ads)
            if (prefs.marketing) {
                this.enableMarketing();
            } else {
                this.disableMarketing();
            }

            // Preference cookies (e.g., language, theme)
            if (prefs.preferences) {
                this.enablePreferences();
            } else {
                this.disablePreferences();
            }

            // Dispatch custom event for other scripts to listen to
            window.dispatchEvent(new CustomEvent('cookieConsentUpdated', {
                detail: prefs
            }));
        },

        /**
         * Enable analytics tracking
         */
        enableAnalytics: function() {
            // Example: Initialize Google Analytics
            // window.dataLayer = window.dataLayer || [];
            // function gtag(){dataLayer.push(arguments);}
            // gtag('js', new Date());
            // gtag('config', 'GA_MEASUREMENT_ID');

            console.log('Analytics cookies enabled');
        },

        /**
         * Disable analytics tracking
         */
        disableAnalytics: function() {
            // Example: Disable Google Analytics
            // window['ga-disable-GA_MEASUREMENT_ID'] = true;

            console.log('Analytics cookies disabled');
        },

        /**
         * Enable marketing cookies
         */
        enableMarketing: function() {
            // Example: Initialize marketing pixels
            console.log('Marketing cookies enabled');
        },

        /**
         * Disable marketing cookies
         */
        disableMarketing: function() {
            console.log('Marketing cookies disabled');
        },

        /**
         * Enable preference cookies
         */
        enablePreferences: function() {
            console.log('Preference cookies enabled');
        },

        /**
         * Disable preference cookies
         */
        disablePreferences: function() {
            console.log('Preference cookies disabled');
        },

        /**
         * Bind event listeners
         */
        bindEvents: function() {
            // Accept all button
            const acceptAllBtn = document.getElementById('acceptAllCookies');
            if (acceptAllBtn) {
                acceptAllBtn.addEventListener('click', () => this.acceptAll());
            }

            // Reject all button
            const rejectAllBtn = document.getElementById('rejectAllCookies');
            if (rejectAllBtn) {
                rejectAllBtn.addEventListener('click', () => this.rejectAll());
            }

            // Reject all button from settings
            const rejectAllFromSettingsBtn = document.getElementById('rejectAllFromSettings');
            if (rejectAllFromSettingsBtn) {
                rejectAllFromSettingsBtn.addEventListener('click', () => this.rejectAll());
            }

            // Manage preferences button
            const manageBtn = document.getElementById('manageCookiePreferences');
            if (manageBtn) {
                manageBtn.addEventListener('click', () => this.toggleSettings());
            }

            // Save preferences button
            const saveBtn = document.getElementById('saveCookiePreferences');
            if (saveBtn) {
                saveBtn.addEventListener('click', () => this.savePreferences());
            }

            // Back button from settings
            const backBtn = document.getElementById('backFromSettings');
            if (backBtn) {
                backBtn.addEventListener('click', () => this.toggleSettings());
            }

            // Cookie settings trigger (for footer link)
            const settingsTrigger = document.getElementById('cookieSettingsTrigger');
            if (settingsTrigger) {
                settingsTrigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showModal();
                    // If there are saved preferences, show the settings panel
                    const saved = this.getConsent();
                    if (saved) {
                        this.toggleSettings();
                        this.loadSavedPreferences(saved.preferences);
                    }
                });
            }
        },

        /**
         * Load saved preferences into checkboxes
         */
        loadSavedPreferences: function(preferences) {
            const analyticsCheckbox = document.getElementById('cookie-analytics');
            const marketingCheckbox = document.getElementById('cookie-marketing');
            const preferencesCheckbox = document.getElementById('cookie-preferences');

            if (analyticsCheckbox) analyticsCheckbox.checked = preferences.analytics;
            if (marketingCheckbox) marketingCheckbox.checked = preferences.marketing;
            if (preferencesCheckbox) preferencesCheckbox.checked = preferences.preferences;
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => CookieConsent.init());
    } else {
        CookieConsent.init();
    }

    // Expose to window for external access if needed
    window.CookieConsent = CookieConsent;

})();
