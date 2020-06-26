import PouchDB from "pouchdb"
import PouchDBFind from "pouchdb-find"
PouchDB.plugin(PouchDBFind)

export const db = new PouchDB('local')