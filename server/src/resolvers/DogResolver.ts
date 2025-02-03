import { Arg, Mutation, Resolver } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Dog } from "../entities/Dog";
import { type FileUpload, GraphQLUpload } from "graphql-upload-ts";
import { FileUploadResolver } from "./FileUpload";

@Resolver()
export class DogResolver {
	@Mutation(() => String)
	async uploadDogProfilePicture(
		@Arg("dogId") dogId: number,
		@Arg("file", () => GraphQLUpload) file: Promise<FileUpload>,
	): Promise<string> {
		const dogRepository = dataSource.getRepository(Dog);
		const dog = await dogRepository.findOneOrFail({ where: { id: dogId } });
		const fileUploader = new FileUploadResolver();
		const filePath = await fileUploader.addProfilePicture(file);
		dog.picture = filePath;
		await dogRepository.save(dog);
		return filePath;
	}
}
