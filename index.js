const http = require("https");
var fs = require("fs");

const getData = async () => {
  console.log("Step 1");
  for (let i = 0; i < 166; i++) {
    const options = {
      method: "GET",
      hostname: "api.opensea.io",
      port: null,
      path: `/api/v1/collections?offset=${i * 300}&limit=300`,
      headers: {
        Accept: "application/json",
      },
    };

    const req = http.request(options, function (res) {
      const chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        const body = Buffer.concat(chunks);
        console.log(i)
        fs.appendFile(
          "myFile.json",
          body.toString(),
          function (err) {
            if (err) throw err;
            console.log("complete");
          }
        );
      });
    });

    req.end();
  }
};
getData()


