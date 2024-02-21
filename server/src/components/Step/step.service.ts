import Step from './Step.model';

export const createSteps = async (recipeId: string, steps: string[]): Promise<Step[]> => {
    const createdSteps: Step[] = [];

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
