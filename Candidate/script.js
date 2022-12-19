
let personDetails = {
    name: "",
    lastName: "",
    email: "",
    Id: "",
    job: ""
}
const convertToJSON = (object) => {
    let JSONPerson = JSON.stringify(object)
    console.log(JSONPerson)

}
const checkDetails = () => {

}
const sendDetails = () => {
    const name = document.getElementById("firstName").value
    const lastName = document.getElementById("lastName").value
    const email = document.getElementById("email").value
    const Id = document.getElementById("personId").value
    const job = document.getElementById("jobList").value

    if (/[0-9]/.test(name) || /[0-9]/.test(lastName)) {
        alert("Error input")
    }
    else {

        personDetails.name = name
        personDetails.lastName = lastName
        personDetails.email = email
        personDetails.Id = Id
        personDetails.job = job
        console.log(personDetails)
        convertToJSON(personDetails)
        checkDetails()
    }

}

const enableButton = () => {
    //console.log("clicked")
    let check = document.getElementById("checkBox")
    let btn  = document.getElementById("button")
    if(check.checked)
    {
     btn.disabled= false
    }
    
}
