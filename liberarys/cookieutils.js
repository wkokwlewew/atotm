 // cookieUtils.js

// Function to get the value of a cookie
function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return cookieValue ? decodeURIComponent(cookieValue[2]) : null;
}

// Function to create or update a cookie
function setCookie(name, value, daysToExpire) {
  if (getCookie(name)) {
    // If the cookie already exists, update its value
    updateCookie(name, value, daysToExpire);
  } else {
    // If the cookie doesn't exist, create a new one
    createCookie(name, value, daysToExpire);
  }
}

// Function to create a new cookie
function createCookie(name, value, daysToExpire) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);
  const cookieValue = encodeURIComponent(value) + '; expires=' + expirationDate.toUTCString() + '; path=/';
  document.cookie = name + '=' + cookieValue;
}

// Function to update the value of an existing cookie
function updateCookie(name, value, daysToExpire) {
  createCookie(name, value, daysToExpire);
}

// Function to delete a cookie
function deleteCookie(name) {
  if (getCookie(name)) {
    const cookieValue = encodeURIComponent(getCookie(name)) + '; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = name + '=' + cookieValue;
  }
}

// Export the functions as a module
export { getCookie, setCookie, deleteCookie };
