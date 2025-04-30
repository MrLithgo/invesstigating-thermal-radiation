// Initial temperatures
const initialTemps = {
    black: 85.0,
    clear: 85.0,
    white: 85.0,
    silver: 85.0
};

let currentTemps = {...initialTemps};
let intervalId = null;
let stopwatchInterval = null;
let seconds = 0;
let isRunning = false;

// Cooling rates (how much each tube cools per second)
const coolingRates = {
    black: 0.15,
    clear: 0.12,
    white: 0.09,
    silver: 0.06
};

// DOM elements
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const stopwatchDisplay = document.getElementById('stopwatch');

// Update thermometer and temperature display
function updateTemperatures() {
    for (const color in currentTemps) {
        // Ensure temperature doesn't go below room temperature (assuming ~20°C)
        if (currentTemps[color] > 20.0) {
            currentTemps[color] -= coolingRates[color] * (Math.random() * 0.1 + 0.95); // Small random variation
        } else {
            currentTemps[color] = 20.0;
        }
        
        // Update thermometer mercury height (170px = 85°C, 10px = 20°C)
        const mercuryHeight = 10 + (currentTemps[color] - 20) * (160 / 65);
        document.getElementById(`mercury-${color}`).style.height = `${mercuryHeight}px`;
        
        // Update temperature display
        document.getElementById(`temp-${color}`).textContent = `${currentTemps[color].toFixed(1)}°C`;
    }
}

// Start the experiment
function startExperiment() {
    if (isRunning) return;
    
    isRunning = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    
    // Start temperature update interval
    intervalId = setInterval(updateTemperatures, 1000);
    
    // Start stopwatch
    seconds = 0;
    stopwatchInterval = setInterval(updateStopwatch, 1000);
}

// Stop the experiment
function stopExperiment() {
    if (!isRunning) return;
    
    isRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    
    clearInterval(intervalId);
    clearInterval(stopwatchInterval);
}

// Reset the experiment
function resetExperiment() {
    stopExperiment();
    
    // Reset temperatures
    currentTemps = {...initialTemps};
    
    // Reset displays
    for (const color in currentTemps) {
        document.getElementById(`mercury-${color}`).style.height = '170px';
        document.getElementById(`temp-${color}`).textContent = '85.0°C';
    }
    
    // Reset stopwatch
    seconds = 0;
    stopwatchDisplay.textContent = '00:00:00';
}

// Update stopwatch display
function updateStopwatch() {
    seconds++;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    stopwatchDisplay.textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Event listeners
startBtn.addEventListener('click', startExperiment);
stopBtn.addEventListener('click', stopExperiment);
resetBtn.addEventListener('click', resetExperiment);



document.getElementById("help-button").addEventListener("click", function () {
  // Create a new div element for the floating window
  var helpWindow = document.createElement("div");
  helpWindow.id = "help-window";
  helpWindow.style.position = "absolute";
  helpWindow.style.top = "50%";
  helpWindow.style.left = "50%";
  helpWindow.style.transform = "translate(-50%, -50%)";
  helpWindow.style.width = "60%";
  helpWindow.style.height = "100%";
  helpWindow.style.background = "white";
  helpWindow.style.border = "1px solid black";
  helpWindow.style.padding = "10px";
  helpWindow.style.zIndex = "1000";
  helpWindow.style.overflow = "auto";
  helpWindow.style.overflowY = "auto";
  helpWindow.style.textAlign = "left"

  // Add content to the floating window
  var helpContent = document.createElement("p");
  helpContent.innerHTML =
    '<h2 style="text-align:center;">Core Practical 8: Thermal Radiation</h2><p><b>Aim of the Experiment</b></p><ul><li>The aim of the experiment is to investigate how the amount of infrared radiation absorbed or radiated by a surface depends on the nature of that surface </li></ul><p><b>Variables:</b></p><ul><li><b>Independent variable</b> = Colour</li><li><b>Dependent variable</b> = Temperature</li><li><b>Control variables:</b><ul><li>Volume of water</li><li>Starting temperature of water</li><li>Same sized container</li></li></li></ul></ul><p><b>Method:</b></p><ol><li>Set up the four identical boiling tubes painted in different colours: black, white and silver. One is not painted as a control.</li><li>Fill the boiling tubes with hot water, ensuring the measurements start from the same initial temperature</li><li>Note the starting temperature, then measure the temperatures at regular intervals, e.g. every 30s for 10 minutes</li></ul></ol><p><b>Analysis of Results</b></p><ul><li>Plot a graph of temperature against time. You should have 4 cooling curves.</li></li><li>Most of the energy lost from the beakers will be by heating due to conduction and convection</li><li>Any difference in energy loss will be due to infre-red radiation from the surfaces</li><li>Which colour was the best at radiating heat? Which was the worst?</li></li></li></ul><p><b>Extension</b></p><ul><li>How could you find out which colour absorbbs heat radiation best?</li></ul><p><b>Evaluation</b></p><ul><li>How could you reduce heat loss by conduction and convection?</li><li>Using a data logger with temperature probe would make this more accurate</li></ul>';
  helpWindow.appendChild(helpContent);

  // Add a close button to the floating window
  var closeButton = document.createElement("button");
  closeButton.innerHTML = "Close";
  closeButton.style.position = "absolute";
  closeButton.style.top = "20px";
  closeButton.style.right = "10px";
  closeButton.style.width="10%";
  closeButton.addEventListener("click", function () {
    helpWindow.remove();
  });
  helpWindow.appendChild(closeButton);

  document.body.appendChild(helpWindow);
});

document.querySelectorAll('button').forEach(button => {
    button.style.touchAction = 'manipulation'; // Improve touch responsiveness
    button.style.webkitTapHighlightColor = 'transparent'; // Remove tap highlight
});

document.addEventListener('dblclick', (e) => {
    e.preventDefault();
}, { passive: false });
