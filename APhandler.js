// Example console output


// Function to capture console output and display it in the div

var consoleLog = console.log;
var consoleError = console.error;
var consoleWarn = console.warn;

function logMessage(type, message) {
    var consoleDiv = document.getElementById('debugoutput');
    var span = document.createElement('span');
    span.className = type;
    span.textContent = message;
    consoleDiv.appendChild(span);
    consoleDiv.appendChild(document.createElement('br'));
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
}
console.log = function (message) {
    logMessage('log', message);
    consoleLog.apply(console, arguments);
};

console.error = function (message) {
    logMessage('error', message);
    consoleError.apply(console, arguments);
};

console.warn = function (message) {
    logMessage('warn', message);
    consoleWarn.apply(console, arguments);
};

console.log('Hello, World!');
console.error('An error occurred.');
console.warn('Warning: This is a warning.');