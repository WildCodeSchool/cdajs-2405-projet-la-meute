import type { MigrationInterface, QueryRunner } from "typeorm";

export class PopulateSearchIndex1680000000000 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		// DOG
		await queryRunner.query(`
            INSERT INTO search_index (entity_type, entity_id, document)
            SELECT 'dog', dog.id, 
                setweight(to_tsvector('simple', name), 'C') ||
                setweight(to_tsvector('simple', breed), 'C')
            FROM dog;
        `);

		// TRAINER
		await queryRunner.query(`
            INSERT INTO search_index (entity_type, entity_id, document)
            SELECT 'trainer', trainer.id,
                setweight(to_tsvector('simple', siret), 'D') ||
                setweight(to_tsvector('simple', company_name), 'A') ||
                setweight(to_tsvector('french', description), 'B') ||
                setweight(to_tsvector('simple', lastname), 'A') ||
                setweight(to_tsvector('simple', firstname), 'A') ||
                setweight(to_tsvector('simple', email), 'A') ||
                setweight(to_tsvector('simple', coalesce(phone_number, '')), 'D') ||
                setweight(to_tsvector('simple', city), 'A') ||
                setweight(to_tsvector('simple', postal_code), 'D') ||
                setweight(to_tsvector('simple', role), 'B')
            FROM trainer;
        `);

		// OWNER
		await queryRunner.query(`
            INSERT INTO search_index (entity_type, entity_id, document)
            SELECT 'owner', owner.id, 
                setweight(to_tsvector('simple', lastname), 'A') ||
                setweight(to_tsvector('simple', firstname), 'A') ||
                setweight(to_tsvector('simple', email), 'A') ||
                setweight(to_tsvector('simple', coalesce(phone_number, '')), 'D') ||
                setweight(to_tsvector('simple', city), 'A') ||
                setweight(to_tsvector('simple', postal_code), 'D') ||
                setweight(to_tsvector('simple', role), 'B')
            FROM owner;
        `);

		// EVENT
		await queryRunner.query(`
            INSERT INTO search_index (entity_type, entity_id, document)
            SELECT 'event', event.id, 
                setweight(to_tsvector('french', title), 'A') ||
                setweight(to_tsvector('french', description), 'C') ||
                setweight(to_tsvector('simple', location), 'C') ||
                setweight(to_tsvector('simple', "startDate"::text), 'C') ||
                setweight(to_tsvector('simple', price::text), 'C')
            FROM event;
        `);

		// FAVORITE
		await queryRunner.query(`
            INSERT INTO search_index (entity_type, entity_id, document)
            SELECT 'favorite', favorite.id,
                setweight(to_tsvector('simple', owner.lastname), 'A') ||
                setweight(to_tsvector('simple', owner.firstname), 'A') ||
                setweight(to_tsvector('simple', owner.id::text), 'D')
            FROM favorite
            JOIN owner ON owner.id = favorite.owner_id;
        `);

		// PARTICIPATION
		await queryRunner.query(`
            INSERT INTO search_index (entity_type, entity_id, document)
            SELECT 'participation', participation.id,
                setweight(to_tsvector('simple', dog.name), 'C') ||
                setweight(to_tsvector('french', event.title), 'B')
            FROM participation
            JOIN dog ON dog.id = participation.dog_id
            JOIN event ON event.id = participation.event_id;
        `);

		// SERVICE
		await queryRunner.query(`
            INSERT INTO search_index (entity_type, entity_id, document)
            SELECT 'service', service.id, 
                setweight(to_tsvector('french', title), 'A')
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
