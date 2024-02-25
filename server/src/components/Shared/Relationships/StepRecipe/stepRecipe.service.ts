import { Step, StepInterface } from '../../../Step';
import StepRecipe from './StepRecipe.model';

export const createStepRecipe = (recipeId: string, steps: StepInterface[]) => {
    return StepRecipe.bulkCreate(steps.map((step) => ({ recipeId, stepId: step.id })));
};

export const updateStepRecipe = async (stepName: string, newStepName: string, recipeId: string = ''): Promise<Step | null> => {
    try {
        let step = await Step.findOne({ where: { step: stepName } });

        if (step) {
            step.step = newStepName;

            await step.save();
            return step;
        } else {
            step = await Step.create({ step: newStepName });
            await StepRecipe.create({ recipeId, stepId: step.id });
        }

        return step;
    } catch (error) {
        console.error('Error updating step:', error);
        throw error;
    }
};
