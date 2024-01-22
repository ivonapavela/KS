'use client'
import React, { useEffect, useState } from 'react';
import "./homepage.css";

interface Image {
    sys: {
      id: string;
    };
    fields: ImageFields;
  }
  
  interface ImageFields {
    image: any;
  }
  
  const contentful = require('contentful');
  
  const client = contentful.createClient({
    space: 'c2epmrmqiqap',
    accessToken: 'SsS4a0T3sfF4NpTF4xhqPGL1OHjwgiN2f72YHtTbL8s',
  });

const Homepage = () => {
    const [image, setImage] = useState<Image[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = (await client.getEntries({
              content_type: 'image',
            })) as { items: Image[] };
    
            setImage(response.items);
          } catch (error) {
            console.error('Error fetching entries:', error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <main>
            <div>
                <div className="left-side">
                    <div className="title">
                        HEALTHY 
                        <br/>
                        AND
                        <br/>
                        EASY
                    </div>
                    <div className="description">
                        Wholesome Recipes Made Simple: 
                        <br/>
                        Discover a World of Healthy Culinary Delights!.
                    </div>
                </div>
                </div>
                <div className="plate">
                {image.length > 0 && image[0].fields.image?.fields?.file?.url ? (
                  <img src={image[0].fields.image.fields.file.url} alt={image[0].sys.id} />
                ) : (
                  <span>No Image</span>
                )}
              </div>
        </main>
    );

}

export default Homepage;