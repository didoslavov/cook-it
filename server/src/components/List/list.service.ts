import List from './List.model';
import { ListInterface } from './list.interface';

export const findAllLists = async (): Promise<ListInterface[]> => {
    const lists = await List.findAll();
    return lists.map((p): ListInterface => p.toJSON());
};

export const insertList = async (list: ListInterface): Promise<ListInterface> => {
    const createdList = await List.create(list);
    return createdList.toJSON();
};

export const findListByPk = async (listId: string): Promise<ListInterface | undefined> => {
    const list = await List.findByPk(listId);
    return list?.toJSON();
};
