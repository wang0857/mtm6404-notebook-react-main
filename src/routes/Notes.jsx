import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {collection, query, onSnapshot, orderBy} from 'firebase/firestore'
import Card from "../components/Card";
import Col from "../components/Col";
import Row from "../components/Row";
import db from '../db'



function Notes () {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const c = collection(db, 'notes')
    const q = query(c, orderBy('title'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      //create a temporary array
      const data = []
      //push each lelement to the array
      snapshot.forEach(
        (doc) => data.push({
          id: doc.id,
          title: doc.data().title,
          text: doc.data().text
        })
      )
      setNotes(data)
    })
  }, [])

  

  return (
    <Row>
      { notes.map(
        (note) => (
          <Col key={note.id} className="col-12 col-md-6 col-lg-4 mb-3">
            <Link className="text-decoration-none text-body" to={"/note/" + note.id}>
              <Card title={note.title} text={note.text} />
            </Link>
          </Col>
        )
      )}
    </Row>
  )
}

export default Notes