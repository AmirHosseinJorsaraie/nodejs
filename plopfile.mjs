export default function (plop) {
	
	plop.setGenerator('middleware', {
		description: 'server middlewares',
		prompts: [{
			type: 'input',
			name: 'name',
			message: 'middleware name please'
		}],
		actions: [{
			type: 'add',
			path: 'Middlewares/{{Title name}}.js',
			templateFile: 'plop-templates/middleware.template.hbs'
		}]
	})

	plop.setGenerator('model', {
		description: 'define models and routs',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'name your model:'
			},
			{
				type: 'confirm',
				name: 'server',
				message: 'is this model for authentication server?'
			},
			{
				type: 'confirm',
				name: 'check',
				message: 'you would like to define your model as sequelize model?'
			}
		],
		actions: function (data) {
			var actions = []

			if (data.check) {
				if (data.server) {
					actions.push(
						{
							type: 'add',
							path: 'Models/{{Title name}}.js',
							templateFile: 'plop-templates/sequelize.model.template.hbs'
						},
						{
							type: 'add',
							path: 'Routs/AuthServer/{{Title name}}/add.js',
							templateFile: 'plop-templates/route.template.hbs'
						},
						{
							type: 'add',
							path: 'Routs/AuthServer/{{Title name}}/delete.js',
							templateFile: 'plop-templates/route.template.hbs'
						}
					);
				}
				else {
					actions.push(
						{
							type: 'add',
							path: 'Models/{{Title name}}.js',
							templateFile: 'plop-templates/sequelize.model.template.hbs'
						},
						{
							type: 'add',
							path: 'Routs/Server/{{Title name}}/add.js',
							templateFile: 'plop-templates/route.template.hbs'
						},
						{
							type: 'add',
							path: 'Routs/Server/{{Title name}}/delete.js',
							templateFile: 'plop-templates/route.template.hbs'
						}
					);
				}
			}
			else {
				actions.push(
					{
						type: 'add',
						path: 'Models/{{Title name}}.js',
						templateFile: 'plop-templates/model.template.hbs'
					}
				)
			}

			return actions
		}
	})

	plop.setHelper("Title", (str) => {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	});
}