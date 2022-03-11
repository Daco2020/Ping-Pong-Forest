let pong = 0
let ping = document.querySelector(".ping");

ping.addEventListener("click", () => {goPing()})


const goPing = async () => {
    url = new URL(`http://localhost:3306/ping`)
    let response = await fetch(url)
    let data = await response.json()
    console.log(data)
    pong = data.Pong
    console.log(pong)
    render()

}

const render = async () => {
    let pongHTML = ''
    pongHTML = `<h2>Pong : ${pong}</h2>`

    document.getElementById("pong").innerHTML=pongHTML;
}