//  node wcat.js filepath => display the content of a filein terminal



let fs = require("fs");
let inputArr = process.argv.slice(2);

let fileArr = [];
//option array is for checking the type
let optionArray = [];
// conststruct of fileARR

for (let i = 0; i < inputArr.length; i++) {
    // if first element is type then it add it to option array
    if (inputArr[i].charAt(0) == '-') {


        optionArray.push(inputArr[i]);
    }
    else
        fileArr.push(inputArr[i]);
}
//  console.log(optionArray);

// check is file exist or not => require fs module as it requires to read fiile
for (let i = 0; i < fileArr.length; i++) {
    let doesFileExist = fs.existsSync(fileArr[i]);
    if (!doesFileExist) {
        console.log("NO such file Exist!!" + " " + fileArr[i]);
        // return ;
    }
}

//  after checking the exist of file we will add content 

let content = "";
for (let i = 0; i < fileArr.length; i++) {
    let fileData = fs.readFileSync(fileArr[i]);
    // console.log("connnnnnnnnn"+ fileData);
    content = content + fileData + "\r\n";
}

let contenttemp = content.split('\r');
let contentArr = content.split("\r\n"); //  Array crete of content on basis of ("\r\n")



//  for -s
let isSpresent = optionArray.includes("-s");
if (isSpresent) {
    for (let i = 1; i < contentArr.length; i++) {
        if (contentArr[i] == "" && contentArr[i - 1] == "") {
            // console.log("yes");
            contentArr[i] = null;
        }
        else if (contentArr[i] == "" && contentArr[i - 1] == null) {
            contentArr[i] = null;
        }
    }


    //creating the output array


    let tempArr = [];
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] != null) {
            tempArr.push(contentArr[i]);
        }
    }
    console.table(contentArr);
    // console.table(tempArr);
}


let indexOfN = optionArray.indexOf("-n");
let indexOfB = optionArray.indexOf("-b");
let finaloption = "";
if (indexOfN != -1 && indexOfB != -1) {
    if (indexOfN < indexOfB) {
        finaloption = "-n";

    }

    else finaloption = "-b";
}
else {
    if (indexOfB != -1) {
        finaloption = "-b";

    }
    else finaloption = "-n";
}
console.log(finaloption);
if (finaloption == "-n") {
    // console.log("calling n")
    calln();

}
else if (finaloption == "-b") callB();

function calln() {
    for (let i = 0; i < contentArr.length; i++) {

        contentArr[i] = "(" + (i + 1) + ")" + contentArr[i] ;
    }
    console.log(contentArr);

}

function callB() {
    let count = 1;
    for (let i = 0; i < contentArr.length; i++) {

        if (contentArr[i] != "") {
            contentArr[i] = "(" + count + ")" + contentArr[i];
            count++;
        }
        // contentArr[i] = "("+(i+1)+ ")" + contentArr[i];
    }
    console.log(contentArr);
}
