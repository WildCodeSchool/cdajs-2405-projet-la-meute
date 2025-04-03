import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Service } from "../entities/Service";
import { Event } from "../entities/Event";

@Resolver()
export class ServicesResolvers {
	// Get all services
	@Query(() => [Service])
	async getAllServices(): Promise<Service[]> {
		return await dataSource.manager.find(Service);
	}

	// Get one service by ID
	@Query(() => Service, { nullable: true })
	async getServiceById(@Arg("id") id: number): Promise<Service | null> {
		return await dataSource.manager.findOneBy(Service, { id });
	}

	// Get services by event ID
	@Query(() => [Service], { nullable: true })
	async getServicesByEventId(
		@Arg("eventId") eventId: number,
	): Promise<Service[]> {
		const event = await dataSource.manager.findOne(Event, {
			where: { id: eventId },
			relations: ["services"],
		});
		return event?.services || [];
	}

	// Create a new service
	@Mutation(() => Service)
	async createService(
		@Arg("title") title: string,
		@Arg("smiley") smiley: string,
		@Arg("color") color: string,
	): Promise<Service> {
		const service = new Service(title, smiley, color);
		return await dataSource.manager.save(service);
	}

	// Update a service
	@Mutation(() => Service, { nullable: true })
	async updateService(
		@Arg("id") id: number,
		@Arg("title", { nullable: true }) title?: string,
		@Arg("smiley", { nullable: true }) smiley?: string,
		@Arg("color", { nullable: true }) color?: string,
	): Promise<Service | null> {
		const service = await dataSource.manager.findOneBy(Service, { id });
		if (!service) return null;

		if (title !== undefined) service.title = title;
		if (smiley !== undefined) service.smiley = smiley;
		if (color !== undefined) service.color = color;

		return await dataSource.manager.save(service);
	}

	// Delete a service
	@Mutation(() => Boolean)
	async deleteService(@Arg("id") id: number): Promise<boolean> {
		const result = await dataSource.manager.delete(Service, { id });
		return result.affected !== 0;
	}
}
