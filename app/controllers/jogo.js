module.exports.jogo = function(application, req, res){
	
	if(!req.session.autorizado){
		res.send("Usuário precisa fazer login!");
		return;
	}
	
	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	JogoDAO.iniciaJogo(res, req.session.usuario, req.session.casa);
	

}

module.exports.sair = function(application, req, res){
	
	req.session.destroy(function(error){
		res.redirect("/");
	});
	
}

module.exports.suditos = function(application, req, res){
	
	if(!req.session.autorizado){
		res.send("Usuário precisa fazer login!");
		return;
	}

	res.render("aldeoes");	
}

module.exports.pergaminhos = function(application, req, res){
	
	if(!req.session.autorizado){
		res.send("Usuário precisa fazer login!");
		return;
	}

	res.render("pergaminhos");
	
	
}