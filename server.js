// Import required functions/variables from custom modules
const app = require("./app");

// Set server
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, console.log(`Server is listening on port: ${PORT}`));
