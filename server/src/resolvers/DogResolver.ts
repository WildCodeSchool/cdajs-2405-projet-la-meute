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
	async updateDog(
		@Arg("dogId") dogId: number,
		@Arg("ownerId") ownerId: number,
		@Arg("name", { nullable: true }) name?: string,
		@Arg("age", { nullable: true }) age?: number,
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
			throw new Error(
				"Chien non trouvé ou vous n'êtes pas autorisé à le modifier",
			);
		}

		if (name) dog.name = name;
		if (age) dog.age = age;
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
			throw new Error(
				"Chien non trouvé ou vous n'êtes pas autorisé à le supprimer",
			);
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
