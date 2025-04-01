import type { MigrationInterface, QueryRunner } from "typeorm";

export class PopulateSearchIndex1680000000000 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		// 1️⃣ DOG
		await queryRunner.query(`
            INSERT INTO search_index (entity_type, entity_id, document)
            SELECT 'dog', dog.id, to_tsvector(name)
            FROM dog;
        `);

		// 2️⃣ TRAINER
		await queryRunner.query(`
            INSERT INTO search_index (entity_type, entity_id, document)
            SELECT 'trainer', trainer.id, to_tsvector(siret || ' ' || company_name || ' ' || lastname || ' ' || firstname || ' ' || email || ' ' || city || ' ' || postal_code || ' ' || role)
            FROM trainer;
        `);

		// 3️⃣ OWNER
		await queryRunner.query(`
            INSERT INTO search_index (entity_type, entity_id, document)
            SELECT 'owner', owner.id, to_tsvector(lastname || ' ' || firstname || ' ' || email || ' ' || city || ' ' || postal_code || ' ' || role)
            FROM owner;
        `);

		// 4️⃣ EVENT
		await queryRunner.query(`
            INSERT INTO search_index (entity_type, entity_id, document)
            SELECT 'event', event.id, to_tsvector(title || ' ' || description || ' ' || location || ' ' || "startDate" || ' ' || price)
            FROM event;
        `);

		// 5️⃣ FAVORITE
		await queryRunner.query(`
            INSERT INTO search_index (entity_type, entity_id, document)
            SELECT 'favorite', favorite.id, to_tsvector(owner.lastname || ' ' || owner.firstname || ' ' || owner.id::text)
            FROM favorite
            JOIN owner ON owner.id = favorite.owner_id;
        `);

		// 6️⃣ PARTICIPATION
		await queryRunner.query(`
            INSERT INTO search_index (entity_type, entity_id, document)
            SELECT 'participation', participation.id, to_tsvector(dog_id::text || ' ' || event_id::text)
            FROM participation;
        `);

		// 7️⃣ SERVICE
		await queryRunner.query(`
            INSERT INTO search_index (entity_type, entity_id, document)
            SELECT 'service', service.id, to_tsvector(title)
            FROM service;
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// ROLLBACK ALL
		await queryRunner.query(
			`DELETE FROM search_index WHERE entity_type IN ('dog', 'trainer', 'owner', 'event', 'favorite', 'participation', 'service');`,
		);
	}
}
