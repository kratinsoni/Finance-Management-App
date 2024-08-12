import React from 'react'
import { useParams } from 'react-router-dom'
import AddExpense from './AddExpense';

function EditExpense() {

  const { id } = useParams();

  return (
    <AddExpense id={id} />
  )
}

export default EditExpense
