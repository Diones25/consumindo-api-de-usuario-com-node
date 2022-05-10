const knex = require('../database/connection')
const bcrypt = require('bcrypt')
const PasswordToken = require('./PasswordToken')

class User{

    async findAll(){
        try{
            var result = await knex.select(['id', 'name', 'email', 'role']).table('users')
            return result

        }catch(erro){
            console.log(erro)
            return []
        }
    }

    async findById(id){
        try{
            var result = await knex.select(['id', 'name', 'email', 'role']).where({id: id}).table('users')
            
            if(result.length > 0){
                return result[0]
            }
            else{
                return undefined
            }

        }catch(erro){
            console.log(erro)
            return undefined
        }
    }

    async findByEmail(email){
        try{
            var result = await knex.select(['id', 'name', 'email', 'password', 'role']).where({email: email}).table('users')
            
            if(result.length > 0){
                return result[0]
            }
            else{
                return undefined
            }

        }catch(erro){
            console.log(erro)
            return undefined
        }
    }

    async new(name, email, password,){

        try{

            var hash = await bcrypt.hash(password, 10)

            await knex.insert({name, email, password: hash, role: 0}).table('users')

        }catch(erro){
            console.log(erro)
        }
    }

    async findEmail(email){
        try{
            var result = await knex.select('*').from('users').where({email: email})
            
            if(result.length > 0){
                return true
            }
            else{
                return false
            }

        }catch(erro){
            console.log(erro)
            return false
        }
        
    }

    async update(id, email, name, role){

        var user = await this.findById(id)

        if(user != undefined){

            var editUser = {}

            if(email != undefined){
                if(email != user.email){
                    var result = await this.findEmail(email)
                    if(result == false){
                        editUser.email = email
                    }
                }
                else{
                    return {status: false, erro: 'O email já está cadastrado!'}
                }
            }

            if(name != undefined){
                editUser.name = name
            }

            if(role != undefined){
                editUser.role = role
            }

            try{
                await knex.update(editUser).where({id: id}).table('users')
                return{status: true}
            }catch(erro){
                return{status: false, erro: erro}
            }
            

        }
        else{
            return {status: false, erro: 'Usuário não existe!'}
        }

    }

    async delete(id){
        var user = await this.findById(id)
        if(user != undefined){
            try{
                await knex.delete().where({id: id}).table('users')
                return {status: true}
            }catch(erro){
                return {status: false, erro: erro}
            }
        }
        else{
            return {status: false, erro: 'Usuário não exite, portanto não pode ser deletado!'}
        }
    }

    async changePassword(newPassword, id, token){
        var hash = await bcrypt.hash(newPassword, 10)

        await knex.update({password: hash}).where({id: id}).table('users')

        await PasswordToken.setUsed(token)
    }
}

module.exports = new User()
