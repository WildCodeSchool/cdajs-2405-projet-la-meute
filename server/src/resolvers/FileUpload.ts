import { Resolver, Mutation, Arg } from "type-graphql";
import { createWriteStream, promises as fs } from "node:fs";
import path from "node:path";
import { type FileUpload, GraphQLUpload } from "graphql-upload-ts";

@Resolver()
export class FileUploadResolver {
	private readonly UPLOAD_DIR = path.join(__dirname, "../../upload/images");
	private readonly PUBLIC_PATH = "/upload/images";

	private readonly ALLOWED_MIME_TYPES = [
		"image/jpeg",
		"image/png",
		"image/webp",
		"application/octet-stream",
	];
	private readonly ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];
	private readonly MAX_FILE_SIZE = 5 * 1024 * 1024;

	@Mutation(() => String)
	async addProfilePicture(
		@Arg("picture", () => GraphQLUpload) picture: Promise<FileUpload>,
	): Promise<string> {
		try {
			const file = await picture;
			const fileExtension = path.extname(file.filename).toLowerCase();

			const isValidExtension = this.ALLOWED_EXTENSIONS.includes(fileExtension);
			if (!isValidExtension) {
				throw new FileUploadError(
					`Invalid file extension. Allowed extensions: ${this.ALLOWED_EXTENSIONS.join(", ")}`,
				);
			}

			if (!this.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
				throw new FileUploadError(
					`Invalid file type. Allowed types: ${this.ALLOWED_MIME_TYPES.join(", ")}`,
				);
			}

			await fs.mkdir(this.UPLOAD_DIR, { recursive: true });

			const uniqueFilename = `${Date.now()}-${this.sanitizeFilename(file.filename)}`;
			const filePath = path.join(this.UPLOAD_DIR, uniqueFilename);
			const publicUrl = `${this.PUBLIC_PATH}/${uniqueFilename}`;

			await new Promise((resolve, reject) => {
				const stream = file.createReadStream();
				let fileSize = 0;

				stream.on("data", (chunk: Buffer) => {
					fileSize += chunk.length;
					if (fileSize > this.MAX_FILE_SIZE) {
						stream.destroy();
						reject(
							new FileUploadError(
								`File size exceeds ${this.MAX_FILE_SIZE / 1024 / 1024}MB limit`,
							),
						);
					}
				});

				stream
					.pipe(createWriteStream(filePath))
					.on("finish", () => resolve(publicUrl))
					.on("error", (error: Error) => {
						fs.unlink(filePath).catch(console.error);
						reject(
							new FileUploadError(`Failed to upload file: ${error.message}`),
						);
					});
			});

			return publicUrl;
		} catch (error) {
			console.error("Profile picture upload error:", error);
			throw error instanceof FileUploadError
				? error
				: new FileUploadError(
						"An unexpected error occurred during file upload",
					);
		}
	}

	private sanitizeFilename(filename: string): string {
		return filename
			.replace(/\.\./g, "")
			.replace(/[^a-zA-Z0-9.-]/g, "_")
			.toLowerCase();
	}
}

export class FileUploadError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "FileUploadError";
	}
}
