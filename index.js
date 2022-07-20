const http = require("https");
var fs = require("fs");

var obj = [];
const getData = async () => {
  console.log("Step 1");
  for (let i = 0; i < 100; i++) {
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
        console.log(JSON.stringify(body));
        obj = { ...obj, body };
        console.log(obj);
      });
    });

    req.end();
  }
};

const writeData = async () => {
  console.log("step 3");
  fs.writeFile(
    "myjsonfile.txt",
    JSON.stringify(obj, null, 2),
    "utf-8",
    function (err) {
      if (err) throw err;
      console.log("complete");
    }
  );
};

const mainFunction = async () => {
  await getData();
  console.log("Step 2");
  await writeData();
};

mainFunction();


