const showGeneratedPassword = document.getElementById("show-generated-password");
const copyButton = document.getElementById("copy-button");
const message = document.getElementById("message");
const passwordRangeOutput = document.getElementById("password-range-output");
const passwordRangeInput = document.getElementById("password-range-input");
const generatePasswordButton = document.getElementById("generate-password-button");
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?";



const generatePassword = () => {
    let password = "";
    const random = new Uint32Array(1);
    const limit = Math.floor(2 ** 32 / characters.length) * characters.length

    for (let i = 0; i < Number(passwordRangeInput.value); i++) {

    do {
        crypto.getRandomValues(random);
    } while (random[0] >= limit);
    password += characters[random[0] % characters.length]
    };
    showGeneratedPassword.textContent = password;
};



const passwordRange = () => {
    passwordRangeOutput.textContent = passwordRangeInput.value;
    generatePassword();
};



const copy = () => {
    navigator.clipboard.writeText(showGeneratedPassword.textContent);
    copyButton.textContent = "Copied";
    message.textContent = "Password copied to clipboard.";

    setTimeout(() => {
        copyButton.textContent = "Copy";
        message.textContent = "Uses letters, numbers, and symbols";
    }, 1500);
};



passwordRangeInput.addEventListener("input", passwordRange);
generatePasswordButton.addEventListener("click", generatePassword);
copyButton.addEventListener("click", copy);

generatePassword();