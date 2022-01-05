import express from 'express'
import mongoose from 'mongoose'
import Project from '../../models/project-model.js'
const router = express.Router()

// to do check la validité de l'id (id)

router.get('/project', async (req, res) => {
  res.json('hello, you are in project')
})

// push a project
router.post('/project', async (req, res) => {
  const project = await new Project({
    language: req.body.language,
    createdBy: req.body.createdBy,
    status: req.body.status
  })
  const savedProject = await project.save()
  res.send(savedProject)
})

// delete a project by id
router.delete('/project/:id', async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const projectDeleted = await Project.deleteOne({
      _id: req.params.id
    })
    res.json(projectDeleted)
  } else {
    res.status(508).json({
      errorCode: 508,
      errorMessage: 'invalid id in param'
    })
  }
})

// add trad to a project by id
router.post('/project/:id/traduction/', async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const project = await Project.updateOne(
      { _id: req.params.id },
      { $push: { trad: req.body.trad } }
    )
    res.send(project)
  } else {
    res.status(508).json({
      errorCode: 508,
      errorMessage: 'invalid id in param'
    })
  }
})

// delete a trad to a project by id
router.delete('/project/:id/traduction/', async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const filters = {
      _id: req.params.id
    }
    const update = {
      $pull: { trad: { keyName: req.body.keyName } }
    }
    const removedTrad = await Project.updateOne(filters, update)
    res.json(removedTrad)
  } else {
    res.status(508).json({
      errorCode: 508,
      errorMessage: 'invalid id in param'
    })
  }
})

// add a language to a project by id
router.post('/project/:id/language/', async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const project = await Project.updateOne(
      {
        _id: req.params.id,
        language: { $nin: req.body.language }
      },
      { $push: { language: req.body.language } }
    )
    res.send(project)
  } else {
    res.status(508).json({
      errorCode: 508,
      errorMessage: 'invalid id in param'
    })
  }
})

// delete language to a project by id
router.delete('/project/:id/language/', async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const filters = {
      _id: req.params.id,
      language: { $in: req.body.language }
    }
    const update = {
      $pull: { language: { $in: req.body.language } }
    }
    const removedTrad = await Project.updateOne(filters, update, { multi: true })
    res.json(removedTrad)
  } else {
    res.status(508).json({
      errorCode: 508,
      errorMessage: 'invalid id in param'
    })
  }
})

export default router
