const apiBaseUrl = 'https://post-it.epi-bluelock.bj/notes'

const getNotes = () => {
  const response = fetch(apiBaseUrl)
  .then(((response) => {
    if (response.ok) {
      return response.json()
    }
  }))
  .then((data) => data.notes)
  .catch(() => {
    return false
  })
  return response
}

const getThisNote = async (id) => {
  const note = fetch(apiBaseUrl + '/' + id)
    .then((response) => {
      if (response.ok && (response.status == 201)) {
        return response.json()
      }
      else{
        return false
      }
    })
    .then((data) => data)
    .catch(() => {
      return false
    })
  return note
}

const createNewNote = (title, content) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title, content: [content] })
  }
  const responseStatus = fetch(apiBaseUrl, requestOptions).then((response) => response.ok)

  return responseStatus
}

const updateNote = (note) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: note.title, content: note.content })
  }
  const responseStatus = fetch(apiBaseUrl + '/' + note._id, requestOptions).then(
    (response) => response.ok
  )
  .catch(() => {
    return false;
  })

  return responseStatus
}

const deleteNote = (id) => {
  const requestOptions = {
    method: 'DELETE'
  }
  const responseStatus = fetch(apiBaseUrl + '/' + id, requestOptions).then(
    (response) => response.ok
  )
  .catch(() => {
    return false;
  })

  return responseStatus
}

export { getNotes, getThisNote, createNewNote, updateNote, deleteNote }
