
let personDetails = {
    name: "",
    lastName:"",
    email:"",
    Id:"",
    job:""
}
const convertToJSON =(object) => {
    let JSONPerson = JSON.stringify(object)
    console.log(JSONPerson)

}
const sendDetails = () => {
    personDetails.name= document.getElementById("firstName").value    
    personDetails.lastName= document.getElementById("lastName").value
    personDetails.email= document.getElementById("email").value
    personDetails.Id= document.getElementById("personId").value
    personDetails.job = document.getElementById("jobList").value
    console.log(personDetails)
    convertToJSON(personDetails)
}

