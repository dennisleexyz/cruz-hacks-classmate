let fs = require('fs')

fs.promises.readFile('./coursesData.json', 'utf8')
  .then(data => {
    const json = JSON.parse(data)

    let a = json.array;
    for (e of a) {
      e.department = e.shortName.split(' ')[0];
      e.courseNumber = e.shortName.split(' ')[1];
    }
    return { array: json.array };

  })
  .then(final => {
    return fs.promises.writeFile('./finalData.json', JSON.stringify(final, null, 2), 'utf8')
  })
