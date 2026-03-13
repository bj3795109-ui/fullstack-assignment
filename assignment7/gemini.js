const API_KEY = "AIzaSyB9Gdvhmc5vmeTuOcInV_Zi8ailDysk-NI";

async function sendMessage(){

const input = document.getElementById("user-input");
const message = input.value;

if(message === "") return;

addMessage(message,"user");

input.value = "";

const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
contents:[{
parts:[{text: message}]
}]
})
});

if (!response.ok) {
    console.error('API Error:', response.status, response.statusText);
    addMessage(`Error: ${response.status} ${response.statusText}`, "bot");
    return;
}

const data = await response.json();

console.log('API Response:', data);

if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
    console.error('Unexpected response structure:', data);
    addMessage("Error: Unexpected response from API", "bot");
    return;
}

const reply = data.candidates[0].content.parts[0].text;

addMessage(reply,"bot");

}

function addMessage(text,type){

const chat = document.getElementById("chat-box");

const div = document.createElement("div");

div.className = type;

div.innerText = text;

chat.appendChild(div);

chat.scrollTop = chat.scrollHeight;

}