import React, { useState, useReducer } from 'react'
import Modal from './Modal'
import { data } from '../../../data'
// reducer function

const Index = () => {
  const reducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
      const newPeople = [...state.people, action.payload]
      return {
        ...state,
        people: newPeople,
        isModalOpen: true,
        modalContent: 'Item Added',
      }
    }
    if (action.type === 'REMOVE_ITEM') {
      const newPeople = action.payload
      return {
        ...state,
        people: newPeople,
        isModalOpen: true,
        modalContent: 'Item removed',
      }
    }
    if (action.type === 'CLOSE_MODAL') {
      return {
        ...state,
        isModalOpen: false,
      }
    }
    if (action.type === 'NO_VALUE') {
      return {
        ...state,
        isModalOpen: true,
        modalContent: 'Empty Value',
      }
    }
    throw new Error('no matching action type')
  }
  const defaultState = {
    people: [],
    isModalOpen: false,
    modalContent: '',
  }
  const [name, setName] = useState('')
  const [state, dispatch] = useReducer(reducer, defaultState)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name) {
      const newItem = { id: new Date().getTime().toString(), name }
      dispatch({ type: 'ADD_ITEM', payload: newItem })
      setName('')
    } else {
      dispatch({ type: 'NO_VALUE' })
    }
  }

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' })
  }
  const handleRemove = (id) => {
    const newPeople = state.people.filter((person) => person.id !== id)
    dispatch({ type: 'REMOVE_ITEM', payload: newPeople })
  }
  if (state.people.length < 1) {
    return (
      <>
        {state.isModalOpen && (
          <Modal closeModal={closeModal} modalContent={state.modalContent} />
        )}
        <form className='form' onSubmit={handleSubmit}>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div>
            <button className='btn'>Add</button>
          </div>
        </form>
        <div className='item'>
          <h4 style={{ textAlign: 'center' }}>Empty List</h4>
        </div>
      </>
    )
  }
  return (
    <>
      {state.isModalOpen && (
        <Modal closeModal={closeModal} modalContent={state.modalContent} />
      )}
      <form className='form' onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <button className='btn'>Add</button>
        </div>
      </form>
      {state.people.map((person) => {
        const { id, name } = person
        return (
          <div className='item' key={id}>
            <h4>{name}</h4>
            <button type='button' onClick={() => handleRemove(id)}>
              Remove
            </button>
          </div>
        )
      })}
    </>
  )
}

export default Index
