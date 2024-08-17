import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'CustomMatchPasswords', async: false })
export class CustomMatchPasswords implements ValidatorConstraintInterface {
    validate(confirmPassword: string, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return confirmPassword === relatedValue;
    }

    defaultMessage(args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        return `${args.property} must match ${relatedPropertyName}`;
    }
}