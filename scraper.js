#!/usr/bin/env node
const fetch = require('node-fetch')
const parse5 = require('parse5');
let table = []
const traverse = require('parse5-traverse');(async () => {
  try {
    const data = await fetch('https://catalog.ucsc.edu/Current/General-Catalog/Courses/ECON-Economics/Lower-Division/ECON-1', {
      method: 'GET'
    })
    const stuff = await data.text()
    // console.log('done fetching')
    const document = parse5.parse(stuff);
    traverse(document, {
      pre(node, parent) {
        // console.log('faaa',node)
        if (node.nodeName === 'div') {
          // console.log('eee', node)
          node.attrs.forEach(attr => {
            if (attr.name === 'class' && attr.value === 'desc') {
              node.childNodes.forEach(node => {
                console.info(node.nodeName, node.value)
		table.push({ [node.nodeName] : node.value })
		console.log(table)
              })
              // console.log('33333', node)
            }
          })
        }
        // node -> the current node
        // parent -> the parent node
      },
      post(node, parent) {      }
    })
  } catch (err) {
    console.error('ERR', err)
  }
})()
