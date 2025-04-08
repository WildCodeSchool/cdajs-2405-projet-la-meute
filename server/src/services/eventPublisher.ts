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

export class UpdateAdsPreferencesEventPublisher implements IEventPublisher {

    constructor(private readonly eventRepository: Repository<Event>, private readonly next: IEventPublisher) { }

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

        // do some complex logic with ads
        // ads adjust weights
        // ads pregenerate some content with AI
        // ads save in database
        // send mail to ad managers
        
        return await this.next.createEvent(endDate, startDate, price, group_max_size, location, description, title, trainer, services);
  }
}

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