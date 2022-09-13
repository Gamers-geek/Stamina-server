export namespace Configuration {
	interface Module{
		moduleName:string;
		pathToModule:string;
		options?:any
	}
	export class server {
		static port: number = 2025
		static maxPlayer: number = 20
		static version: string = "Prototype V2 TypeScript"
		static physicTic: number = 50
		static protocol:string = "lws-mirror-protocol"
		static serverName:string = "Premier Serveur"
		static runServer:boolean = true
		static ID:number = Date.now()

	}
	export class module {
		static useModule:boolean = true
		static allModules:Module[] = []
		static startModules:Module[] = []
		static stopModules:Module[] = []
		static receiveModules:Module[] = []
		static updateModules:Module[] = []
		static advanceModules:Module[] = []
		static connectModules:Module[] = []
		static disconnectModules:Module[] = []
		static sendModules:Module[] = []
	}
	export class debug {
		static outputLog: string|null = "./log.txt"
		static debugEnabled: boolean = true	
		static logEnabled:boolean = true
	}
	export class network {
		
	}
}