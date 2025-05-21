import 'reflect-metadata';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import { Panther } from '../src/models/panther';
import { container } from '../src/config/container';
import { TYPES } from '../src/types/types';
import { IDatabase } from '../src/interfaces/IDatabase';
import { MONGODB_URI } from '../src/config/env';
import mongoose from 'mongoose';

const { expect } = chai;
chai.use(chaiHttp);

// Тести API вебдодатку сайту про пантер
describe('API вебдодатку сайту про пантер', () => {
    // Отримуємо екземпляр бази даних з контейнера
    const database = container.get<IDatabase>(TYPES.IDatabase);
    // Створюємо спеціальний URI для тестової бази даних
    const testMongoURI = MONGODB_URI.replace(/\/[^/]*$/, '/panthers-test');

    // Перед запуском тестів підключаємось до тестової бази даних
    before(async () => {
        await database.connect(testMongoURI);
        console.log('Підключено до тестової бази даних:', testMongoURI);
    });

    // Після всіх тестів очищуємо базу даних і відключаємося
    after(async () => {
        try {
            // Видаляємо тестову базу даних
            await mongoose.connection.db.dropDatabase();
            console.log('Тестову базу даних "panthers-test" успішно видалено');
        } catch (error) {
            // Обробляємо можливі помилки
            console.log(
                'Помилка видалення тестової бази даних:',
                error instanceof Error ? error.message : 'Невідома помилка',
            );
        } finally {
            // В будь-якому разі відключаємося від бази даних
            await database.disconnect();
            console.log('Відключено від тестової бази даних');
        }
    });

    // Тести для перевірки підключення до бази даних
    describe('Підключення до бази даних', () => {
        it('має перевірити підключення до тестової бази даних', () => {
            expect(database.isConnected()).to.be.true;
            expect(database.getConnectionUri()).to.equal(testMongoURI);
            console.log('Підключення до бази даних успішно перевірено');
        });
    });

    // Перед кожним тестом очищуємо колекцію пантер
    beforeEach(async () => {
        await Panther.deleteMany({});
    });

    // Тести для створення запису про нову пантеру (POST-запит)
    describe('POST /api/panthers', () => {
        it('має створити запис про нову пантеру', done => {
            // Тестові дані пантери
            const panther = {
                name: 'Хижак',
                age: 2,
                height: 30,
                weight: 2.5,
                gender: 'male' as const,
                description: 'пантера',
                jumpHeight: '3 м',
            };

            // Виконуємо POST-запит для створення запису про пантеру
            chai.request(app)
                .post('/api/panthers')
                .send(panther)
                .end((err, res) => {
                    if (err !== null && err !== undefined) {
                        return done(err);
                    }
                    // Перевіряємо відповідь
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('name', panther.name);
                    expect(res.body).to.have.property('age', panther.age);
                    expect(res.body).to.have.property('height', panther.height);
                    expect(res.body).to.have.property('weight', panther.weight);
                    expect(res.body).to.have.property('gender', panther.gender);
                    expect(res.body).to.have.property('description', panther.description);
                    expect(res.body).to.have.property('dateAdded');
                    expect(res.body).to.have.property(
                        'jumpHeight',
                        panther.jumpHeight,
                    );
                    expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
                    done();
                });
        });
    });

    // Тести для отримання всіх записів пантер (GET-запит)
    describe('GET /api/panthers', () => {
        it('має отримати всіх пантер', async () => {
            // Створюємо тестовий запис пантери
            const testPanther = new Panther({
                name: 'Дикий кіт',
                age: 3,
                height: 35,
                weight: 3.2,
                gender: 'male',
                description: 'Плямиста пантера',
                jumpHeight: '3 м',
            });
            await testPanther.save();

            // Виконуємо GET-запит для отримання всіх записів пантер
            const res = await chai.request(app).get('/api/panthers');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(1);
            expect(res.body[0]).to.have.property('name', 'Дикий кіт');
            expect(res.body[0]).to.have.property('gender', 'male');
            expect(res.body[0]).to.have.property('description', 'Плямиста пантера');
            expect(res.body[0]).to.have.property('dateAdded');
            expect(res.body[0]).to.have.property('jumpHeight', '3 м');
            expect(new Date(res.body[0].dateAdded)).to.be.instanceOf(Date);
        });
    });

    // Тести для отримання запису конкретної пантери за ID (GET-запит)
    describe('GET /api/panthers/:id', () => {
        it('має отримати конкретну пантеру за id', async () => {
            // Створюємо запис тестової пантери
            const testPanther = new Panther({
                name: 'Пантера гарна',
                age: 1,
                height: 25,
                weight: 1.8,
                gender: 'male',
                description: 'Зла пантера',
                jumpHeight: '3 м',
            });
            const savedPanther = await testPanther.save();

            // Виконуємо GET-запит для отримання запису пантери за ID
            const res = await chai
                .request(app)
                .get(`/api/panthers/${String(savedPanther._id)}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Пантера гарна');
            expect(res.body).to.have.property('age', 1);
            expect(res.body).to.have.property('height', 25);
            expect(res.body).to.have.property('weight', 1.8);
            expect(res.body).to.have.property('gender', 'male');
            expect(res.body).to.have.property('description', 'Зла пантера');
            expect(res.body).to.have.property('jumpHeight', '3 м');
        });

        it('має повернути 404 для неіснуючої пантери', async () => {
            // Виконуємо GET-запит для неіснуючого ID пантери
            const res = await chai.request(app).get('/api/panthers/654321654321654321654321');
            expect(res).to.have.status(404);
        });
    });

    // Тести для повного оновлення запису про пантеру (PUT-запит)
    describe('PUT /api/panthers/:id', () => {
        it('має повністю оновити запис про пантеру', async () => {
            // Створюємо тестову пантеру
            const testPanther = new Panther({
                name: 'Оригінальний',
                age: 1,
                height: 25,
                weight: 1.8,
                gender: 'male',
                description: 'Початковий опис',
                jumpHeight: '3 м',
            });
            const savedPanther = await testPanther.save();

            // Дані для оновлення пантери
            const updatedData = {
                name: 'Оновлений',
                age: 2,
                height: 30,
                weight: 2.5,
                gender: 'female',
                description: 'Оновлений опис',
                jumpHeight: '4 м',
            };

            // Виконуємо PUT-запит для повного оновлення запису про пантеру
            const res = await chai
                .request(app)
                .put(`/api/panthers/${String(savedPanther._id)}`)
                .send(updatedData);

            // Перевіряємо результат
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Оновлений');
            expect(res.body).to.have.property('age', 2);
            expect(res.body).to.have.property('height', 30);
            expect(res.body).to.have.property('weight', 2.5);
            expect(res.body).to.have.property('gender', 'female');
            expect(res.body).to.have.property('description', 'Оновлений опис');
            expect(res.body).to.have.property('dateAdded');
            expect(res.body).to.have.property('jumpHeight', '4 м');
            expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
        });

        it("має завершитися невдачею при відсутності обов'язкових полів", async () => {
            // Створюємо тестову пантеру
            const testPanther = new Panther({
                name: 'Оригінальний',
                age: 1,
                height: 25,
                weight: 1.8,
                gender: 'male',
                description: 'Початковий опис',
                jumpHeight: '3 м',
            });
            const savedPanther = await testPanther.save();

            // Неповні дані для оновлення (відсутні обов'язкові поля)
            const incompleteData = {
                name: 'Оновлений',
                age: 2,
                // height і weight відсутні
                gender: 'female',
                description: 'Оновлений опис',
                jumpHeight: '3 м',
            };

            // Виконуємо PUT-запит з неповними даними
            const res = await chai
                .request(app)
                .put(`/api/panthers/${String(savedPanther._id)}`)
                .send(incompleteData);

            // Перевіряємо, що запит завершився з помилкою
            expect(res).to.have.status(400);

            // Перевіряємо, що пантера не змінилася
            const unchangedPanther = await Panther.findById(savedPanther._id);
            expect(unchangedPanther).to.have.property('name', 'Оригінальний');
            expect(unchangedPanther).to.have.property('height', 25);
            expect(unchangedPanther).to.have.property('weight', 1.8);
            expect(unchangedPanther).to.have.property('jumpHeight', '3 м');
        });
    });

    // Тести для часткового оновлення запису про пантеру (PATCH-запит)
    describe('PATCH /api/panthers/:id', () => {
        it('має частково оновити запис про пантеру', async () => {
            // Створюємо тестову пантеру
            const testPanther = new Panther({
                name: 'Оригінальний',
                age: 1,
                height: 25,
                weight: 1.8,
                gender: 'male',
                description: 'Початковий опис',
                jumpHeight: '3 м',
            });
            const savedPanther = await testPanther.save();

            // Дані для часткового оновлення
            const patchData = {
                name: 'Частково оновлений',
                age: 3,
                description: 'Оновлений опис',
                jumpHeight: '4 м',
            };

            // Виконуємо PATCH-запит
            const res = await chai
                .request(app)
                .patch(`/api/panthers/${String(savedPanther._id)}`)
                .send(patchData);

            // Перевіряємо результат
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Частково оновлений');
            expect(res.body).to.have.property('age', 3);
            expect(res.body).to.have.property('height', 25);
            expect(res.body).to.have.property('weight', 1.8);
            expect(res.body).to.have.property('gender', 'male');
            expect(res.body).to.have.property('description', 'Оновлений опис');
            expect(res.body).to.have.property('dateAdded');
            expect(res.body).to.have.property('jumpHeight', '4 м');
            expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
        });

        it('демонструє різницю між PATCH і PUT з частковими оновленнями', async () => {
            // Створюємо тестову пантеру
            const testPanther = new Panther({
                name: 'Оригінальний',
                age: 1,
                height: 25,
                weight: 1.8,
                gender: 'male',
                description: 'Початковий опис',
                jumpHeight: '3 м',
            });
            const savedPanther = await testPanther.save();

            // Ті самі неповні дані, що не спрацювали з PUT, мають працювати з PATCH
            const partialData = {
                name: 'Оновлений',
                age: 2,
                // height і weight навмисно відсутні
                gender: 'female',
                description: 'Оновлений опис',
                jumpHeight: '3 м',
            };

            // Виконуємо PATCH-запит
            const res = await chai
                .request(app)
                .patch(`/api/panthers/${String(savedPanther._id)}`)
                .send(partialData);

            // Перевіряємо результат
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Оновлений');
            expect(res.body).to.have.property('age', 2);
            // Ці поля мають зберегти свої початкові значення
            expect(res.body).to.have.property('height', 25);
            expect(res.body).to.have.property('weight', 1.8);
            expect(res.body).to.have.property('gender', 'female');
            expect(res.body).to.have.property('description', 'Оновлений опис');
            expect(res.body).to.have.property('jumpHeight', '3 м');
        });
    });

    // Тести для отримання метаданих (HEAD-запит)
    describe('HEAD /api/panthers', () => {
        it('має повернути заголовки метаданих', async () => {
            // Виконуємо HEAD-запит
            const res = await chai
                .request(app)
                .head('/api/panthers')
                .set('Accept', 'application/json');

            // Перевіряємо статус відповіді
            expect(res).to.have.status(200);

            // Виводимо отримані заголовки
            console.log('Заголовки:');
            console.log('-----------------');
            Object.entries(res.headers).forEach(([key, value]) => {
                console.log(`${key}: ${String(value)}`);
            });

            // Перевіряємо наявність необхідних заголовків
            expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            expect(res.headers['x-powered-by']).to.equal('Express');
            expect(res.headers['content-length']).to.equal('2');
        });
    });

    // Тести для видалення запису пантери (DELETE-запит)
    describe('DELETE /api/panthers/:id', () => {
        it('має видалити запис про пантеру', async () => {
            // Створюємо тестову пантеру
            const testPanther = new Panther({
                name: 'Самка пантера',
                age: 2,
                height: 28,
                weight: 2.1,
                gender: 'female',
                description: 'Цариця',
                jumpHeight: '3 м',
            });
            const savedPanther = await testPanther.save();

            // Виконуємо DELETE-запит
            const res = await chai
                .request(app)
                .delete(`/api/panthers/${String(savedPanther._id)}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'Запис про пантеру видалено');

            // Перевіряємо, що запис про пантеру дійсно видалено з бази
            const findPanther = await Panther.findById(savedPanther._id);
            expect(findPanther).to.be.null;
        });
    });
});
