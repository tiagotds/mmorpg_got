module.exports.jogo = function(application, req, res){
	
	if(!req.session.autorizado){
		res.send("Usuário precisa fazer login!");
		return;
	}
	
	var comando_invalido = req.query.comando_invalido;
	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	JogoDAO.iniciaJogo(res, req.session.usuario, req.session.casa, comando_invalido == "S");
	

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

module.exports.ordenar_acao_sudito = function(application, req, res){
	
	if(!req.session.autorizado){
		res.send("Usuário precisa fazer login!");
		return;
	}

	var dadosForm = req.body;

	req.assert("acao", "Ação deve ser informada").notEmpty();
	req.assert("quantidade", "Quantidade deve ser informada").notEmpty();

	var errors = req.validationErrors();

	if(errors){
		console.log(errors);
		res.redirect("jogo?comando_invalido=S");
		return;
	}
	
	console.log(dadosForm);
	res.send("tudo ok");
	
}