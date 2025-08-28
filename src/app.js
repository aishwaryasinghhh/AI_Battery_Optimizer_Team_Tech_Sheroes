// Futuristic Battery Optimizer App - JavaScript
class BatteryOptimizerApp {
    constructor() {
        this.data = {
            batteryStatus: {
                level: 73,
                isCharging: false,
                timeRemaining: "8h 42m",
                health: "Excellent",
                cycleCount: 432,
                temperature: 32.1
            },
            aiPredictions: {
                nextApp: {
                    name: "Instagram",
                    confidence: 87,
                    timeToLaunch: "~15 min",
                    icon: "📸"
                },
                alternatives: [
                    {"name": "YouTube", "confidence": 72, "icon": "📺"},
                    {"name": "Gaming", "confidence": 68, "icon": "🎮"},
                    {"name": "Messages", "confidence": 45, "icon": "💬"}
                ]
            },
            performance: {
                currentFPS: 60,
                availableFPS: [30, 60, 90, 120],
                mode: "Balanced",
                cpuUsage: 45,
                gpuUsage: 32,
                temperature: 38.5
            },
            backgroundApps: [
                {"name": "Spotify", "status": "optimized", "powerUsage": "Low", "icon": "🎵"},
                {"name": "WhatsApp", "status": "normal", "powerUsage": "Medium", "icon": "💬"},
                {"name": "Facebook", "status": "restricted", "powerUsage": "High", "icon": "📘"},
                {"name": "Instagram", "status": "optimized", "powerUsage": "Medium", "icon": "📸"},
                {"name": "YouTube", "status": "normal", "powerUsage": "High", "icon": "📺"}
            ],
            brightness: {
                current: 65,
                auto: true,
                gazeDetected: true,
                ambientLight: 240,
                userPresent: true
            },
            stats: {
                powerSavedToday: "2h 34m",
                appsOptimized: 12,
                efficiencyScore: 94,
                predictionAccuracy: 91
            },
            batteryHistory: [
                {"time": "00:00", "level": 100},
                {"time": "06:00", "level": 92},
                {"time": "12:00", "level": 85},
                {"time": "18:00", "level": 73},
                {"time": "24:00", "level": 65}
            ],
            appUsageData: [
                {"app": "Social Media", "usage": 3.2, "prediction": 3.8},
                {"app": "Gaming", "usage": 2.1, "prediction": 2.3},
                {"app": "Video", "usage": 1.8, "prediction": 2.1},
                {"app": "Productivity", "usage": 1.5, "prediction": 1.2},
                {"app": "Music", "usage": 0.9, "prediction": 1.1}
            ]
        };
        
        this.charts = {};
        this.updateIntervals = [];
        
        this.init();
    }

    init() {
        this.setupTabNavigation();
        this.setupCharts();
        this.setupControls();
        this.setupRealTimeUpdates();
        this.setupPredictionPanelNavigation();
        this.animateElements();
    }

    setupTabNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active classes
                navButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(tab => tab.classList.remove('active'));
                
                // Add active classes
                button.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
                
