/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/



let _isWindows = false;
let _userAgent: string | undefined = undefined;

interface NLSConfig {
	locale: string;
	osLocale: string;
	availableLanguages: { [key: string]: string };
	_translationsConfigFile: string;
}

export interface IProcessEnvironment {
	[key: string]: string | undefined;
}

export interface INodeProcess {
	platform: string;
	arch: string;
	env: IProcessEnvironment;
	versions?: {
		electron?: string;
		chrome?: string;
	};
	type?: string;
	cwd: () => string;
}

declare const process: INodeProcess;

let nodeProcess: INodeProcess | undefined = undefined;

if (typeof process !== 'undefined') {
	nodeProcess = process;
}

const isElectronProcess = typeof nodeProcess?.versions?.electron === 'string';
const isElectronRenderer = isElectronProcess && nodeProcess?.type === 'renderer';

interface INavigator {
	userAgent: string;
	maxTouchPoints?: number;
	language: string;
}
declare const navigator: INavigator;

// Web environment
if (typeof navigator === 'object' && !isElectronRenderer) {
	_userAgent = navigator.userAgent;
	_isWindows = _userAgent.indexOf('Windows') >= 0;
}

// Native environment
else if (typeof nodeProcess === 'object') {
	_isWindows = (nodeProcess.platform === 'win32');
}

// Unknown environment
else {
	console.error('Unable to resolve platform.');
}
export const isWindows = _isWindows;
