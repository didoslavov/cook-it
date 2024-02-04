import { StepInterface } from '../../../Step';
import StepRecipe from './StepRecipe.model';

export const createStepRecipe = (recipeId: string, steps: StepInterface[]) => {
    return StepRecipe.bulkCreate(steps.map((step) => ({ recipeId, stepId: step.id })));
};
