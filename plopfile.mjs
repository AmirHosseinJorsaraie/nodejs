import inquirerRecursive from 'inquirer-recursive'

export default function (plop) {

	plop.setPrompt('recursive', inquirerRecursive)
	plop.setGenerator('middleware', {
		description: 'server middlewares',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'middleware name please'
			},
			{
				when(context) { return context.name.includes('hi') },
				type: 'recursive',
				message: 'are you oskol?',
				name: 'oskol',
				prompts: [
					{
						type: 'rawlist',
						name: 'feefef',
						message: 'Field Name',
						choices: ['fgrth', 'rgergr', 'ergerg'],
						default: 1
					}
				]
			}

		],
		actions: [{
			type: 'modify',
			path: 'Middlewares/CheckValidation.js',
			pattern: /(\/\/Import here)/g,
			template: '{{name}} \n //import here'
		}]
	})

	plop.setGenerator('model', {
		description: 'Define an entity',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'name your model:'
			},
			{
				type: 'rawlist',
				name: 'server',
				message: 'is this model for authentication server or main server?',
				choices: ['Auth Server', 'Main Server'],
				default: 0
			},
			{
				type: 'confirm',
				name: 'InDatabase',
				message: 'would you like to create this model inside database?'
			},
			{
				type: 'checkbox',
				name: 'middlewars',
				choices: ['IpRateLimit', 'authenticateToken', 'CheckRoles'],
				default: ['IpRateLimit', 'authenticateToken', 'CheckRoles']
			},
			{
				type: 'input',
				name: 'Id',
				message: 'name your id:'
			},
			{
				type: 'confirm',
				name: 'IsIdAutoIncrement',
				message: 'is it autoincrement?'
			},
			{
				type: 'recursive',
				message: 'Would you like to define entity?',
				name: 'entities',
				prompts: [
					{
						type: 'input',
						name: 'fieldName',
						message: 'Field name:'
					},
					{
						type: 'rawlist',
						name: 'type',
						message: 'Field type:',
						choices: ['INTEGER', 'STRING', 'ENUM'],
						default: 1
					},
					{
						when(context) { return context.entities.type == 'INTEGER'},
						type: 'confirm',
						name: 'IsAutoIncrement',
						message: 'AutoIncrement?'
					},
					{
						type: 'confirm',
						name: 'IsAllowNull',
						message: 'Allow null?'
					}
				]
			}
		],
		actions: function (data) {
			var actions = []

			if (data.InDatabase) {
				if (data.server == 'Auth Server') {
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
						},
						{
							type: 'modify',
							path: 'Constants/AuthServer/routs.js',
							template: 'import {{name}}_add "../../Routs/AuthServer/{{Title name}}/add.js" \n import {{name}}_delete from "../../Routs/AuthServer/{{Title name}}/delete.js" \n //Import rout',
							pattern: /(\/\/Import rout)/g
						},
						{
							type: 'modify',
							path: 'Constants/AuthServer/routs.js',
							templateFile: 'plop-templates/modify.rout.template.hbs',
							pattern: /(\/\/Create rout)/g
						},
						{
							type: 'modify',
							path: 'Helpers/DbConfigModels_Auth.js',
							templateFile: 'plop-templates/modify.dbconfig.template.hbs',
							pattern: /(\/\/Import here)/g
						}
					);
				}
				else if (data.server == 'Main Server') {
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
						},
						{
							type: 'modify',
							path: 'Constants/Server/routs.js',
							template: 'import {{name}}_add "../../Routs/Server/{{Title name}}/add.js" \n import {{name}}_delete from "../../Routs/Server/{{Title name}}/delete.js" \n //Import rout',
							pattern: /(\/\/Import rout)/g
						},
						{
							type: 'modify',
							path: 'Constants/Server/routs.js',
							templateFile: 'plop-templates/modify.rout.template.hbs',
							pattern: /(\/\/Create rout)/g
						},
						{
							type: 'modify',
							path: 'Helpers/DbConfigModels_Main.js',
							templateFile: 'plop-templates/modify.dbconfig.template.hbs',
							pattern: /(\/\/Import here)/g
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
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
		});
	});

	plop.setHelper("Const", (str) => {
		return str.toUpperCase()
	})
	
	plop.setHelper("ifEquals", function(arg1, arg2, options) {
		return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
	})
}