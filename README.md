# nppcrypt README

nppcrypt is VS Code version of https://github.com/karthikeyann/nppcrypt (with Mac support).

Originally found at https://github.com/jeanpaulrichter/nppcrypt. Since Notepad++ is not available in Mac, nppcrypt cli is compiled for Mac M1 and released as VS code extension.

Public contributions are welcome at https://github.com/karthikeyann/nppcrypt and https://github.com/karthikeyann/nppcrypt-vscode.

## Features

Currently, it can encrypt to default algorithm used in nppcrypt and decrypt based on header text in the input text.

Commands available are
- `>npp Encrypt`

  Select the text to be encryted and select "npp Encrypt" in command palatte, and enter password.
- `>npp Decrypt`

  Select the text to be decryted with header and select "npp Decrypt" in command palatte, and enter password.

## Requirements

Tested in Mac OS Apple Silicon M1.
TBD Windows
TBD Linux
TBD Apple Intel

## Extension Settings

TBD. This extension contributes the following settings:

* `nppcrypt.algorithm`: Algorithm to use for encryption.

## Known Issues

Cannot specify the algorithm yet. Defaulted to nppcrypt cli's default.

## Release Notes

### 1.0.0

Initial release of nppcrypt vscode extension

### 1.0.1

TBD Add Windows support

### 1.1.0

TBD Add Linux support, Mac Intel support

**Enjoy!**
