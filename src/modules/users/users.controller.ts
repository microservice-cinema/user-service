import type {
	CreateUserRequest,
	CreateUserResponse
} from '@microservice-cinema/contracts/gen/users'
import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'

import { UsersService } from './users.service'

@Controller()
export class UsersController {
	public constructor(private readonly usersService: UsersService) {}

	@GrpcMethod('UsersService', 'Create')
	public async create(data: CreateUserRequest): Promise<CreateUserResponse> {
		return await this.usersService.create(data)
	}
}
