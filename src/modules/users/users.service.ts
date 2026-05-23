import { RpcStatus } from '@microservice-cinema/common';
import type { CreateUserRequest, GetMeRequest, PatchUserRequest } from '@microservice-cinema/contracts/gen/users';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';



import { AccountClientGrpc } from '../../infrastructure/grpc/clients/account.client';



import { UsersRepository } from './users.repository';





@Injectable()
export class UsersService {
	public constructor(
		private readonly userRepository: UsersRepository,
		private readonly accountClient: AccountClientGrpc
	) {}

	public async getMe(data: GetMeRequest) {
		const { id } = data

		const profile = await this.userRepository.findById(id)

		if (!profile)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'User not found'
			})

		const account = await lastValueFrom(
			this.accountClient.getAccount({ id })
		)

		return {
			user: {
				id: profile.id,
				name: profile.name ?? undefined,
				avatar: profile.avatar ?? undefined,
				phone: account.phone,
				email: account.email
			}
		}
	}

	public async create(data: CreateUserRequest) {
		const { id } = data

		await this.userRepository.create({ id })

		return { ok: true }
	}

	public async patchUser(data: PatchUserRequest) {
		const { userId, name } = data

		const user = await this.userRepository.findById(userId)

		if (!user)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'User not found'
			})

		await this.userRepository.update(user.id, {
			...(name !== undefined && { name })
		})

		return { ok: true }
	}
}
