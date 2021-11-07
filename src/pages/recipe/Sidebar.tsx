import React from 'react';
import CreateTag from './tag/CreateTag';
import TagList from './tag/TagList';
import CreateIngredient from './ingredient/CreateIngredient';
import IngredientList from './ingredient/IngredientList';

const Sidebar = () => {
  return (
    <div>
      <div className="space-y-4 lg:w-48 lg:mr-6 lg:border-r">
        <h1 className="font-bold text-gray-900 text-lg">Ingredients</h1>
        <CreateIngredient />
        <div className="max-h-64 overflow-auto">
          <IngredientList />
        </div>
        <h1 className="font-bold text-gray-900 text-lg">Tags</h1>

        <CreateTag />
        <div className="max-h-64 overflow-auto">
          <TagList />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
