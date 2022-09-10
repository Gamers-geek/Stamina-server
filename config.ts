export namespace Configuration {
	export class config {
		static port: number = 2025
		static debugEnabled: boolean = true
		static maxPlayer: number = 20
		static version: string = "Prototype V2 TypeScript"
		static physicTic: number = 50
		static protocol:string = "lws-mirror-protocol"
		static outputLog: string|null = "./log.txt"
		static serverName:string = "Premier Serveur"
		static runServer:boolean = true
		static ID:number = Date.now()
	}
}