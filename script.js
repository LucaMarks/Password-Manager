
function login(){
    const password = document.getElementById("masterPassword").value;

    //set password for now
    const master = "TSITheBest";

    if(password == master){
        //open dashboard
        window.location.href = "dashboard.html";
        //hide the passwordList display until we add a password or display passwords
        document.getElementById("passwordList").style.display = "none";

    }else{document.getElementById("error").innerText = "Incorrect Password!";}

}

let loginButton = document.getElementById("loginButton");

//use event listener to trigger add password function
document.getElementById("addPassword").addEventListener("click", addPassword);


//wait for user to press login button
//run login sequence when user clicks login button
// loginButton.addEventListener("click", login());

function addPassword(){
    
    //show passwordDisplayList div
    document.getElementById("passwordList").style.display = "block";

    const title = document.getElementById("title").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(!title || !username || !password){document.getElementById("blankField").textContent = "Fill in all fields!";}

    //get Existing passwords
    //if no existing passwords exist, define a new empty list
    let passwords = JSON.parse(localStorage.getItem("passwords")) || [];
    

    //add given title, username & password to passwords array
    passwords.push({title, username, password});

    //save passwords to local storage
    localStorage.setItem("passwords", JSON.stringify(passwords));

    //refresh the displayed passwords & clear input fields
    displayPasswords();

    title = "";
    username = "";
    password = "";
}


function displayPasswords(){

    const passwordListDisplay = document.getElementById("passwordList");
    passwordListDisplay.style.display = "block";

    //try to retrieve passwords from localStorage, otherwise take an empty list
    let passwordList = JSON.parse(localStorage.getItem("passwords")) || [];

    if(passwordList.length === 0){
        passwordListDisplay.innerHTML = "<p>No passwords saved :(</p>"
        return;
    }

    //atp passwords contains at least 1 set of values

    let html = "";

    //display passwords by iterating through password list
    for (let i = 0; i < passwordList.length; i++) {
        let item = passwordList[i];
        html += `
        <div class="password-item">
            <strong>${item.title}</strong><br/>
            Username: ${item.username}<br/>
            Password: ${item.password}
            <br>
            <button onclick="deletePassword(${i})">Delete</button>
        </div>
         `;
}

    passwordListDisplay.innerHTML = html;
    console.log(passwordList[0]);
}

function deletePassword(index){

    let passwordList = JSON.parse(localStorage.getItem("passwords")) || [];

    passwordList.splice(index, 1);
    localStorage.setItem("passwords", JSON.stringify(passwordList));
    displayPasswords();
}


