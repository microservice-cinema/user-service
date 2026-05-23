import type { CreateUserRequest } from '@microservice-cinema/contracts/gen/users'
import { Injectable } from '@nestjs/common'

import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
	public constructor(private readonly userRepository: UsersRepository) {}

	public async create(data: CreateUserRequest) {
		await this.userRepository.create({ id: data.id })

		return { ok: true }
	}
}
