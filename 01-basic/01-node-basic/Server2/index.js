const fs = require("fs");

fs.writeFileSync("demo.txt", "hareKrishna", function (err) {
    if (err) console.log(err);
    else console.log("file created successfully");
});

fs.readFile("demo.txt", "utf-8", function (err, data) {
    if (err) console.log(err);
    else console.log(data);
});

fs.appendFileSync("demo.txt", "\n1152", function (err) {
    if (err) console.log(err);
    else console.log("file appended successfully");
});



// fs.unlinkSync("demo.txt", function (err) {
//     if (err) console.log(err);
//     else console.log("file deleted successfully");
// });

// fs.rename("demo.txt", "hk.txt", function (err) {
//     if (err) console.log(err);
//     else console.log("file renamed successfully");
// });

// fs.mkdirSync("./copy");

// fs.copyFile("demo.txt", "./copy/hk.txt", function (err) {
//     if (err) console.log(err);
//     else console.log("file copied successfully");
// });

// fs.rm("./copy", { recursive: true }, function (err) {
//     if (err) console.log(err);
//     else console.log("directory deleted successfully");
// });