import { injectable } from 'inversify';
import { Panther, IPanther } from '../models/panther';

// Клас-репозиторій для роботи з пантерами
// Анотація injectable дозволяє впровадити цей репозиторій через IoC контейнер
@injectable()
export class PantherRepository {
    // Метод для отримання всіх пантер з бази даних
    public async findAll(): Promise<IPanther[]> {
        return Panther.find();
    }

    // Метод для пошуку пантери за унікальним ідентифікатором
    public async findById(id: string): Promise<IPanther | null> {
        return Panther.findById(id);
    }

    // Метод для створення нової пантери в базі даних
    public async create(pantherData: IPanther): Promise<IPanther> {
        const panther = new Panther(pantherData);
        return panther.save();
    }

    // Метод для видалення пантери за ідентифікатором
    public async delete(id: string): Promise<boolean> {
        const result = await Panther.findByIdAndDelete(id);
        return result !== null;
    }

    // Метод для повного оновлення даних про пантеру (заміна всіх полів)
    public async update(id: string, pantherData: IPanther): Promise<IPanther | null> {
        return Panther.findByIdAndUpdate(id, pantherData, { new: true });
    }

    // Метод для часткового оновлення даних про пантеру (оновлення лише вказаних полів)
    public async patch(id: string, pantherData: Partial<IPanther>): Promise<IPanther | null> {
        return Panther.findByIdAndUpdate(id, { $set: pantherData }, { new: true });
    }
}
