module.exports.index = function(application, req, res){
	res.render('index', {validacao: {}, usuario: {}, mensagem: ""});
}

module.exports.autenticar = function(application, req, res){
	
	var dadosForm = req.body;

	req.assert("usuario", "Usuário é obrigatório").notEmpty();
	req.assert("senha", "Senha é obrigatória").notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render("index", {validacao: errors, usuario: dadosForm, mensagem: ""});
		return;
	}

    var connection = application.config.dbConnection;
	var UsuariosDAO = new application.app.models.UsuariosDAO(connection);

	UsuariosDAO.autenticar(dadosForm, req, res);
	
}