                // Trigger tab-specific animations
                this.animateTabContent(targetTab);
            });
        });
    }

    setupPredictionPanelNavigation() {
        const predictionWidget = document.querySelector('.prediction-widget');
        if (predictionWidget) {
            predictionWidget.addEventListener('click', () => {
                // Navigate to predictions tab
                const predictionsNavBtn = document.querySelector('[data-tab="predictions"]');
                if (predictionsNavBtn) {
                    predictionsNavBtn.click();
                }
            });

            // Add visual feedback for clickability
            predictionWidget.style.cursor = 'pointer';
            predictionWidget.addEventListener('mouseenter', () => {
                predictionWidget.style.transform = 'translateY(-2px)';
            });
            predictionWidget.addEventListener('mouseleave', () => {
                predictionWidget.style.transform = 'translateY(0)';
            });
        }
    }

    setupCharts() {
        this.createBatteryChart();
        this.createBatteryHistoryChart();
        this.createAppUsageChart();
    }

    createBatteryChart() {
        const ctx = document.getElementById('batteryChart');
        if (!ctx) return;

        this.charts.battery = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [this.data.batteryStatus.level, 100 - this.data.batteryStatus.level],
                    backgroundColor: [
                        'rgba(0, 212, 255, 0.8)',
                        'rgba(255, 255, 255, 0.1)'
                    ],
                    borderWidth: 0,
                    cutout: '80%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 2000
                }
            }
        });
    }

    createBatteryHistoryChart() {
        const ctx = document.getElementById('batteryHistoryChart');
        if (!ctx) return;

        const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(0, 212, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 212, 255, 0.1)');

        this.charts.batteryHistory = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.data.batteryHistory.map(item => item.time),
                datasets: [{
                    label: 'Battery Level',
                    data: this.data.batteryHistory.map(item => item.level),
                    borderColor: '#00d4ff',
                    backgroundColor: gradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#00d4ff',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        },
                        min: 0,
                        max: 100
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutCubic'
                }
            }
        });
    }

    createAppUsageChart() {
        const ctx = document.getElementById('appUsageChart');
        if (!ctx) return;

        this.charts.appUsage = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.data.appUsageData.map(item => item.app),
                datasets: [
                    {
                        label: 'Actual Usage',
                        data: this.data.appUsageData.map(item => item.usage),
                        backgroundColor: '#1FB8CD',
                        borderRadius: 6
                    },
                    {
                        label: 'AI Prediction',
                        data: this.data.appUsageData.map(item => item.prediction),
                        backgroundColor: '#FFC185',
                        borderRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.8)',
                            usePointStyle: true,
                            pointStyle: 'rectRounded'
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        },
                        beginAtZero: true
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutCubic'
                }
            }
        });
    }

    setupControls() {
        this.setupFPSControl();
        this.setupPerformanceModes();
        this.setupBrightnessControl();
        this.setupAppToggles();
        this.setupOptimizeButton();
        this.setupSwitches();
    }

    setupFPSControl() {
        const fpsButtons = document.querySelectorAll('.fps-btn');
        const fpsValue = document.querySelector('.fps-value');
        const smartToggle = document.getElementById('smartFpsToggle');

        fpsButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (smartToggle && smartToggle.checked) return; // Don't allow manual control in smart mode

                const fps = parseInt(button.getAttribute('data-fps'));
                
                // Update UI
                fpsButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Animate FPS value change
                this.animateNumberChange(fpsValue, this.data.performance.currentFPS, fps);
                this.data.performance.currentFPS = fps;
            });
        });

        if (smartToggle) {
            smartToggle.addEventListener('change', (e) => {
                const fpsOptions = document.querySelector('.fps-options');
                if (e.target.checked) {
                    fpsOptions.style.opacity = '0.5';
                    fpsOptions.style.pointerEvents = 'none';
                } else {
                    fpsOptions.style.opacity = '1';
                    fpsOptions.style.pointerEvents = 'auto';
                }
            });
        }
    }

    setupPerformanceModes() {
        const modeButtons = document.querySelectorAll('.mode-btn');

        modeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const mode = button.getAttribute('data-mode');
                
                // Update UI
                modeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update data and trigger performance changes
                this.data.performance.mode = mode;
                this.updatePerformanceMetrics(mode);
            });
        });
    }

    setupBrightnessControl() {
        const brightnessSlider = document.getElementById('brightnessSlider');
        const brightnessValue = document.querySelector('.brightness-value');
        const autoToggle = document.getElementById('autoBrightnessToggle');

        if (brightnessSlider) {
            brightnessSlider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                brightnessValue.textContent = value + '%';
                this.data.brightness.current = value;
                
                // Disable auto brightness when manually adjusted
                if (autoToggle && autoToggle.checked) {
                    autoToggle.checked = false;
                    this.data.brightness.auto = false;
                }
            });
        }

        if (autoToggle) {
            autoToggle.addEventListener('change', (e) => {
                this.data.brightness.auto = e.target.checked;
                if (e.target.checked) {
                    // Simulate auto brightness adjustment
                    this.simulateAutoBrightness();
                }
            });
        }
    }

    setupAppToggles() {
        const appToggles = document.querySelectorAll('.app-toggle');

        appToggles.forEach((toggle, index) => {
            toggle.addEventListener('click', () => {
                const app = this.data.backgroundApps[index];
                
                // Cycle through statuses
                const statuses = ['normal', 'optimized', 'restricted'];
                const currentIndex = statuses.indexOf(app.status);
                const nextIndex = (currentIndex + 1) % statuses.length;
                app.status = statuses[nextIndex];

                // Update UI
                toggle.className = `app-toggle ${app.status}`;
                const statusElement = toggle.previousElementSibling;
                statusElement.className = `app-status ${app.status}`;
                statusElement.textContent = app.status.charAt(0).toUpperCase() + app.status.slice(1);
                
                // Add animation
                toggle.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    toggle.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }

    setupOptimizeButton() {
        const optimizeBtn = document.getElementById('optimizeNowBtn');
        if (optimizeBtn) {
            optimizeBtn.addEventListener('click', () => {
                this.runOptimization();
            });
        }
    }

    setupSwitches() {
        const switches = document.querySelectorAll('.switch input[type="checkbox"]');
        
        switches.forEach(switchInput => {
            switchInput.addEventListener('change', (e) => {
                // Add animation to slider
                const slider = e.target.nextElementSibling;
                slider.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    slider.style.transform = 'scale(1)';
                }, 100);
            });
        });
    }

    setupRealTimeUpdates() {
        // Update time every second
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            const timeElement = document.querySelector('.time');
            if (timeElement) {
                timeElement.textContent = timeString;
            }
        };
        
        updateTime();
        this.updateIntervals.push(setInterval(updateTime, 1000));

        // Simulate battery drain
        this.updateIntervals.push(setInterval(() => {
            if (!this.data.batteryStatus.isCharging && this.data.batteryStatus.level > 0) {
                this.data.batteryStatus.level = Math.max(0, this.data.batteryStatus.level - 0.1);
                this.updateBatteryDisplay();
            }
        }, 30000)); // Update every 30 seconds

        // Simulate AI predictions updates
        this.updateIntervals.push(setInterval(() => {
            this.updateAIPredictions();
        }, 45000)); // Update every 45 seconds

        // Simulate gaze detection
        this.updateIntervals.push(setInterval(() => {
            this.simulateGazeDetection();
        }, 3000)); // Update every 3 seconds

        // Update performance metrics
        this.updateIntervals.push(setInterval(() => {
            this.updateSystemMetrics();
        }, 5000)); // Update every 5 seconds
    }

    updateBatteryDisplay() {
        const batteryPercentage = document.querySelector('.battery-percentage');
        const batteryLevel = document.querySelector('.battery-level');
        
        const level = Math.round(this.data.batteryStatus.level);
        
        if (batteryPercentage) {
            batteryPercentage.textContent = level + '%';
        }
        
        if (batteryLevel) {
            batteryLevel.textContent = level + '%';
        }

        // Update battery chart
        if (this.charts.battery) {
            this.charts.battery.data.datasets[0].data = [level, 100 - level];
            this.charts.battery.update('none');
        }
    }

    updateAIPredictions() {
        const predictions = [
            { name: "Instagram", icon: "📸", confidence: 87 },
            { name: "YouTube", icon: "📺", confidence: 82 },
            { name: "Gaming", icon: "🎮", confidence: 75 },
            { name: "Messages", icon: "💬", confidence: 68 },
            { name: "Music", icon: "🎵", confidence: 62 }
        ];

        const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
        this.data.aiPredictions.nextApp = {
            ...randomPrediction,
            timeToLaunch: `~${Math.floor(Math.random() * 30) + 5} min`
        };

        // Update UI
        const appIcon = document.querySelector('.next-app-prediction .app-icon');
        const appName = document.querySelector('.prediction-info h4');
        const confidenceFill = document.querySelector('.confidence-fill');
        const confidenceText = document.querySelector('.confidence-text');
        const launchTime = document.querySelector('.launch-time');

        if (appIcon) appIcon.textContent = randomPrediction.icon;
        if (appName) appName.textContent = `Next App: ${randomPrediction.name}`;
        if (confidenceFill) {
            confidenceFill.style.width = randomPrediction.confidence + '%';
        }
        if (confidenceText) confidenceText.textContent = randomPrediction.confidence + '% confidence';
        if (launchTime) launchTime.textContent = `Expected in ${this.data.aiPredictions.nextApp.timeToLaunch}`;
    }

    simulateGazeDetection() {
        const userPresent = Math.random() > 0.3; // 70% chance user is present
        const gazeDetected = userPresent && Math.random() > 0.2; // 80% chance gaze is detected when present
        
        this.data.brightness.userPresent = userPresent;
        this.data.brightness.gazeDetected = gazeDetected;

        // Update UI
        const faceIndicator = document.querySelector('.face-indicator');
        const statusIndicators = document.querySelectorAll('.gaze-status .status-indicator');

        if (faceIndicator) {
            if (gazeDetected) {
                faceIndicator.classList.add('active');
            } else {
                faceIndicator.classList.remove('active');
            }
        }

        // Update status indicators
        if (statusIndicators.length >= 2) {
            statusIndicators[0].classList.toggle('active', userPresent);
            statusIndicators[1].classList.toggle('active', gazeDetected);
        }

        // Auto-adjust brightness based on gaze
        if (this.data.brightness.auto) {
            const targetBrightness = gazeDetected ? 
                Math.max(50, this.data.brightness.current) : 
                Math.max(20, this.data.brightness.current * 0.6);
            
            this.animateBrightnessChange(targetBrightness);
        }
    }

    updateSystemMetrics() {
        // Simulate realistic system metrics
        const baseTemp = 35 + Math.random() * 10;
        const baseCPU = 20 + Math.random() * 60;
        const baseGPU = 15 + Math.random() * 50;

        this.data.performance.temperature = Math.round(baseTemp * 10) / 10;
        this.data.performance.cpuUsage = Math.round(baseCPU);
        this.data.performance.gpuUsage = Math.round(baseGPU);

        // Update UI
        const metricFills = document.querySelectorAll('.metric-fill');
        const metricValues = document.querySelectorAll('.metric-value');

        if (metricFills.length >= 3 && metricValues.length >= 3) {
            // CPU
            metricFills[0].style.width = this.data.performance.cpuUsage + '%';
            metricValues[0].textContent = this.data.performance.cpuUsage + '%';
            
            // GPU
            metricFills[1].style.width = this.data.performance.gpuUsage + '%';
            metricValues[1].textContent = this.data.performance.gpuUsage + '%';
            
            // Temperature
            const tempPercentage = Math.min(100, (this.data.performance.temperature - 30) * 2);
            metricFills[2].style.width = tempPercentage + '%';
            metricValues[2].textContent = this.data.performance.temperature + '°C';
        }
    }

    updatePerformanceMetrics(mode) {
        let cpuMultiplier = 1;
        let gpuMultiplier = 1;
        let fpsTarget = 60;

        switch (mode) {
            case 'ultra-low':
                cpuMultiplier = 0.6;
                gpuMultiplier = 0.5;
                fpsTarget = 30;
                break;
            case 'balanced':
                cpuMultiplier = 1;
                gpuMultiplier = 1;
                fpsTarget = 60;
                break;
            case 'performance':
                cpuMultiplier = 1.3;
                gpuMultiplier = 1.4;
                fpsTarget = 90;
                break;
        }

        // Auto-adjust FPS if smart mode is enabled
        const smartToggle = document.getElementById('smartFpsToggle');
        if (smartToggle && smartToggle.checked) {
            const fpsValue = document.querySelector('.fps-value');
            const fpsButtons = document.querySelectorAll('.fps-btn');
            
            this.animateNumberChange(fpsValue, this.data.performance.currentFPS, fpsTarget);
            this.data.performance.currentFPS = fpsTarget;
            
            // Update active FPS button
            fpsButtons.forEach(btn => btn.classList.remove('active'));
            const targetBtn = document.querySelector(`[data-fps="${fpsTarget}"]`);
            if (targetBtn) targetBtn.classList.add('active');
        }

        // Simulate performance changes
        setTimeout(() => {
            this.data.performance.cpuUsage = Math.round(this.data.performance.cpuUsage * cpuMultiplier);
            this.data.performance.gpuUsage = Math.round(this.data.performance.gpuUsage * gpuMultiplier);
            this.updateSystemMetrics();
        }, 500);
    }

    simulateAutoBrightness() {
        const ambientLight = 180 + Math.random() * 120; // 180-300 lux
        this.data.brightness.ambientLight = Math.round(ambientLight);
        
        // Calculate target brightness based on ambient light
        const targetBrightness = Math.round(Math.min(100, Math.max(20, ambientLight / 4)));
        
        this.animateBrightnessChange(targetBrightness);

        // Update ambient light display
        const ambientValue = document.querySelector('.ambient-value');
        if (ambientValue) {
            ambientValue.textContent = this.data.brightness.ambientLight + ' lux';
        }
    }

    runOptimization() {
        const optimizeBtn = document.getElementById('optimizeNowBtn');
        if (!optimizeBtn) return;

        // Show loading state
        optimizeBtn.innerHTML = '<span class="btn-icon">⏳</span>Optimizing...';
        optimizeBtn.disabled = true;

        // Simulate optimization process
        setTimeout(() => {
            // Update app statuses
            this.data.backgroundApps.forEach((app, index) => {
                if (app.powerUsage === 'High' && Math.random() > 0.5) {
                    app.status = 'optimized';
                    const appToggle = document.querySelectorAll('.app-toggle')[index];
                    const statusElement = document.querySelectorAll('.app-status')[index];
                    if (appToggle && statusElement) {
                        appToggle.className = 'app-toggle optimized';
                        statusElement.className = 'app-status optimized';
                        statusElement.textContent = 'Optimized';
                    }
                }
            });

            // Update stats
            this.data.stats.appsOptimized += 3;
            this.data.stats.efficiencyScore = Math.min(100, this.data.stats.efficiencyScore + 2);

            // Update UI
            const appsOptimizedElement = document.querySelector('.stats-grid .stat-card:nth-child(2) .stat-value');
            const efficiencyElement = document.querySelector('.stats-grid .stat-card:nth-child(3) .stat-value');
            
            if (appsOptimizedElement) {
                this.animateNumberChange(appsOptimizedElement, 
                    parseInt(appsOptimizedElement.textContent), 
                    this.data.stats.appsOptimized);
            }
            
            if (efficiencyElement) {
                this.animateNumberChange(efficiencyElement, 
                    parseInt(efficiencyElement.textContent.replace('%', '')), 
                    this.data.stats.efficiencyScore, '%');
            }

            // Reset button
            optimizeBtn.innerHTML = '<span class="btn-icon">✅</span>Optimization Complete!';
            
            setTimeout(() => {
                optimizeBtn.innerHTML = '<span class="btn-icon">🚀</span>Optimize Now';
                optimizeBtn.disabled = false;
            }, 2000);
        }, 3000);
    }

    animateTabContent(tabId) {
        const tab = document.getElementById(tabId);
        if (!tab) return;

        const cards = tab.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    animateElements() {
        // Initial page load animations
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.classList.add('loading');
                card.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });

        // Animate confidence bars
        setTimeout(() => {
            const confidenceFills = document.querySelectorAll('.confidence-fill');
            confidenceFills.forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = width;
                }, 500);
            });
        }, 1000);
    }

    animateNumberChange(element, from, to, suffix = '') {
        const duration = 1000;
        const steps = 60;
        const increment = (to - from) / steps;
        let current = from;
        let step = 0;

        const animate = () => {
            if (step < steps) {
                current += increment;
                element.textContent = Math.round(current) + suffix;
                step++;
                requestAnimationFrame(animate);
            } else {
                element.textContent = to + suffix;
            }
        };

        animate();
    }

    animateBrightnessChange(targetBrightness) {
        const brightnessValue = document.querySelector('.brightness-value');
        const brightnessSlider = document.getElementById('brightnessSlider');
        
        if (brightnessValue && brightnessSlider) {
            const currentBrightness = this.data.brightness.current;
            this.animateNumberChange(brightnessValue, currentBrightness, targetBrightness, '%');
            
            // Animate slider
            const steps = 30;
            const increment = (targetBrightness - currentBrightness) / steps;
            let current = currentBrightness;
            let step = 0;

            const animateSlider = () => {
                if (step < steps) {
                    current += increment;
                    brightnessSlider.value = Math.round(current);
                    step++;
                    requestAnimationFrame(animateSlider);
                } else {
                    brightnessSlider.value = targetBrightness;
                    this.data.brightness.current = targetBrightness;
                }
            };

            animateSlider();
        }
    }

    destroy() {
        // Clean up intervals
        this.updateIntervals.forEach(interval => clearInterval(interval));
        
        // Destroy charts
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new BatteryOptimizerApp();
    
    // Make app globally accessible for debugging
    window.batteryApp = app;
    
    // Handle page unload
    window.addEventListener('beforeunload', () => {
        app.destroy();
    });
});

