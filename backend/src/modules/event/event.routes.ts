import { Hono } from 'hono'
import { getEvents, createEvent, updateEvent, deleteEvent } from './event.controller'

const eventRouter = new Hono()

eventRouter.get('/', getEvents)
eventRouter.post('/', createEvent)
eventRouter.put('/:id', updateEvent)
eventRouter.delete('/:id', deleteEvent)

export default eventRouter
