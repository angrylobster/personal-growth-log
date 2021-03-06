const logsRepository = require('../logsRepository');
const { expect } = require('chai');
const db = require('../../db');

describe('logRepository.create', () => {
    beforeAll(async () => {
        await db.connect();
    });
    afterAll(db.disconnect);

    it('should throw an error if I send in an object without an entry', (done) => {
        logsRepository.create({
            title: '',
        })
            .catch(err => {
                expect(err).to.be.ok;
                expect(err.message).to.equal('Invalid entry: please specify entry');
                done();
            });
    });

    it('should check that title is a string and throw an error if it isn\'t', (done) => {
        logsRepository.create({
            title: 123,
            entry: '',
            isShipBroken: false,
        })
            .catch(err => {
                expect(err).to.be.ok;
                expect(err.message).to.equal('Document failed validation');
                done();
            });
    });

    it('should throw an error if the date is a number', (done) => {
        logsRepository.create({
            title: 'My First Log',
            entry: 'Blah blah blah',
            isShipBroken: true,
            date: new Date()
        })
            .catch(err => {
                expect(err).to.be.ok;
                expect(err.message).to.equal('Document failed validation');
                done();
            });
    });
});