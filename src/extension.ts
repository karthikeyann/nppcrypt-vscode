// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as child from 'child_process';
import path = require('path');

let binpath: string;

async function nppcrypt_exec(action: string, password: string, data: string) {
	try {
	const res = child.execFileSync(binpath,
		['--auto', '--silent', '-p', password, action, data]);
		return res.toString();
	} catch (err) {
		console.log("output", err);
  		// console.log("sdterr", err.stderr.toString());
		throw true;
	}
}

async function nppcrypt_enc(password: string, data: string) {
	return await nppcrypt_exec('enc', password, data);
}

async function nppcrypt_dec(password: string, data: string) {
	return await nppcrypt_exec('dec', password, data);
}


async function get_editor_text_password() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) return;
	const selection = editor.selection;
	if (selection && !selection.isEmpty) {
		const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
		const highlighted = editor.document.getText(selectionRange);
		const passwordInput = await vscode.window.showInputBox({
			password: true,
			placeHolder: "password",
			prompt: "Password for encryption",
			value: ''
		});
		if (passwordInput === '') {
			// console.log(passwordInput);
			vscode.window.showErrorMessage('invalid. Password cannot be empty.');
			return;
		}
		if (passwordInput !== undefined) {
			return [passwordInput, highlighted];
		}
		return;
		// vscode.window.showInformationMessage("Encryption Successful");
	}
}


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "nppcrypt" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('nppcrypt.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello nppcrypt activated!');
	});
	let encrypt = vscode.commands.registerCommand('nppcrypt.encrypt', async () => {
		binpath = path.join(context.extensionPath, "nppcrypt");
		// vscode.window.showInformationMessage(binpath);
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;
		let pass_text = await get_editor_text_password();
		if (pass_text !== undefined) {
			let passwordInput = pass_text[0];
			let highlighted = pass_text[1];
			try {
				let encrypted_data = await nppcrypt_enc(passwordInput, highlighted);
				editor.edit((selectedText) => {
					selectedText.replace(editor.selection, encrypted_data);
				});
				vscode.window.showInformationMessage("Encryption Successful");
			} catch(e) {
				vscode.window.showErrorMessage('Encryption failed.');
			}
 		}
	});
	let decrypt = vscode.commands.registerCommand('nppcrypt.decrypt', async () => {
		binpath = path.join(context.extensionPath, "nppcrypt");
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;
		let pass_text = await get_editor_text_password();
		if (pass_text !== undefined) {
			let passwordInput = pass_text[0];
			let highlighted = pass_text[1];
			try {
				let encrypted_data = await nppcrypt_dec(passwordInput, highlighted);
				editor.edit((selectedText) => {
					selectedText.replace(editor.selection, encrypted_data);
				});
				vscode.window.showInformationMessage("Decryption Successful");
			} catch(e) {
				vscode.window.showErrorMessage('Decryption failed.');
			}
 		}
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(encrypt);
	context.subscriptions.push(decrypt);
}

// This method is called when your extension is deactivated
export function deactivate() { }
