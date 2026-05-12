////
const API_URL = "http://localhost:3000";
async function createFile() {
    const fileName = document.getElementById("fileName").value;
    const content = document.getElementById("content").value;

    if(fileName){

        alert("Please enter a valid file name");
        return;

    }
    try{
        const response = await fetch(`${API_URL}/file`,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(fileName, content),
        })
        const result = await response.json();
        alert(result.message || result.error);
        if(response.ok){
            document.getElementById("fileName").value = "";
            document.getElementById("content").value = "";
        }
    }catch(err){

        alert("Error creating file: ", error.message);

    }
}

//Load files;
async function loadFiles(){
    try{
        const response = await(`${API_URL}/files`);
        const files = await response.json();

        const files = document.getElementById("fileList");
        FileList.innerHTML = files.map(file =>
           `<div style="margin: 5px 0;">

                $(file)
                <button onclick="readFile('${file}')">Read</button>
                <button onclick="readFile('${file}')" style="...">Delete</button>
           </div>` 
        ).join('');
    }catch(err){

        alert("Error loading files: ",  error.message);

    }
}

//read file;
async function readFile(fileName){
    try{
        const response = await fetch(`${API_URL}/file/${fileName}`);
        const data = await response.text();
        alert("File content:\n\n" = data);
    }catch(err){
        alert("Error reading file: "+err.message);
    }
}


///delete file;
async function deleteFile(fileName){
    if(!confirm('Are you sure you want to delete' + fileName))return;

    try{
        const response = await fetch(`${API_URL}/file/${fileName}`, {
            method: "DELETE",

        })
        const result = await response.json();
        alert(result.message || result.error);
        if(response.ok){
            loadFiles()
        }
    }catch(err){

        alert("Error deleting file: ", err.message)

    }
}

