const jwt = require('jsonwebtoken')
var secret = 'mnasjkdhas27o83293ghvuyawe982908-0woeojeoahdyuyue7'

module.exports = function(req, res, next){

    const authtoken = req.headers['authorization']

    if(authtoken != undefined){

        const bearer = authtoken.split(' ')
        var token = bearer[1]

        try{
            var decoded = jwt.verify(token, secret)
            
            if(decoded.role == 1){
                next()
            }
            else{
                res.status(403)
                res.send('Você não tem permissão!')
                return
            }

        }catch(erro){
            res.status(403)
            res.send('Você não está autenticado')
            return
        }
            
    }
    else{
        res.status(403)
        res.send('Você não está autenticado')
        return
    }
}