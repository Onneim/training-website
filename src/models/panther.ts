import { Schema, model } from 'mongoose';

// Інтерфейс для об'єкта "пантера"
interface IPanther {
    name: string; // Ім'я пантери
    age: number; // Вік пантери у роках
    height: number; // Висота пантери в сантиметрах
    weight: number; // Вага пантери в кілограмах
    gender: 'male' | 'female'; // Стать пантери: 'male' - самець, 'female' - самка
    description?: string; // Опис пантери (необов'язкове поле)
    dateAdded: Date; // Дата додавання запису до бази даних
    jumpHeight: string; //висота стрибка, метри
}

// Схема MongoDB для моделі "пантера"
const pantherSchema = new Schema<IPanther>({
    name: {
        type: String,
        required: true, // Поле є обов'язковим
    },
    age: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    height: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    weight: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    gender: {
        type: String,
        required: true, // Поле є обов'язковим
        enum: ['male', 'female'], // Допустимі значення: 'male' або 'female'
    },
    description: String, // Необов'язкове текстове поле
    dateAdded: {
        type: Date,
        default: Date.now, // Значення за замовчуванням - поточна дата і час
    },
    jumpHeight: {
        type: String,
        required: true, // Поле є обов'язковим
    },
});

// Створення моделі Mongoose на основі схеми
export const Panther = model<IPanther>('Panther', pantherSchema);
export type { IPanther }; // Експортуємо інтерфейс для використання в інших файлах
