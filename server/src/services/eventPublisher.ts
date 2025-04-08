import { Event } from "../entities/Event";
import { Trainer } from "../entities/Trainer";
import { Service } from "../entities/Service";
import { LocationInput } from "../types/inputTypes";
import { Repository } from "typeorm";

export interface IEventPublisher {
    createEvent(
        endDate: Date,
        startDate: Date,
        price: number,
        group_max_size: number,
        location: LocationInput,
        description: string,
        title: string,
        trainer: Trainer,
        services: Service[],
    ): Promise<Event>;
}

// https://refactoring.guru/design-patterns/decorator


export class MainEventPublisher implements IEventPublisher {
    private eventRepository: Repository<Event>;

    constructor(
        eventRepository: Repository<Event>,
    ) {
        this.eventRepository = eventRepository;
    }

    async createEvent(
        endDate: Date,
        startDate: Date,
        price: number,
        group_max_size: number,
        location: LocationInput,
        description: string,
        title: string,
        trainer: Trainer,
        services: Service[],
    ): Promise<Event> {

        const event = new Event(
            trainer,
            services,
            title,
            description,
            location,
            startDate,
            endDate,
            group_max_size,
            price,
        );

        return await this.eventRepository.save(event);
    }
}