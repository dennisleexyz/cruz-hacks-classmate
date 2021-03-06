#!/usr/bin/env node

import fs from 'fs';
import fetch from 'node-fetch';
import traverse from 'parse5-traverse';
import parse5 from 'parse5';

let outputJson = {
  courses: []
};

function doStuff() {}

!(async () => {
  try {
    const data = await fetch(
      'https://catalog.ucsc.edu/Current/General-Catalog/Courses/ACEN-Academic-English'
    );
    const stuff = await data.text();
    const document = parse5.parse(stuff);

    const table = [];
    traverse(document, {
      pre(node, parent) {
        table.push(node);
      }
    });

    const t1 = [];
    table
      .filter(node => {
        return node.nodeName === 'a';
      })
      .filter(node => {
        return node.attrs !== undefined && node.attrs.length > 0;
      })
      .filter(node => {
        // Array.prototype.some() returns true if at least one element in the array (node.attrs) passes the test
        return node.attrs.some(nodeAttribute => {
          return (
            nodeAttribute.name === 'href' &&
            nodeAttribute.value.includes('Current/General-Catalog')
          );
        });
      })
      .forEach(el => {
        if (el.childNodes[1] && el.childNodes[0].childNodes[0]) {
          t1.push({
            link: el.attrs[0].value,
            shortName: el.childNodes[0].childNodes[0].value,
            departmentName: el.childNodes[0].childNodes[0].value.split(' ')[0],
            courseNumber: el.childNodes[0].childNodes[0].value.split(' ')[1],
            longName: el.childNodes[1].value
          });
        }
      });

    const t2 = [];
    table
      .filter(node => {
        return node.nodeName === 'div';
      })
      .filter(node => {
        return node.attrs !== undefined && node.attrs.length > 0;
      })
      .filter(node => {
        // Array.prototype.some() returns true if at least one element in the array (node.attrs) passes the test
        return node.attrs.some(nodeAttribute => {
          return (
            nodeAttribute.name === 'class' && nodeAttribute.value === 'desc'
          );
        });
      })
      .forEach(el => {
        // console.log('fff', el)
        if (el.childNodes[0]) {
          t2.push({
            text: el.childNodes[0].value
          });
        }
      });

    const t3 = [];
    table
      .filter(node => {
        return node.nodeName === 'div';
      })
      .filter(node => {
        return node.attrs !== undefined && node.attrs.length > 0;
      })
      .filter(node => {
        // Array.prototype.some() returns true if at least one element in the array (node.attrs) passes the test
        return node.attrs.some(nodeAttribute => {
          return (
            nodeAttribute.name === 'class' && nodeAttribute.value === 'credits'
          );
        });
      })
      .forEach(el => {
        // console.log('fff', el)
        if (el.childNodes[0]) {
          t3.push({
            text: el.childNodes[0].value
          });
        }
      });

    const tt = [];
    t1.forEach((el, i) => {
      tt.push({
        link: 'https://catalog.ucsc.edu' + t1[i].link,
        shortName: t1[i].shortName,
        longName: t1[i].longName,
        descriptionTest: t2[i].text.trim(),
        credits: parseInt(t3[i].text.trim())
      });
    });

    const data2 = await fs.promises.readFile('./courses.json', 'utf8');
    const json = JSON.parse(data2);

    const metatt = [];
    const promises = [];
    json.courses.forEach(course => {
      promises.push(
        new Promise(async (res, rej) => {
          // console.log(course)
          // const data = await fetch(
          //   course.link
          // );
          // const stuff = await data.text();

          // res(stuff)

          const data = await fetch(course.url);
          const stuff = await data.text();
          const document = parse5.parse(stuff);

          const table = [];
          traverse(document, {
            pre(node, parent) {
              table.push(node);
            }
          });

          const t1 = [];
          table
            .filter(node => {
              return node.nodeName === 'a';
            })
            .filter(node => {
              return node.attrs !== undefined && node.attrs.length > 0;
            })
            .filter(node => {
              // Array.prototype.some() returns true if at least one element in the array (node.attrs) passes the test
              return node.attrs.some(nodeAttribute => {
                return (
                  nodeAttribute.name === 'href' &&
                  nodeAttribute.value.includes('Current/General-Catalog')
                );
              });
            })
            .forEach(el => {
              if (el.childNodes[1] && el.childNodes[0].childNodes[0]) {
                t1.push({
                  link: el.attrs[0].value,
                  shortName: el.childNodes[0].childNodes[0].value,
                  departmentName: el.childNodes[0].childNodes[0].value.split(
                    ' '
                  )[0],
                  courseNumber: el.childNodes[0].childNodes[0].value.split(
                    ' '
                  )[1],
                  longName: el.childNodes[1].value
                });
              }
            });

          const t2 = [];
          table
            .filter(node => {
              return node.nodeName === 'div';
            })
            .filter(node => {
              return node.attrs !== undefined && node.attrs.length > 0;
            })
            .filter(node => {
              // Array.prototype.some() returns true if at least one element in the array (node.attrs) passes the test
              return node.attrs.some(nodeAttribute => {
                return (
                  nodeAttribute.name === 'class' &&
                  nodeAttribute.value === 'desc'
                );
              });
            })
            .forEach(el => {
              // console.log('fff', el)
              if (el.childNodes[0]) {
                t2.push({
                  text: el.childNodes[0].value
                });
              }
            });

          const t3 = [];
          table
            .filter(node => {
              return node.nodeName === 'div';
            })
            .filter(node => {
              return node.attrs !== undefined && node.attrs.length > 0;
            })
            .filter(node => {
              // Array.prototype.some() returns true if at least one element in the array (node.attrs) passes the test
              return node.attrs.some(nodeAttribute => {
                return (
                  nodeAttribute.name === 'class' &&
                  nodeAttribute.value === 'credits'
                );
              });
            })
            .forEach(el => {
              // console.log('fff', el)
              if (el.childNodes[0]) {
                t3.push({
                  text: el.childNodes[0].value
                });
              }
            });

          const t4 = [];
          table
            .filter(node => {
              return node.nodeName === 'div';
            })
            .filter(node => {
              return node.attrs !== undefined && node.attrs.length > 0;
            })
            .filter(node => {
              // Array.prototype.some() returns true if at least one element in the array (node.attrs) passes the test
              return node.attrs.some(nodeAttribute => {
                return (
                  nodeAttribute.name === 'class' &&
                  nodeAttribute.value === 'quarter'
                );
              });
            })
            .forEach(el => {
              // console.log('fff', el.childNodes[2].childNodes[0].value)
              if (el.childNodes[0]) {
                if (el.childNodes[2].childNodes[0]) {
                  t4.push({
                    quarter: el.childNodes[2].childNodes[0].value
                  });
                }
              }
            });

             const t5 = [];
             table
               .filter(node => {
                 return node.nodeName === 'div';
               })
               .filter(node => {
                 return node.attrs !== undefined && node.attrs.length > 0;
               })
               .filter(node => {
                 // Array.prototype.some() returns true if at least one element in the array (node.attrs) passes the test
                 return node.attrs.some(nodeAttribute => {
                   return (
                     nodeAttribute.name === 'class' &&
                     nodeAttribute.value === 'instructor'
                   );
                 });
               })
               .forEach(el => {
                 // console.log('fff', el.childNodes[2].childNodes[0].value)
                 if (el.childNodes[0]) {
                   if (el.childNodes[2].childNodes[0]) {
                     t5.push({
                       professors: el.childNodes[2].childNodes[0].value
                     });
                   }
                 }
               });


               const t6 = [];
               table
                 .filter(node => {
                   return node.nodeName === 'div';
                 })
                 .filter(node => {
                   return node.attrs !== undefined && node.attrs.length > 0;
                 })
                 .filter(node => {
                   // Array.prototype.some() returns true if at least one element in the array (node.attrs) passes the test
                   return node.attrs.some(nodeAttribute => {
                     return (
                       nodeAttribute.name === 'class' &&
                       nodeAttribute.value === 'extraFields'
                     );
                   });
                 })
                 .forEach(el => {
                   // console.log('fff', el.childNodes[2].childNodes[0].value)
                   if (el.childNodes[0]) {
                     if (el.childNodes[2].childNodes[0]) {
                       console.log(el.childNodes[2].childNodes[0]);
                       t6.push({
                         requirements: el.childNodes[2].childNodes[0].value
                       });
                     }
                   }
                 });

                  const t7 = [];
                  table
                    .filter(node => {
                      return node.nodeName === 'div';
                    })
                    .filter(node => {
                      return node.attrs !== undefined && node.attrs.length > 0;
                    })
                    .filter(node => {
                      // Array.prototype.some() returns true if at least one element in the array (node.attrs) passes the test
                      return node.attrs.some(nodeAttribute => {
                        return (
                          nodeAttribute.name === 'class' &&
                          nodeAttribute.value === 'genEd'
                        );
                      });
                    })
                    .forEach(el => {
                      // console.log('fff', el.childNodes[2].childNodes[0].value)
                      if (el.childNodes[0]) {
                        if (el.childNodes[2].childNodes[0]) {
                          t7.push({
                            feee: el.childNodes[2].childNodes[0].value
                          });
                        }
                      }
                    });

          const tt = [];
          t1.forEach((el, i) => {
            // console.log(t4[i])
            tt.push({
              link: 'https://catalog.ucsc.edu' + t1[i].link,
              shortName: t1[i].shortName.trim(),
              longName: t1[i].longName.trim(),
              departmentName: t1[i].departmentName.trim(),
              courseNumber: t1[i].courseNumber.trim(),
              quartersOffered: t4[i]
                ? {
                    fall: t4[i].quarter.includes('Fall'),
                    winter: t4[i].quarter.includes('Winter'),
                    spring: t4[i].quarter.includes('Spring'),
                    summer: t4[i].quarter.includes('Summer'),
                    uncertain: false
                  }
                : {
                    fall: true,
                    winter: true,
                    spring: true,
                    summer: true,
                    uncertain: true
                  },
              professors: [
                ...(t5[i]
                  ? [
                      ...t5[i].professors
                        .trim()
                        .split(',')
                        .map(e => e.trim())
                    ]
                  : [])
              ],
              prereqs: t6[i] && t6[i].professors ? t6[i].professors : '',
              generalEducationCode: t7[i] && t7[i].feee ? t7[i].feee : '',
              descriptionTest: t2[i].text.trim(),
              credits: parseInt(t3[i].text.trim())
            });
          });

          res({
            [course.name.replace('Courses/', '')]: tt
          });
        })
      );
    });
    // console.log(json);

    Promise.all(promises).then(async res => {
      // console.info(res)

      await fs.promises.writeFile(
        './thingy.json',
        JSON.stringify(
          {
            stuff: res
          },
          null,
          2
        ),
        'utf8'
      );
    });

    // await fs.promises.writeFile(
    //   './coursesData.json',
    //   JSON.stringify(
    //     {
    //       array: tt
    //     },
    //     null,
    //     2
    //   ),
    //   'utf8'
    // );
  } catch (err) {
    console.error('ERR', err);
  }
})();
