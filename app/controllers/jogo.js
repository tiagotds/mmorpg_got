module.exports.jogo = function(application, req, res){
	
	if(!req.session.autorizado){
		res.send("Usuário precisa fazer login!");
		return;
	}
	
	var msg = req.query.msg;
	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	JogoDAO.iniciaJogo(res, req.session.usuario, req.session.casa, msg);
	

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


	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	JogoDAO.getAcoes(req.session.usuario, res);
	
	
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
		res.redirect("jogo?msg=A");
		return;
	}
	
	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	dadosForm.usuario = req.session.usuario;
	JogoDAO.acao(dadosForm);
	
	res.redirect("jogo?msg=B");
}


module.exports.revogar_acao = function(application, req, res){
	var url_query = req.query;

	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	JogoDAO.revogar_acao(url_query.id_acao, res);
}
