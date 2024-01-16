'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import * as contentful from 'contentful';
import "./adopt.css";

export interface AdoptParams {
  params: Params;
}

interface Params {
  id: string;
}

interface AnimalFields {
  image: any;
  species: string;
  description: string;
  name: string;
}

interface Animal {
  sys: {
    id: string;
  };
  fields: AnimalFields;
}

export default function AdoptList({ params }: AdoptParams) {
  const [entry, setEntry] = useState<Animal | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contentful = require('contentful');
        const client = contentful.createClient({
          space: 'b1y65b41b9h4',
          accessToken: 'l_NSgS6j86JPjxwHXR9TuwHGO74-5C_vN3hCtm63Mb8',
        });

        const response = await client.getEntries({
          content_type: 'animal',
          'sys.id': params.id.toString(),
          include: 3, 
        }) as { items: Animal[] };

        if (response.items.length > 0) {
          setEntry(response.items[0]);
        } else {
          console.warn(`Animal with ID ${params.id} not found.`);
        }
      } catch (error) {
        console.error('Error fetching entry:', error);
      }
    };

    fetchData();
  }, [params.id]);

  if (!entry) {
    return (
      <main className="main-container">
        <p>Entry not found.</p>
      </main>
    );
  }

  const imageUrl = entry.fields.image?.fields.file.url;

  return (
    <main className="main-container">
      <h1 className="heading">{entry.fields.name}</h1>
      <div className="image-container">
        {imageUrl && <img className="image" src={imageUrl} alt="Image Description" />}
      </div>
      <span className="description">{entry.fields.description}</span>
    </main>
  );
}