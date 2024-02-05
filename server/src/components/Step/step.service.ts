import Step from './Step.model';
import { StepInterface } from './step.interface';

export const createSteps = async (recipeId: string, steps: StepInterface[]): Promise<Step[]> => {
    const createdSteps: Step[] = [];

    console.log(steps);
    for (const step of steps) {
        const existingStep = await Step.findOne({ where: { step } });

        if (existingStep) {
            createdSteps.push(existingStep);
        } else {
            const newStep = await Step.create({ step });
            createdSteps.push(newStep);
        }
    }

    return createdSteps;
};
