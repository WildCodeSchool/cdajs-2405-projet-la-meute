import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Dog } from "../entities/Dog";
import { Owner } from "../entities/Owner";
import { type FileUpload, GraphQLUpload } from "graphql-upload-ts";
import { FileUploadResolver } from "./FileUpload";

const dogRepository = dataSource.getRepository(Dog);
const ownerRepository = dataSource.getRepository(Owner);

@Resolver()
export class DogResolver {
	@Query(() => [Dog])
	async getAllDogsByOwnerId(@Arg("ownerId") ownerId: number): Promise<Dog[]> {
		const dogs = await dogRepository.find({
			where: { owner: { id: ownerId } },
			relations: ["owner", "participation"],
		});
		return dogs;
	}

	@Query(() => Dog)
	async getDogById(@Arg("id") id: number): Promise<Dog | null> {
		const dog = await dogRepository.findOne({
			where: { id },
			relations: ["owner", "participation"],
		});
		return dog;
	}

	@Mutation(() => Dog)
	async createDog(
		@Arg("ownerId") ownerId: number,
		@Arg("name", { nullable: true }) name?: string,
		@Arg("age", { nullable: true }) birthDate?: Date,
		@Arg("breed", { nullable: true }) breed?: string,
		@Arg("picture", () => GraphQLUpload, { nullable: true })
		picture?: Promise<FileUpload>,
	): Promise<Dog> {
		const owner = await ownerRepository.findOneBy({ id: ownerId });
		if (!owner) {
			throw new Error(`Owner with ID ${ownerId} not found`);
		}

		let picturePath = "/upload/images/defaultdog.jpg";

		if (picture) {
			const fileUploader = new FileUploadResolver();
			picturePath = await fileUploader.addProfilePicture(picture);
		}

		const dog = new Dog(owner, name, birthDate, breed, picturePath);
		return await dogRepository.save(dog);
	}

	@Mutation(() => Dog)
	async updateDog(
		@Arg("dogId") dogId: number,
		@Arg("ownerId") ownerId: number,
		@Arg("name", { nullable: true }) name?: string,
		@Arg("birthDate", { nullable: true }) birthDate?: Date,
		@Arg("breed", { nullable: true }) breed?: string,
	): Promise<Dog> {
		const dog = await dogRepository.findOne({
			where: {
				id: dogId,
				owner: { id: ownerId },
			},
			relations: ["owner"],
		});

		if (!dog) {
			throw new Error(`Dog with ID ${dogId} not found`);
		}

		if (name) dog.name = name;
		if (birthDate) dog.birthDate = birthDate;
		if (breed) dog.breed = breed;

		return await dogRepository.save(dog);
	}

	@Mutation(() => Boolean)
	async deleteDog(
		@Arg("dogId") dogId: number,
		@Arg("ownerId") ownerId: number,
	): Promise<boolean> {
		const dog = await dogRepository.findOne({
			where: {
				id: dogId,
				owner: { id: ownerId },
			},
			relations: ["owner"],
		});

		if (!dog) {
			throw new Error(`Dog with ID ${dogId} not found`);
		}

		const result = await dogRepository.delete(dogId);
		return result.affected ? result.affected > 0 : false;
	}

	@Mutation(() => String)
	async uploadDogProfilePicture(
		@Arg("dogId") dogId: number,
		@Arg("file", () => GraphQLUpload) file: Promise<FileUpload>,
	): Promise<string> {
		const dog = await dogRepository.findOneOrFail({ where: { id: dogId } });
		const fileUploader = new FileUploadResolver();
		const filePath = await fileUploader.addProfilePicture(file);
		dog.picture = filePath;
		await dogRepository.save(dog);
		return filePath;
	}
}
