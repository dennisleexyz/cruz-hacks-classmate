#!/usr/bin/env node

import fs from 'fs';
import fetch from 'node-fetch';
import traverse from 'parse5-traverse';
import parse5 from 'parse5';

let outputJson = {
  courses: []
};

!(async () => {
  try {
    const data = await fetch(
      'https://catalog.ucsc.edu/Current/General-Catalog/Courses'
    );
    const stuff = await data.text();
    const document = parse5.parse(stuff);

    const table = [];
    traverse(document, {
      pre(node, parent) {
        table.push(node);
      }
    });

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
        let url = el.attrs[0].value;
        url = url.slice();
        const name = url.slice(28);

        if (
          !new Set([
            'Welcome-to-UC-Santa-Cruz',
            'Introducing-UC-Santa-Cruz',
            'Academic-Programs',
            'Academic-Units',
            'Courses'
          ]).has(name)
        ) {
          outputJson.courses.push({
            url: 'https://catalog.ucsc.edu' + url,
            name
          });
        }
        console.log(url)
      });

    await fs.promises.writeFile(
      './courses.json',
      JSON.stringify(outputJson, null, 2),
      'utf8'
    );
  } catch (err) {
    console.error('ERR', err);
  }
})();
