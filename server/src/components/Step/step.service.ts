import Step from './Step.model';
import { StepInterface } from './step.interface';

export const createSteps = async (recipeId: string, steps: StepInterface[]): Promise<Step[]> => {
    return await Step.bulkCreate(steps.map((step: StepInterface) => ({ recipeId, step })));
};
