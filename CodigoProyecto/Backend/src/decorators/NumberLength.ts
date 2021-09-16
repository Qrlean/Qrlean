import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
    buildMessage,
} from 'class-validator';

export function NumberLength(
    min: number,
    max: number,
    validationOptions?: ValidationOptions,
) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'NumberLength',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [min, max],
            options: validationOptions,
            validator: {
                validate(value: number, args: ValidationArguments) {
                    const [min, max] = args.constraints;
                    const valueString = value.toString().length;
                    return valueString >= min && valueString <= max;
                },
                defaultMessage: buildMessage(
                    (eachPrefix, args) =>
                        `El campo ${args.property} deberia tener minimo ${args.constraints[0]} cifra(s) y maximo ${args.constraints[1]} cifra(s).`,
                ),
            },
        });
    };
}
