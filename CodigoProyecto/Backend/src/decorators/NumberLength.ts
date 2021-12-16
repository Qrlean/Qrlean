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
                    const [minv, maxv] = args.constraints;
                    if (!value) {
                        return false;
                    }
                    const valueString = value.toString().length;

                    return valueString >= minv && valueString <= maxv;
                },
                defaultMessage: buildMessage(
                    (_, args) =>
                        `El campo ${args.property} deberia tener minimo ${args.constraints[0]} cifra(s) y maximo ${args.constraints[1]} cifra(s).`,
                ),
            },
        });
    };
}
