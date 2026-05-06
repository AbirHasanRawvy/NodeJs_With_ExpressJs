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

