import { Router, Request, Response } from 'express';
import { container } from '../config/container';
import { PantherRepository } from '../repositories/PantherRepository';

// Створюємо новий обробник HTTP-запитів Express
const router = Router();
// Отримуємо екземпляр репозиторію пантер з контейнера інверсії залежностей
const pantherRepository = container.get(PantherRepository);

// Обробка HTTP-запиту GET / - отримання всіх записів пантер
router.get('/', (async (_req: Request, res: Response) => {
    try {
        // Отримуємо всі записи пантер з бази даних через репозиторій
        const panthers = await pantherRepository.findAll();
        res.json(panthers);
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту GET /:id - отримання запису одної пантери за ідентифікатором
router.get('/:id', (async (req: Request, res: Response) => {
    try {
        // Пошук пантери за ідентифікатором
        const panther = await pantherRepository.findById(req.params.id);
        if (panther) {
            res.json(panther);
        } else {
            // Якщо пантеру не знайдено, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис пантери не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту POST / - створення нового запису пантери
router.post('/', (async (req: Request, res: Response) => {
    try {
        // Створюємо новий запис пантери з даних запиту
        const newPanther = await pantherRepository.create(req.body);
        // Повертаємо статус 201 (Created) і дані створеної пантери
        res.status(201).json(newPanther);
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту PUT /:id - повне оновлення запису пантери
router.put('/:id', (async (req: Request, res: Response) => {
    try {
        // Перевірка наявності всіх обов'язкових полів для PUT запиту
        const requiredFields = ['name', 'age', 'height', 'weight', 'gender'];
        const missingFields = requiredFields.filter(field => !(field in req.body));

        // Якщо є відсутні поля, повертаємо помилку 400 Bad Request
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Відсутні обов'язкові поля: ${missingFields.join(', ')}`,
            });
        }

        // Оновлюємо пантеру з вказаним ID
        const panther = await pantherRepository.update(req.params.id, req.body);
        if (panther) {
            return res.json(panther);
        } else {
            // Якщо пантеру не знайдено, повертаємо 404 помилку
            return res.status(404).json({ message: 'Запис пантери не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        return res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту PATCH /:id - часткове оновлення запису пантери
router.patch('/:id', (async (req: Request, res: Response) => {
    try {
        // Часткове оновлення запису пантери - передаються лише ті поля, які потрібно змінити
        const panther = await pantherRepository.patch(req.params.id, req.body);
        if (panther) {
            res.json(panther);
        } else {
            // Якщо пантеру не знайдено, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис пантери не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту DELETE /:id - видалення запису пантери
router.delete('/:id', (async (req: Request, res: Response) => {
    try {
        // Видаляємо дані про пантеру за ID
        const panther = await pantherRepository.delete(req.params.id);
        if (panther) {
            // У разі успіху повертаємо повідомлення про видалення
            res.json({ message: 'Запис про пантеру видалено' });
        } else {
            // Якщо пантеру не знайдено, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис про пантеру не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

export default router;
