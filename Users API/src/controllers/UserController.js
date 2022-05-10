const User = require("../models/User")
const PasswordToken = require('../models/PasswordToken')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

var secret = 'mnasjkdhas27o83293ghvuyawe982908-0woeojeoahdyuyue7'

class UserController{

    async index(req, res){
        var users = await User.findAll()
        res.json(users)
    }

    async findUser(req, res){
        var id = req.params.id
        var user = await User.findById(id)

        if(user == undefined){
            res.status(404)
            res.json({message: 'Não encontrado!'})
        }
        else{
            res.status(200)
            res.json(user)
        }
    }

    async create(req, res){
        var {email, name, password} = req.body

        if(email == undefined){
            res.status(400)
            res.json({erro: 'O e-mail é inválido!'})
            return
        }

        var emailExists = await User.findEmail(email)

        if(emailExists){
            res.status(406)
            res.json({erro: "O e-mail já está cadastrado!"})
            return
        }

        await User.new(name, email, password)

        res.status(200)
        res.send('Tudo OK!')
    }

    async edit(req, res){
        var {id, name, role, email} = req.body
        var result = await User.update(id, email,name, role)
        if(result != undefined){
            if(result.status){
                res.status(200)
                res.send('Tudo OK!')
            }
            else{
                res.status(406)
                res.send(result.erro)
            }
        }
        else{
            res.status(406)
            res.send('Ocorreu um erro no servidor!')
        }
        
    }

    async remove(req, res){
        var id = req.params.id

        var result = await User.delete(id)

        if(result.status){
            res.status(200)
            res.send('Tudo OK!')
        }
        else{
            res.status(406)
            res.send(result.erro)
        }
    }

    async recoverPassword(req, res){
        var email =  req.body.email

        var result = await PasswordToken.create(email)

        if(result.status){
            res.status(200)
            res.send(""+result.token)
        }
        else{
            res.status(406)
            res.send(result.erro)
        }
    }

    async changePassword(req, res){
        var token = req.body.token
        var password = req.body.password

        var isTokenValid = await PasswordToken.validade(token)

        if(isTokenValid.status){

            await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token)
            res.status(200)
            res.send('Senha alterada!')

        }
        else{
            res.status(406)
            res.send('Token inválido')
        }
    }

    async login(req, res){
        var {email, password} = req.body

        var user = await User.findByEmail(email)

        if(user != undefined){

            var result = await bcrypt.compare(password, user.password)
            
            if(result){
                var token = jwt.sign({ email:user.email, role: user.role }, secret)

                res.status(200)
                res.json({token: token})
            }
            else{
                res.send('Senha incorreta')
                res.status(406)
            }

        }
        else{
            res.json({status: false})
        }
    }
}

module.exports = new UserController()