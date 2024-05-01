"use client"
import Battle from '@/components/Battle';
import { useParams } from 'next/navigation';
import React from 'react'

const BattlePage = () => {
  const { id } = useParams();
  return (
    <Battle id={id}/>
  )
}

export default BattlePage