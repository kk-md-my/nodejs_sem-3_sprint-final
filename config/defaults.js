// Define navbar variables for different pages
const navbarMainMap = new Map([
  ["home", "/home"],
  ["signup", "/signup"],
  ["login", "/login"],
  ["search", "/search"],
]);

const navbarLoginMap = new Map([
  ["home", "/home"],
  ["signup", "/signup"],
  ["search", "/search"],
]);

const navbarSignupMap = new Map([
  ["home", "/home"],
  ["login", "/login"],
  ["search", "/search"],
]);

const navbarSearchMap = new Map([
  ["home", "/home"],
  ["signup", "/signup"],
  ["login", "/login"],
]);

// Export functions/variables to use in other modules
module.exports = {
  navbarMainMap,
  navbarLoginMap,
  navbarSignupMap,
  navbarSearchMap,
};
