// Експорт специфікації Swagger/OpenAPI для документації про API
export const swaggerSpec = {
    // Версія специфікації OpenAPI
    openapi: '3.0.0',
    // Загальна інформація про API
    info: {
        title: 'API Сайту про пантер',
        version: '1.0.0',
        description: 'Документація API для Сайту про пантер',
    },
    // Налаштування серверів для тестування API
    servers: [
        {
            url:
                process.env.CODESPACE_NAME !== undefined
                    ? `https://${process.env.CODESPACE_NAME}-5000.app.github.dev`
                    : 'http://localhost:5000',
            description: 'Development server',
        },
    ],
    // Визначення кінцевих точок (endpoints) REST API та операцій з ними
    paths: {
        '/api/panthers': {
            // GET запит для отримання всіх пантер
            get: {
                summary: 'Отримати всіх пантер',
                responses: {
                    '200': {
                        description: 'Список всіх пантер',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Panther' },
                                },
                            },
                        },
                    },
                },
            },

            // POST запит для створення нової пантери
            post: {
                summary: 'Створити нову пантеру',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Panther' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: "Створений об'єкт пантера",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Panther' },
                            },
                        },
                    },
                },
            },
        },

        // Операції для конкретної пантери за ID
        '/api/panthers/{id}': {
            // GET запит для отримання пантери за ID
            get: {
                summary: 'Отримати пантеру за ID',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID пантери',
                    },
                ],
                responses: {
                    '200': {
                        description: "Об'єкт пантера",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Panther' },
                            },
                        },
                    },
                    '404': { description: 'пантеру не знайдено' },
                },
            },

            // PUT запит для повного оновлення пантери за ID
            put: {
                summary: 'Повністю оновити пантеру',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID пантери',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Panther' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт пантера",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Panther' },
                            },
                        },
                    },
                    '404': { description: 'пантеру не знайдено' },
                },
            },
            // PATCH запит для часткового оновлення пантери за ID
            patch: {
                summary: 'Частково оновити пантеру',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID пантери',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Panther' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт пантера",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Panther' },
                            },
                        },
                    },
                    '404': { description: 'пантеру не знайдено' },
                },
            },
            // DELETE запит для видалення даних про пантеру за ID
            delete: {
                summary: 'Видалити дані про пантеру',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID пантери',
                    },
                ],
                responses: {
                    '200': { description: 'Повідомлення про успішне видалення' },
                    '404': { description: 'пантеру не знайдено' },
                },
            },
        },
    },

    // Визначення компонентів для повторного використання
    components: {
        // Схеми даних
        schemas: {
            // Схема об'єкта пантера
            Panther: {
                type: 'object',
                required: ['name', 'age', 'height', 'weight', 'gender'],
                properties: {
                    name: {
                        type: 'string',
                        description: "Ім'я пантери",
                    },
                    age: {
                        type: 'number',
                        description: 'Вік пантери у роках',
                    },
                    height: {
                        type: 'number',
                        description: 'Висота пантери в сантиметрах',
                    },
                    weight: {
                        type: 'number',
                        description: 'Вага пантери в кілограмах',
                    },
                    gender: {
                        type: 'string',
                        enum: ['male', 'female'],
                        description: 'Стать пантери',
                    },
                    description: {
                        type: 'string',
                        description: "Опис пантери (необов'язкове поле)",
                    },
                    jumpHeight: {
                        type: 'string',
                        jumpHeight: 'Висота стрибка, метри',
                    },
                },
            },
        },
    },
};
