import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSearchIndex1743506254857 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE search_index (
                id SERIAL PRIMARY KEY,
                entity_type TEXT NOT NULL,
                entity_id INT NOT NULL,
                document TSVECTOR
            );
            CREATE INDEX search_index_gin ON search_index USING GIN(document);
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            DROP INDEX IF EXISTS search_index_gin;
            DROP TABLE IF EXISTS search_index;
        `);
	}
}
