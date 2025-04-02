import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddGinIndexToSearchIndex1743506254858
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE INDEX search_index_gin ON search_index USING GIN(document);
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            DROP INDEX IF EXISTS search_index_gin;
        `);
	}
}
