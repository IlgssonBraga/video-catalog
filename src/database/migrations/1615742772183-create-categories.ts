import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createCategories1615742772183 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'categories',
            columns:[
            {
                name: 'id',
                type: 'int',
                isGenerated: true,
                isPrimary: true
            },
            {
                name: 'name',
                type: 'varchar(255)',
                isNullable: false
            },
            {
            name: 'description',
            type: 'text',
            },
            {
                name: 'is_active',
                type: 'boolean',
                default: false
            },
            {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
            },
            {
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
            },
    ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
