const express = require('express')
const app = express()

const http = require('http') // servidor nativo do node
    .createServer(app)       // servidor express

const io = require('socket.io')(http)

io.on('connection', socket => { // é uma instância de um cliente conectado
    socket.on("disconnect", () => {
        console.log("Client disconnected " + socket.id)
    })

    socket.on("msg", data => {
        //socket.emit("showmsg", data) // envia somente para uma pessoa
        //socket.broadcast.emit("showmsg", data) // envia para todos, menos para quem enviou
        io.emit("showmsg", data) // todos recebem a mensagem pois o io é o servidor
    })
})

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index")
})

http.listen(3000, () => {
    console.log("Server is run")
})