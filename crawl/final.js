let fs = require('fs');

fs.promises
  .readFile('./thingy.json', 'utf8')
  .then(data => {
    const json = JSON.parse(data);

    for (e of json.stuff) {
      if (e.shortName) {
        e.department = e.shortName.split(' ')[0];
        e.courseNumber = e.shortName.split(' ')[1];
      } else {
        // console.log(e)
      }
    }

    return { data: json.stuff };
  })
  .then(final => {
    return fs.promises.writeFile(
      './finalData.json',
      JSON.stringify(final, null, 2),
      'utf8'
    );
  })
  .catch(err => console.error(err));