// Add some utility functions for enhanced UX
function addHapticFeedback() {
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }
}

// Add haptic feedback to buttons
document.addEventListener('click', (e) => {
    if (e.target.matches('button, .nav-btn, .app-toggle, .fps-btn, .mode-btn')) {
        addHapticFeedback();
    }
});

// Add swipe gesture support for tab navigation
let startX = 0;
let startY = 0;
let isSwipingHorizontally = false;

document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isSwipingHorizontally = false;
});

document.addEventListener('touchmove', (e) => {
    if (!startX || !startY) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    
    const diffX = Math.abs(currentX - startX);
    const diffY = Math.abs(currentY - startY);
    
    if (diffX > diffY && diffX > 50) {
        isSwipingHorizontally = true;
        e.preventDefault(); // Prevent scrolling
    }
});

document.addEventListener('touchend', (e) => {
    if (!startX || !isSwipingHorizontally) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    const activeTab = document.querySelector('.nav-btn.active');
    const tabs = Array.from(document.querySelectorAll('.nav-btn'));
    const currentIndex = tabs.indexOf(activeTab);
    
    if (Math.abs(diff) > 100) { // Minimum swipe distance
        if (diff > 0 && currentIndex < tabs.length - 1) {
            // Swipe left - next tab
            tabs[currentIndex + 1].click();
        } else if (diff < 0 && currentIndex > 0) {
            // Swipe right - previous tab
            tabs[currentIndex - 1].click();
        }
    }
    
    startX = 0;
    startY = 0;
    isSwipingHorizontally = false;
});