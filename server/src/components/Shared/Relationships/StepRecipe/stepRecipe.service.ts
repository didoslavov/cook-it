import { Step, StepInterface } from '../../../Step';
import StepRecipe from './StepRecipe.model';

export const createStepRecipe = (recipeId: string, steps: StepInterface[]) => {
    return StepRecipe.bulkCreate(steps.map((step) => ({ recipeId, stepId: step.id })));
};

export const updateStepRecipe = async (stepName: string, newStepName: string, recipeId: string = ''): Promise<Step | null> => {
    try {
        let step = await Step.findOne({ where: { step: stepName } });

        if (!newStepName) {
            await StepRecipe.destroy({ where: { recipeId, stepId: step?.id } });
            return null;
        }

        const existingStep = await Step.findOne({ where: { step: newStepName } });

        if (existingStep) {
            await StepRecipe.findOrCreate({ where: { recipeId, stepId: existingStep.id } });
            step = existingStep;
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
