import faker from 'faker'

export function generateDummyClasses() {
  const classes = []
  for (let i = 0; i < 10; ++i) {
    let obj = {
      department: `department-${faker.lorem.word()}`.toLocaleLowerCase(),
      departmentNumber: faker.random.number(),
      courseTitle: faker.lorem.words(),
      description: faker.lorem.sentence(),
      credits: faker.random.number(),
      instructor: faker.name.findName(),
      prereqs: [
      ],
      generalEd: 'EN',
      offeredDuring: {
        fall: Math.random() < 0.5,
        winter: Math.random() < 0.5,
        spring: Math.random() < 0.5,
        summer: Math.random() < 0.5
      }
    }
    classes.push(obj)
  }
  return classes
}
