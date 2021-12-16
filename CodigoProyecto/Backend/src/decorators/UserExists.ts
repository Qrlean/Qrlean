import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    buildMessage,
} from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Usuario } from '../usuarios/entities/usuario.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserAlreadyExistConstraint
    implements ValidatorConstraintInterface
{
    constructor(
        @InjectRepository(Usuario)
        private usersRepository: Repository<Usuario>,
    ) {}
    validate(property: any, args: ValidationArguments) {
        const fullProperty = {
            [args.property]: property,
        };

        return this.usersRepository.findOne(fullProperty).then((user) => {
            if (user) return false;
            return true;
        });
    }
    defaultMessage = buildMessage((eachPrefix, args) => {
        return `Ya existe un usuario con el ${args.property} con valor ${args.value}.`;
    });
}

export function UserExits(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserAlreadyExistConstraint,
        });
    };
}
