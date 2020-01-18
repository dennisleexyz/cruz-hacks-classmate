#!/usr/bin/env node

import fetch from 'node-fetch';
import traverse from 'parse5-traverse';
import parse5 from 'parse5';

let table = [];
let css = [
  'desc',
  'sc-credithours',
  'instructor',
  'extraFields',
  'genEd',
  'quarter'
];
function parseTag(tag) {
  throw 'notimplemented';
}

(async () => {
  try {
    const data = await fetch(
      'https://catalog.ucsc.edu/Current/General-Catalog/Courses/AM-Applied-Mathematics',
      {
        method: 'GET'
      }
    );
    const stuff = await data.text();
    const document = parse5.parse(stuff);

    const table = []
    traverse(document, {
      pre(node, parent) {
        // console.log('faaa',node)
        table.push(node)
        // if (node.nodeName === 'div') {
        //   console.dir(node.attrs);
        //   // console.log('eee', node)
        //   let className = 'desc';
        //   //css.forEach(className => {
        //   node.attrs.forEach(attr => {
        //     if (attr.name === 'class' && attr.value === className) {
        //       node.childNodes.forEach(childNode => {
        //         // console.info(childNode.nodeName, childNode.value)
        //         //console.info(node.nodeName, node.value)
        //         table.push({ [childNode.nodeName]: childNode.value });
        //       });
        //       // console.log('33333', node)
        //     }
        //   });
        //   //})
        // }
        // node -> the current node
        // parent -> the parent node
      }
    });

   const newTable = table
    .filter(node => {
      //  console.log(node.attr)
      return node.nodeName === "div"
    })
    .filter(node => {
      return node.attrs !== undefined
    })
    .filter(node => {
      // console.log(node.attrs)
      // Array.prototype.some() returns true if at least one element in the array (node.attrs) passes the test
      return node.attrs.some(nodeAttribute => {
        return nodeAttribute.name === 'class' && nodeAttribute.value === 'desc';
      })
    })
   .forEach(el => console.log(el))

  } catch (err) {
    console.error('ERR', err);
  }
})();
