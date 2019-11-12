const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const fs = require('fs')

const quit = (err) => {
    console.log(err)
    process.exit()
}

app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'web_resources')))

app.get('/app', (req,res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(3000, (err) => {
    if(err){quit(err)}
})

const multer = require('multer')
const upload = multer({ dest: '' })

const ipfsAPI = require('ipfs-http-client')
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})
const isIPFS = require('is-ipfs')

String.prototype.toBase64 = function () {
    return new Buffer(this).toString('base64')
}

const ethers = require('ethers')

const CONTRACT_ADDRESS = "0x7d2F3263989B1fB9C5A183625531CC915AA2c550";
const CONTRACT_ABI = [{"constant":!1,"inputs":[{"name":"_to","type":"address"},{"name":"_text","type":"string"}],"name":"sendMessage","outputs":[],"payable":!1,"type":"function","stateMutability":"nonpayable"},{"constant":!1,"inputs":[{"name":"_key","type":"string"},{"name":"_type","type":"string"}],"name":"setPublicKey","outputs":[],"payable":!1,"type":"function","stateMutability":"nonpayable"},{"anonymous":!1,"inputs":[{"indexed":!0,"name":"_sender","type":"address"},{"indexed":!0,"name":"_receiver","type":"address"},{"indexed":!1,"name":"_time","type":"uint256"},{"indexed":!1,"name":"message","type":"string"}],"name":"Message","type":"event"},{"anonymous":!1,"inputs":[{"indexed":!0,"name":"_sender","type":"address"},{"indexed":!1,"name":"_key","type":"string"},{"indexed":!1,"name":"_keytype","type":"string"}],"name":"PublicKeyUpdated","type":"event"},{"constant":!0,"inputs":[{"name":"_who","type":"address"}],"name":"getLastMessage","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":!1,"type":"function","stateMutability":"view"},{"constant":!0,"inputs":[{"name":"_who","type":"address"},{"name":"_index","type":"uint256"}],"name":"getMessageByIndex","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":!1,"type":"function","stateMutability":"view"},{"constant":!0,"inputs":[{"name":"_who","type":"address"}],"name":"getPublicKey","outputs":[{"name":"_key","type":"string"},{"name":"_key_type","type":"string"}],"payable":!1,"type":"function","stateMutability":"view"},{"constant":!0,"inputs":[{"name":"","type":"address"}],"name":"keys","outputs":[{"name":"key","type":"string"},{"name":"key_type","type":"string"}],"payable":!1,"type":"function","stateMutability":"view"},{"constant":!0,"inputs":[{"name":"","type":"address"}],"name":"last_msg_index","outputs":[{"name":"","type":"uint256"}],"payable":!1,"type":"function","stateMutability":"view"},{"constant":!0,"inputs":[{"name":"_owner","type":"address"}],"name":"lastIndex","outputs":[{"name":"","type":"uint256"}],"payable":!1,"type":"function","stateMutability":"view"},{"constant":!0,"inputs":[],"name":"message_staling_period","outputs":[{"name":"","type":"uint256"}],"payable":!1,"type":"function","stateMutability":"view"},{"constant":!0,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"messages","outputs":[{"name":"from","type":"address"},{"name":"text","type":"string"},{"name":"time","type":"uint256"}],"payable":!1,"type":"function","stateMutability":"view"},{"constant":!0,"inputs":[{"name":"_who","type":"address"},{"name":"_index","type":"uint256"}],"name":"newMessage","outputs":[{"name":"","type":"bool"}],"payable":!1,"type":"function","stateMutability":"view"}]

var jsondata = []

app.post('/upload', upload.single(), (req,res) => {
    window.web3 = new Web3(fm.getProvider());
    let textBuffer = new Buffer.from(req.body.textToUpload)
    let refHashes = []

    //encrypt buffers here using nucypher

    sendHash = async (hash, recipient, sender) => {
        const provider = ethers.getDefaultProvider('rinkeby');
        await provider.ready


        let wallet = new ethers.Wallet(privateKey, provider);

        const contract = new ethers.Contract(CONTRACT_ADDRESS,CONTRACT_ABI,provider).connect(wallet)

        contract.sendMessage(recipient, hash/*+'|||'+sender*/).then((err, _res) => {
            if(err){
                console.log(err)
            }
            res.send(_res)
        })
    }

    var didAddFile = new Promise(function(resolve, reject) {
        ipfs.add(textBuffer, (err, response) => {
            if (err) {
                console.log(err)
            }
            resolve(response[0].hash)
        })
    })

    didAddFile.then(hash => {
        sendHash(hash,req.body.recipient,req.body.UID)
    })

}).get('/fortmatic-style', (req,res) => {
    res.sendFile(__dirname+'/style.css')
}).get('/fortmatic-script', (req,res) => {
    res.sendFile(__dirname+'/fortmatic.js')
}).get('/ethereum', (req,res) => {
    res.sendFile(__dirname+'/ethereum.png')
}).get('/json', (req, res) => {
    res.send({
        data:jsondata
    })
}).post('/loadMessages', (req,res) => {
    beginListener = async () => {
        const provider = ethers.getDefaultProvider('rinkeby');

        await provider.ready
        const contract = new ethers.Contract(CONTRACT_ADDRESS,CONTRACT_ABI,provider);
        provider.resetEventsBlock(0)

        contract.on('Message', (to_addr, invalid1, invalid2, text, receipt) => {
            console.log(to_addr +" : "+ req.body.addr)
            if(to_addr.toString() == req.body.addr.toString()){
                var obj = {}

                if(!isIPFS.multihash(text)){
                    var a = text.split('|||')
                    obj = {
                        sender : "",
                        recipient : to_addr,
                        text : a[0]
                    }
                    if(!jsondata.includes(obj)){
                        jsondata.push(obj)
                    }
                } else {
                    ipfs.get(text, function (err, files) {
                        files.forEach((file) => {
                            obj = {
                                sender : "",
                                recipient : to_addr,
                                text : file.content.toString('utf8')
                            }
                            if(!jsondata.includes(obj)){
                                jsondata.push(obj)
                            }
                        })
                    })
                }
            }
        })

        return 1;
    }
    beginListener().then(()=>{
        res.redirect('/json')
    })
})