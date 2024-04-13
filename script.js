document.addEventListener('DOMContentLoaded', async () => {
    const guessInput = document.getElementById('guess');
    const flagImg = document.getElementById('flag-img');
    const apiUrl = "https://restcountries.com/v3.1/all";
    
    let flags = [];
    let currflag;
    let score = 0;
    
    async function fetchRandomFlag() {
        const response = await fetch(apiUrl);
        const data = await response.json();
        flags = data.map(country => ({
            name: country.name.common,
            flag: country.flags.png
        }));
        currflag = Math.floor(Math.random() * flags.length);
    }
    
    function displayRandomFlag() {
        flagImg.src = flags[currflag].flag;
    }
    
    function submit() {
        const guess = guessInput.value.trim().toLowerCase();
        const correctAnswer = flags[currflag].name.toLowerCase();
        const output = document.getElementById("guessoutput");
        const answer = document.getElementById("answeroutput");
    
        if (guess === correctAnswer) {
            score++;
            document.getElementById("score").value = score;
            output.textContent = "Correct!";
            output.style.color = 'green';
            answer.textContent = flags[currflag].name;
        }else if (guessInput.value.trim() === "") {
            output.textContent = "Please make a guess before click the submit.";
            output.style.color="red";
            return;  
        }
        else {
            output.textContent = "Try Again!";
            output.style.color = 'red';
            answer.textContent = flags[currflag].name;
        }
        guessInput.disabled = true;
        guessInput.focus();
    }
    
    function next() {


        const output = document.getElementById("guessoutput");
        const answer = document.getElementById("answeroutput");
        if (!guessInput.disabled) {
            output.textContent = "Submit First";
            output.style.color="red";
            return;  
        } else {
            currflag = (currflag + 1) % flags.length;
            console.log("Current flag index:", currflag);
            guessInput.disabled = false;
            guessInput.value ="";
            output.textContent = ""; 
            answer.textContent = "";
            output.style.color = 'black'; 
            displayRandomFlag();
            checkInput();
        }
        
      
        
    }
    function checkInput() {
        const nextButton = document.getElementById("next");
        if (guessInput.value.trim() !== "") {
            nextButton.disabled = false;
        } else {
            nextButton.disabled = true;
        }
    }
    
    async function startGame() {
        await fetchRandomFlag();
        displayRandomFlag();
        checkInput();
    }
    
    startGame();
    
    document.getElementById('next').addEventListener('click', next);
    document.getElementById('submit').addEventListener('click', submit);
    guessInput.addEventListener("input", checkInput);
   
});
