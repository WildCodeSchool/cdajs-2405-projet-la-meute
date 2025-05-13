import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSearchIndexTrigger1747123330369
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		// DOG
		await queryRunner.query(`
        CREATE OR REPLACE FUNCTION update_search_index_for_dog()
        RETURNS TRIGGER AS $$
        BEGIN
            INSERT INTO search_index (entity_type, entity_id, document)
            VALUES (
                'dog',
                NEW.id,
                setweight(to_tsvector('simple', NEW.name), 'C') ||
                setweight(to_tsvector('simple', NEW.breed), 'C')
            )
            ON CONFLICT (entity_type, entity_id) DO UPDATE
            SET document = EXCLUDED.document;
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        `);

		await queryRunner.query(`
        CREATE TRIGGER trg_update_search_index_on_dog
        AFTER INSERT OR UPDATE ON dog
        FOR EACH ROW
        EXECUTE FUNCTION update_search_index_for_dog();
        `);

		// EVENT
		await queryRunner.query(`
        CREATE OR REPLACE FUNCTION update_search_index_for_event()
        RETURNS TRIGGER AS $$
        BEGIN
            INSERT INTO search_index (entity_type, entity_id, document)
            VALUES (
                'event',
                NEW.id,
                setweight(to_tsvector('french', NEW.title), 'A') ||
                setweight(to_tsvector('french', COALESCE(NEW.description, '')), 'C') ||
                setweight(to_tsvector('simple', COALESCE(NEW.location, '')), 'C') ||
                setweight(to_tsvector('simple', NEW."startDate"::text), 'C') ||
                setweight(to_tsvector('simple', NEW.price::text), 'C')
            )
            ON CONFLICT (entity_type, entity_id) DO UPDATE
            SET document = EXCLUDED.document;
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        `);

		await queryRunner.query(`
        CREATE TRIGGER trg_update_search_index_on_event
        AFTER INSERT OR UPDATE ON event
        FOR EACH ROW
        EXECUTE FUNCTION update_search_index_for_event();
        `);

		// TRAINER
		await queryRunner.query(`
        CREATE OR REPLACE FUNCTION update_search_index_for_trainer()
        RETURNS TRIGGER AS $$
        BEGIN
            INSERT INTO search_index (entity_type, entity_id, document)
            VALUES (
                'trainer',
                NEW.id,
                setweight(to_tsvector('simple', NEW.siret), 'D') ||
                setweight(to_tsvector('simple', NEW.company_name), 'A') ||
                setweight(to_tsvector('french', COALESCE(NEW.description, '')), 'B') ||
                setweight(to_tsvector('simple', NEW.lastname), 'A') ||
                setweight(to_tsvector('simple', NEW.firstname), 'A') ||
                setweight(to_tsvector('simple', NEW.email), 'A') ||
                setweight(to_tsvector('simple', COALESCE(NEW.phone_number, '')), 'D') ||
                setweight(to_tsvector('simple', NEW.city), 'A') ||
                setweight(to_tsvector('simple', NEW.postal_code), 'D') ||
                setweight(to_tsvector('simple', NEW.role), 'B')
            )
            ON CONFLICT (entity_type, entity_id) DO UPDATE
            SET document = EXCLUDED.document;
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        `);

		await queryRunner.query(`
        CREATE TRIGGER trg_update_search_index_on_trainer
        AFTER INSERT OR UPDATE ON trainer
        FOR EACH ROW
        EXECUTE FUNCTION update_search_index_for_trainer();
        `);

		// OWNER
		await queryRunner.query(`
        CREATE OR REPLACE FUNCTION update_search_index_for_owner()
        RETURNS TRIGGER AS $$
        BEGIN
            INSERT INTO search_index (entity_type, entity_id, document)
            VALUES (
                'owner',
                NEW.id,
                setweight(to_tsvector('simple', NEW.lastname), 'A') ||
                setweight(to_tsvector('simple', NEW.firstname), 'A') ||
                setweight(to_tsvector('simple', NEW.email), 'A') ||
                setweight(to_tsvector('simple', COALESCE(NEW.phone_number, '')), 'D') ||
                setweight(to_tsvector('simple', NEW.city), 'A') ||
                setweight(to_tsvector('simple', NEW.postal_code), 'D') ||
                setweight(to_tsvector('simple', NEW.role), 'B')
            )
            ON CONFLICT (entity_type, entity_id) DO UPDATE
            SET document = EXCLUDED.document;
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        `);

		await queryRunner.query(`
        CREATE TRIGGER trg_update_search_index_on_owner
        AFTER INSERT OR UPDATE ON owner
        FOR EACH ROW
        EXECUTE FUNCTION update_search_index_for_owner();
        `);

		// FAVORITE
		await queryRunner.query(`
        CREATE OR REPLACE FUNCTION update_search_index_for_favorite()
        RETURNS TRIGGER AS $$
        DECLARE
            owner_record RECORD;
        BEGIN
            SELECT * INTO owner_record FROM owner WHERE id = NEW.owner_id;

            INSERT INTO search_index (entity_type, entity_id, document)
            VALUES (
                'favorite',
                NEW.id,
                setweight(to_tsvector('simple', owner_record.lastname), 'A') ||
                setweight(to_tsvector('simple', owner_record.firstname), 'A') ||
                setweight(to_tsvector('simple', owner_record.id::text), 'D')
            )
            ON CONFLICT (entity_type, entity_id) DO UPDATE
            SET document = EXCLUDED.document;
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        `);

		await queryRunner.query(`
        CREATE TRIGGER trg_update_search_index_on_favorite
        AFTER INSERT OR UPDATE ON favorite
        FOR EACH ROW
        EXECUTE FUNCTION update_search_index_for_favorite();
        `);

		// PARTICIPATION
		await queryRunner.query(`
        CREATE OR REPLACE FUNCTION update_search_index_for_participation()
        RETURNS TRIGGER AS $$
        DECLARE
            dog_record RECORD;
            event_record RECORD;
        BEGIN
            SELECT * INTO dog_record FROM dog WHERE id = NEW.dog_id;
            SELECT * INTO event_record FROM event WHERE id = NEW.event_id;

            INSERT INTO search_index (entity_type, entity_id, document)
            VALUES (
                'participation',
                NEW.id,
                setweight(to_tsvector('simple', dog_record.name), 'C') ||
                setweight(to_tsvector('french', event_record.title), 'B')
            )
            ON CONFLICT (entity_type, entity_id) DO UPDATE
            SET document = EXCLUDED.document;
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        `);

		await queryRunner.query(`
        CREATE TRIGGER trg_update_search_index_on_participation
        AFTER INSERT OR UPDATE ON participation
        FOR EACH ROW
        EXECUTE FUNCTION update_search_index_for_participation();
        `);

		// SERVICE
		await queryRunner.query(`
        CREATE OR REPLACE FUNCTION update_search_index_for_service()
        RETURNS TRIGGER AS $$
        BEGIN
            INSERT INTO search_index (entity_type, entity_id, document)
            VALUES (
                'service',
                NEW.id,
                setweight(to_tsvector('french', NEW.title), 'A')
            )
            ON CONFLICT (entity_type, entity_id) DO UPDATE
            SET document = EXCLUDED.document;
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        `);

		await queryRunner.query(`
        CREATE TRIGGER trg_update_search_index_on_service
        AFTER INSERT OR UPDATE ON service
        FOR EACH ROW
        EXECUTE FUNCTION update_search_index_for_service();
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			"DROP TRIGGER IF EXISTS trg_update_search_index_on_dog ON dog;",
		);
		await queryRunner.query(
			"DROP FUNCTION IF EXISTS update_search_index_for_dog();",
		);

		await queryRunner.query(
			"DROP TRIGGER IF EXISTS trg_update_search_index_on_event ON event;",
		);
		await queryRunner.query(
			"DROP FUNCTION IF EXISTS update_search_index_for_event();",
		);

		await queryRunner.query(
			"DROP TRIGGER IF EXISTS trg_update_search_index_on_trainer ON trainer;",
		);
		await queryRunner.query(
			"DROP FUNCTION IF EXISTS update_search_index_for_trainer();",
		);

		await queryRunner.query(
			"DROP TRIGGER IF EXISTS trg_update_search_index_on_owner ON owner;",
		);
		await queryRunner.query(
			"DROP FUNCTION IF EXISTS update_search_index_for_owner();",
		);

		await queryRunner.query(
			"DROP TRIGGER IF EXISTS trg_update_search_index_on_favorite ON favorite;",
		);
		await queryRunner.query(
			"DROP FUNCTION IF EXISTS update_search_index_for_favorite();",
		);

		await queryRunner.query(
			"DROP TRIGGER IF EXISTS trg_update_search_index_on_participation ON participation;",
		);
		await queryRunner.query(
			"DROP FUNCTION IF EXISTS update_search_index_for_participation();",
		);

		await queryRunner.query(
			"DROP TRIGGER IF EXISTS trg_update_search_index_on_service ON service;",
		);
		await queryRunner.query(
			"DROP FUNCTION IF EXISTS update_search_index_for_service();",
		);
	}
}
