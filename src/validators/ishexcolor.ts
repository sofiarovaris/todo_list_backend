import { registerDecorator } from 'class-validator';

export function IsHexColor() {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isHexColor',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value) {
          return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
        },
        defaultMessage: () => 'Color must be a valid hex color',
      },
    });
  };
}
