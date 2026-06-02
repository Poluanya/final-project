import { faker } from '@faker-js/faker';

export const generateUser = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  zipCode: faker.location.zipCode(),
});
