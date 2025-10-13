/**
 * Main Application Entry Point
 * Handles UI interactions and initializes the 4D visualizer
 */

class App4D {
    constructor() {
        this.visualizer = null;
        this.isInitialized = false;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        try {
            this.setupVisualizer();
            this.setupUI();
            this.hideLoading();
            this.isInitialized = true;
            console.log('4D Visualizer initialized successfully');
        } catch (error) {
            console.error('Failed to initialize 4D Visualizer:', error);
            this.showError('Failed to initialize 4D Visualizer. Please refresh the page.');
        }
    }

    setupVisualizer() {
        const container = document.getElementById('canvas-container');
        if (!container) {
            throw new Error('Canvas container not found');
        }
        
        this.visualizer = new Visualizer4D(container);
    }

    setupUI() {
        this.setupModelSelector();
        this.setupRotationControls();
        this.setupProjectionControls();
        this.setupAnimationControls();
        this.setupButtons();
    }

    setupModelSelector() {
        const modelSelect = document.getElementById('model-select');
        if (modelSelect) {
            modelSelect.addEventListener('change', (e) => {
                this.visualizer.loadModel(e.target.value);
            });
        }
    }

    setupRotationControls() {
        const rotationControls = ['rotation-x', 'rotation-y', 'rotation-z', 'rotation-w'];
        const valueDisplays = ['rot-x-value', 'rot-y-value', 'rot-z-value', 'rot-w-value'];
        
        rotationControls.forEach((controlId, index) => {
            const control = document.getElementById(controlId);
            const valueDisplay = document.getElementById(valueDisplays[index]);
            
            if (control && valueDisplay) {
                control.addEventListener('input', (e) => {
                    const value = parseFloat(e.target.value);
                    valueDisplay.textContent = `${value}°`;
                    this.updateRotation();
                });
            }
        });
    }

    setupProjectionControls() {
        const projectionSelect = document.getElementById('projection');
        if (projectionSelect) {
            projectionSelect.addEventListener('change', (e) => {
                this.visualizer.updateProjection(e.target.value);
            });
        }
    }

    setupAnimationControls() {
        const animationSpeed = document.getElementById('animation-speed');
        const animSpeedValue = document.getElementById('anim-speed-value');
        
        if (animationSpeed && animSpeedValue) {
            animationSpeed.addEventListener('input', (e) => {
                const speed = parseFloat(e.target.value);
                animSpeedValue.textContent = speed.toFixed(1);
                this.visualizer.updateAnimationSpeed(speed);
            });
        }
    }

    setupButtons() {
        const autoRotateBtn = document.getElementById('auto-rotate');
        const resetBtn = document.getElementById('reset-view');
        
        if (autoRotateBtn) {
            autoRotateBtn.addEventListener('click', () => {
                this.visualizer.toggleAutoRotation();
                autoRotateBtn.textContent = this.visualizer.animation.autoRotate ? 
                    'Stop Auto Rotation' : 'Toggle Auto Rotation';
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.visualizer.resetView();
                this.resetRotationControls();
            });
        }
    }

    updateRotation() {
        if (!this.visualizer) return;
        
        const x = this.getRotationValue('rotation-x') * Math.PI / 180;
        const y = this.getRotationValue('rotation-y') * Math.PI / 180;
        const z = this.getRotationValue('rotation-z') * Math.PI / 180;
        const w = this.getRotationValue('rotation-w') * Math.PI / 180;
        
        this.visualizer.updateRotation(x, y, z, w);
    }

    getRotationValue(controlId) {
        const control = document.getElementById(controlId);
        return control ? parseFloat(control.value) : 0;
    }

    resetRotationControls() {
        const rotationControls = ['rotation-x', 'rotation-y', 'rotation-z', 'rotation-w'];
        const valueDisplays = ['rot-x-value', 'rot-y-value', 'rot-z-value', 'rot-w-value'];
        
        rotationControls.forEach((controlId, index) => {
            const control = document.getElementById(controlId);
            const valueDisplay = document.getElementById(valueDisplays[index]);
            
            if (control && valueDisplay) {
                control.value = 0;
                valueDisplay.textContent = '0°';
            }
        });
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = 'none';
        }
    }

    showError(message) {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.textContent = message;
            loading.style.color = '#ff4444';
        }
    }

    // Public API methods
    loadModel(modelName) {
        if (this.visualizer) {
            this.visualizer.loadModel(modelName);
        }
    }

    setProjection(type, distance) {
        if (this.visualizer) {
            this.visualizer.updateProjection(type, distance);
        }
    }

    setRotation(x, y, z, w) {
        if (this.visualizer) {
            this.visualizer.updateRotation(x, y, z, w);
        }
    }

    toggleAutoRotation() {
        if (this.visualizer) {
            this.visualizer.toggleAutoRotation();
        }
    }

    resetView() {
        if (this.visualizer) {
            this.visualizer.resetView();
        }
    }
}

// Initialize the application
let app4D;

// Start the application when the page loads
window.addEventListener('load', () => {
    app4D = new App4D();
});

// Handle window resize
window.addEventListener('resize', () => {
    if (app4D && app4D.visualizer) {
        app4D.visualizer.onWindowResize();
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (app4D && app4D.visualizer) {
        app4D.visualizer.dispose();
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App4D;
}
