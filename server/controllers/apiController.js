import { generateDummyClasses } from '../services/apiService'

export function getClassesController(req, res) {
  res.json({
    data: generateDummyClasses()
  })
}
