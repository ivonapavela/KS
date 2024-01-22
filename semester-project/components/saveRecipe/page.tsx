import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/app/AuthContext';
import { createClient } from 'contentful-management';

const SPACE_ID = 'c2epmrmqiqap';
const ACCESS_TOKEN = 'CFPAT-4W6YBvnHoi1ct3BxnnCqiFbWUX1KoRysY5B2rNoOoNE';

const client = createClient({
  accessToken: ACCESS_TOKEN,
}) as any;

const SaveRecipe = ({ recipeEntryId }: { recipeEntryId: string }) => {
  const { isLoggedIn, username } = useAuth();
  const [isSaved, setIsSaved] = useState<boolean>(true);

  const handleSaveToggle = async () => {
    try {
        // Get the current comments field value (array of references)
        // Fetch the main entry
        const space = await client.getSpace(SPACE_ID);
        const environment = await space.getEnvironment('master');
    
        // Fetch the entry again to get the latest version
        let entry: any = await environment.getEntry(username);
    
        // Fetch the comment entry
        const recipeEntry: any = await environment.getEntry(recipeEntryId);
    
        // Initialize the comments field if it's undefined
        if (!entry.fields.savedRecipes) {
          entry.fields.savedRecipes = {
            'en-US': [],
          };
        }
    
        // Get the current comments field value (array of references)
        const currentSavedRecipes = entry.fields.savedRecipes['en-US'];
    
        // Add a reference to the comment entry to the comments field
        currentSavedRecipes.push({
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: recipeEntry.sys.id,
          },
        });
    
        // Update the comments field with the modified array
        entry.fields.savedRecipes['en-US'] = currentSavedRecipes;
    
        // Include the X-Contentful-Version header with the latest version of the entry
        const latestVersion = entry.sys.version;
    
        // Update the entry first (fetch the latest version before updating)
        entry = await entry.update();
    
        // Now publish the changes to the entry using the latest version
        await entry.publish({ headers: { 'X-Contentful-Version': latestVersion } });
    
        console.log(`Entry ${entry.sys.id} updated with a link to ${recipeEntry.sys.id}.`);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  

  return (
    <div className="saved-bookmark">
      {isLoggedIn && (
        <FontAwesomeIcon
          icon={faBookmark}
          className={`ml-1 ${isSaved ? 'text-yellow-500' : 'text-gray-500'}`}
          onClick={handleSaveToggle}
        />
      )}
    </div>
  );
};

export default SaveRecipe;
