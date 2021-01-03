import React from 'react';
import {useParams} from 'react-router-dom';

export default function Manga() {
  const {id} = useParams<{id: string}>();

  return <div className="Manga">Manga {id}</div>;
}
