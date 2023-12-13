// Import external packages
const express = require("express");

// Import required functions/variables from custom modules
const { getData } = require("../controllers/resultsController");

// Set router
const resultsRouter = express.Router();

// Set route handlers
resultsRouter.get("/", getData, (req, res) => {
  // res.send("Hey I am Results Page");
  const { data } = res;
  res.render("results", { data });
});

// Export the router to use in other modules
module.exports = resultsRouter;

/* 
// searchBar page form

<form action="/results" method="get">
<b>Procedures: </b></br> 
<% if (allProcedures.length > 0) { %>
    <% allProcedures.forEach(procedure => { %>
        <b><%= procedure.name %> <%= procedure.billing_number %></b><br>
    <% }); %>
<% } %>
<button>POST</button>
</form> */
