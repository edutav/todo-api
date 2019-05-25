'use strict';

const Schema = use('Schema');

class FileSchema extends Schema {
  up () {
    this.create('files', table => {
      table.increments();
      table.string('file').notNullable();
      table.string('name').notNullable();
      table.string('type');
      table.string('subtype');
      table.timestamps();
    });
  }

  down () {
    this.drop('files');
  }
}

module.exports = FileSchema;
