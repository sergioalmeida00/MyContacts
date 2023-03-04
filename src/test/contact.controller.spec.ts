import { app } from '../app'
import request from 'supertest'
import { describe, expect, it } from 'vitest'

describe('Contacts Routes', async () => {
  const createCategoryResponse = await request(app)
    .post('/categories')
    .send({ title: 'TEST CATEGORY CONTACT' })

  it('should be able to list all Contacts', async () => {
    await request(app).post('/contacts').send({
      name: 'Jhon Doe test',
      email: 'jhondoe@teste.com',
      phone: '(99)99999-9999',
      category_id: createCategoryResponse.body.responseCategory[0].id,
    })

    const result = await request(app).get('/contacts').expect(200)
    expect(result.body.contacts[0]).toHaveProperty('id')
    expect(result.body.contacts[0]).toHaveProperty('name')
    expect(result.body.contacts[0]).toHaveProperty('email')
    expect(result.body.contacts[0]).toHaveProperty('phone')
    expect(result.body.contacts[0]).toHaveProperty('category_id')
  })

  it('should not be possible to create a contact with an existing email', async () => {
    await request(app).post('/contacts').send({
      name: 'Jhon Doe test',
      email: 'jhondoe1@teste.com',
      phone: '(99)99999-9999',
      category_id: createCategoryResponse.body.responseCategory[0].id,
    })
    const resultErroResponse = await request(app)
      .post('/contacts')
      .send({
        name: 'Jhon Doe test',
        email: 'jhondoe1@teste.com',
        phone: '(99)99999-9999',
        category_id: createCategoryResponse.body.responseCategory[0].id,
      })
      .expect(400)
    expect(resultErroResponse.body).toHaveProperty('error')
  })

  it('should be possible to register a new contact', async () => {
    await request(app)
      .post('/contacts')
      .send({
        name: 'Jhon Doe test',
        email: 'jhondoe12@teste.com',
        phone: '(99)99999-9999',
        category_id: createCategoryResponse.body.responseCategory[0].id,
      })
      .expect(201)
  })

  it('should be possible to delete a contact', async () => {
    const resultContacts = await request(app).get('/contacts')

    const id = resultContacts.body.contacts[0].id

    await request(app).delete(`/contacts/${id}`).expect(204)
  })

  it('should be possible to list a contact', async () => {
    const resultContacts = await request(app).get('/contacts')
    const id = resultContacts.body.contacts[0].id

    const contactIdResponse = await request(app)
      .get(`/contacts/${id}`)
      .expect(200)
    expect(contactIdResponse.body.contactResult).toHaveProperty('id')
    expect(contactIdResponse.body.contactResult).toHaveProperty('name')
    expect(contactIdResponse.body.contactResult).toHaveProperty('email')
    expect(contactIdResponse.body.contactResult).toHaveProperty('phone')
    expect(contactIdResponse.body.contactResult).toHaveProperty('category_id')
  })
})
