// --- App 2: Sticky Notes ---

// Create Add Note button
let addNoteBtn = document.createElement("button");
addNoteBtn.innerText = "Add Note";
document.body.appendChild(addNoteBtn);

// Create a container to hold all notes
let notesContainer = document.createElement("div");
document.body.appendChild(notesContainer);

// Get saved notes from local storage, or start with an empty array
let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

// Function to show all notes on the screen
function renderNotes() {
    // Clear the container first
    notesContainer.innerHTML = "";

    // Loop through all saved notes
    for (let i = 0; i < savedNotes.length; i++) {
        let noteText = savedNotes[i];

        // Create a box for the note
        let noteBox = document.createElement("div");
        noteBox.style.border = "1px solid black";
        noteBox.style.margin = "10px";
        noteBox.style.padding = "10px";
        noteBox.style.display = "inline-block";
        noteBox.style.backgroundColor = "yellow";
        noteBox.style.color = "black";

        // Create text area where user types
        let textarea = document.createElement("textarea");
        textarea.value = noteText;

        // Save automatically when typing
        textarea.addEventListener("input", function () {
            savedNotes[i] = textarea.value;
            localStorage.setItem("notes", JSON.stringify(savedNotes));
        });

        // Create a delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";

        // Delete the note when clicked
        deleteBtn.addEventListener("click", function () {
            savedNotes.splice(i, 1); // Remove 1 item at index i
            localStorage.setItem("notes", JSON.stringify(savedNotes));
            renderNotes(); // Update screen
        });

        // Put textarea and button inside the note box
        noteBox.appendChild(textarea);
        noteBox.appendChild(document.createElement("br"));
        noteBox.appendChild(deleteBtn);

        // Put the note box inside the container
        notesContainer.appendChild(noteBox);
    }
}

// Add click event to add a new empty note
addNoteBtn.addEventListener("click", function () {
    savedNotes.push(""); // Add empty string to array
    localStorage.setItem("notes", JSON.stringify(savedNotes));
    renderNotes(); // Update screen
});

// Show notes when the page loads
renderNotes();
