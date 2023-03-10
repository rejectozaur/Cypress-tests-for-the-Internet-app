describe("#17 - file download", () => {
  const path = require("path");

  it("tests downloading all the listed files", () => {
    cy.visit("/download");

    const downloadsFolder = Cypress.config("downloadsFolder");
    for (let n = 2; n <= 18; n += 2) {
      // number of files to download sometimes unexpectedly differs on the server and the test may fail
      cy.window()
        .document()
        .then(function (doc) {
          doc.addEventListener("click", () => {
            setTimeout(function () {
              doc.location.reload();
            }, 500);
          });

          /* Make sure the file exists */
          cy.intercept("/", (req) => {
            req.reply((res) => {
              expect(res.statusCode).to.equal(200);
            });
          });
          cy.get(`a:nth-child(${n})`, { timeout: 1000 }).click();
        });
    }
  });
});
