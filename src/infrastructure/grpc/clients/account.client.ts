import type {
	AccountServiceClient,
	GetAccountRequest
} from '@microservice-cinema/contracts/gen/account'
import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'

@Injectable()
export class AccountClientGrpc implements OnModuleInit {
	private userService: AccountServiceClient

	public constructor(
		@Inject('ACCOUNT_PACKAGE') private readonly client: ClientGrpc
	) {}

	public onModuleInit() {
		this.userService =
			this.client.getService<AccountServiceClient>('AccountService')
	}

	public getAccount(request: GetAccountRequest) {
		return this.userService.getAccount(request)
	}
}
