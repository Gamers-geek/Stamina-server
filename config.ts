export namespace Configuration {
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
		static allModules:string[] = []
		static startModules:string[] = []
		static stopModules:string[] = []
		static receiveModules:string[] = []
		static updateModules:string[] = []
		static advanceModules:string[] = []
		static connectModules:string[] = []
		static disconnectModules:string[] = []
		static sendModules:string[] = []
	}
	export class debug {
		static outputLog: string|null = "./log.txt"
		static debugEnabled: boolean = true	
	}
	export class network {
		
	}
}