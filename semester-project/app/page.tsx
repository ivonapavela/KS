'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import * as contentful from 'contentful';
import "./adopt/animal.css";

interface AnimalFields {
  name: string;
  image: any;
  species: string;
  description: string[];
}

interface Animal {
  sys: {
    id: string;
  };
  fields: AnimalFields;
}

const client = contentful.createClient({
  space: 'b1y65b41b9h4',
  accessToken: 'l_NSgS6j86JPjxwHXR9TuwHGO74-5C_vN3hCtm63Mb8',
});

export default function Home() {
  const [entries, setEntries] = useState<Animal[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await client.getEntries({
          content_type: 'animal',
        })) as { items: Animal[] };

        setEntries(response.items.slice(0, 3)); 
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="title">
        <span>A</span>nimal <span>S</span>helter
      </div>

      <div className="main-container">
     {/*  <h2 className="text-3xl font-bold p-10" style={{ color: '#cc6600' }}>
          Featured animals for adoption.
        </h2> */}
        <ul className="flex flex-col gap-8">
          {entries.map((entry) => (
            <li key={entry.sys.id} className="animal-box">
              {entry.fields.image && (
                <img
                  src={entry.fields.image.fields.file.url}
                  alt={entry.fields.name}
                  className="animal-image"
                />
              )}
              <div className="animal-description">
                <span className="name">{entry.fields.name}</span>

                <p className="text-xl p-10">
                  {entry.fields.description.slice(0, 3).map((sentence, index) => (
                    <React.Fragment key={index}>
                      {sentence}
                      {index !== 2 && <br />}
                    </React.Fragment>
                  ))}
                </p>
                <Link href={`/adopt/${entry.sys.id}`} className="read-more-link">
                  Read more...
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

